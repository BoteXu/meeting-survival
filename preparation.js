window.MEETING_PREPARATION=(() => {
  'use strict';
  const C=window.MEETING_CONTENT,copy=x=>JSON.parse(JSON.stringify(x));
  const kinds=['literature','method','record','boundary','rehearsal'];
  const names={literature:'背景与文献',method:'方法与依据',record:'结果与原始材料',boundary:'结论边界',rehearsal:'表达与预演'};
  const icons={literature:'📖',method:'🔧',record:'🗒️',boundary:'🔍',rehearsal:'🎤'};
  const topic=(route,kind)=>{const p=C.projects.find(p=>p.id===route);return ({literature:p.topics[0],method:p.topics[1],record:p.topics[2],boundary:p.topics[2]+'的解释边界',rehearsal:'三句话讲清'+p.topics[0]})[kind];};
  const recipes={};const add=(id,index,skills)=>recipes[id+':'+index]=skills;
  const rows={
    'life-0':[{literature:1},null,null], 'life-1':[null,{method:1},null], 'life-2':[{literature:1},null,null],
    'life-3':[{literature:1},{literature:1},null], 'life-4':[{method:1,boundary:1},{method:1},null], 'life-5':[{boundary:1},null,null],
    'life-6':[{record:1,boundary:1},{boundary:1},null], 'life-8':[{rehearsal:1},null,null],
    'life-9':[{rehearsal:1},{boundary:1},null], 'life-10':[{rehearsal:2},{boundary:1},null],
    'life-12':[null,{boundary:1},null], 'life-13':[null,{rehearsal:1},null], 'life-14':[null,{boundary:2},null],
    'life-15':[null,{boundary:1},null], 'life-16':[{record:1},{boundary:1},null], 'life-17':[null,{literature:1},null],
    'life-18':[{record:1},null,null], 'life-19':[null,{literature:1},null], 'life-20':[null,{method:1},null],
    'campus-0':[{literature:2,boundary:1},{literature:2},null], 'campus-1':[{literature:1,method:1},{literature:1,boundary:1},null],
    'campus-2':[{literature:2},{literature:1},null], 'campus-3':[{literature:1},{literature:1,rehearsal:1},{literature:2}],
    'campus-4':[{method:2,record:1},{record:1},{method:1}], 'campus-5':[{record:2,boundary:2},{method:1},null],
    'campus-6':[{method:1,record:1},{record:1},null], 'campus-7':[{boundary:1,method:1},{record:1},null],
    'campus-8':[{method:1},null,null], 'campus-9':[null,{boundary:1},null], 'campus-10':[{rehearsal:1},{method:1},null],
    'campus-11':[{rehearsal:1},null,null], 'campus-12':[{rehearsal:2},{method:1,boundary:1},null],
    'campus-13':[{literature:1,rehearsal:1},{boundary:1},null], 'campus-14':[{rehearsal:1},{rehearsal:2},null],
    'campus-15':[{boundary:1,rehearsal:1},{record:1},null], 'campus-16':[null,null,{record:1}],
    'campus-18':[null,{rehearsal:1},null], 'campus-20':[null,{boundary:1},null],
    'campus-21':[{literature:1},null,null], 'campus-22':[{record:1},null,null], 'campus-23':[{rehearsal:1},null,null],
    'story-boss-0':[{literature:1},{method:1},null], 'story-boss-1':[{boundary:1},{boundary:1},null], 'story-boss-2':[{rehearsal:1},{rehearsal:1},null],
    'story-stats-0':[{method:1,boundary:1},{method:1},null], 'story-stats-1':[{record:1,boundary:1},{record:1},null], 'story-stats-2':[{method:1,record:1,boundary:1},{method:1},null],
    'story-senior-0':[null,null,null], 'story-senior-1':[{rehearsal:1},null,null], 'story-senior-2':[null,null,null]
  };
  for(const [id,choices] of Object.entries(rows))choices.forEach((skills,i)=>{if(skills)add(id,i,skills);});
  for(const p of C.projects){for(let day=0;day<3;day++){const kind=kinds[day];add(`life-${p.id}-${day}`,0,{[kind]:2});add(`life-${p.id}-${day}`,1,{[kind]:1});}add(`life-${p.id}-feedback`,0,{record:2});add(`life-${p.id}-feedback`,1,{boundary:1});}
  C.preparationKinds=kinds.map(id=>({id,name:names[id],icon:icons[id]}));C.preparationEvents=[];C.preparationQuestions=[];
  const taskWords={literature:['精读背景材料','读原文，核对它解决的问题、依据与局限','只读摘要，记下待核对线索','收藏标题，先把引用页做漂亮'],method:['核对方法与依据','对照记录，逐项核对做法、适用条件与取舍','请同门讲一遍，先记下关键线索','复制一张流程图，暂时不核对'],record:['检查结果与原始材料','打开原始材料，核对来源、对应关系与实际结果','只看总结页，先记录待检查的地方','整理配色，暂时不打开原始材料'],boundary:['梳理解释边界','对照已有材料，写清支持、不能支持与其他解释','先列出可能的解释，标明尚未检查','把结论写得很大，先营造气势'],rehearsal:['练习组会表达','计时讲一遍，请空椅子追问，再修改重点','只顺一遍标题，标出卡住的地方','给结束页加一个散会表情包']};
  for(const p of C.projects)for(const kind of kinds){const words=taskWords[kind],t=topic(p.id,kind),effect={literature:{notes:13,energy:-9},method:{notes:10,energy:-10},record:{notes:11,slides:5,energy:-12},boundary:{notes:8,slides:5,energy:-7},rehearsal:{slides:12,energy:-7,stress:-3}}[kind];
    const e={id:`prepare-${p.id}-${kind}`,project:p.id,prepKind:kind,location:{literature:'library',method:'lab',record:'lab',boundary:'library',rehearsal:'mentor'}[kind],title:words[0]+' · '+t,scene:`这半天专门准备「${t}」。材料与问题均为游戏内的虚构内容；真正核对过的内容，才会成为周五可用的回答依据。`,choices:[
      {text:words[1],flavor:`你留下了「${t}」的核对笔记，记录了依据和不知道的部分。周五问到这里，可以打开这份记录回答。`,effects:effect,traits:{study:1,...(kind==='boundary'?{negative:1}:{})},career:{},work:{progress:kind==='record'?9:4,quality:5},card:{literature:'index',method:'raw',record:'raw',boundary:'counter',rehearsal:'summary'}[kind]},
      {text:words[2],flavor:'这次留下的是线索，还没有核对到能完整作答。你可以在组会上说明目前知道的部分。',effects:{notes:6,energy:-3,stress:-2},traits:{study:1},career:{},work:{progress:2,quality:1}},
      {text:words[3],flavor:'页面热闹了一点，这个问题的回答依据还没有增加。',effects:{slides:6,energy:2},traits:{chaos:1},career:{},work:{},card:'meme'}]};
    C.preparationEvents.push(e);add(e.id,0,{[kind]:2});add(e.id,1,{[kind]:1});
    if(kind!=='rehearsal')C.preparationQuestions.push({id:`prepared-question-${p.id}-${kind}`,project:p.id,phase:kinds.indexOf(kind)+1,prepKind:kind,who:kind==='method'?'stats':kind==='record'?'senior':'boss',title:({literature:'“你真的读过这部分材料吗？”',method:'“为什么这样做，依据是什么？”',record:'“这页结论，能对回原始材料吗？”',boundary:'“这份材料到底支持到哪一步？”'})[kind],scene:`老师指着「${t}」问了一句。你这周是否真的核对过，会决定现在能给出哪一种回答。`,quote:'“不用把话说得很满，把依据拿出来就行。”',choices:[
      {label:'拿出准备',text:({literature:'对照精读笔记，说明已有工作、依据与未解决的问题。',method:'拿出核对过的步骤，解释适用条件与取舍。',record:'打开核对记录，讲清来源、对应关系与实际结果。',boundary:'对照检查笔记，区分支持的判断、其他解释和未知部分。'})[kind],result:'这份回答有一条可追溯的来路。',flavor:'你讲的不是临时借来的词，而是自己这周核对过的内容。',effects:{evidence:7,patience:4,time:-3},flags:{rigor:1}},
      {label:'说明现状',text:'先说明准备到了哪里，不把未知装成结论。',result:'你把不知道的部分具体地留下了。',flavor:'导师把这个缺口写成一项可以补好的任务，没有要求你当场编出答案。',effects:{evidence:-2,patience:3,time:-2},flags:{honest:1}},
      {label:'冒险硬答',text:'凭印象硬答，试着把这个问题带过去。',result:'你用一段流畅的话试图填上缺口。',flavor:'这次暂时没有被追问穿，但这段话还不能代替核对过的记录。',effects:{mood:5,patience:-4,time:-2},flags:{chaos:1,debt:1},risk:{chance:.65,effects:{evidence:-12,patience:-10,mood:-8},flavor:'老师顺着一个具体细节追问，印象没有变成依据。你把需要补的内容记了下来。'}}]});
  }
  const common={
    'background-simple':['literature',1],'background-overlap':['literature',2],'background-reference':['literature',2],'background-title':['literature',1],
    'method-repeats':['method',2],'method-details':['method',2],'method-parameter':['method',2],'method-ai':['method',2],'shared-shortcut':['method',2],
    'plot-small':['record',1],'plot-version':['record',2],'result-negative':['boundary',2],'result-perfect':['record',2],'result-surprise':['record',2],'result-screenshot':['boundary',2],
    'question-cause':['boundary',2],'question-impact':['literature',1],'question-memory':['record',2],'shared-title-copy':['rehearsal',1],
    'week-echo-study':['method',2],'week-echo-negative':['boundary',2],'week-echo-promise':['record',2]
  };
  const enabled=w=>w?.config?.preparation===true;
  const bookValid=b=>b&&b.version===1&&Array.isArray(b.sources)&&b.sources.length<=100&&b.sources.every(a=>kinds.includes(a.kind)&&[1,2].includes(a.level)&&C.projects.some(p=>p.id===a.route)&&Number.isInteger(a.week)&&typeof a.action==='string'&&typeof a.eventId==='string');
  function init(w,previous){if(!enabled(w))return;if(window.MEETING_MIX?.routes(w)){const ids=window.MEETING_MIX.routes(w),sources=[];for(const route of ids)for(const kind of kinds){const pool=previous?.preparation?.sources.filter(a=>a.route===route&&a.kind===kind)||[],best=Math.max(0,...pool.map(a=>a.level)),last=pool.filter(a=>a.level===best).at(-1);if(last)sources.push({...last,level:['literature','method'].includes(kind)?last.level:Math.min(last.level,1)});}w.preparation={version:1,sources};return;}const old=previous?.preparation;const carried=kinds.map(kind=>{const pool=old?.sources.filter(a=>a.route===w.config.project&&a.kind===kind)||[],best=Math.max(0,...pool.map(a=>a.level));return pool.filter(a=>a.level===best).at(-1);}).filter(Boolean);w.preparation={version:1,sources:carried.map(a=>({...a,level:['literature','method'].includes(a.kind)?a.level:Math.min(a.level,1)}))};}
  const level=(book,route,kind)=>Math.max(0,...(book?.sources||[]).filter(a=>a.route===route&&a.kind===kind).map(a=>a.level));
  const source=(book,route,kind,minimum=1)=>(book?.sources||[]).filter(a=>a.route===route&&a.kind===kind&&a.level>=minimum).at(-1)||null;
  function gains(e,index,unlucky=false){const result={...(e.choices[index]?.preparationGains??recipes[e.id+':'+index]??{})};if(unlucky)for(const k of Object.keys(result))result[k]=Math.min(result[k],1);return result;}
  function lifePreview(w,e,index){const result=gains(e,index),needs=e.prepKind==='boundary'&&result.boundary===2?{record:1}:{};return {gains:result,needs,available:!Object.keys(needs).some(k=>level(w.preparation,e.choices[index].preparationRoute||e.project||window.MEETING_MIX?.route(w)||w.config.project,k)<needs[k])};}
  function afterLife(w,e,index,record){if(!enabled(w))return;const gained=gains(e,index,record.unlucky),sources=[],route=e.choices[index].preparationRoute||e.project||window.MEETING_MIX?.route(w)||w.config.project;
    for(const [kind,strength] of Object.entries(gained)){const a={kind,level:strength,route,week:w.number,day:w.day,eventId:e.id,action:record.answer,title:e.title};w.preparation.sources.push(a);sources.push(a);}
    w.preparation.sources=w.preparation.sources.slice(-100);const repaired=[];
    for(const task of w.tasks.filter(t=>!t.done&&t.prepKind&&t.route===route&&!e.id.startsWith('side-story-'))){if((gained[task.prepKind]||0)>=2){task.done=true;repaired.push(task.title);}}
    record.preparation={sources:copy(sources),repaired};if(repaired.length){if(!record.taskDone&&w.campus)w.campus.weekTaskDone++;record.taskDone=[record.taskDone,...repaired].filter(Boolean).join('；');}
  }
  function upgrade(w){if(!w||!w.config.campus||w.status==='meeting'||w.meeting||w.day>=5||enabled(w))return w;w.config.preparation=true;init(w,null);
    for(const record of w.log){const e=C.lifeEvents.find(e=>e.id===record.eventId)||C.campusEvents.find(e=>e.id===record.eventId);const index=e?.choices.findIndex(c=>c.text===record.answer);if(index>=0){const day=w.day;w.day=record.day;afterLife(w,e,index,record);w.day=day;}}
    if(w.pending&&w.log.at(-1)?.eventId===w.pending.eventId)w.pending.preparation=copy(w.log.at(-1).preparation);return w;
  }
  function lifeEvent(w,raw){if(!raw||!w.taskFocus||raw.prepKind!==w.taskFocus.kind)return raw;const e=copy(raw),t=w.taskFocus.topic;e.title=names[e.prepKind]+'补查 · '+t;e.scene=`这半天具体补查「${t}」。它来自生活或组会上尚未处理的疑点。核对来源、条件和仍不能解释的部分后，才能完成对应待办。`;e.choices[0].text=`打开来源与记录，正式核对「${t}」并写明边界。`;e.choices[1].text=`先查找「${t}」的材料线索，完整核对留到以后。`;return e;}
  function dispatch(w,kind){if(!enabled(w)||!w.campus||w.status!=='life'||w.pending||w.campus?.plan||!kinds.includes(kind))return null;const route=window.MEETING_MIX?.route(w)||w.config.project,e=C.preparationEvents.find(e=>e.project===route&&e.prepKind===kind),task=w.tasks.find(t=>!t.done&&t.liveFlaw&&t.route===route&&t.prepKind===kind);w.taskFocus=task?{kind,topic:task.topic||task.title}:null;w.campus.plan={day:w.day,slot:w.slot,location:e.location,original:w.eventId,preparation:kind};w.eventId=e.id;w.seen.push(e.id);return lifeEvent(w,e);}
  function context(w,ctx){if(enabled(w)){ctx.preparation=copy(w.preparation);ctx.preparation.taskReceipts=w.log.filter(r=>r.taskDone&&r.preparation?.sources.length).map(r=>({week:w.number,day:r.day,action:r.answer,eventId:r.eventId,task:r.taskDone,route:w.config.project}));}return ctx;}
  const active=s=>!!s.weekContext?.preparation;
  function meetingInit(s){if(active(s))s.preparation={version:1,answered:[],gaps:[],attempts:[]};}
  function scheduledQuestion(s){if(!active(s)||s.wrapUp)return null;const index=s.live?s.live.prepSchedule.indexOf(s.choicesMade):s.choicesMade-1;if(index<0||index>3)return null;return C.preparationQuestions.find(e=>e.project===(s.mixQuestionRoutes?.[kinds[index]]||s.project)&&e.prepKind===kinds[index]);}
  function requirement(e,c){if(e.prepKind)return c.flags?.rigor?{kind:e.prepKind,minimum:2}:null;if(!c.flags?.rigor&&!(['plot-version','plot-small'].includes(e.id)&&c===e.choices[0]))return null;if(e.answerKind)return {kind:e.answerKind,minimum:2};if(common[e.id])return {kind:common[e.id][0],minimum:common[e.id][1]};
    if(e.project&&e.phase>=1&&e.phase<=4)return {kind:kinds[e.phase-1],minimum:e.phase===1?1:2};return null;
  }
  function event(s,original){if(!active(s)||!original)return original;const e=copy(original),book=s.weekContext.preparation,route=e.project&&e.project!=='interdisciplinary'?e.project:s.project;
    if(e.weekRequires){const action=s.weekContext.sourceActions.find(a=>(a.traits?.[e.weekRequires]||0)>0);if(action){const day=C.weekDays[action.day];e.title=e.title.replace(/周[一二三四五六日]/g,day);e.scene+=` 那天你实际选择了「${action.answer}」。`;if(e.id==='week-echo-study'){const notes=book.sources.filter(a=>a.week===s.weekContext.number&&a.day===action.day&&a.action===action.answer);const best=notes.find(a=>a.level===2)||notes[0];e.answerKind=best?.kind||'literature';}if(e.id==='week-echo-meal')e.title='这周被你提起的饭点，今天轮到所有人的胃表态。';}}
    if(e.id==='question-memory'&&!s.weekContext.carryTasks.length){e.title='导师翻开了这周的进展记录。';e.scene='老师指着本周的记录，想确认你已经核对到了哪一步。';e.quote='“这周具体检查了什么？”';e.choices[0].result='本周的核对有了回执。';e.choices[0].flavor='老师在这周的记录旁做了一个标记。';e.choices[2].flavor='导师建议把思考落实到一个可以检查的问题。';}
    e.choices=e.choices.map((c,index)=>{const req=requirement(e,c);if(req){const got=level(book,route,req.kind),a=source(book,route,req.kind,req.minimum);c.prepared={...req,route,level:got,available:got>=req.minimum,source:copy(a)};if(c.prepared.available){c.effects.evidence=(c.effects.evidence||0)+3;c.effects.patience=(c.effects.patience||0)+2;}}
      if(e.id==='question-memory'&&index===0&&s.weekContext.carryTasks.length){const receipt=book.taskReceipts?.at(-1);if(!receipt){c.prepared.available=false;c.prepared.reason='需要本周实际补查过上次组会的遗留事项；整理文件或收拾工位不算核对。';}else if(c.prepared.available)c.prepared.source={...copy(receipt),kind:'record',level:2};}
      if(e.prepKind&&index===1){const got=level(book,route,e.prepKind);c.text=got>=2?'这部分已经核对过，请同门一起复查一个仍不确定的细节。':got===1?'只掌握了线索，说明目前知道的部分，约好补做核对。':'这部分还没有准备，承认答不了，记下一个具体补查任务。';c.flags=got>=2?{help:1,honest:1}:{honest:1,debt:1};}
      if(e.prepKind&&index===2){const got=level(book,route,e.prepKind);c.risk.chance=got>=2?.2:got===1?.5:.75;c.prepBluff={kind:e.prepKind,level:got};}return c;});return e;
  }
  function afterAnswer(s,e,c,index,record){if(!active(s))return;const req=c.prepared,kind=req?.kind||e.prepKind;if(!kind)return;const book=s.weekContext.preparation;
    const answered=!!req?.available,needsGap=!answered&&((e.prepKind&&index===1&&level(book,e.project||s.project,kind)<2)||c.prepBluff);
    const route=req?.route||e.project||s.project,a=answered?req.source:source(book,route,kind);record.preparation={kind,status:answered?'answered':c.prepBluff?'bluff':'partial',source:a?copy(a):null,gap:!!needsGap};
    s.preparation.attempts.push({eventId:e.id,title:e.title,...copy(record.preparation)});
    if(answered&&!s.preparation.answered.includes(kind))s.preparation.answered.push(kind);
    if(needsGap&&!s.preparation.gaps.some(g=>g.kind===kind&&g.route===route))s.preparation.gaps.push({kind,question:e.title,route});
  }
  function afterMeeting(w,s){if(!enabled(w)||!s.preparation)return;w.meeting.preparation=copy(s.preparation);
    for(const gap of s.preparation.gaps)if(!w.tasks.some(t=>!t.done&&t.prepKind===gap.kind&&t.route===gap.route))w.tasks.push({title:`补查${names[gap.kind]}：${topic(gap.route,gap.kind)}`,done:false,from:w.number,prepKind:gap.kind,route:gap.route,question:gap.question});
  }
  return {kinds,names,icons,topic,enabled,bookValid,init,level,source,gains,lifePreview,afterLife,upgrade,dispatch,lifeEvent,context,active,meetingInit,scheduledQuestion,event,afterAnswer,afterMeeting};
})();
