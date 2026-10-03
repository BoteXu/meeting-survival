const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..'),sandbox={window:{}};vm.createContext(sandbox);
for(const file of ['content.js','content-expand.js','content-disciplines.js','content-v03.js','content-week.js','campus-content.js','campus-engine.js','preparation.js','engine.js','week-engine.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),sandbox,{filename:file});
const E=sandbox.window.MEETING_ENGINE,C=sandbox.window.MEETING_CONTENT;
const clone=x=>JSON.parse(JSON.stringify(x));
assert.equal(C.events.length,314);assert.equal(C.breaks.length,8);assert.equal(C.projects.length,36);assert.equal(C.endings.length,88);
assert.equal(new Set(C.events.map(e=>e.id)).size,C.events.length);
assert.equal(new Set(C.endings.map(e=>e.id)).size,C.endings.length);
const statKeys=['mood','evidence','patience','time'];
for(const event of C.events){assert.equal(event.choices.length,3);assert(C.people[event.who]);if(event.project)assert(C.projects.some(p=>p.id===event.project));for(const c of event.choices){assert(c.text&&c.flavor&&c.result&&c.label);for(const [k,v] of Object.entries(c.effects)){assert(statKeys.includes(k));assert(Number.isFinite(v));}for(const v of Object.values(c.flags))assert(Number.isInteger(v));if(c.risk)assert(c.risk.chance>0&&c.risk.chance<1);}}
for(const project of C.projects){const events=C.events.filter(e=>e.project===project.id&&!e.requires);assert.equal(events.length,7);assert.deepEqual(Array.from(events.map(e=>e.phase)),[1,2,3,4,6,7,8]);const intro=E.create({project:project.id,seed:21});E.choose(intro,0);E.advance(intro);assert.equal(E.current(intro).project,project.id,'新开局尽早出现学科专属事件');}
for(const event of C.breaks){assert.equal(event.choices.length,3);for(const c of event.choices){assert(c.text&&c.hint&&c.flavor);if(c.effects.item)assert(C.shop.some(i=>i.id===c.effects.item));}}
const a=E.create({seed:72,project:'clinical',persona:'detail'}),b=E.create({seed:72,project:'clinical',persona:'detail'});
for(let n=0;n<8;n++){E.choose(a,0);E.choose(b,0);E.advance(a);E.advance(b);}assert.equal(JSON.stringify(a),JSON.stringify(b),'同一种子可重现');
let item=E.create({seed:6,career:{bag:{backup:1,memo:1},relations:{senior:75}}});const oldPhase=item.phase;
assert(E.useItem(item,'skill'));assert.equal(item.phase,oldPhase);assert.equal(E.useItem(item,'skill'),null);
const baseEvidence=item.stats.evidence;E.useItem(item,'charm');assert.equal(item.stats.evidence,Math.min(100,baseEvidence+8),'关系提升会加强师兄救场');
assert(E.useItem(item,'backup'));assert.equal(item.bag.backup,0);assert.equal(E.useItem(item,'backup'),null);
assert(E.useItem(item,'memo'));assert.equal(item.flags.debt,0,'还债不会变成负数');
E.choose(item,0);assert.equal(E.useItem(item,'coffee'),null);assert.equal(E.choose(item,1),null);assert(E.isValid(clone(item)));
// 用真实旧版生成未结束、正在反馈、已结束的存档，再由新版恢复。
const legacy={window:{}};vm.createContext(legacy);
for(const file of ['legacy-content.js','legacy-engine.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,file),'utf8'),legacy,{filename:file});
const LE=legacy.window.MEETING_ENGINE;
for(const mode of ['active','pending','ended']){
  let old=LE.create({seed:3});
  if(mode==='pending')LE.choose(old,1);
  if(mode==='ended')for(let i=0;!old.ended&&i<100;i++){if(old.pending)LE.advance(old);else LE.choose(old,0);}
  assert.equal(old.version,2);const upgraded=E.upgrade(old);assert(E.isValid(upgraded),`旧版 ${mode} 存档可恢复`);assert.equal(upgraded.eventId,old.eventId);assert.equal(JSON.stringify(upgraded.stats),JSON.stringify(old.stats));assert.equal(upgraded.choicesMade,old.choicesMade);
  if(mode==='pending'){assert(E.advance(upgraded));assert(E.isValid(upgraded));}
}
const stats={count:0,endings:{},byProject:{},minRounds:1000,maxRounds:0};const witnesses={};const coverage=new Set();
function checkState(s){assert(E.isValid(s),'现场状态可以恢复');const event=E.current(s);assert(!event.project||event.project===s.project,'禁止混入别的学科专属事件');if(event.requires)assert(s.flags[event.requires]>0);coverage.add(event.id);}
function checkedChoice(s,index){const before=clone(s.stats),p=E.previewChoice(s,index),c=E.current(s).choices[index];const r=E.choose(s,index);assert(r);for(const k of statKeys){const effect=(p.effects[k]||0)+(r.unlucky?(c.risk.effects[k]||0):0);const expected=Math.max(0,Math.min(k==='time'?65:100,before[k]+effect));assert.equal(s.stats[k],expected,'显示的选项后果与实际扣加一致');}checkState(s);}
function finish(s,policy,options={}){
  let pickSeed=s.seed;
  for(let i=0;!s.ended&&i<160;i++){
    checkState(s);if(s.pending){assert(E.advance(s));continue;}
    if(s.stats.mood<45&&!s.used.coffee)E.useItem(s,'coffee');
    if(s.stats.patience<55&&!s.used.charm)E.useItem(s,'charm');
    if(s.choicesMade>=4&&!s.used.skill)E.useItem(s,'skill');
    if(options.stock)for(const stock of C.shop){if((stock.id==='laser'&&s.stats.time<15)||(stock.id==='snack'&&s.stats.mood<50)||(stock.id==='backup'&&s.stats.evidence<65)||(stock.id==='memo'&&s.flags.debt>=2))E.useItem(s,stock.id);}
    if(s.pending)continue;
    const event=E.current(s);pickSeed=(Math.imul(pickSeed,1664525)+1013904223)>>>0;
    let choice=policy==='random'?pickSeed%3:Number.isInteger(policy)?policy:0;
    if(typeof policy==='string'&&policy!=='random'){
      const target=C.disciplineEndings.find(e=>e.project===s.project)?.flag||({classic:'cat',data:'robot',theory:'recursive',field:'wander'}[s.project]);
      const flag=policy==='discipline'?target:policy;
      let best=-1;
      for(let n=0;n<3;n++)if((event.choices[n].flags[flag]||0)>0&&((E.previewChoice(s,n).effects.time||0)>-(s.stats.time-1)||s.stats.time>5)){best=n;break;}
      if(best>=0)choice=best;
      else choice=s.stats.mood<35?event.choices.reduce((best,c,n)=>((c.effects.mood||0)>(event.choices[best].effects.mood||0)?n:best),0):0;
    }
    if(policy==='honest-balance'){
      const honest=event.choices.findIndex(c=>c.flags.honest);
      const social=event.choices.findIndex(c=>c.flags.social||c.flags.help);
      choice=honest>=0?honest:social>=0?social:1;
    }
    checkedChoice(s,choice);
  }
  assert(s.ended,'自然场次会结束');checkState(s);assert(C.endings.some(e=>e.id===s.ending));
  stats.count++;stats.endings[s.ending]=(stats.endings[s.ending]||0)+1;stats.byProject[s.project]=(stats.byProject[s.project]||0)+1;
  stats.minRounds=Math.min(stats.minRounds,s.choicesMade);stats.maxRounds=Math.max(stats.maxRounds,s.choicesMade);
  witnesses[s.ending]??={seed:s.seed,role:s.role,project:s.project,persona:s.persona,difficulty:s.difficulty,policy,career:options.career||{},stock:!!options.stock,rounds:s.choicesMade};
}
for(const project of C.projects)for(const role of C.roles)for(const difficulty of Object.keys(E.difficulties))for(let seed=1;seed<=48;seed++)finish(E.create({project:project.id,role:role.id,difficulty,persona:C.personas[seed%4].id,seed}),[0,1,2,'random'][seed%4]);
const stockCareer={bag:Object.fromEntries(C.shop.map(i=>[i.id,3])),relations:{boss:65,stats:65,senior:78}};
for(const project of C.projects)for(const policy of ['discipline','help','social','honest','rigor'])for(let seed=1;seed<=60;seed++)finish(E.create({project:project.id,role:'social',persona:'warm',seed,career:stockCareer}),policy,{stock:true,career:stockCareer});
const veteran={...stockCareer,meetings:8,experience:180,reputation:80};
for(let seed=1;seed<=60;seed++)finish(E.create({project:'clinical',role:'newbie',persona:'detail',seed,career:veteran}),'rigor',{stock:true,career:veteran});
for(let seed=1;seed<=60;seed++)finish(E.create({project:'data',role:'chill',persona:'warm',seed}),'honest-balance');
assert(stats.maxRounds>10,'没有固定十回合限制');
if(Object.keys(stats.endings).length!==48)console.log(JSON.stringify({missing:C.endings.filter(e=>!stats.endings[e.id]).map(e=>e.id),observed:stats.endings}));
assert.equal(Object.keys(stats.endings).length,48,'全部48个单场结局都有实际规则路径');
let req=E.create({seed:55,persona:'warm'});assert.equal(E.requestEnd(req),null);for(let i=0;i<5;i++){E.choose(req,0);E.advance(req);}assert(E.requestEnd(req));assert(req.pending);assert(E.isValid(req));E.advance(req);assert.equal(req.phase,8);assert.equal(E.requestEnd(req),null,'进入总结后禁止重复申请');
let low=E.create({role:'chill',seed:1});low.stats.time=1;assert(E.useItem(low,'coffee'));assert(low.pending);assert(E.advance(low));assert(low.ended);
const repeatAvoid=E.create({seed:8});const fresh=E.create({seed:8,career:{recentEvents:[repeatAvoid.eventId]}});assert.notEqual(fresh.eventId,repeatAvoid.eventId,'下一场减少近期重复场景');
const result={passed:true,...stats,totalMeetingScenarios:C.events.length,betweenMeetingScenarios:C.breaks.length,totalChoices:C.events.length*3+C.breaks.length*3,coverage:coverage.size,witnesses,checked:['36条学科剧情隔离','导师与关系影响回应','后果提示与实际一致','全部48种单场结局实际可达','非固定十回合','真实v0.1存档迁移','道具库存与一次性技能','保存反馈恢复','主动申请散会','减少近期重复事件']};
fs.writeFileSync(path.join(__dirname,'engine-results.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify({...result,witnesses:undefined}));
