window.MEETING_LIFE_SURPRISES=(()=>{
  'use strict';
  const P=window.MEETING_PREPARATION,copy=x=>JSON.parse(JSON.stringify(x));
  const active=w=>w.config.uncertainty!==false;
  // 每个突发都有三个真实取舍：继续原事、处理突发、改掉安排。
  const incidents=[
    ['early-mail','导师突然发来一条“方便现在看一下吗”','原定的半天还没开始，导师就发来一个新问题。消息没有写截止时间，但正在输入的提示亮着。','先回复可交付的范围，再继续原定事项。','先整理导师要的线索，原定事项往后放。','说明今天已有安排，约一个明确的新时间。',{energy:-5,stress:5},{notes:4,stress:6},{energy:3,stress:3},'promise'],
    ['power','这一层突然停电了','屏幕黑下去的一瞬间，走廊里传来了此起彼伏的叹气。原来的地方暂时没法继续。','带着备份换个地方，继续完成原定事项。','帮同门检查恢复情况，先记录待核对的线索。','停下工作，趁这个空档出去走一走。',{energy:-7,stress:5},{notes:3,energy:-4},{energy:9,stress:-4},'backup'],
    ['lost-file','你准备打开的文件，竟然有两个不同版本','两个文件都叫“最终”，修改时间却一样。直接选一个很快，但可能把问题带到周五。','先找来源核对清楚，再继续原定事项。','请同门提供版本线索，这半天先做交接。','把冲突记进待办，暂时停止这项安排。',{energy:-8,stress:4},{notes:4,stress:2},{energy:4,stress:5},'backup'],
    ['help','同门突然说：我真的需要你帮一下','求助并没有出现在你的时间表里。帮忙会挤掉原计划；拒绝也需要解释。','帮一个范围很小的忙，然后继续自己的事项。','把这半天留给同门，自己的安排稍后再做。','说明自己的截止时间，帮他找另一个人。',{energy:-7,stress:3},{energy:-9,stress:-3},{energy:2,stress:4},'collaboration'],
    ['room','你预约的地方，被临时占用了','门口贴着一张新通知。你带来的东西齐了，地点却没有了。','找替代地点，把原定事项做完。','先协调场地，请同门留下可核对的线索。','取消这半天的预约，改成休息。',{energy:-6,stress:6},{notes:3,stress:3},{energy:8,stress:-3},'late'],
    ['rain','突如其来的暴雨，把路堵住了','伞在另一栋楼，资料也在另一栋楼。你现在需要重新安排地点和时间。','绕路取齐材料，继续完成原定事项。','留在原地和同门协调，先交换准备线索。','停下赶路，吃点东西等雨小。',{energy:-8,stress:4},{notes:3,energy:-2},{energy:7,stress:-5},'late'],
    ['delivery','急件提前送到了，你得去签收','负责人不在，电话却已经打到你这里。让人等、放下自己的事、托人帮忙，都有成本。','约好十分钟内完成交接，再做原定事项。','先完成签收和清点，今天的原安排暂停。','请同门代签，晚些时候自己补清点。',{energy:-5,stress:4},{notes:2,energy:-4},{energy:2,stress:5},'deadline'],
    ['seminar','一个临时讲座，刚好与你的困惑有关','海报上的题目很诱人，但讲座和你原计划撞在了一起。你不能两边都完整参加。','记下讲座信息，继续完成原定事项。','去听讲座，先收集能继续核对的线索。','请参加的人发一份信息，今天先休息。',{energy:-2,stress:3},{notes:7,energy:-6},{energy:6,stress:-2},'study'],
    ['visitor','来访老师临时想听你介绍一下','这不是正式组会，也不是你准备好的场合。三分钟的介绍可能变成半小时。','简短说明范围，结束后继续原定事项。','接受临时交流，原定安排往后挪。','坦白今天没为这次交流准备，另约时间。',{energy:-6,stress:6},{notes:4,energy:-7,stress:5},{energy:3,stress:4},'deadline'],
    ['coffee','咖啡倒在了今天的笔记旁边','你抢救得够快，关键内容还在，但桌面和心情都需要一点时间恢复。','擦干、确认内容完整，再继续原定事项。','请同门帮助整理能核对的线索，自己清理桌面。','把东西收好，今天这一段先到这里。',{energy:-5,stress:5},{notes:3,stress:2},{energy:4,stress:-2},'backup'],
    ['printer','打印机吐出了半张纸，然后停止了','队伍开始变长，机器开始沉默。你的纸质材料只完成了一半。','换用能核对的电子材料，完成原定事项。','先协调大家的打印需求，留下一份材料线索。','取消打印安排，改成休息和整理桌面。',{energy:-4,stress:5},{notes:3,energy:-4},{energy:6,stress:-3},'printer'],
    ['group','群里突然讨论起你的课题','一个并不完整的说法已经被转发了好几次。是否回应、回应到哪一步，都要占用时间。','澄清一句能确定的事实，再继续原定事项。','留在讨论里解释现状，自己的安排稍后继续。','请大家先不要下结论，约组会时再谈。',{energy:-4,stress:6},{notes:4,stress:5},{energy:3,stress:3},'collaboration'],
    ['booking','预约系统把你的时间取消了','通知是今天才到的。原计划突然少了一个关键条件，但你的这半天已经空出来了。','找替代材料或场地，继续原定事项。','先协调新的预约，原定事项这次暂停。','把今天改成休息，不再临时塞满。',{energy:-6,stress:6},{slides:3,energy:-3},{energy:10,stress:-4},'deadline'],
    ['friend','许久没联系的朋友，突然来到了附近','朋友只待半天。你想见，也不想把周五的自己留在原地。','见一小会儿，然后回去完成原定事项。','把这半天给朋友，原计划稍后再安排。','解释今天的安排，约下次好好见面。',{energy:-4,stress:-2},{energy:8,stress:-8},{energy:2,stress:3},'meal'],
    ['notebook','你的笔记里出现了一个互相矛盾的标记','翻到某一页时，你发现两个标记对不上。这也许只是笔误，也许意味着需要重新检查。','先核对矛盾，再继续原定事项。','请同门帮忙找线索，这次先记录疑点。','把疑点加入待办，暂停当前事项。',{energy:-7,stress:4},{notes:4,stress:4},{energy:3,stress:5},'negative'],
    ['sleepy','昨天没觉得累，今天突然断电了','你坐下以后才发现，注意力一直滑走。坚持、减量、睡一会儿，都是今天的真实选择。','放慢速度、多核对一遍，完成原定事项。','请同门代为整理准备线索，自己只做交接。','暂停这一段，认真睡一会儿。',{energy:-8,stress:5},{notes:3,energy:1},{energy:16,stress:-8},'rest'],
    ['network','网络突然开始间歇性消失','页面每刷新一次就换一种脾气。在线材料不稳定，你需要决定今天怎样继续。','使用本地材料核对，完成原定事项。','先整理同门留下的线索，等待恢复。','离开屏幕，吃饭或散步后再安排。',{energy:-5,stress:4},{notes:3,energy:-1},{energy:8,stress:-5},'backup'],
    ['message','一条没说清楚的通知，把大家都叫到了楼下','你到了才发现，要等的人还没来。留着、走掉、协调，都可能影响原计划。','说明能等多久，结束后完成原定事项。','留下协调通知，自己的事项往后挪。','确认自己不是必须到场的人，改为休息。',{energy:-6,stress:5},{slides:2,energy:-4},{energy:7,stress:-2},'late'],
    ['good-news','同门刚收到好消息，想一起庆祝','气氛很热闹，庆祝却和你的准备时间重叠。你得选一个今天承受得起的安排。','祝贺后短暂加入，再回来完成原定事项。','把这半天留给庆祝，自己的安排稍后再做。','送上祝福，等这轮组会后再一起吃饭。',{energy:-3,stress:-3},{energy:9,stress:-9},{energy:2,stress:-1},'meal'],
    ['request','师兄突然问：你能帮我看一页吗','一页听起来很短，但你见过“一页”的许多种长度。帮到哪一步，需要现在说清楚。','只看一个明确问题，再回到原定事项。','帮师兄梳理线索，今天自己的事项先放下。','说明今天的准备安排，约明天再看。',{energy:-6,stress:2},{notes:5,energy:-5},{energy:3,stress:3},'collaboration']
  ].map(([id,title,scene,a,b,c,ea,eb,ec,trait])=>({id,title,scene,texts:[a,b,c],effects:[ea,eb,ec],trait}));
  for(const [id,title,scene,a,b,c,trait] of window.MEETING_SURPRISE_CONTENT.extra)incidents.push({id,title,scene,texts:[a,b,c],effects:[{energy:-5,stress:3},{energy:-3,notes:3,stress:2},{energy:7,stress:-4}],trait});
  for(const [id,title,scene,a,b,c] of window.MEETING_SURPRISE_CONTENT.major)incidents.push({id,title,scene,texts:[a,b,c],major:true});
  const C=window.MEETING_CONTENT;
  C.disciplineFailureIds=[];
  for(const [project,...row] of window.MEETING_SURPRISE_CONTENT.disciplines){
    for(let i=0;i<3;i++)incidents.push({id:`discipline-${project}-${i}`,project,title:row[i],scene:`${C.projects.find(p=>p.id===project).name}的准备临时遇到了这个问题。直接沿用旧说法，可能把疑点带到周五。`,texts:[`先核对「${row[i]}」，再继续原定事项。`,`找同门一起定位「${row[i]}」，记录待核对的线索。`,`把「${row[i]}」列进待办，暂停原安排、重新分配这半天。`],effects:[{energy:-7,stress:5},{notes:5,energy:-5,stress:4},{energy:6,stress:6}],trait:['study','backup','negative'][i]});
    const id='failure-'+project;C.disciplineFailureIds.push(id);C.endings.push({id,kind:'failure',project,icon:'🧩',title:row[3],subtitle:'这次没有顺利讲完，但故事还会继续。',desc:row[4]+' 周末留下对应的补查任务；如果没有处理，下周还会被问到。',hint:'在本学科组会被点名漏洞后，回应没能撑住心态、耐心或时间，或者收尾时依据仍不足。'});
  }
  const buffs=[
    ['window','这周坐到了靠窗的位置','图书馆里的准备更容易恢复状态。',{library:{energy:4,stress:-3}}],
    ['book-radar','文献雷达在线','图书馆行动能多收集一些资料线索。',{library:{notes:4}}],
    ['sleep-back','睡眠回春','在宿舍与操场认真休息，恢复更充分。',{home:{energy:5}}],
    ['friend-energy','朋友的邀请','和朋友出门能更好地恢复精力。',{friends:{energy:5,stress:-3}}],
    ['good-mood','暂时想开了','本周入场时多一点心态。',{}, {mood:7}],
    ['time-gift','会前有一点余量','本周组会多一点时间。',{}, {time:3}],
    ['mentor-space','导师这周留出了余量','本周导师求助更容易得到支持。',{}, {}, .12],
    ['senior-space','师兄终于忙完了','本周借设备与求助更容易得到回应。',{}, {}, .12],
    ['steady-hands','安静的工作节奏','研究工位的准备更省精力。',{lab:{energy:4,stress:-2}}],
    ['tea','茶水间有一杯热茶','食堂与茶水间恢复状态更充分。',{cafe:{energy:4,stress:-3}}],
    ['rehearsal-room','空会议室恰好安静','预演安排能多留下一些幻灯片。',{mentor:{slides:4}}],
    ['clear-speech','这周思路比较清楚','入场时多一点底气。',{}, {evidence:6}],
    ['open-ear','老师愿意多听一点','本周入场时多一点耐心。',{}, {patience:5}],
    ['small-luck','一些小事顺了一点','处理突发后的压力负担稍轻。',{surprise:{stress:-3}}],
    ['weekend','周末留出了一整段空档','周末的生活安排恢复更充分。',{weekend:{energy:4,stress:-2}}],
    ['backup-ready','备用位置已经留好了','完成准备时更容易留下一份可用材料。',{lab:{slides:3},library:{slides:3}}]
  ].map(([id,title,desc,byLocation,meeting={},support=0])=>({id,title,desc,byLocation,meeting,support}));
  const casts=[{name:'陈师兄',pronoun:'他',partner:'女朋友',icon:'🧑🏻‍🔬'},{name:'叶师姐',pronoun:'她',partner:'女朋友',icon:'👩🏻‍🔬'},{name:'许师兄',pronoun:'他',partner:'男朋友',icon:'🧑🏻‍🔬'},{name:'林师姐',pronoun:'她',partner:'男朋友',icon:'👩🏻‍🔬'}];
  const socialEvents={boss:[
    ['boss-seminar','参加了业内大拿的研讨会，这周对依据的要求提高了。',{severity:2,temper:-1,preference:'detail',support:-.08,patience:-5}],
    ['boss-review','刚收到一份很尖锐的审稿意见，对结论边界格外敏感。',{severity:1,preference:'cautious',patience:-3}],
    ['boss-deadline','本周还有一个截止任务，耐心和时间都比较紧。',{severity:1,temper:-1,preference:'brief',support:-.16,time:-2}],
    ['boss-trip','在外地开会，能提供的临时帮助较少。',{support:-.18,preference:'brief'}],
    ['boss-win','刚完成了一件重要的事，愿意给学生多一点余量。',{temper:2,support:.13,patience:4}],
    ['boss-collab','认识了新的合作方，更在意你能否给出可执行的分工。',{preference:'cooperate',severity:1,support:.05}]],
    stats:[
    ['stats-course','参加了新的方法课程，这周会追着适用条件问。',{severity:1,preference:'detail'}],
    ['stats-case','遇到了一个漂亮的反例，特别在意推论的边界。',{preference:'cautious',severity:1}],
    ['stats-busy','正在处理自己的返修，回答需要更简短清楚。',{temper:-1,preference:'brief',support:-.08}],
    ['stats-rest','这周安排比较宽松，愿意多听一些细节。',{temper:2,support:.1}],
    ['stats-coop','想推进一次合作，关注谁负责核对哪一步。',{preference:'cooperate',temper:1}],
    ['stats-puzzle','正在研究一个难题，愿意承认暂时没有完整答案。',{preference:'cautious',temper:1}]],
    senior:[
    ['peer-love','和{partner}相处甜蜜，这周对你的态度更温和。',{temper:2,support:.16}],
    ['peer-space','和{partner}有些摩擦，需要留一点个人空间。',{temper:-1,support:-.12}],
    ['peer-finished','刚忙完自己的阶段任务，能借设备或帮忙多看一眼。',{temper:1,support:.16}],
    ['peer-rush','自己的截止时间压过来了，临时求助不一定接得住。',{temper:-1,support:-.18,preference:'brief'}],
    ['peer-win','收到了一条好消息，愿意把经验讲得更细。',{temper:2,preference:'detail',support:.08}],
    ['peer-reject','自己的工作刚被退回，对空泛承诺不太买账。',{severity:1,preference:'direct',temper:-1}],
    ['peer-rest','这周终于睡够了，能更耐心地一起核对。',{temper:2,support:.1}],
    ['peer-friend','和朋友度过了愉快的周末，愿意帮你把困难拆小。',{temper:1,preference:'cooperate',support:.12}]]};
  function socialState(s,rand,previous=null,peer=null){const cast=previous?.cast?.senior||peer||casts[Math.floor(rand(s)*casts.length)],world={cast:{senior:copy(cast)},events:{}};for(const id of ['boss','stats','senior']){const options=socialEvents[id].filter(e=>e[0]!==previous?.events?.[id]?.id),e=options[Math.floor(rand(s)*options.length)];world.events[id]={id:e[0],text:e[1].replaceAll('{partner}',cast.partner),effects:copy(e[2])};}return world;}
  function init(w,previous,rand){if(!active(w))return;w.recentSurprises=[...(previous?.recentSurprises||[]),...(previous?.log||[]).map(r=>r.surprise?.id).filter(Boolean)].slice(-12);const options=buffs.filter(b=>b.id!==previous?.weekBuff);w.weekBuff=options[Math.floor(rand(w)*options.length)].id;w.socialWeek=socialState(w,rand,previous?.socialWeek,w.config.peer);}
  function prepare(w,rand){if(!active(w))return;const occurred=w.log.filter(r=>r.surprise),route=window.MEETING_MIX?.route(w)||w.config.project;
    const routeForce=w.log.length===3&&!occurred.some(r=>incidents.find(e=>e.id===r.surprise.id)?.project===route),force=routeForce||(w.log.length===7&&!occurred.length);
    if(occurred.length>=5||(!force&&rand(w)>.42)){w.surprise=null;return;}
    const eligible=incidents.filter(e=>!e.project||(window.MEETING_MIX?.routes(w)||[route]).includes(e.project)),current=new Set(occurred.map(r=>r.surprise.id)),used=new Set([...(w.recentSurprises||[]),...current]);
    const target=routeForce?eligible.filter(e=>e.project===route):eligible,pool=target.filter(e=>!used.has(e.id)),fallback=target.filter(e=>!current.has(e.id));
    const options=pool.length?pool:fallback.length?fallback:eligible.filter(e=>!current.has(e.id));
    w.surprise={id:options[Math.floor(rand(w)*options.length)].id,day:w.day,slot:w.slot};
  }
  function event(w,raw){if(!active(w)||!raw||raw.joint||raw.assignmentAction||raw.id.startsWith('assignment-work-'))return raw;const renamed=copy(raw),name=w.socialWeek?.cast.senior?.name||'陈师兄';for(const key of ['title','scene'])renamed[key]=renamed[key]?.replaceAll('陈师兄',name).replaceAll('师兄',name.endsWith('师姐')?'师姐':'师兄');for(const c of renamed.choices){c.text=c.text.replaceAll('陈师兄',name).replaceAll('师兄',name.endsWith('师姐')?'师姐':'师兄');c.flavor=c.flavor?.replaceAll('陈师兄',name).replaceAll('师兄',name.endsWith('师姐')?'师姐':'师兄');}raw=renamed;if(!w.surprise)return raw;const incident=incidents.find(e=>e.id===w.surprise.id);if(!incident)return raw;
    const e=copy(raw),original=raw.choices[0],gains=P.gains(raw,0),partial=Object.fromEntries(Object.keys(gains).map(k=>[k,1]));
    e.title='突发 · '+incident.title;e.scene=incident.scene+` 原定安排是「${raw.title}」。这件事占用同一个生活片段，不能先领一份奖励再回来重做。`;e.surprise=incident.id;
    if(incident.major){e.prepKind=null;e.choices=incident.texts.map((text,i)=>({text:text.replaceAll('师兄',name.endsWith('师姐')?'师姐':'师兄'),flavor:'你选择了一个解决方向，结果还需要看实际情况。',effects:[{energy:-6,stress:5},{energy:-5,stress:3},{energy:-3,stress:6}][i],traits:{backup:1},career:{},work:{progress:0,quality:0},preparationGains:i===1?{rehearsal:1}:{},card:null,risk:null,continueOriginal:false,supportPath:['recover','senior','boss'][i]}));return e;}
    const combined={...original.effects};for(const [k,v] of Object.entries(incident.effects[0]))combined[k]=(combined[k]||0)+v;
    e.choices=[{...copy(original),text:incident.texts[0]+' '+original.text,flavor:'你付出额外的精力和时间处理了突发，然后完成了原定事项。',effects:combined,preparationGains:gains,continueOriginal:true},
      {text:incident.texts[1],flavor:'这半天被突发重新分配了。你留下了一些线索，原定的完整准备还没有完成。',effects:copy(incident.effects[1]),traits:{collaboration:1,[incident.trait]:1},career:{senior:2},work:{progress:0,quality:0},preparationGains:partial,card:null,risk:null,continueOriginal:false},
      {text:incident.texts[2],flavor:'你改掉了这一段安排。状态发生了变化，这次没有完成原定的准备。',effects:copy(incident.effects[2]),traits:{rest:1},career:{},work:{progress:0,quality:0},preparationGains:{},card:null,risk:null,continueOriginal:false}];
    // 社交或休息并不等于听到了原定材料：只有明确提到线索的处理才获得线索。
    if(!incident.texts[1].includes('线索'))e.choices[1].preparationGains={};return e;
  }
  function roll(w,e,c,effects,rand){if(!active(w))return null;const adjustments={};for(const k of ['energy','notes','slides','stress']){
    if(!effects[k])continue;const change=Math.floor(rand(w)*5)-2;effects[k]+=change;adjustments[k]=change;
    }
    const buff=buffs.find(b=>b.id===w.weekBuff),location=w.campus?.plan?.location,add=o=>{for(const [k,v] of Object.entries(o||{}))effects[k]=(effects[k]||0)+v;};add(buff?.byLocation[location]);if(e.surprise)add(buff?.byLocation.surprise);if(w.day>=5)add(buff?.byLocation.weekend);
    const receipt={id:e.surprise||null,title:e.surprise?e.title:null,adjustments,inspired:false};
    const incident=incidents.find(x=>x.id===e.surprise);
    if(incident?.project&&c.continueOriginal===false){const kind=['literature','method','record'][Number(incident.id.slice(-1))%3],title='补查生活中的学科疑点：'+incident.title;
      if(!w.tasks.some(t=>!t.done&&t.title===title))w.tasks.push({title,topic:incident.title,prepKind:kind,route:incident.project,done:false,from:w.number,liveFlaw:true});
      receipt.flavor='这个学科疑点还没有核对完，已经进入具体补查待办。如果带到周五，老师可能沿着它继续追问。';
    }
    if(c.supportPath){const trust=w.campus?.bonds?.[c.supportPath]??w.config.relations?.[c.supportPath]??50,social=w.socialWeek?.events?.[c.supportPath]?.effects.support||0,probability=c.supportPath==='recover'?.55:Math.max(.15,Math.min(.9,.2+trust*.006+(buff?.support||0)+social+(w.world?.mode==='lucky'?.08:0))),success=rand(w)<probability;receipt.support={path:c.supportPath,trust,success};
      if(success){add({notes:6,slides:9,stress:-8});receipt.flavor=c.supportPath==='recover'?'部分文件和材料恢复了。但这半天用在了恢复上，原定的完整准备还没有做。':c.supportPath==='senior'?'师兄腾出了设备，你重新整理了思路。得到帮助不等于已经核对完材料。':'老师愿意帮助协调，也要求你说清现有缺口和后续安排。';if(c.supportPath!=='recover')c.career[c.supportPath]=2;}
      else{add({notes:-6,slides:-10,stress:9});receipt.failed=true;c.preparationGains={};receipt.flavor=c.supportPath==='recover'?'这次没能恢复材料。你先记下损失和需要重建的部分，原安排也没有完成。':c.supportPath==='senior'?'师兄眼下没有可借的设备。你需要另找办法，原定准备暂时停下。':'老师眼下没有接住这次求助。信任会影响回应，但不会保证支持；你仍需要自己安排下一步。';if(c.supportPath!=='recover')c.career[c.supportPath]=-2;}
    }
    if(c.mealPath){const okay=rand(w)>.2;receipt.meal={path:c.mealPath,okay};if(okay){add({energy:4,stress:-4});receipt.flavor='这顿饭比预想顺利，你把这段时间真正留给了吃饭和交流。';}else{add({energy:-4,stress:7});receipt.flavor=c.mealPath==='delivery'?'外卖来得比预想慢。这段等待挤掉了休息，恢复也没有想象得充分。':c.mealPath==='cook'?'做饭和收拾比预想费力。你吃上了饭，也用了更多精力。':'这顿饭碰上了一点不顺：队伍、口味或临时话题打乱了节奏。实际恢复比预想少。';}}
    if(location==='library'&&rand(w)<.05){add({notes:35,slides:8,energy:4});receipt.inspired=true;receipt.flavor=(receipt.flavor||c.flavor)+' 你忽然把几个线索接上了：茅塞顿开，找到了大量可继续核对的资料入口。资料增加，不代表每篇都已经精读。';}
    if(receipt.flavor&&w.socialWeek?.cast.senior?.name.endsWith('师姐'))receipt.flavor=receipt.flavor.replaceAll('师兄','师姐');return receipt;
  }
  const locations=[
    {id:'library-window',location:'library',title:'靠窗的位置，今天刚好空着',scene:'你可以读一点东西，也可以只是安静坐下。这里的时间不一定都得变成进度。',choices:[{text:'坐下来读一点闲书，让注意力慢慢回来。',effects:{energy:13,stress:-11},traits:{rest:1},career:{},preparationGains:{}},{text:'慢慢浏览一个课题线索，留下待核对的入口。',effects:{energy:7,notes:6,stress:-7},traits:{study:1},career:{},preparationGains:{literature:1}},{text:'找到几个材料来源后就离开，不把时间塞满。',effects:{energy:9,notes:4,stress:-8},traits:{rest:1},career:{},preparationGains:{literature:1}}]},
    {id:'library-walk',location:'library',title:'书架间没有人催你下一页',scene:'图书馆这一角很安静。你可以放松、浏览，或者让一条新线索带你走远一点。',choices:[{text:'随意走走，看看与课题无关的书。',effects:{energy:12,stress:-12},traits:{rest:1},career:{},preparationGains:{}},{text:'顺着书目找几个可查的线索，今天先不急着下结论。',effects:{energy:5,notes:8,stress:-6},traits:{study:1},career:{},preparationGains:{literature:1}},{text:'和同门交换书目，然后一起去吃饭。',effects:{energy:10,notes:3,stress:-9},traits:{collaboration:1,meal:1},career:{senior:2},preparationGains:{literature:1}}]},
    ...[
      ['friends-food','朋友说：走，去吃点好的','你们约了一个不用讨论进展的饭局，今天允许话题落在生活里。','一起吃顿饭，今晚不补工作。','吃完散步聊聊天，留一小段时间记明天的安排。','把聚会延长一点，接受今天少做一项。'],
      ['friends-film','周末的电影，终于不是别人推荐列表里的字','朋友买好了时间合适的场次，你也可以选择不把整晚都填满。','去看电影，之后安心回去休息。','看完一起聊聊，再回家写几句生活备忘。','把电影之后的夜晚也留给朋友。'],
      ['friends-walk','河边的路，不要求你解释误差条','朋友带来了零食。你们可以慢慢走，也可以找个地方坐下。','一起慢慢散步，不安排额外任务。','坐下聊聊各自的近况，顺便理一理下周的生活。','多待一会儿，把原来的补查留到明天。'],
      ['friends-game','这次输赢，终于没有导师评分','朋友们约了桌游。你能玩一局，也能玩到所有人都忘记看表。','玩几局就收工，给自己留出睡觉时间。','边玩边聊，结束后记下明天要做的事。','继续加赛，接受今晚少一点睡眠。']
    ].map(([id,title,scene,a,b,c])=>({id,location:'friends',title,scene,choices:[{text:a,effects:{energy:19,stress:-17},traits:{rest:1,meal:1},career:{senior:1},preparationGains:{}},{text:b,effects:{energy:13,stress:-13},traits:{rest:1,collaboration:1},career:{},preparationGains:{}},{text:c,effects:{energy:9,stress:-15},traits:{rest:1,late:1},career:{debt:1},preparationGains:{}}]}))
  ];for(const e of locations)for(const c of e.choices){c.flavor='你把这一段时间留给了生活。恢复有了实际回执，研究问题仍要靠之后的准备。';c.work={progress:0,quality:0};}
  const meals=[
    ['food-choice','今天这顿饭，想怎么吃？','食堂开着，外卖也能点。自己动手则要连收拾一起安排。','去食堂吃一份熟悉的饭。','点一份外卖，留在住处慢慢吃。','自己做一点，把时间也留给收拾。'],
    ['food-new','食堂今天有一道没见过的菜','窗口的牌子很诱人，排队的人却各有说法。','试试新菜，接受口味可能不合预期。','选熟悉的菜，吃完就回去休息。','找朋友分着尝，顺便聊聊生活。'],
    ['food-delivery','外卖页面上的时间，已经变了三次','你想省一点走路时间，平台却在测试你的耐心。','继续等外卖，今天先不安排别的事。','取消这次等待，去附近吃一顿。','和朋友合点一份，一起等也一起吃。'],
    ['food-cook','冰箱里还有能拼成一顿饭的东西','你可以简单做，也可以认真做一顿。买菜和清理都算在这一段里。','简单煮一点，给自己留出休息时间。','认真做一顿，接受它会花掉更多精力。','邀请朋友带一道菜，一起吃和收拾。'],
    ['food-boss','导师也站在你前面的窗口','他还没注意到你。这顿饭可以只是饭，也可以顺便开一个小话题。','打个招呼，找另一张桌安心吃饭。','坐在附近聊聊生活，不提额外承诺。','简短说明一个近况，约正式组会再谈。'],
    ['food-peer','同门把你叫到了旁边的空位','饭刚端上来，他问你这周还好吗。你可以聊天，也可以让午饭保持安静。','一起吃饭，只聊生活。','聊一个课题困惑，记下还需要核对的线索。','说明自己想安静吃完，约晚上散步。'],
    ['food-friends','朋友发来了一个饭局位置','地点有点远，但你们很久没一起好好吃饭了。','去见朋友，把这一段留给放松。','约在更近的地方，吃完散步一小会儿。','今天先自己吃，和朋友定好周末再见。'],
    ['food-late','你错过了正常饭点，但还得吃点东西','选择少了一点，空着肚子继续工作也不是一个好计划。','去找还开着的窗口，认真吃一份。','点外卖，边等边给自己留出空档。','简单做一点，吃完就休息。'],
    ['food-chat','饭桌上的话题，突然转到了你的课题','你刚夹起一筷子，就听见有人问“最近做得怎么样”。','说一句目前能确认的进展，再继续吃饭。','坦白有个问题卡住了，收集不同的线索。','说明午饭想休息，约正式讨论时再讲。']
  ];for(const [id,title,scene,a,b,c] of meals)locations.push({id,location:'food',title,scene,choices:[a,b,c].map((text,i)=>({text,effects:[{energy:15,stress:-10},{energy:12,stress:-12},{energy:10,stress:-9}][i],traits:{meal:1,rest:1},career:id==='food-peer'&&i===1?{senior:2}:{},preparationGains:id==='food-peer'&&i===1?{literature:1}:{},work:{progress:0,quality:0},flavor:'你给自己安排了一顿饭。',mealPath:id.includes('delivery')||text.includes('外卖')?'delivery':id.includes('cook')||text.includes('自己做')?'cook':'meal'}))});
  function friends(w,rand){if(!active(w)||!w.campus||w.status!=='life'||w.day<5||w.pending||w.campus.plan)return null;const options=locations.filter(e=>e.location==='friends'&&!w.seen.includes(e.id)),pool=options.length?options:locations.filter(e=>e.location==='friends'),e=pool[Math.floor(rand(w)*pool.length)];w.campus.plan={location:'friends',day:w.day,slot:w.slot,original:w.eventId};w.eventId=e.id;w.seen.push(e.id);return e;}
  function food(w,rand){if(!active(w)||!w.campus||w.status!=='life'||w.pending||w.campus.plan)return null;const options=locations.filter(e=>e.location==='food'&&!w.seen.includes(e.id)),pool=options.length?options:locations.filter(e=>e.location==='food'),e=pool[Math.floor(rand(w)*pool.length)];w.campus.plan={location:'cafe',day:w.day,slot:w.slot,original:w.eventId};w.eventId=e.id;w.seen.push(e.id);return e;}
  function context(w,ctx){const buff=buffs.find(b=>b.id===w.weekBuff);if(buff){for(const [k,v] of Object.entries(buff.meeting))ctx.deltas[k]=(ctx.deltas[k]||0)+v;ctx.weekBuff={title:buff.title,desc:buff.desc};}if(w.socialWeek)ctx.socialWeek=copy(w.socialWeek);return ctx;}
  function hint(w,c){if(!active(w))return '';if(c.supportPath)return c.supportPath==='recover'?'恢复能否成功，要等处理结果。实际数值选择后揭晓。':`是否获得${c.supportPath==='boss'?'导师':'师兄'}支持，受当前信任与当周余量影响。实际结果选择后揭晓。`;return c.continueOriginal===true?'处理突发后继续原事，会额外消耗精力。实际数值选择后揭晓。':c.continueOriginal===false?'原定安排会改变，完整准备不会自动完成。实际数值选择后揭晓。':'按你的安排推进这半天，实际数值选择后揭晓。';}
  function valid(w){return (!w.weekBuff||buffs.some(b=>b.id===w.weekBuff))&&(!w.surprise||(incidents.some(e=>e.id===w.surprise.id&&(!e.project||(window.MEETING_MIX?.routes(w)||[w.config.project]).includes(e.project)))&&w.surprise.day===w.day&&w.surprise.slot===w.slot));}
  function person(w,id){if(w.group)return window.MEETING_GROUP.person(w,id);return {...window.MEETING_CONTENT.people[id],...(id==='senior'?w.socialWeek?.cast.senior:{})};}
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function decorate(w,render,save){if(!active(w))return;const buff=buffs.find(b=>b.id===w.weekBuff),panel=document.createElement('section');panel.className='week-world';
    panel.innerHTML=`<div class="section-line"><h3>这周，大家也在过自己的生活</h3><span>${w.socialWeek?'本周抽签结果 · 随存档保留':'当前旧周继续 · 下周开启人物动态'}</span></div>${buff?`<p class="week-buff"><strong>🎲 本周增益：${esc(buff.title)}</strong><br>${esc(buff.desc)}</p>`:''}${w.socialWeek?`<div class="social-week">${['boss','stats','senior'].map(id=>`<article><strong>${esc(person(w,id).name)}</strong><p>${esc(w.socialWeek.events[id].text)}</p></article>`).join('')}</div>`:''}${w.status==='life'&&w.day>=5&&w.campus?`<div class="friend-plan"><button class="secondary" id="week-friends" ${w.pending||w.campus.plan?'disabled':''}>🧺 约朋友出去放松</button><span>饭局、电影、散步或桌游；占用这半天的生活安排。</span></div>`:''}`;
    if(w.status==='life'&&w.campus)panel.insertAdjacentHTML('beforeend',`<div class="friend-plan"><button class="secondary" id="week-food" ${w.pending||w.campus.plan?'disabled':''}>🍜 吃点什么 · 选一顿饭</button><span>食堂、外卖、自己做或饭桌相遇；占用这半天。</span></div>`);
    document.querySelector('.week-resources')?.after(panel);for(const id of ['friends','food']){const button=panel.querySelector('#week-'+id);if(button)button.onclick=()=>{if(window.MEETING_WEEK.useLocation(w,id)){save();render();document.querySelector('.life-scene')?.scrollIntoView({block:'start',behavior:'smooth'});}else window.MEETING_APP.toast(window.MEETING_WEEK.actionReason(w)||'当前条件还不满足，请查看此项的进度和开放时间。');};}
    const research=document.querySelector('.research-dashboard');if(research){const drawer=document.createElement('details');drawer.className='planning-drawer';drawer.innerHTML='<summary>📒 课题进度、校园环境与本周挑战 · 展开查看</summary>';research.before(drawer);for(const node of [...document.querySelectorAll('.campus-weather,.research-dashboard,.campus-details')])drawer.append(node);}
    if(window.innerWidth<=700){const social=panel.querySelector('.social-week');if(social){const details=document.createElement('details');details.className='world-news';details.innerHTML=`<summary>周老师：${esc(w.socialWeek.events.boss.text)} · 展开人物动态</summary>`;social.before(details);details.append(social);}}
    if(window.MEETING_WEEK.current(w)?.surprise)document.querySelector('.life-scene')?.classList.add('unexpected');
  }
  return {active,incidents,buffs,locations,init,prepare,event,roll,hint,valid,friends,food,context,socialState,socialEvents,casts,person,decorate};
})();
