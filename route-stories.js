/* 学科长线：抽签固定在时间推进中，三个实际片段跨周，专属回执不能由通用资料替代。 */
window.MEETING_ROUTE_STORIES=(()=>{
  'use strict';
  const C=window.MEETING_CONTENT,copy=x=>JSON.parse(JSON.stringify(x)),clamp=x=>Math.max(0,Math.min(100,x)),tick=w=>(w.number-1)*14+w.day*2+w.slot;
  const rows=[
    ['compute','💻','复现机房的失踪文件',['data','statistics','electrical','communications'],
      ['电脑在复现前坏了。最后一次运行记录没同步，组员的机器上还有不同的环境。','设备可以用了，结果却与旧截图不一致：旧环境和新环境各有一个没有写进说明的条件。','合作方又发来一张更漂亮的结果图，希望你把它换进最终汇报。'],
      ['送修设备，尝试找回本次运行文件。','借同门的机器重建环境，约好后续交接。','把设备与进度缺口告诉导师，争取机房支持。'],
      ['比对两次运行的输入与记录，追踪不一致的条件。','在新机器上重做一个小例子，接受与旧截图不同。','请合作方只保留演示功能，放下复现结论。'],
      ['用最后一个片段复查记录，只发布实际重跑过的范围。','按原定演示时间交出漂亮图，后续再处理版本问题。','归还资源并交回未核对部分，保留小例子作为线索。'],
      ['旧环境的隐含条件','新环境的输入变化','合作方漏写的配置'],
      '“你这次复现用的是哪台机器、哪个版本，结果为什么变了？”','小例子终于能重跑','演示先毕业，记录还在读研','失踪文件成为了组会主角','不再替漂亮图背书'],
    ['proof','📐','一个假设离家出走',['theory','physics','astronomy','philosophy','military'],
      ['推导在最后一页断了：导师想要一般结论，你却发现一个边界情况没有覆盖。','另一位同学给出一个反例，你昨天使用的定义与对方使用的并不相同。','导师从研讨会带回一个更大的猜想，问能否顺手把你的结论推广过去。'],
      ['借阅完整原文，找回被省略的假设。','请同门陪你检查反例，约好交换一份推导。','带着断点请导师讨论，争取缩小命题。'],
      ['回到原定义逐项检查反例成立的条件。','重建一个有限情形，接受结论暂时不一般。','暂停命题证明，改交一个问题与反例索引。'],
      ['复核有限情形的每一步，保留推广为未解决问题。','先宣布一般形式成立，把反例留到问答再解释。','收回一般结论，交出反例与后续问题。'],
      ['省略的边界条件','两份不同的定义','推广中新增的假设'],
      '“这个反例为什么没有推翻你现在讲的命题？”','命题变小，推导变长','一般结论先开了庆功会','反例坐在了第一排','猜想获得了未完待续'],
    ['bench','🔬','排期表上的消失工位',['classic','chemistry','materials','pharmacy','food','veterinary'],
      ['共享设备临时停机，原先安排的材料核对没做成。隔壁组也在排队。','设备排期恢复了一小段，但你保存的两份记录在同一条件上对不上。','组里想把这份材料赶进阶段总结，设备管理员却提醒可用时间又缩短了。'],
      ['申请付费维护窗口，接受经费可能不够。','借同门的排期与设备入口，约好归还时间。','把排期问题报告导师，争取共同协调。'],
      ['在有限窗口内对照原记录，查清哪一份漏了条件。','换一个更小的核对目标，重新建立记录。','把设备问题交接给共享平台，暂停阶段结论。'],
      ['把最后窗口留给复核，只报告这一版确认过的部分。','用旧记录填满阶段总结，先占住展示名额。','释放排期，交出尚未完成的部分和已有线索。'],
      ['共享设备的状态差异','记录中的条件缺页','排期缩短后的范围变化'],
      '“设备恢复之后，你实际检查过哪份记录，条件一致吗？”','一个小窗口留下了真记录','排期表比成果先上墙','旧记录被设备管理员认了出来','工位归还，问题保留'],
    ['clinical','🏥','合作窗口突然改期',['clinical','nursing','publichealth','psychology','sports'],
      ['合作场景临时改期，原本能对照的材料只来了一部分，周五却仍要讲进展。','合作方补来一份汇总，但两次记录的观察范围不同，不能直接拼在一起。','对方希望你给出一个能立刻使用的判断，手里的材料却只支持有限场景。'],
      ['申请整理支持，尝试补齐缺少的记录。','请熟悉现场的同门协助对接，约好帮对方整理材料。','向导师说明窗口变化，争取重谈交付范围。'],
      ['对照两次记录的来源和观察范围，保留差异。','只重建一个范围清楚的小样例，不合并全部材料。','把应用判断交回合作方，先做场景问题清单。'],
      ['复核小范围材料，把不能外推的部分明确写出。','按对方需求直接给出整体判断，之后再补说明。','交回应用任务，保留这次沟通与缺口记录。'],
      ['观察窗口的差别','汇总时遗漏的范围','临时使用需求的变化'],
      '“合作窗口改过之后，你的判断还能适用于哪些场景？”','场景变窄，解释更清楚','合作方把草稿贴成了指南','窗口改了，结论没有改','这次只交付问题清单'],
    ['field','🎙️','约好的访问人不见了',['field','anthropology','sociology','education','journalism'],
      ['约好的访问对象临时取消。另一位联系人愿意替你介绍人，但希望你先帮忙做件事。','新联系人讲出了完全不同的故事。你原先的提纲把一个重要情境写得太简单。','对方愿意继续聊，却不希望自己的话被当作所有人的共同经验。'],
      ['申请交通与重新预约支持，等待新的访问窗口。','接受同门的联系人介绍，约好把整理经验分享回去。','把取消情况告诉导师，争取调整访问问题。'],
      ['对照两次记录的情境，检查提纲漏掉了什么。','重新整理一个人的完整经历，放弃代表所有人。','暂停访问结论，把联系与取消记录交接清楚。'],
      ['回到记录复核语境，只保留当事人同意的表达范围。','用最精彩的一段故事代表整个群体。','交回后续访问，留下尚未确认的解释。'],
      ['提纲默认的共同经历','新联系人不同的处境','转述时丢失的语境'],
      '“新联系人和原来的人不同，为什么能沿用同一个解释？”','一个人的故事有了语境','你替整个群体接受了采访','访问对象回来纠正了你','没有把取消写成发现'],
    ['archive','📜','两份原件各说各话',['humanities','history','archaeology','law','languages','politics'],
      ['资料室限时关闭，你只有一份转录。导师希望这周能讲出处，而原件还没看到。','原件终于开放，却与流传的转录差了一个关键词。另一份版本又用了不同措辞。','展览或报告想用其中最顺口的一句话，索引却显示它来自后来的编辑。'],
      ['申请复制与预约支持，尝试回到原件。','借同门的索引与预约机会，约好补一份版本表。','请导师协调资料入口，说明只能暂缓引用。'],
      ['对照原件、转录和编辑说明，查清关键词的来路。','重建一个较短的版本索引，不急着裁定所有解释。','暂停引用，把入口与未看过的页码交回。'],
      ['复查这次实际看过的版本，只引用能追溯的那段。','选最顺口的一句放进报告，版本差异留到以后。','撤下争议引用，把两种解释并列留给后续。'],
      ['转录中丢失的一个词','不同版本的编辑痕迹','后人补入的解释'],
      '“这句话到底来自原件、转录，还是后来的编辑？”','一条引用终于找到了家','脚注获得了主讲资格','原件当场不同意你的转述','两个版本暂时并排坐着'],
    ['survey','📋','委托方临时换了问题',['economics','management','publicadmin'],
      ['委托方临时改了想知道的问题，已经整理的材料没有对应的新范围。','合作方发来新的汇总口径。新旧数字看起来能拼，实际描述的对象却不同。','交付时间到了，对方希望你给出一个明确建议，导师还想把它扩展成下一份项目。'],
      ['申请补充整理资源，重排交付范围。','向同门借一份整理模板，约好帮忙处理对方的旧表。','把需求变化告诉导师，争取重新谈一个小交付。'],
      ['对照两种口径，列清不能直接比较的部分。','重做一个小范围表格，只解释同一种口径。','停止拼接，把新需求交回委托方确认。'],
      ['复核小表和适用范围，只交出条件明确的建议。','把拼好的大表作为完整依据，先按时提交。','撤回建议，交付口径差异与未完成清单。'],
      ['汇总对象发生变化','委托方更换了口径','建议适用范围被扩大'],
      '“委托方换过问题之后，这张表还在回答原来的问题吗？”','小表回答了一个真问题','大表赢得了最整齐版面奖','两个口径在组会撞车','委托终于承认改过需求'],
    ['environment','🗺️','天气改写了观察计划',['earth','environment','geography','agriculture'],
      ['天气让原定观察窗口关闭，另一处地点仍可去，但它与旧地点的条件并不相同。','两处观察的时间与尺度不一致。一张合成地图看起来完整，实际空缺被颜色盖住。','合作方想把地图用于更大的区域，你却只有局部、错开时间的记录。'],
      ['申请改期与交通支持，等待原地点窗口。','借同门的观察入口，约好分享一份地点说明。','向导师说明天气限制，争取改变观察范围。'],
      ['对照地点、时间与尺度，把空缺单独标出来。','重建一个局部地图，只保留相同窗口的记录。','停止区域拼接，整理改期与缺测的说明。'],
      ['复核局部记录，只解释这一块区域和时段。','把完整配色图当作全区域结果先交出去。','撤下区域结论，保留缺测图和后续安排。'],
      ['观察时段的错位','地图中未标出的缺测','区域尺度被扩大'],
      '“天气和地点都变过，这张地图哪些地方真的观察过？”','缺测终于拥有自己的颜色','图例成为了全组最完整的成果','天气在地图外提出了异议','一块空白留下了下次入口'],
    ['engineer','⚙️','演示前夜的接口变更',['mechanical','automation','energy','civil','aerospace'],
      ['共享台架临时不可用，合作方同时更新了接口。原先的演示程序无法直接连接。','台架有了短窗口，但新旧接口对同一个输入的解释不同，演示只能跑一部分。','合作方邀请你参加完整演示，临时又加了一个没有检验过的使用条件。'],
      ['申请维护和替代台架支持，尝试保住原定验证。','借同门的台架与适配入口，约好负责一次交接。','向导师报告接口改动，争取缩小演示范围。'],
      ['对照接口说明与台架记录，查清输入含义的变化。','搭一个小演示，重新检查有限使用条件。','暂停完整演示，把接口问题交回合作方。'],
      ['复核小演示，只展示实查过的输入与条件。','按完整演示名单上台，把新条件留到现场再说。','归还台架并退出大演示，交出已知接口限制。'],
      ['接口输入含义改变','台架状态与说明不同','现场新增使用条件'],
      '“新接口和新条件加入后，你实际验证过哪一段？”','小演示顺利下台','接口说明拿到了最佳表演奖','台架替你回答了一个坏消息','退出演示，保住了边界'],
    ['design','🎨','甲方改掉了第一版需求',['art','music','design','architecture'],
      ['展示前，合作方突然换了受众。原来的设计很完整，却没有为新使用情境做过核对。','同门介绍了试看的观众。大家夸的点不同，其中一个人根本没按预想方式使用作品。','合作方想把作品包装成面向所有人的成熟方案，展位和评审时间都已经排好。'],
      ['申请小范围试看资源，尝试保留一次反馈机会。','借同门的展示与试看入口，约好帮忙布置。','向导师说明需求变化，争取改成过程展示。'],
      ['对照实际使用记录，查清好评与预想为何不同。','重做一个小原型，只解决一种具体使用情境。','暂停成熟方案，改交需求变化与迭代草稿。'],
      ['复核小原型的反馈，只展示实际覆盖的情境。','按展位标题宣布适合所有人，把限制留给问答。','撤掉成熟方案标签，用过程稿参加展示。'],
      ['受众改变后的使用方式','好评没有说明的情境','展览标题扩大了范围'],
      '“观众说好看，能证明它解决了新受众的问题吗？”','小原型收到了具体反馈','作品标题比作品先获奖','甲方在评审时又换了甲方','过程稿也能占一个展位']
  ];
  const stories=rows.map(([id,icon,title,routes,scenes,opening,middle,final,twists,question,success,funny,failure,open])=>({id,icon,title,routes,scenes,opening,middle,final,twists,question,endTitles:{verified:success,claimed:funny,exposed:failure,withdrawn:open}}));
  for(const d of window.MEETING_MEDICAL?.routes||[])stories.find(s=>s.id===d.resource)?.routes.push(d.id);
  const statuses={open:'仍有后续',verified:'完成专属复核',claimed:'超出记录交付',exposed:'组会揭穿了缺口',withdrawn:'主动交回范围',expired:'后续窗口已关闭'};
  const find=id=>stories.find(d=>d.id===id),forRoute=route=>stories.find(d=>d.routes.includes(route));
  function ensure(w){if(w.config.uncertainty===false||(w.config.rulesVersion==='08'||w.config.challenge&&!w.config.rulesVersion))return null;return w.routeStories||(w.routeStories={version:1,active:null,history:[],seen:[],plan:null,lastStarted:0});}
  function init(w,previous){if(w.config.uncertainty===false||(w.config.rulesVersion==='08'||w.config.challenge&&!w.config.rulesVersion))return;const old=previous?.routeStories;w.routeStories=old?copy(old):{version:1,active:null,history:[],seen:[],plan:null,lastStarted:0};w.routeStories.plan=null;expire(w);}
  function finish(w,t,status){const a=w.routeStories;t.status=status;t.finished=w.number;a.history.push(copy(t));a.history=a.history.slice(-10);a.active=null;a.plan=null;}
  function expire(w){const a=w.routeStories,t=a?.active;if(!t||tick(w)<=t.deadline)return;if(t.partnerId&&t.loan){window.MEETING_GROUP.trust(w,t.partnerId,-5);t.loan=false;}t.log.push({week:w.number,action:'expired',text:'你没有在后续窗口中实际投入时间，故事保留缺口并停止等待。'});finish(w,t,'expired');}
  function start(w,rand,route=null){const a=ensure(w);if(!a||a.active||a.lastStarted===w.number)return null;const p=w.world?.artifact,selected=route||p?.route||window.MEETING_MIX?.route(w)||w.config.project,d=forRoute(selected);if(!d)return null;const peers=w.group?.members.filter(m=>m.rank!=='mentor')||[],mentor=w.group?.members.find(m=>m.rank==='mentor');const partner=peers.length?peers[Math.floor(rand(w)*peers.length)]:null;
    const t={id:d.id,instance:'rs-'+w.number+'-'+tick(w)+'-'+selected,route:selected,direction:p?.direction||null,projectVersion:p?.version||1,started:w.number,step:0,next:tick(w),deadline:tick(w)+42,status:'open',twist:Math.floor(rand(w)*d.twists.length),mentorId:mentor?.id||null,partnerId:partner?.id||null,branch:null,access:false,checked:false,scope:'original',loan:false,source:null,log:[]};a.active=t;a.lastStarted=w.number;a.seen.push(d.id);a.seen=a.seen.slice(-10);return t;
  }
  function build(w,t,rand){const d=find(t.id),g=w.group,mentor=g?.members.find(m=>m.id===t.mentorId),peer=g?.members.find(m=>m.id===t.partnerId),n=w.world?.npcs[mentor?.id],p=C.projects.find(p=>p.id===t.route);let scene=d.scenes[t.step];
    scene+=' 当前学科：'+p.name+'。';if(t.direction)scene+=' 这份材料属于「'+window.MEETING_DIRECTIONS.find(t.direction).name+'」。';if(t.step===0)scene+=(g?.balance<=20?' 组里经费紧，付费入口不一定能落实。':g?.balance>=65?' 组里有资源余量，但窗口和排期仍不保证。':' 资源需要与本周其他安排共用。')+(peer?' '+peer.name+'可以联系，但也有自己的安排。':' 组里没有可借用入口的同门。')+(n?.mood<0?' 导师这周余量紧，求助可能要等。':'');
    if(t.step>0)scene+=' 前一段实际结果：'+t.log.at(-1).text+' 这次新发现：'+d.twists[t.twist]+'。';if(t.loan)scene+=' 借来的入口仍欠一次具体交接；最后一段会处理。';
    const texts=t.step===0?d.opening:t.step===1?d.middle:d.final,actions=t.step===0?['resource','peer','mentor']:t.step===1?['trace','rebuild','stop']:['verify','claim','release'];const choices=texts.map((text,i)=>({text,routeAction:actions[i],routeInstance:t.instance,routeStep:t.step,effects:{},traits:{},career:{},work:{},preparationGains:{},continueOriginal:false,flavor:'结果和后续在行动后揭晓。'}));for(let i=choices.length-1;i>0;i--){const j=Math.floor(rand(w)*(i+1));[choices[i],choices[j]]=[choices[j],choices[i]];}
    return {id:t.instance+'-'+t.step,day:w.day,slot:w.slot,project:t.route,routeStory:true,title:d.icon+' 学科长线 · '+d.title+' · '+(t.step+1)+'/3',scene,choices};
  }
  function prepare(w,rand){const a=ensure(w);if(!a)return;expire(w);a.plan=null;if(w.day===4)return;let t=a.active;if(!t&&w.day===1&&w.slot===0)t=start(w,rand);if(t&&tick(w)>=t.next)a.plan=build(w,t,rand);}
  function event(w,raw){const plan=w.routeStories?.plan;if(!plan||!raw||w.campus?.plan||w.world?.focus||raw.joint||raw.choices?.some(c=>c.assignmentAction||c.groupAction))return raw;return copy(plan);}
  function canDispatch(w){const a=w.routeStories;if(!w.world||(w.config.rulesVersion==='08'||w.config.challenge&&!w.config.rulesVersion)||(w.day===0&&w.slot===0&&!w.group?.news.handled)||w.status!=='life'||w.day===4||w.pending||w.campus?.plan||window.MEETING_ASSIGNMENTS?.offer(w))return false;return a?.active?tick(w)>=a.active.next:a?.lastStarted!==w.number;}
  function dispatch(w,rand){if(!canDispatch(w))return false;const a=ensure(w),t=a.active||start(w,rand);if(!t)return false;a.plan=build(w,t,rand);w.campus.plan={day:w.day,slot:w.slot,location:'route-story',original:w.eventId};return true;}
  function current(w,raw){return w.campus?.plan?.location==='route-story'?copy(w.routeStories.plan):event(w,raw);}
  function resolve(w,e,c,effects,rand){if(!e.routeStory)return null;const a=w.routeStories,t=a?.active;if(!t||c.routeInstance!==t.instance||c.routeStep!==t.step)return null;const d=find(t.id),g=w.group,mentor=g?.members.find(m=>m.id===t.mentorId),peer=g?.members.find(m=>m.id===t.partnerId),mn=w.world?.npcs[mentor?.id],pn=w.world?.npcs[peer?.id],style=mentor?.mentorStyle;const add=o=>{for(const [k,v] of Object.entries(o))effects[k]=(effects[k]||0)+v;};let text='',success=false,spend=0,trust=0;const action=c.routeAction;
    if(t.step===0){t.branch=action;add({energy:-7,stress:3});if(action==='resource'){spend=Math.min(g?.balance||0,10);if(g)g.balance=clamp(g.balance-spend);success=rand(w)<Math.max(.08,Math.min(.92,.12+spend*.055+(g?.balance>=55?.14:0)-(t.twist===0?.08:0)));text=success?'资源入口落实了，但只恢复了一部分材料；下一段仍需查清差异。':'花掉的时间没有换来完整入口，旧材料的缺口还在。';}
      else if(action==='peer'){success=!!peer&&rand(w)<Math.max(.06,Math.min(.93,.18+peer.trust*.006+(window.MEETING_ACADEMY?.support(w,peer.id)||0)+(pn?.mood||0)*.06-(pn?.goal==='paper'||pn?.goal==='job'?.1:0)));t.loan=success;trust=success?2:-1;if(peer)window.MEETING_GROUP.trust(w,peer.id,trust);text=success?'同门借出了自己的入口；你约好最后实际交接，帮助没有自动完成材料核对。':peer?'同门自己的安排接不住这次借用，你需要另找一个较小的办法。':'组里没有可借用的同门，这次只能留下请求再另做安排。';}
      else{success=!!mentor&&rand(w)<Math.max(.06,Math.min(.94,.16+mentor.trust*.006+(window.MEETING_ACADEMY?.support(w,mentor.id)||0)+(mn?.mood||0)*.07+(window.MEETING_MENTORS?.levels[mentor.level]?.access||0)+(['warm','collaborative','explorer'].includes(style)?.15:0)-(['strict','deadline'].includes(style)?.08:0)));if(mentor)window.MEETING_GROUP.trust(w,mentor.id,success?1:-2);text=success?'导师接住了求助，协调了一个小窗口；同时要求你下次讲清具体范围。':'导师这次没能协调入口，希望你先拿出一个可以缩小的安排。';}
      t.access=success;if(!success)add({stress:6});t.step=1;t.next=tick(w)+3;
    }else if(t.step===1){add({energy:-10,stress:4});if(action==='stop'){t.scope='stopped';add({stress:-7,energy:3});text='你交回了大范围结论，保留问题清单；下周仍要实际处理交接。';}
      else{t.scope=action==='rebuild'?'small':'original';success=rand(w)<(action==='rebuild'?.78:t.access?.83:.35)-(t.twist===1?.1:0);t.checked=success;t.access=t.access||success;add({notes:success?6:2,stress:success?-2:3});text=success?(action==='rebuild'?'你重建了一个较小的材料片段，发现旧范围不能照搬。':'你追到了不一致的来路，原来的材料现在有了范围说明。'):'这一段发现了差异，但还没拿到能逐项复核的完整材料。';}t.step=2;t.next=Math.max(tick(w)+3,w.number*14);
    }else{add({energy:-9,stress:3});if(action==='verify'){const same=w.world?.artifact.version===t.projectVersion&&w.world?.artifact.direction===t.direction;success=t.checked&&t.scope!=='stopped'&&same&&rand(w)<(t.scope==='small'?.88:.7)-(t.twist===2?.12:0);if(success){t.source={kind:'record',level:2,route:t.route,version:t.projectVersion,direction:t.direction,week:w.number,day:w.day,eventId:e.id,action:c.text,instance:t.instance};text='三段实际工作接上了。这条长线获得专属复核记录，只支持保存的学科、方向和课题版本。';add({notes:7,stress:-4});}else{text=same?'最后复核没有补齐缺口，这次只能报告实际做到的部分。':'课题已经转向新版本，旧长线材料只能留作旧问题的线索。';add({stress:5});}t.status=success?'verified':'withdrawn';}
      else if(action==='claim'){t.status='claimed';add({slides:9,energy:4,stress:-3});text='交付看起来完成了，记录却没覆盖宣布的范围。周五会沿这条长线继续追问。';}
      else{t.status='withdrawn';add({energy:5,stress:-6});text='你交回没有确认的范围，留下实际材料和问题。展示机会可能让给别人，缺口也没有被隐藏。';}
      if(t.loan&&peer){const returned=action!=='claim';window.MEETING_GROUP.trust(w,peer.id,returned?4:-7);t.loan=false;add({energy:returned?-4:0,stress:returned?1:7});text+=returned?' 你用本片段完成了借用入口的交接。':' 你跳过了约好的交接，同门开始追问自己的安排。';}t.log.push({week:w.number,action,text,success,spend});finish(w,t,t.status);
    }
    if(c.routeStep!==2)t.log.push({week:w.number,action,text,success,spend});for(const id of [action==='peer'?peer?.id:action==='mentor'?mentor?.id:null])if(id&&w.world?.npcs[id]){const n=w.world.npcs[id];n.memory.push({week:w.number,action:success?'help':'handoff',task:d.title});n.memory=n.memory.slice(-8);}
    return {id:t.id,instance:t.instance,step:c.routeStep,action,status:t.status,text,success,spend};
  }
  function context(w,ctx){if(w.routeStories)ctx.routeStories=copy(w.routeStories);return ctx;}
  function selected(s){const a=s.weekContext?.routeStories;if(!a)return null;return a.active||a.history.findLast(t=>t.finished===s.weekContext.number)||null;}
  function scheduled(s){return s.live&&!s.wrapUp&&!s.routeStoryAsked&&s.choicesMade>=5&&selected(s)?{id:'route-story-question',phase:6}:null;}
  function question(s){if(s.eventId!=='route-story-question')return null;const t=selected(s),d=find(t.id),p=s.weekContext.world?.artifact,full=t.status==='verified'&&t.source?.instance===t.instance&&t.source.version===p?.version&&t.source.direction===p?.direction;return {id:s.eventId,phase:6,who:t.branch==='peer'?'senior':'boss',project:t.route,title:d.question,scene:'学科长线：'+d.title+'。实际状态：'+statuses[t.status]+'。'+(t.log.at(-1)?.text||'后续还没有实际处理。'),quote:'“讲这件事实际怎么处理，不要用另一份资料替代。”',choices:[{text:'打开这条长线的专属复核记录，解释差异与当前范围。',routeAnswer:'receipt',effects:{evidence:5,patience:1,time:-3},flags:{rigor:1},approach:'detail',prepared:{kind:'record',route:t.route,minimum:2,level:full?2:0,available:full,source:copy(full?t.source:null),reason:'需要本条长线的实际复核记录，且仍属于当前方向与课题版本。'},result:'这次回答接上了前几天的真实工作。',flavor:'资源入口、人情和复核分别有记录。'},{text:'按实际处理顺序说明缺口，提出一个更小的后续范围。',routeAnswer:'boundary',effects:{evidence:-3,patience:1,time:-2},flags:{honest:1},approach:'cautious',result:'处理经过被说明了，缺口仍保留。',flavor:'这次没有专属依据的部分不会因为解释而自动完成。'},{text:'按交付时的完整版本讲，先把场面撑过去。',routeAnswer:'claim',routeClaimValid:full,effects:{slides:0,mood:3,patience:-2,time:-2},flags:{chaos:1,debt:1},approach:'direct',risk:{chance:full?.2:1,effects:{evidence:-14,patience:-9},flavor:'追问落在这条长线没做过的那一段，完整交付的说法被揭穿。'},result:'你把处理结果讲得超过了记录。',flavor:'现场会回到具体入口、条件和交接。'}]};}
  function afterAnswer(s,e,c,record){if(e.id!=='route-story-question')return;s.routeStoryAsked=true;const t=selected(s);record.routeStory={instance:t.instance,answer:c.routeAnswer};s.routeStoryResult={id:t.id,instance:t.instance,status:c.routeAnswer==='claim'&&!c.routeClaimValid?'exposed':t.status,answer:c.routeAnswer};}
  function afterMeeting(w,s){if(!w.routeStories||!s.routeStoryResult)return;const a=w.routeStories,t=[a.active,...a.history].find(t=>t?.instance===s.routeStoryResult.instance);if(t&&s.routeStoryResult.status==='exposed'){t.exposed=true;t.log.push({week:w.number,action:'question',text:'组会追到专属材料，超出记录的说法被点名。'});}}
  function ending(s){if(s.wrapUp!==2||!s.routeStoryResult)return null;const r=s.routeStoryResult;if(r.status==='exposed')return 'route-'+r.id+'-exposed';if(r.status==='verified'&&r.answer==='receipt')return 'route-'+r.id+'-verified';if(r.status==='claimed')return 'route-'+r.id+'-claimed';if(['withdrawn','expired'].includes(r.status)&&r.answer==='boundary')return 'route-'+r.id+'-withdrawn';return null;}
  for(const d of stories)for(const [status,title] of Object.entries(d.endTitles))C.endings.push({id:'route-'+d.id+'-'+status,kind:status==='exposed'?'failure':status==='claimed'?'funny':'open',icon:d.icon,title,subtitle:'同一条长线，前几天的处理终于接上了组会。',desc:{verified:'入口、差异和复核有了连续记录，能讲的范围很小，却有实际依据。',claimed:'交付的外观很完整，专属记录还有缺口；热闹与后续解释一起留下。',exposed:'完整交付的说法遇到了没做过的那一段，组会把前几天省下的工作追了回来。',withdrawn:'你付出时间说明并交回范围，保留线索；这段故事可以留给后续重新开始。'}[status],hint:'完成对应学科长线，并在组会沿实际状态回应。'});
  function valid(w){const a=w.routeStories;if(!a)return true;const ok=t=>!!t&&!!find(t.id)&&C.projects.some(p=>p.id===t.route)&&forRoute(t.route)?.id===t.id&&[0,1,2].includes(t.step)&&Object.hasOwn(statuses,t.status)&&Number.isInteger(t.next)&&Number.isInteger(t.deadline)&&Number.isInteger(t.projectVersion)&&t.projectVersion>=1&&typeof t.instance==='string'&&[0,1,2].includes(t.twist)&&Array.isArray(t.log)&&t.log.length<=10&&(!t.source||t.source.instance===t.instance&&t.source.level===2);return a.version===1&&Array.isArray(a.history)&&a.history.length<=10&&a.history.every(ok)&&(!a.active||ok(a.active)&&a.active.status==='open')&&Array.isArray(a.seen)&&a.seen.length<=10&&Number.isInteger(a.lastStarted)&&(!a.plan||a.plan.routeStory&&a.plan.choices.length===3);}
  return {stories,statuses,find,forRoute,init,prepare,start,build,event,current,dispatch,canDispatch,resolve,context,scheduled,question,afterAnswer,afterMeeting,ending,valid,expire,selected};
})();
