/* A week remains a week. Experience limits produce checkpoints, not degrees. */
window.MEETING_TIMELINE=(()=>{
 const modes=[{id:'meeting',name:'一场组会',weeks:0,desc:'直接进入会议室，一场结束后仍可继续。'},{id:'week',name:'一周生活',weeks:1,desc:'准备、周五组会与周末，体验完整的一周。'},{id:'month',name:'一个月',weeks:4,desc:'四个游戏周，观察任务、关系与投稿的变化。'},{id:'year',name:'一年',weeks:52,desc:'经历一个学年，年度报告不等于毕业。'},{id:'full',name:'完整生涯',weeks:null,desc:'硕士约三学年、博士约四学年的游戏时间线，也能继续自由生涯。'}];
 const copy=x=>JSON.parse(JSON.stringify(x)),mode=id=>modes.find(m=>m.id===id)||modes[4];
 function init(w,previous){w.timeline=previous?.timeline?copy(previous.timeline):{version:1,mode:mode(w.config.experienceMode).id,start:w.number,extended:false,checkpoints:[],transitions:[]};}
 function finished(w){const t=w.timeline,m=mode(t?.mode);return !!t&&!t.extended&&m.weeks!==null&&m.weeks>0&&w.status==='report'&&w.number-t.start+1>=m.weeks;}
 function summary(w){const t=w.timeline;return {week:w.number,day:w.day,slot:w.slot,status:w.status,mode:t?.mode||'full',direction:w.world?.artifact.direction||w.config.direction,checks:w.world?.artifact.checks.length||0,accepted:(w.publication?.history||[]).filter(p=>p.status==='accepted').length,pendingTasks:w.tasks.filter(t=>!t.done).length,meetings:w.world?.runCareer?.meetings||0,resources:{...w.resources},graduated:!!w.academy?.term.graduated};}
 function checkpoint(w){if(!w.timeline)init(w);const s=summary(w),last=w.timeline.checkpoints.at(-1);if(!last||JSON.stringify(last)!==JSON.stringify(s))w.timeline.checkpoints.push(s);w.timeline.checkpoints=w.timeline.checkpoints.slice(-24);return s;}
 function barrier(w,wholeWeek=false){
   if(w.config.challenge)return '同局挑战逐段进行，时间跳过未开放。';
   if(w.pending)return '先查看这次选择的后果，再决定时间安排。';
   if(w.status==='meeting'||w.day===4)return '周五组会到了，先处理这场汇报。';
   if(wholeWeek&&w.status!=='report')return '跨周跳过从本周报告开始。';
   if(!wholeWeek&&w.status!=='life')return '当前节点可以结算或继续下一周。';
   if(w.tasks.some(t=>!t.done))return '仍有组会遗留事项，先处理或明确调整安排。';
   if(window.MEETING_ASSIGNMENTS?.offer(w)||w.assignments?.items?.some(t=>['accepted','overdue'].includes(t.status)))return '有临时交办或截止安排，需要亲自回应。';
   const a=w.academy,tick=(w.number-1)*14+w.day*2+w.slot;
   if(w.world?.opportunities?.some(o=>o.status==='reserved'||o.status==='offered'&&o.deadline<=tick+(wholeWeek?14:2)))return '合作机会或已预留安排临近，先查看约定。';
   if(w.world?.queue?.some(q=>!q.done&&q.due<=tick+(wholeWeek?14:2)))return '先前的行动将有后续，停下来查看回信。';
   if(a?.term.milestones.some(m=>!['passed','waived'].includes(m.status)&&m.due<=w.number+(wholeWeek?1:0)))return '阶段检查临近，先处理目标与延期。';
   if(a?.loans.some(l=>l.status==='open'))return '借用仍有交接约定，先安排归还。';
   if(a?.foreshadows.some(f=>f.status==='due'||f.status==='waiting'&&f.due<=w.number+(wholeWeek?1:0)))return '先前的约定即将揭晓。';
   if(a?.resource.active&&(wholeWeek||a.resource.active.status!=='waiting'||a.resource.active.due<=tick+2))return '资源窗口临近，需要亲自核对。';
   const paper=w.publication?.active;if(a?.collab.active||a?.recovery.active||paper&&(!['submitted','resubmitted'].includes(paper.status)||paper.due<=tick+(wholeWeek?14:2))||w.routeStories?.active||w.sideStories?.active)return '课题、合作或修稿有连续安排，先查看进度。';
   if(!wholeWeek&&(w.surprise||a?.plan||w.world?.focus||w.world?.plan||w.campus?.plan||w.taskFocus||w.jointPlan||w.sideStories?.plan))return '当前出现了新事件，先看这一段。';
   if(!wholeWeek&&w.day===0&&w.slot===0&&w.group&&!w.group.news.handled)return '本周经费安排还没处理。';
   return '';
 }
 function transition(w,kind,requested,elapsed,reason){const t={kind,requested,elapsed,reason,week:w.number,day:w.day,slot:w.slot};w.timeline.transitions.push(t);w.timeline.transitions=w.timeline.transitions.slice(-24);return t;}
 function skipDays(w,requested){if(!w.timeline)init(w);const first=barrier(w);if(requested!==undefined&&(!Number.isInteger(requested)||requested<1||requested>3))return null;const wanted=requested??(first?1:1+Math.floor(window.MEETING_WEEK.random(w)*3));let slots=0,reason=first;
   while(!reason&&slots<wanted*2){window.MEETING_WEEK.passTime(w);slots++;reason=barrier(w);}
   return transition(w,'days',wanted,slots/2,reason||'平静的片段已过去，回到当前事件。');
 }
 function skipWeeks(w,requested){if(!w.timeline)init(w);const W=window.MEETING_WEEK,first=barrier(w,true);if(requested!==undefined&&(!Number.isInteger(requested)||requested<1||requested>3))return null;const wanted=requested??(first?1:1+Math.floor(W.random(w)*3));let current=w,elapsed=0,reason=first;
   while(!reason&&elapsed<wanted&&!finished(current)){
     const n=current.number+1,root=current.world?.root||current.seed;
     const next=W.create(current.config,window.MEETING_WORLD?.derive(root,n)||root+n,current,n);
     current=next;
     // The fixed income/expense was already applied by create. No discretionary funding choice is made.
     if(next.group&&next.group.balance>=15)next.group.news.handled=true;
     reason=barrier(next)||((next.academy?.news.length||next.group?.promotionNews.length||next.surprise)?'新的一周有新消息，停在这里。':'');
     const tick=(next.number-1)*14;
     if(!reason&&next.assignments?.offers.some(o=>!o.handled&&o.at<tick+14))reason='这一周有临时交办，停在周初等你安排。';
     if(!reason&&next.academy?.resource.active?.due<tick+14)reason='这一周资源窗口将开放，停在周初等你安排。';
     if(!reason&&next.publication?.active?.due<tick+14)reason='这一周可能收到审稿回信，停在周初。';
     // A quiet week is explicitly omitted: no answers, records, scores or endings are fabricated.
     if(!reason){elapsed++;next.status='report';next.day=6;next.slot=1;next.surprise=null;next.timeline.omittedWeeks=(next.timeline.omittedWeeks||0)+1;}
   }
   const t=transition(current,'weeks',wanted,elapsed,reason||(finished(current)?'已到所选体验节点。':'常规周历已略过；这一段没有新增组会评分或研究回执。'));
   return {week:current,transition:t};
 }
 function valid(w){const t=w.timeline;return !t||(t.version===1&&modes.some(m=>m.id===t.mode)&&Number.isInteger(t.start)&&t.start>0&&t.start<=w.number&&typeof t.extended==='boolean'&&Array.isArray(t.checkpoints)&&t.checkpoints.length<=24&&Array.isArray(t.transitions)&&t.transitions.length<=24&&t.checkpoints.every(s=>Number.isInteger(s.week)&&s.week>=t.start&&s.week<=w.number&&Number.isInteger(s.day)&&s.day>=0&&s.day<7)&&t.transitions.every(s=>['days','weeks'].includes(s.kind)&&Number.isInteger(s.requested)&&s.requested>=1&&s.requested<=3&&Number.isFinite(s.elapsed)&&s.elapsed>=0&&s.elapsed<=s.requested));}
 return {modes,mode,init,finished,summary,checkpoint,barrier,skipDays,skipWeeks,valid};
})();
