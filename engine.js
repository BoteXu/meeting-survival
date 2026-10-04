window.MEETING_ENGINE = (() => {
  'use strict';
  const C=window.MEETING_CONTENT;
  const difficulties={normal:{name:'正常组会',time:39,tax:0},friday:{name:'周五晚八点',time:35,tax:1},surprise:{name:'大佬突袭',time:31,tax:2}};
  const flagKeys=['chaos','rigor','honest','social','help','debt','cat','robot','recursive','wander','shift','quantum','material','market','footnote','client',...(C.extraFlags||[])];
  const clamp=(x,max=100)=>Math.max(0,Math.min(max,x));
  const blankFlags=()=>Object.fromEntries(flagKeys.map(k=>[k,0]));
  const blankBag=()=>Object.fromEntries(C.shop.map(i=>[i.id,0]));
  function random(s){s.rng=(s.rng+0x6D2B79F5)>>>0;let t=s.rng;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;}
  function apply(s,effects){const deltas={};for(const [key,v] of Object.entries(effects)){if(!(key in s.stats))continue;const old=s.stats[key];s.stats[key]=clamp(old+v,key==='time'?65:100);deltas[key]=s.stats[key]-old;}return deltas;}
  function addFlags(s,flags){for(const [key,v] of Object.entries(flags||{}))s.flags[key]=Math.max(0,(s.flags[key]||0)+v);}
  function weighted(s,pool){let total=0;const weights=pool.map(e=>{const w=e.requires?3:e.project?3:1;total+=w;return w;});let r=random(s)*total;for(let i=0;i<pool.length;i++){r-=weights[i];if(r<0)return pool[i];}return pool.at(-1);}
  function selectEvent(s){
    const V=window.MEETING_UNCERTAINTY,finish=()=>V?.prepareRound(s,random);
    if(s.wrapUp===2){s.phase=9;s.eventId=s.flags.debt>=2?'final-debt':s.stats.evidence>=82?'final-reverse':'final-normal';finish();return;}
    const crisis=V?.schedule(s);if(crisis){s.phase=crisis.phase;s.eventId=crisis.id;s.seen.push(crisis.id);finish();return;}
    const academic=window.MEETING_DIALOGUE?.scheduled(s);if(academic){s.phase=academic.phase;s.eventId=academic.id;s.seen.push(academic.id);finish();return;}
    const prepared=window.MEETING_PREPARATION?.scheduledQuestion(s);if(prepared){s.phase=prepared.phase;s.eventId=prepared.id;s.seen.push(prepared.id);finish();return;}
    const mixed=window.MEETING_PUBLICATION?.scheduled(s)||window.MEETING_ROUTE_STORIES?.scheduled(s)||window.MEETING_MIX?.scheduledJoint(s)||window.MEETING_ASSIGNMENTS?.scheduled(s)||window.MEETING_SIDE_STORIES?.scheduled(s)||window.MEETING_WORLD?.scheduled(s);if(mixed){s.phase=mixed.phase;s.eventId=mixed.id;s.seen.push(mixed.id);finish();return;}
    const persona=C.personas.find(p=>p.id===s.persona);
    if((s.wrapUp===1||s.progress>=100)&&(V?.canWrap(s)??true)){s.phase=8;s.wrapUp=1;}
    else if(s.choicesMade===0)s.phase=0;
    else if(s.choicesMade>=3&&random(s)<persona.interrupt&&!s.interrupted){s.phase=[5,6,7][Math.floor(random(s)*3)];s.interrupted=true;}
    else{s.phase=s.progress<18?1:s.progress<34?2:s.progress<50?3:s.progress<66?4:s.progress<76?5:s.progress<88?6:7;s.interrupted=false;}
    const all=C.events.filter(e=>e.phase===s.phase&&(!e.project||(window.MEETING_MIX?.meetingRoutes(s)||[s.project]).includes(e.project))&&(!e.requires||s.flags[e.requires]>0)&&(!e.weekRequires||(s.weekContext?.traits?.[e.weekRequires]||0)>0));
    const fresh=all.filter(e=>!s.seen.includes(e.id)&&!s.recentEvents.includes(e.id));
    const notThisMeeting=all.filter(e=>!s.seen.includes(e.id));
    let pool=fresh.length?fresh:notThisMeeting.length?notThisMeeting:all.filter(e=>e.id!==s.eventId);
    const introduced=s.seen.some(id=>C.events.find(e=>e.id===id)?.project===s.project);
    const introduction=fresh.filter(e=>(window.MEETING_MIX?.meetingRoutes(s)||[s.project]).includes(e.project)&&!e.requires);
    if(s.phase>=1&&s.phase<=3&&!introduced&&introduction.length)pool=introduction;
    const echoes=pool.filter(e=>e.weekRequires);if(echoes.length&&(s.phase===0||random(s)<.65))pool=echoes;
    s.eventId=weighted(s,pool.length?pool:all).id;s.seen.push(s.eventId);finish();
  }
  function create({role='newbie',difficulty='normal',name='小同学',seed=1,project='classic',persona='random',career={},weekContext=null,uncertainty=true,mixProjects=null,mentorId=null,direction=null}={}){
    const faculty=window.MEETING_MENTORS?.find(mentorId);if(faculty)persona=faculty.style;const r=C.roles.find(r=>r.id===role)||C.roles[0],d=difficulties[difficulty]||difficulties.normal,p=C.projects.find(p=>p.id===project)||C.projects[0];
    const growth=Math.min(12,Math.floor((career.experience||0)/60)*3),debt=Math.min(3,Math.max(0,Math.floor(career.debt||0)));
    const s={version:3,role:r.id,difficulty:difficulties[difficulty]?difficulty:'normal',name:String(name).trim().slice(0,12)||'小同学',seed:seed>>>0,rng:seed>>>0,project:p.id,persona:'warm',phase:0,eventId:'',progress:0,wrapUp:0,interrupted:false,seen:[],recentEvents:Array.isArray(career.recentEvents)?career.recentEvents.slice(-35):[],lastRequestRound:-1,meetingNumber:(career.meetings||0)+1,experienceAtStart:career.experience||0,careerApplied:false,stats:{...r.stats,time:d.time},flags:{...blankFlags(),debt,cat:Math.min(1,career.cat||0),robot:Math.min(1,career.robot||0),wander:Math.min(1,career.wander||0)},used:{skill:false,coffee:false,charm:false},bag:{...blankBag(),...career.bag},relations:{boss:50,stats:50,senior:50,...career.relations},log:[],pending:null,ended:false,ending:null,choicesMade:0};
    if(persona==='random'&&weekContext?.group?.members[0]?.mentorStyle)persona=weekContext.group.members[0].mentorStyle;s.persona=C.personas.some(p=>p.id===persona)?persona:C.personas[Math.floor(random(s)*C.personas.length)].id;
    apply(s,{evidence:growth,mood:Math.floor(growth/2)+(career.moodBoost||0),patience:Math.round(((career.reputation??50)-50)/10)-debt*2});
    apply(s,{evidence:career.evidenceBoost||0});apply(s,p.effects);apply(s,C.personas.find(p=>p.id===s.persona).initial);
    if(direction&&!weekContext?.world?.challenge)s.direction=direction;s.mentorId=faculty?.id||null;s.weekContext=weekContext?JSON.parse(JSON.stringify(weekContext)):null;
    if(s.weekContext){apply(s,s.weekContext.deltas);s.flags.debt=Math.min(6,s.flags.debt+s.weekContext.debt);}
    window.MEETING_MIX?.meetingInit(s,{project:s.project,mixProjects},random);window.MEETING_PREPARATION?.meetingInit(s);if(uncertainty)window.MEETING_UNCERTAINTY?.init(s,random,career);window.MEETING_WORLD?.meetingInit(s);window.MEETING_DIALOGUE?.init(s,random);if(s.difficulty==='surprise')apply(s,{patience:-8});selectEvent(s);return s;
  }
  function current(s){const raw=window.MEETING_DIALOGUE?.question(s)||window.MEETING_PUBLICATION?.question(s)||window.MEETING_ROUTE_STORIES?.question(s)||window.MEETING_WORLD?.question(s)||window.MEETING_SIDE_STORIES?.question(s)||window.MEETING_ASSIGNMENTS?.question(s)||window.MEETING_MIX?.jointQuestion(s)||window.MEETING_UNCERTAINTY?.rawEvent(s)||C.events.find(e=>e.id===s.eventId)||C.preparationQuestions?.find(e=>e.id===s.eventId),prepared=window.MEETING_PREPARATION?.event(s,raw)||raw;const directed=window.MEETING_DIRECTION_REVIEW?.context(s,prepared)||prepared;const reviewed=window.MEETING_PROFESSIONAL?.annotate(s,directed)||directed;const banked=window.MEETING_DIRECTION_LIBRARY?.meeting(s,reviewed)||reviewed;const themed=window.MEETING_RESEARCH_AGENDA?.meeting(s,banked)||banked;return window.MEETING_UNCERTAINTY?.decorate(s,themed)||themed;}
  function previewChoice(s,choice){const c=typeof choice==='number'?current(s)?.choices[choice]:choice;if(!c)return null;
    const effects={...c.effects},tax=difficulties[s.difficulty].tax;
    if(tax){effects.patience=(effects.patience||0)-tax;effects.mood=(effects.mood||0)-tax;}
    const plus=(k,v)=>effects[k]=(effects[k]||0)+v;
    if(s.persona==='warm'&&(c.flags.chaos||c.flags.social||c.flags.honest))plus('patience',2);
    if(s.persona==='detail'){if(c.flags.rigor){plus('patience',3);plus('evidence',2);}if(c.flags.chaos)plus('patience',-3);}
    if(s.persona==='story'&&[6,7].includes(current(s).phase))plus('time',-1);
    if(s.persona==='strict'){if(c.flags.honest)plus('patience',2);if(c.flags.chaos)plus('patience',-3);}
    if(s.relations.boss>=70&&c.flags.social)plus('patience',1);
    if(s.relations.stats>=70&&c.flags.rigor)plus('evidence',2);
    return {effects:window.MEETING_UNCERTAINTY?.preview(s,c,effects)||effects,chance:c.risk?clamp(c.risk.chance+(s.persona==='strict'?.08:0),1):0,available:c.prepared?.available!==false,preparation:c.prepared||null};
  }
  function rapport(s,c,reaction){const change={boss:0,stats:0,senior:0};
    if(c.flags.rigor){change.boss++;change.stats+=3;}
    if(c.flags.honest){change.boss++;change.stats+=2;}
    if(c.flags.social){change.boss+=3;change.senior++;}
    if(c.flags.help)change.senior+=5;
    if(c.flags.chaos){change.senior+=2;change.boss-=s.persona==='strict'?3:1;}
    if(window.MEETING_UNCERTAINTY?.active(s))return window.MEETING_UNCERTAINTY.rapport(s,c,change,reaction);
    const actual={};for(const [k,v] of Object.entries(change)){const old=s.relations[k];s.relations[k]=clamp(old+v);actual[k]=s.relations[k]-old;}return actual;
  }
  function weeklyEnding(s,final=false){const w=s.weekContext;if(!w)return null;const t=w.traits,r=w.resources,st=s.stats,f=s.flags;
    if(st.mood<=0&&(t.night||0)>=3)return 'coffee-crash';
    if(st.mood<=0&&r.energy<=25)return 'sleep-mode';
    if(st.patience<=0&&r.stress>=45)return 'silent-room';
    if(st.time<=0&&(t.deadline||0)>=2)return 'deadline-chased';
    if(!final)return null;
    if((t.promise||0)>=3&&f.debt>=3)return 'promise-avalanche';
    if(r.slides<=35&&t.erased&&!t.backup)return 'slide-ghost';
    if(r.energy<=20&&(t.night||0)>=2)return 'sleep-mode';
    if(st.evidence<35&&r.slides<40)return 'empty-stage';
    if(st.evidence<55&&r.notes<50&&f.honest<2)return 'question-lost';
    if((t.folder||0)>=3&&f.rigor>=2)return 'folder-empire';
    if((t.meal||0)>=3&&(f.social>=2||f.chaos>=3))return 'meal-marshal';
    if((t.meme||0)>=2&&f.chaos>=4)return 'emoji-defense';
    if((t.printer||0)>=2&&f.chaos>=2)return 'printer-poet';
    if((t.collaboration||0)>=3&&f.social>=3)return 'chair-election';
    if((t.chaos||0)>=3&&f.chaos>=3)return 'meeting-meme';
    if((t.alarm||0)>=2&&(f.honest>=3||f.social>=3))return 'alarm-author';
    if((t.late||0)>=2&&f.social>=3&&st.time<=10)return 'weekend-portal';
    if((t.pivot||0)>=2&&f.honest>=3)return 'pivot-route';
    if((t.negative||0)>=2&&f.rigor>=3)return 'negative-result';
    if((t.collaboration||0)>=3&&f.help>=2)return 'collaborative-escape';
    if((t.rest||0)>=3&&st.mood>=35)return 'rest-is-progress';
    return null;
  }
  function decideEnding(s){const st=s.stats,f=s.flags;const liveFailure=window.MEETING_UNCERTAINTY?.failureEnding(s,s.wrapUp===2);if(liveFailure)return liveFailure;const opportunity=window.MEETING_ACADEMY?.ending(s)||window.MEETING_PUBLICATION?.ending(s)||window.MEETING_ROUTE_STORIES?.ending(s)||window.MEETING_WORLD?.ending(s)||window.MEETING_CAST?.ending(s)||window.MEETING_ASSIGNMENTS?.ending(s)||window.MEETING_MIX?.ending(s)||window.MEETING_SIDE_STORIES?.ending(s);if(opportunity)return opportunity;const expanded=window.MEETING_EXPANSION?.decideEnding(s);if(expanded)return expanded;
    const campus=window.MEETING_CAMPUS?.decideEnding(s,s.wrapUp===2);if(campus)return campus;
    const weekly=weeklyEnding(s,s.wrapUp===2);if(weekly)return weekly;
    if(st.mood<=0)return 'mood';if(st.patience<=0)return 'patience';if(st.time<=0)return st.evidence>=55&&st.patience>=30?'escape':'overtime';if(s.wrapUp!==2)return null;
    if(s.meetingNumber>=8&&s.experienceAtStart>=150&&f.rigor>=4&&st.evidence>=85&&st.patience>=55&&f.debt<=1)return 'graduation';
    if(f.cat>=2)return 'cat-chair';
    if(s.project==='data'&&f.robot>=2)return 'robot-union';
    if(s.project==='theory'&&f.recursive>=2)return 'recursive';
    if(s.project==='field'&&f.wander>=3)return 'field-legend';
    const discipline=C.disciplineEndings.find(e=>(window.MEETING_MIX?.meetingRoutes(s)||[s.project]).includes(e.project));if(discipline&&f[discipline.flag]>=3)return discipline.id;
    if(s.relations.senior>=80&&f.help>=3)return 'senior-heir';
    if(f.chaos>=5)return 'comedian';if(f.debt>=3)return 'debt';
    if(st.evidence>=85&&st.patience>=65&&st.mood>=35)return 'legend';if(f.social>=4&&st.patience>=75)return 'diplomat';if(f.honest>=4)return 'honest';return 'survivor';
  }
  function terminal(s){const liveFailure=window.MEETING_UNCERTAINTY?.failureEnding(s);if(liveFailure)return liveFailure;if(window.MEETING_UNCERTAINTY?.active(s)&&s.stats.time<=0&&!window.MEETING_UNCERTAINTY.canWrap(s))return 'overtime';return window.MEETING_CAMPUS?.decideEnding(s)||weeklyEnding(s)|| (s.stats.mood<=0?'mood':s.stats.patience<=0?'patience':s.stats.time<=0?decideEnding(s):null);}
  function choose(s,index){if(s.ended||s.pending)return null;const e=current(s),c=e?.choices[index];if(!c||c.prepared?.available===false)return null;
    const preview=previewChoice(s,c),effects={...preview.effects},riskUnlucky=c.risk?random(s)<preview.chance:false;
    if(riskUnlucky)for(const [k,v] of Object.entries(c.risk.effects))effects[k]=(effects[k]||0)+v;
    const reaction=window.MEETING_UNCERTAINTY?.roll(s,e,c,effects,random),unlucky=riskUnlucky||!!reaction?.negative;
    window.MEETING_DIALOGUE?.before(s,e,c,effects);const deltas=apply(s,effects),relations=rapport(s,c,reaction);addFlags(s,c.flags);
    if(e.phase===8)s.wrapUp=2;
    if(e.phase!==8&&e.phase!==9)s.progress=clamp(s.progress+(c.flags.chaos?4:c.flags.social?7:9)+Math.floor(random(s)*5));
    s.choicesMade++;const record={phase:s.phase,eventId:e.id,title:e.title,answer:c.text,result:reaction?(reaction.hardStop?'核对被拒绝，组会当场结束。':e.flaw?'漏洞被点名，下一轮继续追问。':reaction.negative?'这次回应没有接住追问。':reaction.positive?'这次回应接住了现场。':'对方暂时继续听。'):c.result,flavor:reaction?reaction.text+(riskUnlucky?' '+c.risk.flavor:''):riskUnlucky?c.risk.flavor:c.flavor,deltas,relations,unlucky,type:'choice'};if(reaction)record.live=reaction;window.MEETING_DIALOGUE?.after(s,e,c,record);window.MEETING_PREPARATION?.afterAnswer(s,e,c,c.sourceIndex??index,record);window.MEETING_ASSIGNMENTS?.afterAnswer(s,e,record);window.MEETING_SIDE_STORIES?.afterAnswer(s,e,record);window.MEETING_WORLD?.afterAnswer(s,e,c,record);window.MEETING_ROUTE_STORIES?.afterAnswer(s,e,c,record);window.MEETING_PUBLICATION?.afterAnswer(s,e,c,record);window.MEETING_MIX?.afterAnswer(s,e,c,record);window.MEETING_DIRECTION_LIBRARY?.lesson?.(s,e,c,record);window.MEETING_RESEARCH_AGENDA?.lesson(s,e,c,record);s.log.push(record);s.pending=record;s.ending=terminal(s)||(e.phase===9?decideEnding(s):null);if(reaction?.hardStop)s.ending=window.MEETING_UNCERTAINTY?.failureEnding(s)||'patience';return record;
  }
  function advance(s){if(s.ended||!s.pending)return false;if(s.ending){s.ended=true;s.pending=null;return true;}s.pending=null;selectEvent(s);return true;}
  function useItem(s,id){if(s.ended||s.pending)return null;
    const role=C.roles.find(r=>r.id===s.role),standard={skill:{title:role.skill,effects:role.effects,flavor:'你使用了角色专属技能。讲台上的世界，稍微友好了一点。'},coffee:{title:'冰美式续命',effects:{mood:17,time:-1},flavor:'一口冰美式。你的灵魂重新与身体取得联系。'},charm:{title:'师兄的眼神',effects:{patience:15,evidence:s.relations.senior>=70?8:4},flavor:'师兄及时补充了一句，导师终于把笔放下了。'}};
    let item=standard[id],fromBag=false;
    if(item){if(s.used[id])return null;s.used[id]=true;}
    else{const stocked=C.shop.find(i=>i.id===id);if(!stocked||!(s.bag[id]>0))return null;item={title:stocked.name,effects:stocked.effects,flags:stocked.flags,flavor:stocked.flavor};s.bag[id]--;fromBag=true;}
    const deltas=apply(s,item.effects);addFlags(s,item.flags);const record={phase:s.phase,title:item.title,result:item.title,flavor:item.flavor,deltas,type:'item',fromBag,itemId:id};s.log.push(record);
    const end=terminal(s);if(end){s.ending=end;s.pending=record;}return record;
  }
  function requestEnd(s){if(s.ended||s.pending||s.wrapUp||s.choicesMade<5||!(window.MEETING_UNCERTAINTY?.canWrap(s)??true)||s.lastRequestRound===s.choicesMade)return null;s.lastRequestRound=s.choicesMade;
    const accepted=(s.stats.evidence>=60&&s.stats.patience>=40)||s.stats.time<=8,deltas=apply(s,{time:-1,...(accepted?{}:{patience:-4})});
    const record={phase:s.phase,type:'request',title:'申请散会',result:accepted?'导师终于允许你收尾。':'“先把这个问题讲清楚。”',flavor:accepted?'你说出了大家都想说的话：“要不我们先总结一下？”导师看了一眼时间，点头了。':'你试着合上电脑。导师伸出一根手指，表示只是再问一个问题。你应该知道这句话的分量。',deltas};s.log.push(record);s.pending=record;if(accepted)s.wrapUp=1;s.ending=terminal(s);return record;
  }
  function score(s){const base=clamp(Math.round(s.stats.evidence*.45+s.stats.patience*.25+s.stats.mood*.2+Math.min(s.choicesMade,10)));return window.MEETING_UNCERTAINTY?.score(s,base)??base;}
  function upgrade(old){if(!old||![2,3].includes(old.version))return old;
    if(old.version===3){const s=JSON.parse(JSON.stringify(old));s.flags={...blankFlags(),...s.flags};s.weekContext??=null;return s;}
    const s=JSON.parse(JSON.stringify(old));Object.assign(s,{version:3,project:'classic',persona:'warm',experienceAtStart:0,recentEvents:[],bag:blankBag(),relations:{boss:50,stats:50,senior:50}});s.flags={...blankFlags(),...s.flags};return s;
  }
  function isValid(s){return !!s&&s.version===3&&C.roles.some(r=>r.id===s.role)&&C.projects.some(p=>p.id===s.project)&&C.personas.some(p=>p.id===s.persona)&&Object.hasOwn(difficulties,s.difficulty)&&typeof s.name==='string'&&s.name.length<=12&&Number.isInteger(s.phase)&&s.phase>=0&&s.phase<10&&current(s)?.phase===s.phase&&Number.isInteger(s.rng)&&Number.isInteger(s.seed)&&Number.isFinite(s.progress)&&s.progress>=0&&s.progress<=100&&[0,1,2].includes(s.wrapUp)&&Number.isInteger(s.meetingNumber)&&s.meetingNumber>0&&Number.isFinite(s.experienceAtStart)&&s.experienceAtStart>=0&&typeof s.careerApplied==='boolean'&&Array.isArray(s.seen)&&s.seen.length<200&&Array.isArray(s.recentEvents)&&s.stats&&['mood','evidence','patience','time'].every(k=>Number.isFinite(s.stats[k])&&s.stats[k]>=0&&s.stats[k]<=(k==='time'?65:100))&&s.flags&&flagKeys.every(k=>Number.isInteger(s.flags[k])&&s.flags[k]>=0)&&s.used&&['skill','coffee','charm'].every(k=>typeof s.used[k]==='boolean')&&s.bag&&C.shop.every(i=>Number.isInteger(s.bag[i.id])&&s.bag[i.id]>=0)&&s.relations&&['boss','stats','senior'].every(k=>Number.isFinite(s.relations[k])&&s.relations[k]>=0&&s.relations[k]<=100)&&Array.isArray(s.log)&&s.log.length<250&&(s.pending===null||(typeof s.pending==='object'&&typeof s.pending.result==='string'))&&typeof s.ended==='boolean'&&(s.ending===null||C.endings.some(e=>e.id===s.ending))&&(!s.ended||s.ending!==null)&&Number.isInteger(s.choicesMade)&&s.choicesMade>=0&&s.choicesMade<200&&(window.MEETING_UNCERTAINTY?.valid(s)??true)&&(window.MEETING_DIALOGUE?.valid(s)??true);}
  return {create,current,choose,advance,useItem,requestEnd,previewChoice,score,isValid,upgrade,difficulties,blankBag};
})();
