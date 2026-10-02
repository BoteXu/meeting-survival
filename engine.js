window.MEETING_ENGINE = (() => {
  'use strict';
  const C=window.MEETING_CONTENT;
  const difficulties={normal:{name:'正常组会',time:39,tax:0},friday:{name:'周五晚八点',time:35,tax:1},surprise:{name:'大佬突袭',time:31,tax:2}};
  const flagKeys=['chaos','rigor','honest','social','help','debt','cat','robot','recursive','wander','shift','quantum','material','market','footnote','client'];
  const clamp=(x,max=100)=>Math.max(0,Math.min(max,x));
  const blankFlags=()=>Object.fromEntries(flagKeys.map(k=>[k,0]));
  const blankBag=()=>Object.fromEntries(C.shop.map(i=>[i.id,0]));
  function random(s){s.rng=(s.rng+0x6D2B79F5)>>>0;let t=s.rng;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;}
  function apply(s,effects){const deltas={};for(const [key,v] of Object.entries(effects)){if(!(key in s.stats))continue;const old=s.stats[key];s.stats[key]=clamp(old+v,key==='time'?65:100);deltas[key]=s.stats[key]-old;}return deltas;}
  function addFlags(s,flags){for(const [key,v] of Object.entries(flags||{}))s.flags[key]=Math.max(0,(s.flags[key]||0)+v);}
  function weighted(s,pool){let total=0;const weights=pool.map(e=>{const w=e.requires?3:e.project?3:1;total+=w;return w;});let r=random(s)*total;for(let i=0;i<pool.length;i++){r-=weights[i];if(r<0)return pool[i];}return pool.at(-1);}
  function selectEvent(s){
    if(s.wrapUp===2){s.phase=9;s.eventId=s.flags.debt>=2?'final-debt':s.stats.evidence>=82?'final-reverse':'final-normal';return;}
    const persona=C.personas.find(p=>p.id===s.persona);
    if(s.wrapUp===1||s.progress>=100){s.phase=8;s.wrapUp=1;}
    else if(s.choicesMade===0)s.phase=0;
    else if(s.choicesMade>=3&&random(s)<persona.interrupt&&!s.interrupted){s.phase=[5,6,7][Math.floor(random(s)*3)];s.interrupted=true;}
    else{s.phase=s.progress<18?1:s.progress<34?2:s.progress<50?3:s.progress<66?4:s.progress<76?5:s.progress<88?6:7;s.interrupted=false;}
    const all=C.events.filter(e=>e.phase===s.phase&&(!e.project||e.project===s.project)&&(!e.requires||s.flags[e.requires]>0));
    const fresh=all.filter(e=>!s.seen.includes(e.id)&&!s.recentEvents.includes(e.id));
    const notThisMeeting=all.filter(e=>!s.seen.includes(e.id));
    let pool=fresh.length?fresh:notThisMeeting.length?notThisMeeting:all.filter(e=>e.id!==s.eventId);
    const introduced=s.seen.some(id=>C.events.find(e=>e.id===id)?.project===s.project);
    const introduction=fresh.filter(e=>e.project===s.project&&!e.requires);
    if(s.phase>=1&&s.phase<=3&&!introduced&&introduction.length)pool=introduction;
    s.eventId=weighted(s,pool.length?pool:all).id;s.seen.push(s.eventId);
  }
  function create({role='newbie',difficulty='normal',name='小同学',seed=1,project='classic',persona='random',career={}}={}){
    const r=C.roles.find(r=>r.id===role)||C.roles[0],d=difficulties[difficulty]||difficulties.normal,p=C.projects.find(p=>p.id===project)||C.projects[0];
    const growth=Math.min(12,Math.floor((career.experience||0)/60)*3),debt=Math.min(3,Math.max(0,Math.floor(career.debt||0)));
    const s={version:3,role:r.id,difficulty:difficulties[difficulty]?difficulty:'normal',name:String(name).trim().slice(0,12)||'小同学',seed:seed>>>0,rng:seed>>>0,project:p.id,persona:'warm',phase:0,eventId:'',progress:0,wrapUp:0,interrupted:false,seen:[],recentEvents:Array.isArray(career.recentEvents)?career.recentEvents.slice(-35):[],lastRequestRound:-1,meetingNumber:(career.meetings||0)+1,experienceAtStart:career.experience||0,careerApplied:false,stats:{...r.stats,time:d.time},flags:{...blankFlags(),debt,cat:Math.min(1,career.cat||0),robot:Math.min(1,career.robot||0),wander:Math.min(1,career.wander||0)},used:{skill:false,coffee:false,charm:false},bag:{...blankBag(),...career.bag},relations:{boss:50,stats:50,senior:50,...career.relations},log:[],pending:null,ended:false,ending:null,choicesMade:0};
    s.persona=C.personas.some(p=>p.id===persona)?persona:C.personas[Math.floor(random(s)*C.personas.length)].id;
    apply(s,{evidence:growth,mood:Math.floor(growth/2)+(career.moodBoost||0),patience:Math.round(((career.reputation??50)-50)/10)-debt*2});
    apply(s,{evidence:career.evidenceBoost||0});apply(s,p.effects);apply(s,C.personas.find(p=>p.id===s.persona).initial);
    if(s.difficulty==='surprise')apply(s,{patience:-8});selectEvent(s);return s;
  }
  function current(s){return C.events.find(e=>e.id===s.eventId);}
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
    return {effects,chance:c.risk?clamp(c.risk.chance+(s.persona==='strict'?.08:0),1):0};
  }
  function rapport(s,c){const change={boss:0,stats:0,senior:0};
    if(c.flags.rigor){change.boss++;change.stats+=3;}
    if(c.flags.honest){change.boss++;change.stats+=2;}
    if(c.flags.social){change.boss+=3;change.senior++;}
    if(c.flags.help)change.senior+=5;
    if(c.flags.chaos){change.senior+=2;change.boss-=s.persona==='strict'?3:1;}
    const actual={};for(const [k,v] of Object.entries(change)){const old=s.relations[k];s.relations[k]=clamp(old+v);actual[k]=s.relations[k]-old;}return actual;
  }
  function decideEnding(s){const st=s.stats,f=s.flags;
    if(st.mood<=0)return 'mood';if(st.patience<=0)return 'patience';if(st.time<=0)return st.evidence>=55&&st.patience>=30?'escape':'overtime';if(s.wrapUp!==2)return null;
    if(s.meetingNumber>=8&&s.experienceAtStart>=150&&f.rigor>=4&&st.evidence>=85&&st.patience>=55&&f.debt<=1)return 'graduation';
    if(f.cat>=2)return 'cat-chair';
    if(s.project==='data'&&f.robot>=2)return 'robot-union';
    if(s.project==='theory'&&f.recursive>=2)return 'recursive';
    if(s.project==='field'&&f.wander>=3)return 'field-legend';
    const discipline=C.disciplineEndings.find(e=>e.project===s.project);if(discipline&&f[discipline.flag]>=3)return discipline.id;
    if(s.relations.senior>=80&&f.help>=3)return 'senior-heir';
    if(f.chaos>=5)return 'comedian';if(f.debt>=3)return 'debt';
    if(st.evidence>=85&&st.patience>=65&&st.mood>=35)return 'legend';if(f.social>=4&&st.patience>=75)return 'diplomat';if(f.honest>=4)return 'honest';return 'survivor';
  }
  function terminal(s){return s.stats.mood<=0?'mood':s.stats.patience<=0?'patience':s.stats.time<=0?decideEnding(s):null;}
  function choose(s,index){if(s.ended||s.pending)return null;const e=current(s),c=e?.choices[index];if(!c)return null;
    const preview=previewChoice(s,c),effects={...preview.effects},unlucky=c.risk?random(s)<preview.chance:false;
    if(unlucky)for(const [k,v] of Object.entries(c.risk.effects))effects[k]=(effects[k]||0)+v;
    const deltas=apply(s,effects),relations=rapport(s,c);addFlags(s,c.flags);
    if(e.phase===8)s.wrapUp=2;
    if(e.phase!==8&&e.phase!==9)s.progress=clamp(s.progress+(c.flags.chaos?4:c.flags.social?7:9)+Math.floor(random(s)*5));
    s.choicesMade++;const record={phase:s.phase,eventId:e.id,title:e.title,answer:c.text,result:c.result,flavor:unlucky?c.risk.flavor:c.flavor,deltas,relations,unlucky,type:'choice'};s.log.push(record);s.pending=record;s.ending=terminal(s)||(e.phase===9?decideEnding(s):null);return record;
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
  function requestEnd(s){if(s.ended||s.pending||s.wrapUp||s.choicesMade<5||s.lastRequestRound===s.choicesMade)return null;s.lastRequestRound=s.choicesMade;
    const accepted=(s.stats.evidence>=60&&s.stats.patience>=40)||s.stats.time<=8,deltas=apply(s,{time:-1,...(accepted?{}:{patience:-4})});
    const record={phase:s.phase,type:'request',title:'申请散会',result:accepted?'导师终于允许你收尾。':'“先把这个问题讲清楚。”',flavor:accepted?'你说出了大家都想说的话：“要不我们先总结一下？”导师看了一眼时间，点头了。':'你试着合上电脑。导师伸出一根手指，表示只是再问一个问题。你应该知道这句话的分量。',deltas};s.log.push(record);s.pending=record;if(accepted)s.wrapUp=1;s.ending=terminal(s);return record;
  }
  function score(s){return clamp(Math.round(s.stats.evidence*.45+s.stats.patience*.25+s.stats.mood*.2+Math.min(s.choicesMade,10)));}
  function upgrade(old){if(!old||![2,3].includes(old.version))return old;
    if(old.version===3)return old;
    const s=JSON.parse(JSON.stringify(old));Object.assign(s,{version:3,project:'classic',persona:'warm',experienceAtStart:0,recentEvents:[],bag:blankBag(),relations:{boss:50,stats:50,senior:50}});s.flags={...blankFlags(),...s.flags};return s;
  }
  function isValid(s){return !!s&&s.version===3&&C.roles.some(r=>r.id===s.role)&&C.projects.some(p=>p.id===s.project)&&C.personas.some(p=>p.id===s.persona)&&Object.hasOwn(difficulties,s.difficulty)&&typeof s.name==='string'&&s.name.length<=12&&Number.isInteger(s.phase)&&s.phase>=0&&s.phase<10&&current(s)?.phase===s.phase&&Number.isInteger(s.rng)&&Number.isInteger(s.seed)&&Number.isFinite(s.progress)&&s.progress>=0&&s.progress<=100&&[0,1,2].includes(s.wrapUp)&&Number.isInteger(s.meetingNumber)&&s.meetingNumber>0&&Number.isFinite(s.experienceAtStart)&&s.experienceAtStart>=0&&typeof s.careerApplied==='boolean'&&Array.isArray(s.seen)&&s.seen.length<200&&Array.isArray(s.recentEvents)&&s.stats&&['mood','evidence','patience','time'].every(k=>Number.isFinite(s.stats[k])&&s.stats[k]>=0&&s.stats[k]<=(k==='time'?65:100))&&s.flags&&flagKeys.every(k=>Number.isInteger(s.flags[k])&&s.flags[k]>=0)&&s.used&&['skill','coffee','charm'].every(k=>typeof s.used[k]==='boolean')&&s.bag&&C.shop.every(i=>Number.isInteger(s.bag[i.id])&&s.bag[i.id]>=0)&&s.relations&&['boss','stats','senior'].every(k=>Number.isFinite(s.relations[k])&&s.relations[k]>=0&&s.relations[k]<=100)&&Array.isArray(s.log)&&s.log.length<250&&(s.pending===null||(typeof s.pending==='object'&&typeof s.pending.result==='string'))&&typeof s.ended==='boolean'&&(s.ending===null||C.endings.some(e=>e.id===s.ending))&&(!s.ended||s.ending!==null)&&Number.isInteger(s.choicesMade)&&s.choicesMade>=0&&s.choicesMade<200;}
  return {create,current,choose,advance,useItem,requestEnd,previewChoice,score,isValid,upgrade,difficulties,blankBag};
})();
