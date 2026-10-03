window.MEETING_WEEK=(() => {
  'use strict';
  const C=window.MEETING_CONTENT,clamp=x=>Math.max(0,Math.min(100,x));
  function random(w){w.rng=(Math.imul(w.rng,1664525)+1013904223)>>>0;return w.rng/4294967296;}
  function select(w){
    const specific=C.lifeEvents.filter(e=>e.day===w.day&&e.slot===w.slot&&e.project===w.config.project);
    const generic=C.lifeEvents.filter(e=>e.day===w.day&&!e.project);
    let pool=specific.length?specific:generic.filter(e=>!w.seen.includes(e.id));if(!pool.length)pool=generic;
    w.eventId=pool[Math.floor(random(w)*pool.length)].id;w.seen.push(w.eventId);
  }
  function create(config,seed=1,previous=null,number=1){
    const tasks=(previous?.tasks||[]).filter(t=>!t.done).map(t=>({...t}));
    const resources=previous?{energy:clamp(Math.round(previous.resources.energy*.45+40)),notes:clamp(Math.round(previous.resources.notes*.35+25)),slides:25,stress:clamp(Math.round(previous.resources.stress*.4+tasks.length*4))}:{energy:75,notes:30,slides:25,stress:20};
    const w={version:1,id:`week-${number}-${seed>>>0}`,number,seed:seed>>>0,rng:seed>>>0,config:{...config},day:0,slot:0,status:'life',resources,traits:{unfinished:tasks.length},tasks,seen:[],log:[],pending:null,eventId:'',meeting:null,reportApplied:false};window.MEETING_CAMPUS?.init(w,previous);window.MEETING_PREPARATION?.init(w,previous);select(w);return w;
  }
  function current(w){return C.lifeEvents.find(e=>e.id===w.eventId)||C.campusEvents?.find(e=>e.id===w.eventId)||C.preparationEvents?.find(e=>e.id===w.eventId);}
  function choose(w,index){if(w.status!=='life'||w.pending)return null;const e=current(w),c=e?.choices[index];if(!c||(window.MEETING_PREPARATION?.enabled(w)&&!window.MEETING_PREPARATION.lifePreview(w,e,index).available))return null;
    const effects=window.MEETING_CAMPUS?.preview(w,c)||c.effects,unlucky=c.risk?random(w)<c.risk.chance:false;
    if(unlucky)for(const [k,v] of Object.entries(c.risk.effects))effects[k]=(effects[k]||0)+v;
    const deltas={};for(const [k,v] of Object.entries(effects)){const old=w.resources[k];w.resources[k]=clamp(old+v);deltas[k]=w.resources[k]-old;}
    for(const [k,v] of Object.entries(c.traits))w.traits[k]=(w.traits[k]||0)+v;
    const task=c.career.taskDone?w.tasks.find(t=>!t.done&&!t.prepKind):null;if(task)task.done=true;
    const record={day:w.day,slot:w.slot,eventId:e.id,title:e.title,answer:c.text,flavor:unlucky?c.risk.flavor:c.flavor,deltas,traits:{...c.traits},career:{...c.career},taskDone:task?.title||null,unlucky};window.MEETING_CAMPUS?.afterChoice(w,e,c,record);window.MEETING_PREPARATION?.afterLife(w,e,index,record);w.log.push(record);w.pending=record;return record;
  }
  function advance(w){if(!w.pending||w.status!=='life')return false;w.pending=null;window.MEETING_CAMPUS?.nextFragment(w);
    if(w.day===4){w.status='meeting';return true;}
    if(w.slot===0){w.slot=1;}else{w.slot=0;w.day++;}
    if(w.day===7){w.day=6;w.status='report';window.MEETING_CAMPUS?.settleReport(w);return true;}select(w);return true;
  }
  function meetingContext(w){const r=w.resources,t=w.traits;
    const ctx={weekId:w.id,number:w.number,resources:{...r},traits:{...t},sourceActions:w.log.map(r=>({day:r.day,answer:r.answer,traits:{...r.traits}})),carryTasks:w.tasks.filter(t=>!t.done).map(t=>t.title),deltas:{mood:Math.round((r.energy-65)*.3-(r.stress-25)*.25),evidence:Math.round((r.notes+r.slides-100)*.18),time:-Math.min(8,(t.late||0)*2)},debt:Math.min(3,Math.floor((t.promise||0)/2)+w.tasks.filter(t=>!t.done).length)};window.MEETING_CAMPUS?.context(w,ctx);return window.MEETING_PREPARATION?.context(w,ctx)||ctx;
  }
  function completeMeeting(w,s){if(s.weekContext?.weekId!==w.id||!s.ended||w.meeting)return false;
    const ending=C.endings.find(e=>e.id===s.ending);w.meeting={seed:s.seed,ending:s.ending,title:ending.title,kind:ending.kind,stats:{...s.stats},rounds:s.choicesMade,score:window.MEETING_ENGINE.score(s)};
    const titles=[];if(s.flags.debt>0)titles.push('兑现组会上答应补充的内容');if(s.stats.evidence<55)titles.push(`重新梳理${C.projects.find(p=>p.id===s.project).topics[2]}`);if(ending.kind==='failure')titles.push('复盘一个卡住的问题，把下周目标缩小');if(!titles.length)titles.push('整理这次反馈，保留下一步最想研究的问题');
    for(const title of titles)if(!w.tasks.some(t=>!t.done&&t.title===title))w.tasks.push({title,done:false,from:w.number});
    window.MEETING_CAMPUS?.afterMeeting(w,s);window.MEETING_PREPARATION?.afterMeeting(w,s);w.resources.energy=clamp(w.resources.energy-15);w.resources.stress=clamp(w.resources.stress+(ending.kind==='failure'?15:5));w.day=5;w.slot=0;w.status='life';w.pending=null;select(w);return true;
  }
  function isValid(w){return !!w&&w.version===1&&typeof w.id==='string'&&Number.isInteger(w.number)&&w.number>0&&Number.isInteger(w.rng)&&C.projects.some(p=>p.id===w.config?.project)&&Number.isInteger(w.day)&&w.day>=0&&w.day<7&&[0,1].includes(w.slot)&&['life','meeting','report'].includes(w.status)&&['energy','notes','slides','stress'].every(k=>Number.isFinite(w.resources?.[k])&&w.resources[k]>=0&&w.resources[k]<=100)&&w.traits&&Object.values(w.traits).every(v=>Number.isInteger(v)&&v>=0)&&Array.isArray(w.tasks)&&Array.isArray(w.log)&&w.log.length<=13&&Array.isArray(w.seen)&&(!w.pending||w.log.at(-1)?.eventId===w.pending.eventId)&&(!w.config.campus||window.MEETING_CAMPUS?.isValid(w.campus))&&(!w.config.preparation||window.MEETING_PREPARATION?.bookValid(w.preparation))&&(w.status!=='life'||current(w)?.day===w.day||(current(w)?.location===w.campus?.plan?.location&&w.campus.plan.day===w.day&&w.campus.plan.slot===w.slot));}
  const dispatch=(w,location)=>window.MEETING_CAMPUS?.dispatch(w,location,random)||null;
  return {create,current,choose,advance,useLocation:dispatch,meetingContext,completeMeeting,isValid};
})();
