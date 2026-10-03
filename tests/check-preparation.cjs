const assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..'),scope={window:{}};vm.createContext(scope);
for(const file of ['content.js','content-expand.js','content-disciplines.js','content-v03.js','content-week.js','campus-content.js','campus-engine.js','preparation.js','engine.js','week-engine.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),scope,{filename:file});
const {MEETING_CONTENT:C,MEETING_ENGINE:E,MEETING_WEEK:W,MEETING_CAMPUS:G,MEETING_PREPARATION:P}=scope.window,copy=x=>JSON.parse(JSON.stringify(x));
assert.equal(C.preparationEvents.length,180);assert.equal(C.preparationQuestions.length,144);
const configs=project=>({project,role:'newbie',difficulty:'normal',persona:'warm',name:'前后关联试玩',campus:true,preparation:true});
function life(w,kind,index){const e=kind==='rest'?W.useLocation(w,'home'):P.dispatch(w,kind);assert(e);assert.equal(P.dispatch(w,'literature'),null,'一个片段不能重复准备');assert.equal(W.useLocation(w,'lab'),null,'准备与地图共用一个片段');assert(W.isValid(w));const before=JSON.stringify(w),preview=P.lifePreview(w,e,index);assert(preview.available);const r=W.choose(w,index);assert(r);assert.equal(W.choose(w,index),null);assert(P.bookValid(w.preparation));const saved=copy(w);assert(W.isValid(saved));assert.deepEqual(saved.pending.preparation,copy(r.preparation));assert.notEqual(JSON.stringify(w),before);assert(W.advance(w));return r;}
function enter(w,seed){w.campus.deckLocked=true;return E.create({...w.config,seed,weekContext:W.meetingContext(w)});}
function play(s,policy='honest'){const questions=new Set();for(let n=0;!s.ended&&n<180;n++){assert(E.isValid(s));if(s.pending){assert(E.advance(s));continue;}const e=E.current(s);if(e.prepKind)questions.add(e.prepKind);const preview=E.previewChoice(s,0);if(!preview.available){const old=JSON.stringify(s);assert.equal(E.choose(s,0),null,'引擎拒绝未经准备的完整回答');assert.equal(JSON.stringify(s),old,'被锁定的回答不改数值或随机种子');}const index=e.prepKind&&policy==='bluff'?2:preview.available?0:1;const before=copy(s.stats),shown=E.previewChoice(s,index);const r=E.choose(s,index);assert(r);if(!r.unlucky)for(const [key,v] of Object.entries(shown.effects))assert.equal(s.stats[key],Math.max(0,Math.min(key==='time'?65:100,before[key]+v)));assert.equal(E.choose(s,index),null);assert(E.isValid(copy(s)));}
assert(s.ended);return questions;}
let meetings=0,repaired=0,answered=0,gaps=0;const allQuestions=new Set();
for(const p of C.projects)for(const strategy of ['full','skim','none']){
 const w=W.create(configs(p.id),391+C.projects.indexOf(p)*53);for(let i=0;i<9;i++)life(w,i<5&&strategy!=='none'?P.kinds[i]:'rest',strategy==='skim'&&i<5?1:0);
 assert.equal(w.log.length,9);const s=enter(w,1937);const questions=play(s);assert.equal(questions.size,4,'每场实际出现四类准备检查');for(const k of questions)allQuestions.add(p.id+':'+k);
 for(const attempt of s.preparation.attempts.filter(a=>a.status==='answered')){assert(attempt.source);assert.equal(attempt.source.route,p.id);assert(attempt.source.level>=1);}
 if(strategy==='full'){assert.equal(s.preparation.gaps.length,0);assert.equal(s.preparation.answered.filter(k=>k!=='rehearsal').length,4);}else assert.equal(s.preparation.gaps.length,4);
 answered+=s.preparation.answered.length;gaps+=s.preparation.gaps.length;assert(W.completeMeeting(w,s));assert.equal(W.completeMeeting(w,s),false);
 const tasks=w.tasks.filter(t=>t.prepKind&&!t.done);assert.equal(tasks.length,s.preparation.gaps.length);
 if(strategy==='full'){for(let i=0;i<4;i++)life(w,'rest',0);}else{for(const kind of P.kinds.slice(0,4)){const r=life(w,kind,0);assert(r.preparation.repaired.some(title=>title.includes(P.names[kind])));repaired++;}}
 assert.equal(w.status,'report');assert.equal(w.tasks.filter(t=>t.prepKind&&!t.done).length,0);assert.equal(w.log.length,13);
 const next=W.create(w.config,8824,w,2),snapshot=JSON.stringify(w);assert.equal(P.level(next.preparation,p.id,'literature'),2);assert.equal(P.level(next.preparation,p.id,'method'),2);assert.equal(P.level(next.preparation,p.id,'record'),1);assert.equal(P.level(next.preparation,p.id,'boundary'),1);
 for(let i=0;i<9;i++)life(next,i===0?'record':i===1?'boundary':'rest',0);const s2=enter(next,9191);assert.equal(play(s2).size,4);assert.equal(s2.preparation.gaps.length,0);assert.equal(JSON.stringify(w),snapshot,'新周不改变原周的回答依据');meetings+=2;
 const switched=W.create(configs(C.projects[(C.projects.indexOf(p)+1)%36].id),932,w,3);assert.equal(switched.preparation.sources.length,0,'不同学科不借用上一学科的准备');
}
assert.equal(allQuestions.size,144);
// 高数值、手牌、库存与技能不能越过准备门槛。
const unprepared=W.create(configs('classic'),22);for(let i=0;i<9;i++)life(unprepared,'rest',0);unprepared.resources.notes=100;unprepared.resources.slides=100;for(const id of ['summary','sleep'])G.toggleCard(unprepared,id);const no=enter(unprepared,31);E.choose(no,0);E.advance(no);assert.equal(E.current(no).prepKind,'literature');assert.equal(E.previewChoice(no,0).available,false);E.useItem(no,'skill');E.useItem(no,'coffee');E.useItem(no,'charm');assert.equal(E.previewChoice(no,0).available,false);
// 只读摘要不等于精读；预演不能冒充文献阅读。
const skim=W.create(configs('law'),32);life(skim,'literature',1);assert.equal(P.level(skim.preparation,'law','literature'),1);life(skim,'rehearsal',0);assert.equal(P.level(skim.preparation,'law','literature'),1);assert.equal(P.level(skim.preparation,'law','rehearsal'),2);
// 未读材料也能作答，但硬答真的有失败概率和具体待办。
let bluffFailures=0;for(let seed=1;seed<=30;seed++){const s=enter(unprepared,seed);play(s,'bluff');assert(s.preparation.attempts.some(a=>a.status==='bluff'));bluffFailures+=s.log.filter(r=>r.preparation?.status==='bluff'&&r.unlucky).length;}assert(bluffFailures>0);
// 通用“处理一项任务”不能代替对应补读；先有记录线索才能核对边界。
const taskWeek=W.create(configs('classic'),82);taskWeek.tasks.push({title:'补读',done:false,prepKind:'literature',route:'classic',from:1});const r=life(taskWeek,'rest',0);assert.equal(taskWeek.tasks[0].done,false);
const bound=W.create(configs('classic'),19);const e=P.dispatch(bound,'boundary');assert.equal(P.lifePreview(bound,e,0).available,false);assert.equal(W.choose(bound,0),null);assert(W.choose(bound,1));assert(W.advance(bound));life(bound,'record',0);life(bound,'boundary',0);assert.equal(P.level(bound.preparation,'classic','boundary'),2);
// v0.4已有的实际选择可恢复准备依据；卡牌收藏本身不算准备。
const old=W.create({...configs('classic'),preparation:false},31);W.useLocation(old,'library');W.choose(old,0);const oldPending=copy(old.pending);P.upgrade(old);assert(W.isValid(old));assert.equal(old.pending.answer,oldPending.answer);assert(old.pending.preparation);assert(old.preparation.sources.length>0);const oldCopy=JSON.stringify(old);P.upgrade(old);assert.equal(JSON.stringify(old),oldCopy);
const sleeping=W.create({...configs('classic'),preparation:false},39);sleeping.campus.cards=C.workCards.map(c=>c.id);P.upgrade(sleeping);assert.equal(sleeping.preparation.sources.length,0);
const legacy=W.create({...configs('classic'),preparation:false},11);for(let i=0;i<9;i++){W.choose(legacy,0);W.advance(legacy);}assert.equal(P.upgrade(legacy).config.preparation,false,'已经在周五的旧场次保持原规则');
const output={passed:true,meetings,disciplines:36,focusActions:180,questionVariants:allQuestions.size,matchedWeekendRepairs:repaired,answeredCategories:answered,missingCategories:gaps,bluffFailures,checked:['真实行动决定回答权限','摘要与精读不同','五种准备不能互相冒充','数值和道具不能解锁','每场四类检查','回答来源可追溯','具体缺口回到周末','匹配准备才能销项','跨周继承与结果复核','学科隔离','旧存档迁移','锁定选项引擎防绕过']};fs.writeFileSync(path.join(root,'.qa/preparation-results.json'),JSON.stringify(output,null,2));console.log(JSON.stringify(output));
