window.MEETING_CAMPUS=(() => {
  'use strict';
  const C=window.MEETING_CONTENT,clamp=x=>Math.max(0,Math.min(100,x)),copy=x=>JSON.parse(JSON.stringify(x));
  const enabled=w=>!!w?.campus&&w.config.campus===true;
  const badge=(g,id)=>{if(!g.badges.includes(id))g.badges.push(id);};
  const freshResearch=(w,n=1)=>({route:w.config.project,title:C.projects.find(p=>p.id===w.config.project).topics[0]+' · 小课题 '+n,style:'steady',progress:0,quality:20,stage:0});
  function init(w,previous){if(!w.config.campus)return;
    const old=previous?.campus;
    const g=w.campus=old?copy(old):{version:1,research:freshResearch(w),completed:[],cards:['summary','sleep'],talents:[],points:0,bonds:{boss:50,stats:50,senior:50,...w.config.relations},stories:{boss:{chapter:0,lastWeek:0,decisions:[]},stats:{chapter:0,lastWeek:0,decisions:[]},senior:{chapter:0,lastWeek:0,decisions:[]}},visits:{},badges:[],wins:0};
    if(g.research.route!==w.config.project){g.research=freshResearch(w,g.completed.length+1);}
    const twistIndex=w.seed%C.weekTwists.length;g.twist=C.weekTwists[twistIndex].id===old?.twist?C.weekTwists[(twistIndex+1)%C.weekTwists.length].id:C.weekTwists[twistIndex].id;
    const possible=C.challenges.filter(c=>c.id!=='recover'||previous?.meeting?.kind==='failure');
    const offset=w.seed%possible.length;g.challengeOptions=[0,2,4].map(i=>possible[(offset+i)%possible.length].id);g.challenge=g.challengeOptions[0];
    g.previousFailure=previous?.meeting?.kind==='failure';g.weekVisits={};g.plan=null;g.deck=[];g.deckLocked=false;g.report=null;g.weekStartProgress=g.research.progress;g.weekTaskDone=0;g.latest=null;
  }
  function setChallenge(w,id){if(!enabled(w)||w.log.length||w.pending||!w.campus.challengeOptions.includes(id))return false;w.campus.challenge=id;return true;}
  function setStyle(w,id){if(!enabled(w)||w.log.length||w.pending||!C.researchStyles.some(s=>s.id===id))return false;w.campus.research.style=id;return true;}
  function dispatch(w,location,rand){if(!enabled(w)||w.status!=='life'||w.pending||w.campus.plan||!C.locations.some(l=>l.id===location))return null;
    const g=w.campus,stories=C.campusEvents.filter(e=>e.location===location&&e.story&&g.stories[e.story.person].chapter===e.story.chapter&&g.bonds[e.story.person]>=e.story.trust&&g.stories[e.story.person].lastWeek!==w.number);
    const normal=C.campusEvents.filter(e=>e.location===location&&!e.story),fresh=normal.filter(e=>!w.seen.includes(e.id));
    const pool=stories.length?stories:fresh.length?fresh:normal;
    const e=pool[Math.floor(rand(w)*pool.length)];g.plan={day:w.day,slot:w.slot,location,original:w.eventId};w.eventId=e.id;w.seen.push(e.id);return e;
  }
  function preview(w,c){const effects={...c.effects};if(!enabled(w))return effects;
    const g=w.campus,location=g.plan?.location,twist=C.weekTwists.find(t=>t.id===g.twist),add=o=>{for(const [k,v] of Object.entries(o||{}))effects[k]=(effects[k]||0)+v;};
    add(twist.byLocation?.[location]);
    if(g.talents.includes('annotation')&&location==='library')add({notes:3});
    if(g.talents.includes('network')&&location==='cafe')add({stress:-4});
    if(g.talents.includes('rehearsal')&&location==='mentor')add({slides:4});
    if(g.talents.includes('sleep')&&location==='home')add({energy:5});
    if(g.talents.includes('wander')&&location==='wander')add({notes:4});
    return effects;
  }
  function previewWork(w,c){if(!enabled(w))return null;const g=w.campus,r=g.research,location=g.plan?.location,twist=C.weekTwists.find(t=>t.id===g.twist);
    const changes={progress:c.work?.progress??(c.traits?.study?2:0),quality:c.work?.quality??(c.traits?.negative?1:0)};
    if(location==='lab'){if(r.style==='steady'){changes.progress-=2;changes.quality+=4;}if(r.style==='sprint'){changes.progress+=4;changes.quality-=3;}changes.progress+=twist.work||0;if(g.talents.includes('focus'))changes.progress+=2;if(g.talents.includes('careful'))changes.quality+=3;}
    if(location==='cafe'&&r.style==='team')changes.progress+=3;
    return changes;
  }
  function afterChoice(w,e,c,record){if(!enabled(w))return;const g=w.campus,r=g.research,location=g.plan?.location,changes=previewWork(w,c);
    const actual={};for(const [k,v] of Object.entries(changes)){const before=r[k];r[k]=clamp(before+v);actual[k]=r[k]-before;}
    if(location){g.visits[location]=(g.visits[location]||0)+1;g.weekVisits[location]=(g.weekVisits[location]||0)+1;}
    for(const k of ['boss','stats','senior'])g.bonds[k]=clamp(g.bonds[k]+(c.career?.[k]||0));
    if(record.taskDone)g.weekTaskDone++;
    const card=c.card&&!record.unlucky?C.workCards.find(a=>a.id===c.card):null;let newCard=false;
    if(card&&!g.cards.includes(card.id)){g.cards.push(card.id);newCard=true;}
    let story=null;if(e.story){const s=g.stories[e.story.person];s.chapter++;s.lastWeek=w.number;s.decisions.push(c.decision);story={person:e.story.person,chapter:s.chapter};if(s.chapter===3)badge(g,'story-'+e.story.person);}
    if(C.locations.every(l=>g.visits[l.id]>0))badge(g,'explorer');
    record.campus={location,work:actual,card:card?.id||null,newCard,story};g.latest=record.campus;
  }
  function nextFragment(w){if(enabled(w))w.campus.plan=null;}
  function toggleCard(w,id){if(!enabled(w)||w.status!=='meeting'||w.campus.deckLocked||!w.campus.cards.includes(id))return false;const g=w.campus;if(g.deck.includes(id)){g.deck=g.deck.filter(x=>x!==id);return true;}if(g.deck.length>=3)return false;g.deck.push(id);return true;}
  function deckBonus(w){const effects={},g=w.campus,combos=[];if(!enabled(w))return {effects,combos};const add=o=>{for(const [k,v] of Object.entries(o))effects[k]=(effects[k]||0)+v;};
    const tags={};for(const id of g.deck){const c=C.workCards.find(c=>c.id===id);add(c.effects);tags[c.tag]=(tags[c.tag]||0)+1;}
    if(tags.rigor>=2){add({evidence:4});combos.push('证据成链 · 底气 +4');}
    if(tags.honest>=2){add({patience:4});combos.push('诚实有边界 · 耐心 +4');}
    if(tags.social>=2){add({mood:4,patience:3});if(g.research.style==='team')add({evidence:3});if(g.talents.includes('connector'))add({patience:3});combos.push('有人一起扛 · 心态 +4 / 耐心 +3');}
    if(tags.comedy>=2){add({mood:5});if(g.talents.includes('comedian'))add({evidence:3});combos.push('名场面预备役 · 心态 +5');}
    if(new Set(g.deck.map(id=>C.workCards.find(c=>c.id===id).tag)).size===3){add({patience:2,mood:3});combos.push('准备各有一手 · 耐心 +2 / 心态 +3');}
    if(g.deck.includes('backup')){const bonus=(g.talents.includes('backup')?4:0)+(C.weekTwists.find(t=>t.id===g.twist).backupBonus||0);if(bonus)add({evidence:bonus});}
    return {effects,combos};
  }
  function context(w,ctx){if(!enabled(w))return ctx;const g=w.campus,b=deckBonus(w),twist=C.weekTwists.find(t=>t.id===g.twist),base={...ctx.deltas};
    const add=o=>{for(const [k,v] of Object.entries(o||{}))ctx.deltas[k]=(ctx.deltas[k]||0)+v;};add(b.effects);add(twist.meeting);
    if(g.talents.includes('patient'))add({patience:3});
    if(g.stories.boss.chapter===3)add({patience:3});if(g.stories.stats.chapter===3)add({evidence:3});if(g.stories.senior.chapter===3)add({mood:4});
    if(g.talents.includes('boundary'))ctx.debt=Math.max(0,ctx.debt-1);
    ctx.campus={baseDeltas:base,deck:[...g.deck],combos:b.combos,twist:twist.id,research:copy(g.research),stories:Object.fromEntries(Object.entries(g.stories).map(([k,s])=>[k,s.chapter])),weekVisits:{...g.weekVisits},ownedCount:g.cards.length,previousFailure:g.previousFailure};return ctx;
  }
  function afterMeeting(w,s){if(!enabled(w))return;const g=w.campus,r=g.research;g.bonds={...s.relations};w.meeting.flags={...s.flags};w.meeting.researchReview=null;
    if(deckBonus(w).combos.length)badge(g,'combo');if(g.previousFailure&&w.meeting.kind!=='failure')badge(g,'comeback');
    const target=[30,65,100][r.stage],quality=[20,35,50][r.stage],evidence=[45,60,70][r.stage];
    if(r.stage<3&&r.progress>=target&&r.quality>=quality&&s.stats.evidence>=evidence&&w.meeting.kind!=='failure'){
      r.stage++;w.meeting.researchReview={passed:true,stage:r.stage};badge(g,r.stage===1?'first-stage':r.stage===2?'sustained':'work-complete');
      if(r.stage===3&&!g.completed.some(p=>p.key===w.id)){g.completed.push({key:w.id,title:r.title,route:r.route,quality:r.quality,week:w.number});}
    }else if(r.stage<3)w.meeting.researchReview={passed:false,progress:target,quality,evidence};
  }
  function checkChallenge(w){const g=w.campus,m=w.meeting,f=m?.flags||{},r=w.resources;if(!m)return false;
    return ({steady:!w.traits.night&&m.kind!=='failure'&&r.energy>=50,rigor:f.rigor>=4&&m.stats.evidence>=75,honest:f.honest>=4&&m.stats.patience>=40,comedy:f.chaos>=4&&m.kind!=='failure',team:(g.weekVisits.cafe||0)>=2&&f.help>=2,repair:g.weekTaskDone>=1&&f.debt<=1,research:g.research.progress-g.weekStartProgress>=20&&g.research.quality>=35,recover:g.previousFailure&&m.kind!=='failure'&&r.stress<50})[g.challenge]===true;
  }
  function settleReport(w){if(!enabled(w)||w.campus.report)return;const g=w.campus,success=checkChallenge(w);g.points++;if(success){g.wins++;badge(g,'challenge');}g.report={success,coins:success?2:0,claimed:false,point:1};}
  function claimReport(w){if(!enabled(w)||w.status!=='report'||!w.campus.report||w.campus.report.claimed)return 0;const r=w.campus.report;r.claimed=true;return r.coins;}
  function buyTalent(w,id){if(!enabled(w)||w.status!=='report'||w.campus.points<1||w.campus.talents.includes(id)||!C.talents.some(t=>t.id===id))return false;w.campus.points--;w.campus.talents.push(id);return true;}
  function restartResearch(w){if(!enabled(w)||w.status!=='report'||w.campus.research.stage!==3)return false;w.campus.research=freshResearch(w,w.campus.completed.length+1);return true;}
  function decideEnding(s,final=false){const w=s.weekContext,c=w?.campus;if(!c)return null;const r=c.research,v=c.weekVisits,f=s.flags,st=s.stats,tags={};for(const id of c.deck){const card=C.workCards.find(a=>a.id===id);tags[card.tag]=(tags[card.tag]||0)+1;}const terminal=st.mood<=0||st.patience<=0||st.time<=0;
    if(st.mood<=0&&w.resources.energy<=25&&w.resources.stress>=70)return 'campus-burnout';
    if(terminal&&c.ownedCount===12&&st.evidence<30)return 'campus-collection';
    if(st.time<=0&&tags.rigor>=2)return 'campus-appendix-time';
    if(!final)return null;
    if(r.progress>=65&&r.quality<=25)return 'campus-fragile';
    if(w.carryTasks.length>=3&&f.debt>=3)return 'campus-backlog';
    if(c.ownedCount===12&&st.evidence<30)return 'campus-collection';
    if(r.stage===2&&r.progress>=100&&r.quality>=50&&st.evidence>=70)return 'campus-work';
    if(c.stories.senior===3&&f.help>=3)return 'campus-senior';
    if(c.stories.stats===3&&f.rigor>=4&&st.evidence>=80)return 'campus-stats';
    if(c.stories.boss===3&&(f.honest>=4||f.social>=3))return 'campus-mentor';
    if(c.previousFailure&&f.honest>=3&&st.evidence>=60&&st.mood>=35)return 'campus-recover';
    if(r.style==='team'&&tags.social>=2&&f.help>=2&&st.evidence>=65)return 'campus-team';
    if(tags.comedy>=2&&f.chaos>=4)return 'campus-meme';
    if(c.deck.includes('cat')&&f.chaos>=2)return 'campus-cat';
    if(tags.rigor===3&&f.rigor>=3&&st.patience>=60)return 'campus-appendix';
    if(r.quality>=85&&r.progress<=50&&f.honest>=3)return 'campus-quality';
    if((v.library||0)>=4&&f.rigor>=4)return 'campus-library';
    if((v.cafe||0)>=3&&f.social>=3)return 'campus-cafe';
    if((v.home||0)>=4&&st.mood>=75&&w.resources.energy>=70)return 'campus-sleep';
    if(r.progress<30&&r.quality>=45&&f.honest>=4)return 'campus-pivot';
    if(Object.keys(tags).length===3&&f.honest>=2&&st.mood>=50&&st.patience>=40)return 'campus-balanced';
    return null;
  }
  function isValid(g){return !!g&&g.version===1&&g.research&&C.projects.some(p=>p.id===g.research.route)&&C.researchStyles.some(s=>s.id===g.research.style)&&['progress','quality'].every(k=>Number.isFinite(g.research[k])&&g.research[k]>=0&&g.research[k]<=100)&&[0,1,2,3].includes(g.research.stage)&&Array.isArray(g.completed)&&Array.isArray(g.cards)&&new Set(g.cards).size===g.cards.length&&g.cards.every(id=>C.workCards.some(c=>c.id===id))&&Array.isArray(g.deck)&&g.deck.length<=3&&new Set(g.deck).size===g.deck.length&&g.deck.every(id=>g.cards.includes(id))&&Array.isArray(g.talents)&&new Set(g.talents).size===g.talents.length&&g.talents.every(id=>C.talents.some(t=>t.id===id))&&Number.isInteger(g.points)&&g.points>=0&&C.weekTwists.some(t=>t.id===g.twist)&&C.challenges.some(c=>c.id===g.challenge)&&g.stories&&['boss','stats','senior'].every(k=>Number.isFinite(g.bonds?.[k])&&g.bonds[k]>=0&&g.bonds[k]<=100&&[0,1,2,3].includes(g.stories[k]?.chapter)&&Array.isArray(g.stories[k]?.decisions))&&Array.isArray(g.badges)&&g.visits&&g.weekVisits;}
  return {enabled,init,setChallenge,setStyle,dispatch,preview,previewWork,afterChoice,nextFragment,toggleCard,deckBonus,context,afterMeeting,settleReport,claimReport,buyTalent,restartResearch,decideEnding,isValid};
})();
