const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..'),scope={window:{}};vm.createContext(scope);
for(const file of ['content.js','content-expand.js','content-disciplines.js','content-v03.js','content-week.js','campus-content.js','campus-engine.js','preparation.js','engine.js','week-engine.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),scope,{filename:file});
const {MEETING_CONTENT:C,MEETING_ENGINE:E,MEETING_WEEK:W}=scope.window,clone=x=>JSON.parse(JSON.stringify(x));
assert.equal(C.families.length,14);assert.equal(C.lifeEvents.length,165);assert.equal(new Set(C.lifeEvents.map(e=>e.id)).size,165);
for(const f of C.families)assert(C.projects.some(p=>p.family===f.id));
const found={},lifeCoverage=new Set(),echoCoverage=new Set(),witnesses={};let simulations=0;
function run(project,seed,policy){const config={project,role:['newbie','social','chill','grinder'][seed%4],persona:['warm','detail','story','strict'][seed%4],difficulty:'normal',name:'测试同学'};let w=W.create(config,seed),prng=seed;
  const pick=()=>{prng=(Math.imul(prng,1664525)+1013904223)>>>0;return prng%3;};
  while(w.status==='life'&&w.day<=4){assert(W.isValid(w));const event=W.current(w);assert(!event.project||event.project===project);lifeCoverage.add(event.id);let index=policy==='random'?pick():policy;
    const before=clone(w.resources),record=W.choose(w,index);assert(record);assert.equal(W.choose(w,index),null,'双击不会重复领取');for(const [k,v] of Object.entries(event.choices[index].effects))assert.equal(w.resources[k],Math.max(0,Math.min(100,before[k]+v)));
    w=clone(w);assert(W.isValid(w),'反馈可以恢复');assert(W.advance(w));}
  assert.equal(w.status,'meeting');assert.equal(w.log.length,9);const context=W.meetingContext(w);let s=E.create({...config,seed,weekContext:context});assert(E.isValid(s));
  for(let n=0;!s.ended&&n<200;n++){if(s.pending){E.advance(s);continue;}const e=E.current(s);if(e.weekRequires){assert(context.traits[e.weekRequires]>0);echoCoverage.add(e.id);}let index=policy==='random'?pick():policy;
    if(seed%7===0){const desired=['rigor','honest','social','help'][seed%4];const candidate=e.choices.findIndex(c=>c.flags[desired]);if(candidate>=0)index=candidate;}
    if(s.stats.mood<28)E.useItem(s,'coffee');if(s.stats.patience<30)E.useItem(s,'charm');if(n===8)E.useItem(s,'skill');if(s.pending)continue;E.choose(s,index);assert(E.isValid(s));}
  assert(s.ended);found[s.ending]=(found[s.ending]||0)+1;witnesses[s.ending]??={seed,project,policy,life:w.log.map(r=>r.answer),meeting:s.log.filter(r=>r.type==='choice').map(r=>r.answer)};
  assert(W.completeMeeting(w,s));assert.equal(W.completeMeeting(w,s),false,'重复查看结局不生成双份待办');assert.equal(w.day,5);const tasks=clone(w.tasks);
  while(w.status==='life'){lifeCoverage.add(W.current(w).id);W.choose(w,seed%3);W.advance(w);assert(W.isValid(w));}
  assert.equal(w.status,'report');assert.equal(w.log.length,13);assert(w.meeting);const next=W.create(config,seed+1,w,w.number+1);assert.equal(next.number,2);assert.equal(next.day,0);assert.equal(next.tasks.length,w.tasks.filter(t=>!t.done).length);assert.equal(next.traits.unfinished,next.tasks.length);simulations++;
}
for(const p of C.projects)for(let seed=1;seed<=240;seed++)run(p.id,seed,[0,1,2,'random'][seed%4]);
// 单独检查旧 v0.2 现场：新增旗标不改变原来的进度、事件或数值。
for(const {mode,state:old} of JSON.parse(fs.readFileSync(path.join(__dirname,'v02-save-snapshots.json')))){assert.equal(old.version,3);const migrated=E.upgrade(old);assert(E.isValid(migrated),`v0.2 ${mode} 可恢复`);assert.equal(migrated.eventId,old.eventId);assert.equal(JSON.stringify(migrated.stats),JSON.stringify(old.stats));assert.equal(JSON.stringify(migrated.pending),JSON.stringify(old.pending));assert.equal(migrated.choicesMade,old.choicesMade);}
const cases=JSON.parse(fs.readFileSync(path.join(__dirname,'weekly-ending-witnesses.json')));
assert.equal(Object.keys(cases).length,20);
for(const [expected,c] of Object.entries(cases)){
  const w=W.create(c.config,c.seed);for(const i of c.actions){assert(W.choose(w,i));assert(W.advance(w));}assert.equal(w.status,'meeting');
  const s=E.create({...c.config,seed:c.meetingSeed,weekContext:W.meetingContext(w)});let index=0;
  for(let n=0;!s.ended&&n<180;n++){if(s.pending){E.advance(s);continue;}if(c.items){if(s.stats.mood<32)E.useItem(s,'coffee');if(s.stats.patience<35)E.useItem(s,'charm');if(n===8)E.useItem(s,'skill');}if(s.pending)continue;assert(index<c.choices.length);E.choose(s,c.choices[index++]);}
  assert(s.ended);assert.equal(s.ending,expected,'周一到组会的原始选择路径确实抵达目标结局');assert(W.completeMeeting(w,s));assert.equal(w.day,5,'失败或滑稽结局后仍能继续生活');found[s.ending]=(found[s.ending]||0)+1;
}
const result={passed:true,simulations,lifeEvents:C.lifeEvents.length,lifeCoverage:lifeCoverage.size,echoCoverage:echoCoverage.size,verifiedWeeklyEndings:Object.keys(cases).length,missing:C.endings.filter(e=>!C.campusEndingIds.includes(e.id)).slice(-20).filter(e=>!found[e.id]).map(e=>e.id),found,witnesses};
fs.mkdirSync(path.join(root,'.qa'),{recursive:true});fs.writeFileSync(path.join(root,'.qa','week-results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({...result,witnesses:undefined}));
