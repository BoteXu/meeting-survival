/* The weekly calendar continues between scheduled meetings. Legacy saves keep weekly meetings. */
window.MEETING_WEEK_RHYTHM=(()=>{
 const N=window.MEETING_NARRATIVE_WORLD,P=N?.pair||((z)=>z),E=N?.english||((z)=>z);
 const options=[{id:2,label:P('每两周一次 · 日常更从容','Every two weeks · more room for daily life')},{id:1,label:P('每周一次 · 原有节奏','Weekly · original pace')},{id:4,label:P('每四周一次 · 长线研究','Every four weeks · longer research arcs')}];
 function interval(w){return w.config.challenge?1:options.some(o=>o.id===w.config.meetingEvery)?w.config.meetingEvery:1;}
 function start(w){return w.config.meetingStartWeek??1;}
 function due(w){return (w.number-start(w)+1)%interval(w)===0;}
 function next(w){const n=interval(w),elapsed=w.number-start(w)+1;return w.number+(w.meeting?n:(n-elapsed%n)%n);}
 function slots(w){if(w.status!=='life'||w.meeting)return 0;const offset=due(w)?9:14*(next(w)-w.number)+9;return Math.max(0,offset-w.day*2-w.slot-(w.pending?1:0));}
 function describe(w){if(window.MEETING_DAILY_TIME?.enabled(w)){const P=window.MEETING_NARRATIVE_WORLD.pair;if(w.meeting)return P('本周组会已结束 · 下一场第 '+next(w)+' 周周五 14:00',()=>`Meeting over · next Friday at 14:00 in week ${next(w)}`);if(w.status==='meeting')return P('组会时间到了 · 周五 14:00','Meeting time · Friday 14:00');return P((due(w)?'本周周五 14:00 组会':'下一场第 '+next(w)+' 周周五 14:00')+' · '+window.MEETING_DAILY_TIME.label(w)+' · 活动按耗时推进',()=>`${due(w)?'Meeting this Friday at 14:00':'Next meeting: Friday 14:00, week '+next(w)} · ${window.MEETING_DAILY_TIME.label(w)} · Activities advance by duration`);}if(w.meeting)return P('本周组会已结束 · 下一场第 '+next(w)+' 周周五',()=>`This week's meeting is over · next on Friday of week ${next(w)}`);if(w.status==='meeting')return P('本周周五组会 · 可以进入会议室','Friday meeting this week · ready to enter the meeting room');if(w.status==='report')return P('本周没有组会 · 下一场第 '+next(w)+' 周周五',()=>`No meeting this week · next on Friday of week ${next(w)}`);return due(w)?P('本周周五组会 · 入场前还有 '+slots(w)+' 个生活时段',()=>`Friday meeting this week · ${slots(w)} daily slots before entry`):P('本周不排组会 · 下一场第 '+next(w)+' 周周五 · 还有 '+slots(w)+' 个生活时段',()=>`No meeting this week · next on Friday of week ${next(w)} · ${slots(w)} daily slots remaining`);}
 function valid(w){const c=w.config;return (c.meetingEvery===undefined||options.some(o=>o.id===c.meetingEvery))&&(c.meetingStartWeek===undefined||Number.isInteger(c.meetingStartWeek)&&c.meetingStartWeek>0&&c.meetingStartWeek<=w.number);}
 function config(c,previous,number){if(c.challenge)return c;if(!options.some(o=>o.id===c.meetingEvery))return c;return {...c,meetingStartWeek:previous?.config?.meetingStartWeek??c.meetingStartWeek??number};}
 return {options,interval,due,pending:w=>due(w)&&!w.meeting,next,slots,describe,valid,config};
})();
