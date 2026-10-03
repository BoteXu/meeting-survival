const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..'),scope={window:{}};vm.createContext(scope);
for(const file of ['content.js','content-expand.js','content-disciplines.js','content-v03.js','content-week.js','campus-content.js','campus-engine.js','preparation.js','engine.js','week-engine.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),scope,{filename:file});
const {MEETING_CONTENT:C,MEETING_ENGINE:E,MEETING_WEEK:W,MEETING_CAMPUS:G}=scope.window,copy=x=>JSON.parse(JSON.stringify(x));
assert.equal(C.campusEvents.length,33);assert.equal(C.workCards.length,12);assert.equal(C.talents.length,12);assert.equal(C.weekTwists.length,8);assert.equal(C.challenges.length,8);assert.equal(new Set(C.campusEvents.map(e=>e.id)).size,33);
const coverage=new Set(),cards=new Set(),twists=new Set(),badges=new Set(),chapters=new Set();let weeks=0,completed=0,synergies=0;
function life(w,location,index){const event=W.useLocation(w,location);assert(event);assert.equal(event.location,location);coverage.add(event.id);assert(W.isValid(w));assert.equal(W.useLocation(w,'home'),null,'不能重抽地点或免费刷事件');const before=copy(w.resources),progress=copy(w.campus.research),shown=G.preview(w,event.choices[index]),work=G.previewWork(w,event.choices[index]);const r=W.choose(w,index);assert(r);assert.equal(W.choose(w,index),null,'反馈不会重复领取');
  for(const k of ['energy','notes','slides','stress']){const risk=r.unlucky?(event.choices[index].risk.effects[k]||0):0;assert.equal(w.resources[k],Math.max(0,Math.min(100,before[k]+(shown[k]||0)+risk)),'地图选项提示与实际后果一致');}
  for(const k of ['progress','quality'])assert.equal(w.campus.research[k],Math.max(0,Math.min(100,progress[k]+work[k])),'打法与成长修正实际生效');
  assert.equal(W.useLocation(w,'lab'),null);assert(W.isValid(copy(w)),'校园反馈可恢复');if(r.campus.story)chapters.add(r.campus.story.person+':'+r.campus.story.chapter);assert(W.advance(w));assert(W.isValid(w));
}
function meeting(w,seed,chaos=false){const stock=w.campus.cards;for(const id of stock.filter(id=>C.workCards.find(c=>c.id===id).tag==='rigor').slice(0,2))G.toggleCard(w,id);for(const id of stock)if(w.campus.deck.length<3&&!w.campus.deck.includes(id))G.toggleCard(w,id);
  assert.equal(w.campus.deck.length,Math.min(3,stock.length));const extra=stock.find(id=>!w.campus.deck.includes(id));if(extra)assert.equal(G.toggleCard(w,extra),false,'手牌最多三张');
  if(G.deckBonus(w).combos.length)synergies++;const ctx=W.meetingContext(w);w.campus.deckLocked=true;assert.equal(G.toggleCard(w,stock[0]),false);const config={...w.config,seed,career:{relations:{...w.campus.bonds}},weekContext:ctx};const s=E.create(config),base=E.create({...config,weekContext:null});for(const k of ['mood','evidence','patience','time'])assert.equal(s.stats[k],Math.max(0,Math.min(k==='time'?65:100,base.stats[k]+(ctx.deltas[k]||0))),'手牌、环境和生活的合计修正与入场一致');
  for(let n=0;!s.ended&&n<180;n++){assert(E.isValid(s));if(s.pending){E.advance(s);continue;}if(!chaos){if(s.stats.mood<30)E.useItem(s,'coffee');if(s.stats.patience<30)E.useItem(s,'charm');if(n===4)E.useItem(s,'skill');}if(s.pending)continue;E.choose(s,chaos?2:0);}
  assert(s.ended);assert(W.completeMeeting(w,s));const snapshot=JSON.stringify(w.campus);assert.equal(W.completeMeeting(w,s),false);assert.equal(JSON.stringify(w.campus),snapshot,'反复看结局不重复推进课题和人物');return s;
}
for(const p of C.projects)for(const style of C.researchStyles){let previous=null;for(let number=1;number<=6;number++){
  const config={project:p.id,role:'newbie',persona:'warm',difficulty:'normal',name:'校园试玩',campus:true},seed=number*9821+C.projects.indexOf(p)*73+C.researchStyles.indexOf(style)*337;
  const old=previous?JSON.stringify(previous):null,w=W.create(config,seed,previous,number);assert(G.enabled(w));assert(W.isValid(w));twists.add(w.campus.twist);assert(G.setStyle(w,style.id));assert(G.setChallenge(w,w.campus.challengeOptions[0]));
  if(previous){assert.equal(w.campus.points,previous.campus.points);assert.equal(w.campus.cards.length,previous.campus.cards.length);assert.equal(w.campus.talents.length,previous.campus.talents.length);assert.equal(JSON.stringify(previous),old,'下一周不会反向修改旧周报');}
  const route=number%2?['lab','library','lab','home','lab','mentor','lab','cafe','home']:['library','cafe','mentor','lab','home','lab','library','cafe','mentor'];
  for(let i=0;i<9;i++){life(w,route[i],i===8?0:number%3);assert.equal(G.setChallenge(w,w.campus.challengeOptions[1]),false,'开局后锁定挑战');}
  assert.equal(w.status,'meeting');meeting(w,seed+291);
  for(const location of ['home','lab','wander','cafe'])life(w,location,number%3);
  assert.equal(w.status,'report');assert.equal(w.log.length,13);const points=w.campus.points;G.settleReport(w);assert.equal(w.campus.points,points,'周报成长奖励只发一次');const reward=G.claimReport(w);assert([0,2].includes(reward));assert.equal(G.claimReport(w),0);
  const talent=C.talents.find(t=>!w.campus.talents.includes(t.id));if(talent){assert(G.buyTalent(w,talent.id));assert.equal(G.buyTalent(w,talent.id),false);}
  for(const id of w.campus.cards)cards.add(id);for(const id of w.campus.badges)badges.add(id);completed+=w.campus.completed.length>(previous?.campus.completed.length||0)?1:0;assert(W.isValid(w));previous=copy(w);weeks++;
}}
assert(completed>0,'课题可通过三个真实组会阶段评审并完成');assert.equal(chapters.size,9,'三位人物的三个章节均实际发生');assert.equal(coverage.size,33,'33个校园场景实际可达');assert.equal(cards.size,12,'全部手牌实际收集到');assert.equal(twists.size,8);assert(synergies>0);
// 从开局逐步重放全部新增结局，不直接填充状态或卡牌。
const witnesses=JSON.parse(fs.readFileSync(path.join(root,'tests/campus-ending-witnesses.json'),'utf8'));
assert.deepEqual(Object.keys(witnesses).sort(),Array.from(C.campusEndingIds).sort());
const replayTalents=new Set();
for(const [expected,witness] of Object.entries(witnesses)){
  let previous=null,ending=null;
  for(const [offset,chapter] of witness.journey.entries()){
    const w=W.create(witness.config,chapter.seed,previous,offset+1);assert(G.setStyle(w,chapter.style));
    const play=actions=>{for(const action of actions){if(action.location)assert(W.useLocation(w,action.location));assert(W.choose(w,action.index));assert(W.isValid(copy(w)));assert(W.advance(w));}};
    play(chapter.pre);assert.equal(w.status,'meeting');
    for(const id of chapter.deck)assert(G.toggleCard(w,id));w.campus.deckLocked=true;
    const s=E.create({...witness.config,seed:chapter.meetingSeed,career:{relations:{...w.campus.bonds}},weekContext:W.meetingContext(w)});
    for(const move of chapter.moves){assert(!s.ended);if(move.type==='choose')assert(E.choose(s,move.index));else if(move.type==='advance')assert(E.advance(s));else if(move.type==='item')assert(E.useItem(s,move.id));else if(move.type==='request')assert(E.requestEnd(s));else assert.fail('未知重放操作');assert(E.isValid(copy(s)));}
    assert(s.ended);ending=s.ending;assert(W.completeMeeting(w,s));
    if(offset===witness.journey.length-1)break;
    play(chapter.post);assert.equal(w.status,'report');if(chapter.talent){assert(G.buyTalent(w,chapter.talent));assert.equal(G.buyTalent(w,chapter.talent),false);replayTalents.add(chapter.talent);}if(chapter.restart)assert(G.restartResearch(w));previous=copy(w);
  }
  assert.equal(ending,expected,'新增结局存在可重现的完整游玩路径');
}
// 12周持续成长实际购买全部能力，不直接赋予成长点。
let growthPrevious=null;const purchased=new Set();
for(let number=1;number<=12;number++){
 const w=W.create({project:'classic',role:'newbie',persona:'warm',campus:true},7812+number,growthPrevious,number);
 for(let i=0;i<9;i++)life(w,i%2?'library':'lab',0);meeting(w,9128+number);for(let i=0;i<4;i++)life(w,'home',0);
 const id=C.talents[number-1].id;assert(G.buyTalent(w,id));assert.equal(G.buyTalent(w,id),false);assert.equal(w.campus.points,0);purchased.add(id);growthPrevious=copy(w);
}
assert.equal(purchased.size,12);
// 旧周历中途升级保留原状态，下一周才开启校园探索。
const legacy=W.create({project:'classic',role:'newbie',persona:'warm',difficulty:'normal',name:'原存档'},9);W.choose(legacy,0);const legacyCopy=copy(legacy);assert(W.isValid(legacyCopy));assert.equal(legacyCopy.eventId,legacy.eventId);assert.equal(JSON.stringify(legacyCopy.pending),JSON.stringify(legacy.pending));assert.equal(G.enabled(legacyCopy),false);W.advance(legacyCopy);const upgraded=W.create({...legacy.config,campus:true},10,legacy,2);assert(G.enabled(upgraded));assert.equal(upgraded.tasks.length,legacy.tasks.filter(t=>!t.done).length);
const a=W.create({project:'law',role:'newbie',campus:true},18),b=W.create({project:'law',role:'newbie',campus:true},18);life(a,'lab',1);life(b,'lab',1);assert.equal(JSON.stringify(a),JSON.stringify(b),'地点、风险、课题与手牌可确定性重现');
const result={passed:true,weeks,verifiedCampusEndings:Object.keys(witnesses).length,verifiedTalents:purchased.size,completedProjects:completed,campusScenarios:coverage.size,workCards:cards.size,twists:twists.size,storyChapters:chapters.size,comboMeetings:synergies,badges:Array.from(badges),checked:['单片段机会成本','课题质量与进度取舍','12张手牌收集与组合','3张上限与入场锁定','12种成长点购买防重复','人物章节与信任门槛','跨周完整状态保存','旧周历继续与升级','13次生活选择','所有36条学科路线']};fs.mkdirSync(path.join(root,'.qa'),{recursive:true});fs.writeFileSync(path.join(root,'.qa','campus-results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
