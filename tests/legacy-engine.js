window.MEETING_ENGINE = (() => {
  'use strict';
  const C = window.MEETING_CONTENT;
  const difficulties = {
    normal:{name:'正常组会',time:39,tax:0},
    friday:{name:'周五晚八点',time:35,tax:1},
    surprise:{name:'大佬突袭',time:31,tax:2}
  };
  const clamp = (x,max=100) => Math.max(0,Math.min(max,x));
  function random(state){state.rng=(state.rng+0x6D2B79F5)>>>0;let t=state.rng;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;}
  function apply(state,effects){const deltas={};for(const [key,value] of Object.entries(effects)){if(!(key in state.stats))continue;const old=state.stats[key];state.stats[key]=clamp(old+value,key==='time'?65:100);deltas[key]=state.stats[key]-old;}return deltas;}
  function selectEvent(state){
    if(state.wrapUp===2){state.phase=9;state.eventId=state.flags.debt>=2?'final-debt':state.stats.evidence>=82?'final-reverse':'final-normal';return;}
    if(state.wrapUp===1||state.progress>=100){state.phase=8;state.wrapUp=1;}
    else if(state.choicesMade===0){state.phase=0;}
    else if(state.choicesMade>=3&&random(state)<.23&&!state.interrupted){state.phase=[5,6,7][Math.floor(random(state)*3)];state.interrupted=true;}
    else {state.phase=state.progress<18?1:state.progress<34?2:state.progress<50?3:state.progress<66?4:state.progress<76?5:state.progress<88?6:7;state.interrupted=false;}
    const all=C.events.filter(e=>e.phase===state.phase);
    const fresh=all.filter(e=>!state.seen.includes(e.id));
    const pool=fresh.length?fresh:all.filter(e=>e.id!==state.eventId);
    state.eventId=pool[Math.floor(random(state)*pool.length)].id;
    state.seen.push(state.eventId);
  }
  function create({role='newbie',difficulty='normal',name='小同学',seed=1,career={}}={}){
    const chosen=C.roles.find(r=>r.id===role)||C.roles[0];
    const diff=difficulties[difficulty]||difficulties.normal;
    const growth=Math.min(12,Math.floor((career.experience||0)/60)*3);
    const debt=Math.min(3,Math.max(0,Math.floor(career.debt||0)));
    const state={version:2,role:chosen.id,difficulty:difficulties[difficulty]?difficulty:'normal',name:String(name).trim().slice(0,12)||'小同学',seed:seed>>>0,rng:seed>>>0,phase:0,eventId:'',progress:0,wrapUp:0,interrupted:false,seen:[],lastRequestRound:-1,meetingNumber:(career.meetings||0)+1,careerApplied:false,stats:{...chosen.stats,time:diff.time},flags:{chaos:0,rigor:0,honest:0,social:0,help:0,debt},used:{skill:false,coffee:false,charm:false},log:[],pending:null,ended:false,ending:null,choicesMade:0};
    apply(state,{evidence:growth,mood:Math.floor(growth/2),patience:Math.round(((career.reputation??50)-50)/10)-debt*2});
    if(state.difficulty==='surprise')apply(state,{patience:-8});
    selectEvent(state);return state;
  }
  function current(state){return C.events.find(e=>e.id===state.eventId);}
  function decideEnding(state){
    const s=state.stats,f=state.flags;
    if(s.mood<=0)return 'mood';
    if(s.patience<=0)return 'patience';
    if(s.time<=0)return s.evidence>=55&&s.patience>=30?'escape':'overtime';
    if(state.wrapUp!==2)return null;
    if(f.chaos>=5)return 'comedian';
    if(f.debt>=3)return 'debt';
    if(s.evidence>=85&&s.patience>=65&&s.mood>=35)return 'legend';
    if(f.social>=4&&s.patience>=75)return 'diplomat';
    if(f.honest>=4)return 'honest';
    return 'survivor';
  }
  function choose(state,index){
    if(state.ended||state.pending)return null;
    const e=current(state),c=e?.choices[index];if(!c)return null;
    const effects={...c.effects},tax=difficulties[state.difficulty].tax;
    if(tax){effects.patience=(effects.patience||0)-tax;effects.mood=(effects.mood||0)-tax;}
    const unlucky=c.risk?random(state)<c.risk.chance:false;
    if(unlucky)for(const [k,v] of Object.entries(c.risk.effects))effects[k]=(effects[k]||0)+v;
    const deltas=apply(state,effects);
    for(const [k,v] of Object.entries(c.flags))state.flags[k]=(state.flags[k]||0)+v;
    if(e.phase===8)state.wrapUp=2;
    if(e.phase!==8&&e.phase!==9){
      // 整活和绕路也能推进，只是更容易被追问。回合数由玩家路线与随机插话决定。
      const movement=(c.flags.chaos?4:c.flags.social?7:9)+Math.floor(random(state)*5);
      state.progress=clamp(state.progress+movement);
    }
    state.choicesMade++;
    const record={phase:state.phase,eventId:e.id,title:e.title,answer:c.text,result:c.result,flavor:unlucky?c.risk.flavor:c.flavor,deltas,unlucky,type:'choice'};
    state.log.push(record);state.pending=record;
    state.ending=state.stats.mood<=0?'mood':state.stats.patience<=0?'patience':state.stats.time<=0?decideEnding(state):e.phase===9?decideEnding(state):null;
    return record;
  }
  function advance(state){
    if(state.ended||!state.pending)return false;
    if(state.ending){state.ended=true;state.pending=null;return true;}
    state.pending=null;selectEvent(state);return true;
  }
  function useItem(state,id){
    if(state.ended||state.pending||state.used[id]===undefined||state.used[id])return null;
    const role=C.roles.find(r=>r.id===state.role);
    const items={skill:{title:role.skill,effects:role.effects,flavor:'你使用了角色专属技能。讲台上的世界，稍微友好了一点。'},coffee:{title:'冰美式续命',effects:{mood:17,time:-1},flavor:'一口冰美式。你的灵魂重新与身体取得联系。'},charm:{title:'师兄的眼神',effects:{patience:15,evidence:4},flavor:'师兄及时补充了一句，导师终于把笔放下了。'}};
    const item=items[id];if(!item)return null;
    state.used[id]=true;const deltas=apply(state,item.effects);
    const record={phase:state.phase,title:item.title,result:item.title,flavor:item.flavor,deltas,type:'item'};state.log.push(record);
    // 道具不推进回合。若在最后一分钟喝咖啡，先结算时间耗尽。
    const terminal=state.stats.mood<=0?'mood':state.stats.patience<=0?'patience':state.stats.time<=0?(state.stats.evidence>=55&&state.stats.patience>=30?'escape':'overtime'):null;
    if(terminal){state.ending=terminal;state.pending=record;}
    return record;
  }
  function requestEnd(state){
    if(state.ended||state.pending||state.wrapUp||state.choicesMade<5||state.lastRequestRound===state.choicesMade)return null;
    state.lastRequestRound=state.choicesMade;
    const accepted=(state.stats.evidence>=60&&state.stats.patience>=40)||state.stats.time<=8;
    const deltas=apply(state,{time:-1,...(accepted?{}:{patience:-4})});
    const record={phase:state.phase,type:'request',title:'申请散会',result:accepted?'导师终于允许你收尾。':'“先把这个问题讲清楚。”',flavor:accepted?'你说出了大家都想说的话：“要不我们先总结一下？”导师看了一眼时间，点头了。':'你试着合上电脑。导师伸出一根手指，表示只是再问一个问题。你应该知道这句话的分量。',deltas};
    state.log.push(record);state.pending=record;if(accepted)state.wrapUp=1;
    if(state.stats.time<=0)state.ending=decideEnding(state);
    if(state.stats.patience<=0)state.ending='patience';
    return record;
  }
  function score(state){return clamp(Math.round(state.stats.evidence*.45+state.stats.patience*.25+state.stats.mood*.2+Math.min(state.choicesMade,10)));}
  function isValid(state){
    return !!state&&state.version===2&&C.roles.some(r=>r.id===state.role)&&Object.hasOwn(difficulties,state.difficulty)&&typeof state.name==='string'&&state.name.length<=12&&Number.isInteger(state.phase)&&state.phase>=0&&state.phase<10&&current(state)?.phase===state.phase&&Number.isInteger(state.rng)&&Number.isInteger(state.seed)&&Number.isFinite(state.progress)&&state.progress>=0&&state.progress<=100&&[0,1,2].includes(state.wrapUp)&&Number.isInteger(state.meetingNumber)&&state.meetingNumber>0&&typeof state.careerApplied==='boolean'&&Array.isArray(state.seen)&&state.seen.length<200&&state.stats&&['mood','evidence','patience','time'].every(k=>Number.isFinite(state.stats[k])&&state.stats[k]>=0&&state.stats[k]<=(k==='time'?65:100))&&state.flags&&['chaos','rigor','honest','social','help','debt'].every(k=>Number.isInteger(state.flags[k])&&state.flags[k]>=0)&&state.used&&['skill','coffee','charm'].every(k=>typeof state.used[k]==='boolean')&&Array.isArray(state.log)&&state.log.length<250&&(state.pending===null||(typeof state.pending==='object'&&typeof state.pending.result==='string'))&&typeof state.ended==='boolean'&&(state.ending===null||C.endings.some(e=>e.id===state.ending))&&(!state.ended||state.ending!==null)&&Number.isInteger(state.choicesMade)&&state.choicesMade>=0&&state.choicesMade<200;
  }
  return {create,current,choose,advance,useItem,requestEnd,score,isValid,difficulties};
})();
