/* 每场的性格、现场状态与反应都保存到存档；预览和读档不重新抽签。 */
window.MEETING_UNCERTAINTY=(()=>{
  'use strict';
  const C=window.MEETING_CONTENT,copy=x=>JSON.parse(JSON.stringify(x));
  const clamp=(x,min=0,max=100)=>Math.max(min,Math.min(max,x));
  const modes=['detail','brief','cautious','direct','cooperate'];
  const clues={detail:'对方翻开了记录，似乎在等一个具体细节。',brief:'对方看了一眼钟，手里的笔停了下来。',cautious:'对方圈出了结论里的一个词，似乎在意它的范围。',direct:'对方合上了背景页，抬头等你的结论。',cooperate:'对方看了看同门，似乎在等一个可以一起推进的办法。'};
  const active=s=>!!s?.live;
  function init(s,rand,career={}){
    const schedule=[1,2,3,4,5];shuffle(schedule,rand,s);
    s.live={version:1,minAnswers:10,crisisAt:6+Math.floor(rand(s)*3),crisisId:['method','counterexample','records','promise'][Math.floor(rand(s)*4)],crisisDone:false,followupDone:false,flaw:null,badAnswers:0,goodAnswers:0,round:null,prepSchedule:schedule.slice(0,4),profiles:{}};
    const carried=s.weekContext?.unresolvedFlaws?.[0];if(carried)s.live.crisisId={method:'method',record:'records',boundary:'counterexample'}[carried.prepKind]||'promise';
    for(const id of ['boss','stats','senior']){
      const cast=id==='boss'?C.personas.find(p=>p.id===s.persona):null;s.live.profiles[id]={preference:cast?.focus||modes[Math.floor(rand(s)*modes.length)],severity:Math.min(5,1+Math.floor(rand(s)*3)+(cast?.severity||0)),temper:Math.floor(rand(s)*5)-2};
      // 熟悉仍有帮助，但旧的100信任不等于这周的免死金牌。
      s.relations[id]=clamp(Math.round(50+(s.relations[id]-50)*.72+rand(s)*8-4),0,95);
    }
    if(s.weekContext?.group)s.live.group=copy(s.weekContext.group);s.live.socialWeek=s.weekContext?.socialWeek||window.MEETING_LIFE_SURPRISES?.socialState(s,rand,null,career.peer)||null;
    for(const id of ['boss','stats','senior']){const effect=s.live.socialWeek?.events[id]?.effects||{},p=s.live.profiles[id];p.severity=clamp(p.severity+(effect.severity||0),1,5);p.temper+=effect.temper||0;if(effect.preference)p.preference=effect.preference;for(const key of ['mood','patience','evidence','time'])if(effect[key])s.stats[key]=clamp(s.stats[key]+effect[key],0,key==='time'?65:100);}
    window.MEETING_MENTOR_APPOINTMENTS?.initMeeting?.(s);
  }
  function shuffle(a,rand,s){for(let i=a.length-1;i>0;i--){const j=Math.floor(rand(s)*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function canWrap(s){return !active(s)||(s.choicesMade>=s.live.minAnswers&&s.live.crisisDone&&s.live.followupDone);}
  function schedule(s){if(!active(s)||s.wrapUp)return null;const v=s.live;
    if(v.crisisDone&&!v.followupDone)return {id:'live-followup',phase:6};
    if(!v.crisisDone&&s.choicesMade>=v.crisisAt)return {id:'live-flaw-'+v.crisisId,phase:5};return null;
  }
  function prepareRound(s,rand){if(!active(s))return;const v=s.live,raw=window.MEETING_DIALOGUE?.question(s)||window.MEETING_PUBLICATION?.question(s)||window.MEETING_ROUTE_STORIES?.question(s)||window.MEETING_WORLD?.question(s)||window.MEETING_SIDE_STORIES?.question(s)||window.MEETING_ASSIGNMENTS?.question(s)||window.MEETING_MIX?.jointQuestion(s)||rawEvent(s)||C.events.find(e=>e.id===s.eventId)||C.preparationQuestions?.find(e=>e.id===s.eventId),id=['boss','stats','senior'].includes(raw?.who)?raw.who:'boss',p=v.profiles[id];
    const focus=rand(s)<(id==='boss'?1-(C.personas.find(p=>p.id===s.persona)?.volatility??.36):.64)?p.preference:modes[Math.floor(rand(s)*modes.length)];
    const observed=rand(s)<.76?focus:modes[Math.floor(rand(s)*modes.length)];
    v.round={eventId:s.eventId,examiner:id,focus,observed,pressure:p.severity+(s.choicesMade>=5?1:0),tone:Math.floor(rand(s)*5)-2,order:shuffle([0,1,2],rand,s)};
  }
  const choice=(text,approach,effects,flags={},hardStop=false)=>({text,approach,label:'现场回应',effects,flags,hardStop,result:'漏洞没有因为一句话消失。',flavor:'这件事需要继续核对。'});
  function rawEvent(s){if(!active(s)||!s.eventId.startsWith('live-'))return null;const carry=s.weekContext?.unresolvedFlaws?.[0],route=carry?.route||window.MEETING_MIX?.meetingRoute(s)||s.project,topic=C.projects.find(p=>p.id===route).topics,id=s.eventId;
    if(id==='live-followup')return {id,phase:6,who:'boss',title:'“先别翻页。刚才那个漏洞，你打算怎么处理？”',scene:`对方回到了「${s.live.flaw?.topic||topic[2]}」。这次要选一个实际承担的后果；一句“下周再说”不会自动销项。`,quote:'“现在给一个范围明确的处理方案。”',choices:[
      choice('撤回这一部分结论，保留已经核对的内容。','cautious',{evidence:-8,patience:-3,mood:-4,time:-2},{honest:1,rigor:1}),
      choice('暂停推进，列出补查顺序和可交付的记录。','detail',{evidence:-4,patience:-6,mood:-3,time:-3},{rigor:1,debt:1}),
      choice('请同门共同复查，承认现在不能给出确定答案。','cooperate',{evidence:-5,patience:-4,mood:-5,time:-3},{help:1,honest:1,debt:1})]};
    const crisis=id.slice('live-flaw-'.length),data={
      method:{kind:'method',topic:topic[1],who:'stats',title:'导师发现了一个设计漏洞：这个解释并没有被排除。',scene:'你原本顺畅的论证停在了一个条件上。已有材料可以支持部分结果，却不能区分老师提出的另一种解释。',quote:'“如果另一种解释也成立，你这一步还站得住吗？”',choices:[choice('缩小结论，只保留现有设计确实能回答的部分。','cautious',{evidence:-12,patience:-4,mood:-5,time:-3},{honest:1}),choice('逐项解释条件，承认还需要额外核对才能区分。','detail',{evidence:-6,patience:-9,mood:-4,time:-4},{rigor:1,debt:1}),choice('暂停这一页，请同门一起列出能区分解释的检查。','cooperate',{evidence:-8,patience:-6,mood:-7,time:-3},{help:1,debt:1})]},
      counterexample:{kind:'boundary',topic:topic[2],who:'boss',title:'老师拿出了一个反例，它恰好击中了你的结论。',scene:'反例不是你已准备的那一页。你需要决定，是立刻退一步，花时间拆分适用范围，还是暂缓结论。',quote:'“这个例子也符合你的说法吗？”',choices:[choice('撤回过大的表述，承认这个反例需要单独处理。','cautious',{evidence:-13,patience:-3,mood:-6,time:-2},{honest:1}),choice('拆开适用范围，当场说明哪一部分暂时解释不了。','detail',{evidence:-6,patience:-9,mood:-4,time:-4},{rigor:1}),choice('先停在这里，把反例和原材料交给同门共同复核。','cooperate',{evidence:-7,patience:-7,mood:-8,time:-3},{help:1,debt:1})]},
      records:{kind:'record',topic:topic[2],who:'senior',title:'原始记录和投影上的这一页，出现了版本冲突。',scene:'师兄打开了另一份记录，两页的关键细节对不上。原因还没查清；老师明确要求先核对，不能把矛盾当作不存在。',quote:'“记录就在这里。你现在准备怎么处理？”',choices:[choice('撤下这页，承认版本没有核对一致，回去查清。','cautious',{evidence:-15,patience:-5,mood:-8,time:-3},{honest:1,debt:1}),choice('停止解释结论，和师兄当场比对两份记录的来源。','detail',{evidence:-7,patience:-10,mood:-5,time:-5},{rigor:1,help:1}),choice('拒绝核对，否认刚刚展示的记录，坚持继续讲。','direct',{evidence:-25,patience:-25,mood:-15,time:-2},{chaos:1},true)]},
      promise:{kind:'record',topic:topic[2],who:'boss',title:'“这个承诺，你准备拿什么兑现？”',scene:'导师把一个范围很大的后续要求落到了具体记录上。你现在的材料只能完成其中一部分；三个回应都要放弃一些进度或现场评价。',quote:'“今天给不了结果，也别再许一个更大的愿。”',choices:[choice('把交付范围缩小，只承诺已经能核对的部分。','brief',{evidence:-9,patience:-7,mood:-4,time:-2},{honest:1}),choice('解释现有缺口，逐项列出补查顺序。','detail',{evidence:-5,patience:-10,mood:-5,time:-4},{rigor:1,debt:1}),choice('暂缓原承诺，邀请同门帮忙重新安排分工。','cooperate',{evidence:-10,patience:-5,mood:-7,time:-3},{help:1,debt:1})]}
    }[crisis];if(!data)return null;
    return {id,phase:5,project:s.project,who:data.who,title:carry?(carry.from===s.weekContext?.number?'这周生活里留下的疑点，老师现在问到了。':'上周留下的漏洞，今天又被翻了出来。'):data.title,scene:carry?`「${carry.title}」尚未完成。${data.scene}`:data.scene,quote:data.quote,flaw:{route,kind:carry?.prepKind||data.kind,topic:carry?.topic||data.topic},choices:data.choices};
  }
  function decorate(s,original){if(!active(s)||!original)return original;const e=copy(original),round=s.live.round;
    // 准备仍决定可回答范围，表现好坏要到现场才知道。
    if(!round)return original;e.scene+=' '+clues[round.observed];
    e.choices=e.choices.map((c,i)=>({...c,sourceIndex:i,approach:c.approach||(c.flags.chaos?'deflect':c.flags.help||c.flags.social?'cooperate':c.flags.rigor?'detail':c.flags.honest?'cautious':'direct'),label:'现场回应'}));
    // 同一份真实笔记可用不同的表达方式，代价不同，不额外生成知识。
    if(e.prepKind){const c=e.choices[0],variants=[['detail',c.text],['brief','先给一句结论，再说明笔记中能支持它的依据。'],['cautious','从已核对的范围讲起，先指出目前还不能回答的部分。']];const mode=variants[(s.seed+e.phase+s.meetingNumber)%variants.length];c.approach=mode[0];c.text=e.bankId&&mode[0]!=='detail'?window.MEETING_DIRECTION_LIBRARY.delivery(e.bankId,e.prepKind,mode[0]):mode[1];}
    const peer=s.live.socialWeek?.cast.senior;if(peer){for(const k of ['title','scene','quote'])e[k]=e[k]?.replaceAll('陈师兄',peer.name).replaceAll('师兄',peer.name.endsWith('师姐')?'师姐':'师兄');for(const c of e.choices)c.text=c.text.replaceAll('陈师兄',peer.name).replaceAll('师兄',peer.name.endsWith('师姐')?'师姐':'师兄');}
    e.choices=round.order.map(i=>e.choices[i]);return e;
  }
  function preview(s,c,effects){if(!active(s))return effects;const out={...effects};for(const k of ['mood','evidence','patience'])if(out[k]>0)out[k]=Math.ceil(out[k]*(window.MEETING_DAILY_TIME?.balanced(s)?s.difficulty==='normal'?1:.75:.5));return out;}
  function roll(s,e,c,effects,rand){if(!active(s))return null;const v=s.live,r=v.round,p=v.profiles[r.examiner],fit=c.approach===r.focus?1:c.approach==='deflect'?-1:0;
    const gentle=window.MEETING_DAILY_TIME?.balanced(s)&&s.difficulty==='normal',prepared=!!c.prepared?.available,credible=window.MEETING_DAILY_TIME?.reasonable(c),noise=Math.floor(rand(s)*(gentle?13:19))-(gentle?6:9),quality=fit*(gentle?4:7)+noise+p.temper+r.tone+(prepared?(gentle?4:2):0)+(gentle&&credible?2:0)-(gentle?Math.max(0,r.pressure-3):r.pressure);
    const positive=quality>=(gentle?3:4),negative=quality<=(gentle?-5:-4)&&!(gentle&&credible&&!e.flaw&&e.id!=='live-followup');
    if(e.flaw||e.id==='live-followup'){
      // 危机的三个回答始终都有代价，准备能减轻，不能变成全加分。
      for(const k of ['evidence','mood','patience'])effects[k]=Math.min(-1,(effects[k]||0)+(prepared?2:0)+Math.min(0,Math.floor(quality/3)));
    }else{
      effects.patience=(effects.patience||0)+Math.round(quality*(gentle?.45:.65))-(gentle?0:3);
      effects.evidence=(effects.evidence||0)+(negative?(gentle?-2:-4):positive?(gentle?3:2):gentle?0:-1);
      effects.mood=(effects.mood||0)+(negative?(gentle?-2:-5):positive?(gentle?2:1):gentle?0:-2);
      if(r.focus==='brief'&&c.approach==='detail')effects.time=(effects.time||0)-1;
    }
    if(negative)v.badAnswers++;if(positive)v.goodAnswers++;
    let text=positive?'这次表达接住了对方正在关注的部分。':negative?'对方没有接受这次处理，继续追问你遗漏的部分。':'对方暂时听下去，但并没有明确认可。';
    const wants={detail:'具体细节',brief:'简短地交代重点',cautious:'结论的边界',direct:'明确的立场',cooperate:'可共同推进的办法'}[r.focus];
    if(fit===1)text+=` 对方此刻在意${wants}，你的表达碰上了这个关注点。`;else if(fit===-1)text+=` 对方没有顺着玩笑往下走，此刻更在意${wants}。`;else text+=` 对方此刻更在意${wants}。`;
    if(e.flaw){v.crisisDone=true;v.flaw={...e.flaw,title:e.title,approach:c.approach};text='漏洞被记下了。你付出了现场代价，下一轮仍会被问到怎样处理。';}
    if(e.id==='live-followup'){v.followupDone=true;text='你把处理方案说清楚了，但核对本身仍要在组会后完成。';}
    if(c.hardStop){effects.patience=-100;v.badAnswers++;text='老师要求核对矛盾记录，你明确拒绝。组会当场结束；此前的高信任也没有改变这条底线。';}
    const reaction={quality,negative,positive,fit,hardStop:!!c.hardStop,text,examiner:r.examiner,focus:r.focus,approach:c.approach};return window.MEETING_MENTOR_APPOINTMENTS?.reaction?.(s,e,c,reaction,effects)||reaction;
  }
  function changeTrust(value,delta){return clamp(value+(delta>0?Math.max(0,Math.round(delta*(1-value/110))):delta));}
  function rapport(s,c,base,reaction){if(!active(s))return base;const out={};for(const id of ['boss','stats','senior']){
    let d=base[id]||0;if(reaction?.negative)d-=id===reaction.examiner?(window.MEETING_DAILY_TIME?.balanced(s)&&s.difficulty==='normal'?3:6):(window.MEETING_DAILY_TIME?.balanced(s)&&s.difficulty==='normal'?1:2);if(reaction?.positive&&id===reaction.examiner)d+=2;
    if(s.relations[id]>75&&(c.flags.chaos||c.flags.debt))d-=3;
    if(c.hardStop)d-=id==='boss'?30:18;
    const old=s.relations[id];s.relations[id]=changeTrust(old,d);out[id]=s.relations[id]-old;
  }if(s.live.group){const id=reaction?.examiner||'boss';window.MEETING_GROUP.trust({group:s.live.group},person(s,id).id,out[id]);}return out;}
  function afterMeeting(w,s){if(!active(s)||!s.live.flaw)return;const f=s.live.flaw;
    if(!w.tasks.some(t=>!t.done&&t.liveFlaw&&t.route===(f.route||s.project)&&t.prepKind===f.kind))w.tasks.push({title:`补查组会漏洞：${f.topic}`,topic:f.topic,prepKind:f.kind,route:f.route||s.project,done:false,from:w.number,liveFlaw:true});
    w.meeting.live={crisis:f.title,followup:s.live.followupDone,badAnswers:s.live.badAnswers};
  }
  function valid(s){if(!active(s))return true;const v=s.live,r=v.round;return v.version===1&&v.minAnswers===10&&Number.isInteger(v.crisisAt)&&v.crisisAt>=6&&v.crisisAt<=8&&['method','counterexample','records','promise'].includes(v.crisisId)&&typeof v.crisisDone==='boolean'&&typeof v.followupDone==='boolean'&&Number.isInteger(v.badAnswers)&&v.badAnswers>=0&&Number.isInteger(v.goodAnswers)&&v.goodAnswers>=0&&Array.isArray(v.prepSchedule)&&new Set(v.prepSchedule).size===4&&v.prepSchedule.every(n=>Number.isInteger(n)&&n>=1&&n<=5)&&['boss','stats','senior'].every(id=>modes.includes(v.profiles?.[id]?.preference)&&[1,2,3,4,5].includes(v.profiles[id].severity))&&r&&r.eventId===s.eventId&&modes.includes(r.focus)&&modes.includes(r.observed)&&['boss','stats','senior'].includes(r.examiner)&&Array.isArray(r.order)&&r.order.length===3&&new Set(r.order).size===3&&r.order.every(n=>[0,1,2].includes(n));}
  function score(s,base){return !active(s)?base:clamp(Math.round(s.stats.evidence*.35+s.stats.patience*.25+s.stats.mood*.2+10-s.live.badAnswers*1.5-(s.live.flaw?5:0)));}
  function choiceHint(s,c){if(!active(s))return '';if(c.hardStop)return '拒绝核对已暴露的矛盾，会直接结束本场。';const tradeoff={detail:'解释更细，会占用时间，也可能引出新问题。',brief:'先保住节奏，细节可能被继续追问。',cautious:'收窄当前承诺，也可能被认为进展不足。',cooperate:'借助同门复核，会牵动关系与后续分工。',direct:'当场给出立场，对方可能继续追着依据问。',deflect:'试着缓和或转移话题，对方未必接得住。'}[c.approach];return (s.eventId.startsWith('live-')?'这次没有无损回应。':'')+tradeoff+' 现场后果选后揭晓。';}
  function summary(s){if(!active(s))return '';return `现场观察：${clues[s.live.round.observed]} 性格与关注点会变化，这只是线索。${s.live.socialWeek?person(s,'boss').name+'这周'+s.live.socialWeek.events.boss.text:''}正常收尾需完成至少10次问答；状态归零会提前翻车。`;}
  function failureEnding(s,final=false){if(!active(s)||!s.live.crisisDone||!s.live.flaw)return null;return (s.stats.mood<=0||s.stats.patience<=0||s.stats.time<=0||(final&&s.stats.evidence<35))&&C.endings.some(e=>e.id==='failure-'+(s.live.flaw.route||s.project))?'failure-'+(s.live.flaw.route||s.project):null;}
  function person(s,id){if(s?.live?.group)return window.MEETING_GROUP.person(s,id);const faculty=window.MEETING_MENTORS?.find(s?.mentorId);if(faculty&&['boss','stats'].includes(id))return {...C.people[id],name:faculty.name+'老师',role:faculty.title};return {...C.people[id],...(id==='senior'?s?.live?.socialWeek?.cast?.senior:{})};}
  return {active,init,canWrap,schedule,prepareRound,rawEvent,decorate,preview,roll,rapport,changeTrust,afterMeeting,valid,score,choiceHint,summary,person,failureEnding};
})();
