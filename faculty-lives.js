/* Additional fictional life writing, tied to existing identities and dates; no player rewards. */
window.MEETING_FACULTY_LIVES=(()=>{
 const N=window.MEETING_NARRATIVE_WORLD,M=window.MEETING_MENTORS,D=window.MEETING_DIRECTIONS,V=window.MEETING_RESEARCH_VIGNETTES,P=N.pair,E=N.english;
 const origins=[
 ['最早的工位在邻组的一间办公室里，打印机和柜子都共用。第一届学生入学时，他带着两个人把旧目录重新编了一遍。晚上找不到纸，大家翻出一叠印坏的课程讲义，用背面记下第二天要查的东西。后来搬进自己的房间，那叠讲义也一起搬了过去。','The first desks were in a neighboring group’s shared office. The initial students reorganized old catalogs, using failed lecture printouts for notes. The paper pile moved with the group into its own room.'],
 ['建组以后并没有立刻换一套完整设备。旧团队留下的资料、外组介绍的入口和学院拨来的小额经费，分别由不同的人管理。一位学生花了两周才弄清楚谁管钥匙、谁能批准使用。那张联系人表后来贴在柜门里，比欢迎新生的幻灯片更常被翻看。','Building the group combined inherited records, external contacts and small university funds. A student spent two weeks identifying access responsibilities. The contact sheet inside a cabinet proved more useful than the welcome slides.'],
 ['团队扩张时，最难的不是多放几张桌子。新来的学生听不懂旧项目里那些缩写，旧成员又默认大家都知道来历。他安排过一轮很慢的报告，每个人只讲自己接手时最困惑的地方。有些旧争论因此重新冒出来，也有几项工作终于找到了可以交给新人的部分。','Expansion exposed the shorthand inherited from older projects. A slow reporting series about early confusion reopened debates and identified tasks newcomers could actually take on.'],
 ['一段时间里，组会借用别的团队的房间，开完还要把桌椅摆回原处。每次迟结束都会遇到下一场的人等在门口。后来有了固定会议室，大家却仍保留会前确认钥匙的习惯。资源增加以后，一些旧的谨慎没有消失，也不全是坏事。','Borrowed meeting rooms required restoring the furniture and ending before the next booking. Even after obtaining a permanent room, the group kept checking its key in advance.'],
 ['有一年项目到账延后，已经安排好的采购没有落实。老师没让学生一直等，而是把能先做的整理、试讲和小问题单列出来。那些工作未必都能成为文章，有一部分只是让下一轮开始时少走弯路。旧采购单仍在文件夹里，提醒人计划曾经如何变过。','Delayed funding halted planned purchases. The group separated small tasks that could proceed, some yielding only groundwork rather than papers. The old purchasing list records how the plan changed.'],
 ['一次毕业季过后，办公室突然安静下来。最熟悉平台的学生离开了，留下的说明里还有几处只有他本人看得懂。老师请毕业生回来讲了一下午，也让新生把不懂的地方直接圈出来。最后整理出的交接册没有想象中漂亮，真正能被下一位打开才是它的价值。','A graduation season exposed gaps in a departing student’s handover. An afternoon with the alumnus and newcomers produced an imperfect but usable guide.']
 ];
 const letters=[
 ['第一次交换稿件时，两人都以为对方会补上自己没有写的背景。合稿以后才发现，最重要的一段仍然空着。后来他们在邮件里逐项写清谁负责哪张表、谁解释哪一处差异。关系没有变得特别热闹，下一次合作反而少了很多猜测。','An exchanged draft revealed that each partner expected the other to supply the missing background. Explicit responsibilities made their quieter next collaboration easier.'],
 ['一封回复拖了很久，对方后来说明那周在处理学生答辩。原先被理解成冷淡的句子，放回日历里就没有那么神秘。两人没把误会当作友谊故事，只约定以后先说明最急的日期。直到现在，急件的标题里仍会写上希望哪天得到意见。','A delayed reply coincided with student defenses. Rather than romanticizing the misunderstanding, the partners began putting the needed reply date in urgent messages.'],
 ['讨论最激烈的一次不是因为谁不肯帮忙，而是双方对“完成”理解不同。一边指材料整理好了，另一边以为所有解释都查过了。会后他们把交付分成两次，第一次只交资料清单。那份很短的清单保留了双方还没同意的地方。','The sharpest disagreement concerned what completion meant. A two-stage delivery, beginning with an inventory, preserved unresolved interpretations.'],
 ['曾经一起申请一个小项目，没有获批。评议意见说合作关系写得很强，真正共同的问题却不够清楚。两人后来各自继续工作，隔了一年才在新材料上找到能一起做的一小段。旧申请书没有被当作失败证据销毁，仍用来比较当年想得有多大。','A joint proposal failed because partnership claims exceeded the shared question. A year later, new materials revealed a smaller collaboration; the old proposal remained for comparison.'],
 ['一篇合作稿接近提交时，有人建议把一位只帮忙联系过入口的人列进作者名单。两人讨论了很久，最后回到实际贡献，请当事人看一份明确的记录。对方没有生气，倒是提出可以补做一段分析。这件事没有变成万能范例，不同合作仍要重新谈。','A near-submission authorship discussion returned to actual contributions. A contact provider offered additional analysis rather than assuming authorship; later projects still required fresh agreements.'],
 ['他们经常在同一个问题上意见不同，但都知道对方会把自己没注意的一页读完。一度决定暂停共同署名，仍继续互相看短稿。学生起初以为合作结束就等于关系破裂，后来才发现，承认暂时不能共写也可能让讨论继续。','The partners paused joint authorship while continuing to read short drafts. Students learned that declining a shared paper need not end discussion.']
 ];
 const students=[
 ['有个新生第一次汇报准备了很多背景，到真正的问题时已经没时间。老师没有当场替他讲完，而是在散会后约了一次十分钟讨论。第二次汇报只保留两页，仍然紧张，却能说出自己在哪一步停住了。那份删掉的背景后来放进读书会资料，没有白做。','A newcomer’s background-heavy talk ran out of time. A later ten-minute discussion led to a two-slide report that identified the actual obstacle; the removed background became reading-circle material.'],
 ['一位学生一直担心没有漂亮结果，不愿把新稿拿出来。等老师第一次看到时，已经接近截止。两人后来重新安排，先讲一个能说明的小问题，原来的大题放到下一阶段。学生没有因此突然变得自信，只是开始在问题还很小的时候发邮件。','A student withheld an imperfect draft until a deadline approached. Narrowing the immediate question did not magically create confidence, but encouraged earlier emails.'],
 ['有学生指出，老师常用的一张示意图省掉了一个条件。老师先去找原文，下一次课把旧图和改后的图一起放出来。学生后来仍会在汇报时犹豫要不要提异议，组里也没有从此变成毫无压力的地方；至少这一次，问题被当作问题处理。','A student challenged an omitted condition in a familiar diagram. The next class compared old and corrected versions without pretending that speaking up would always feel easy.'],
 ['第一次带新生的人，比新生更怕出错。他把每个步骤都讲得很细，却忘了说明为什么要做这件事。老师听完以后让两个人交换着说一遍，各自补出对方以为已经知道的部分。那一周没有新增结果，之后的交接却顺畅了一些。','A novice mentor explained every step but not its purpose. Exchanging explanations revealed unstated assumptions; a result-free week improved later handovers.'],
 ['一位学生在申请季决定转向行业岗位。老师起初担心旧项目没人接，学生也担心自己的选择被理解为放弃。两次讨论后，他们列出毕业前必须交接的内容，另外一些问题允许停下来。离开的学生后来寄过一封近况邮件，没有把新工作写成科研失败的后续。','An industry career decision required separating graduation handover from questions that could stop. A later update described the new work on its own terms.'],
 ['有人同时答应了太多帮忙，自己的课题每周都说下次再推进。老师发现后没有简单要求他少社交，而是请他把已经答应的日期写在一起。最难撤回的一项并不是最大的工作，是那句随口说的“当然可以”。后来的安排从重新回复那封消息开始。','Overcommitment emerged from small promises as much as large tasks. Listing dates led to renegotiating the hardest casual acceptance first.']
 ];
 const traces=[
 ['办公室里有一本借阅过很多次的旧书，封底贴着历届学生写的提醒。老师记得其中几条是谁写的，另一些已经想不起来。新生总会把它当成最重要的书，读过以后才知道，它被留下也因为旁边那些认真又有点好笑的批注。','An often-borrowed old book carries student notes whose authors are partly forgotten. Its annotations matter as much as its text.'],
 ['书柜里有一只不再使用的旧硬盘，里面那轮项目已经归档。来访者偶尔问是不是还可以继续，老师会先找当年的清单。东西还在不意味着权限和条件也还在，只有少数部分适合重新开始。','An archived old drive invites questions about restarting work, but preserved files do not preserve permissions or conditions.'],
 ['桌上保留一张没有获选的海报。边角被胶带磨得发白，标题和现在的课题已经不一样。老师并不每次都拿它教育学生；有时候只是找别的东西时顺手卷起来，留出一点桌面。','An unsuccessful poster remains, without becoming a lesson every time; sometimes it is simply rolled aside to clear a desk.'],
 ['一个旧文件夹按月份排得很整齐，最后几个月却只有空白页。那段工作因为联系人离开暂停了。别人问起，老师会说当时没有继续，而不会用现在知道的结果重新替它编一个圆满结尾。','A neat monthly folder ends with blank pages after a contact left. The supervisor leaves the unfinished period unfinished.'],
 ['他不太擅长记住人情的宏大故事，却记得有人在雨天送回过借走的插线板。那时组里赶报告，所有人都很累。后来再谈帮忙，他常先问对方今天还有什么事，而不是先算一次帮助能换多少回报。','A returned extension lead on a rainy deadline day prompted questions about others’ schedules rather than favors owed.'],
 ['组里曾想把所有毕业合照贴成一面墙，后来发现有一年根本没拍齐。有人在外地，有人先去工作。那一格没有用别的照片填满，旁边贴了几张毕业生自己寄来的近况。','An incomplete graduation photo wall keeps one gap, accompanied by alumni updates rather than replacement pictures.']
 ];
 const arcs={
 compute:['一份运行说明没有跟着文件一起同步。','一个准备演示的同门发现，新机器上能跑完，结果却和旧图不一样。','两边的人先约了短会，把输入、环境和当时没写下的条件逐一放到桌上。','这条线可以走向一个能复跑的小例子，也可以因为旧设备无法恢复而停在明确的缺口。'],
 proof:['最后一页推导使用了前面没写明的条件。','另一位学生带来反例，定义的差异把原来一句很简单的判断拆开了。','导师愿意讨论有限情形，另一个合作人却仍期待一般结论。','后续可以留下一个更小的命题，或者把不能证明的推广作为问题保留。'],
 bench:['共享平台停机，使原定比较少了一个批次。','开放的新窗口很短，最需要复查的记录恰好不齐。','管理员和学生分别说明自己的安排，导师只能协调，不能创造额外空位。','故事的结果可以是一份有限范围的实查，也可以是花掉时间后仍未补齐的记录。'],
 clinical:['合作场景调整以后，两次资料的观察范围不再相同。','现场联系人刚交班，能答复的时间比组会原计划短得多。','学生需要在交付前说明资料来源与授权，合作方也要确认究竟希望回答哪个问题。','后续可能缩小到一个有依据的比较，也可能放弃整体判断，把缺口交回讨论。'],
 field:['原定访问对象临时取消，新的介绍人提出另一种安排。','新对象说出的经历改变了提纲，却不愿被当作整个群体的代表。','团队先确认转述范围，再决定是否继续联系；最精彩的一段也可能必须删掉。','故事可以留下一个被认真记录的个人经历，或因为访问窗口关闭而等到下一阶段。'],
 archive:['流传的转录缺了一处编辑说明，原件暂时没有开放。','一份新目录指向另一种版本，常用引文的来历开始不那么确定。','老师、学生与资料馆联系人各有能看到的部分，需要把出处逐步接起来。','后续可以恢复一个有限引用，也可以让两个解释并排留着，等待更完整的材料。'],
 survey:['委托方想问的新问题，与此前汇总的对象范围不同。','新旧表格看似整齐，实际口径发生变化。','团队讨论先交小表还是重新等待，不同合作人对按时完成的理解并不一样。','结果可能是一个范围清楚的建议，也可能是停止拼接，把未完成清单交回。'],
 environment:['天气关掉原地点的观察窗口，替代地点却不是同样的条件。','图上的空白被配色遮住，看起来完整的区域比真正看到的更大。','有人期待地图立刻用于展示，负责记录的人坚持留下缺测。','后续可以产生一张诚实的局部图，也可以因为窗口变化推迟到另一季。'],
 engineer:['共享台架不可用，合作方又更新了接口。','短窗口开放后，同一个输入在新旧说明里有不同含义。','学生、平台人员和合作方重新商量演示范围，大演示与小验证之间有真实取舍。','故事可能以一个有限演示结束，也可能退出现场，先处理交接与已知限制。'],
 design:['展位已排好，委托方却换了最初约定的受众。','新观众没有按预想方式使用作品，好评也不回答原来的问题。','团队需要决定保留过程稿、重做小原型，还是继续使用已经印出的标题。','后续可以是一次具体的改进，也可能只是承认这轮反馈不足，暂不宣布成熟。']
 };
 const arcEnglish=['An inherited condition or access problem appears.','A new person or record changes the interpretation.','The group negotiates a limited next step around actual schedules.','The outcome may be narrower work, a pause or an unresolved question; it is not guaranteed.'];
 const byRoute=new Map();for(const p of M.profiles)for(const route of p.routeIds||[]) {if(!byRoute.has(route))byRoute.set(route,[]);byRoute.get(route).push(p);}
 for(const p of M.profiles){const n=N.hash(p.id),d=D.find(p.directionIds[0]),q=V.forDirection(d),pool=(byRoute.get(d.route)||[]).filter(x=>x.id!==p.id&&x.name!==p.name),peer=pool[(n>>>3)%pool.length],home=N.schools.find(s=>s.name===p.biography.institution),year=Math.min(2026,Math.max(p.biography.timeline.find(x=>x.label==='加入现校').year,peer?.biography.timeline.find(x=>x.label==='加入现校').year||2025));
 const young=p.level==='young',originIndex=young?[0,1,3,4][n%4]:n%origins.length,studentIndex=young?[0,1,2,3,5][(n>>>8)%5]:(n>>>8)%students.length,traceIndex=young?[0,1,2,3,4][(n>>>15)%5]:(n>>>15)%traces.length,origin=P(...origins[originIndex]),student=P(...students[studentIndex]),trace=P(...traces[traceIndex]);
 p.biography.labHistory=P(home.campus+'里，'+p.name+'的团队研究'+q.topic+'。'+origin+'现在研究室的日常不只围着一个项目转：课程、学生的小题、平台排期和合作稿各有自己的日期。',()=>`At ${E(home.name)}, ${E(p.name)} works on ${E(q.topic)}. ${E(origin)} Courses, student questions, bookings and joint manuscripts run on separate calendars.`);
 p.biography.colleagues=P((peer?year+'年前后，'+p.name+'与'+peer.name+'在读书会和工作稿讨论中有了联系。':'与外组交换工作稿时，')+P(...letters[(n>>>4)%letters.length]),()=>`${peer?`Around ${year}, ${E(p.name)} exchanged drafts with ${E(peer.name)}. `:'In intergroup draft exchange, '}${E(P(...letters[(n>>>4)%letters.length]))}`);
 p.biography.studentMemory=P((young?'以下是一段新生培养与协助交接的经历，首批独立指导的学生仍在读。':'')+'谈起'+d.name+'的培养，'+p.name+'最常提起的不是学生拿过多少奖。'+student+'这段经历没有成为每个新生都必须重复的路线，后来来的人仍需要重新商量适合自己的题目和节奏。',()=>`${young?'The first independently supervised students remain enrolled. This episode concerns early training or assisted handover. ':''}When discussing training in ${E(d.name)}, ${E(p.name)} recalls more than awards. ${E(student)} Later students still negotiate their own question and pace.`);
 p.biography.privateTrace=young&&traceIndex===0?P('这本旧书和历届学生的书签来自此前参与的团队，是接手资料时一起带来的，并不表示自己已经培养过多届毕业生。'+trace,()=> 'The old book and bookmarks came from an earlier team during a materials handover; they do not imply several graduating cohorts under this faculty member. '+E(trace)):trace;
 const kind=N.resource(d.route),parts=arcs[kind]||arcs.survey;p.biography.storyLine=parts.map((text,i)=>({id:p.id+'-story-'+i,stage:i+1,text:P((i===0?'2026年，'+p.name+'的团队继续处理'+q.topic+'。':'')+text+(i===1?'讨论回到一个具体问题：'+q.problem+'。':i===2&&peer?' '+peer.name+'可能参与其中，但仍有自己的项目和截止。':''),()=>`${i===0?`In 2026, ${E(p.name)}’s team continues work on ${E(q.topic)}. `:''}${arcEnglish[i]}${i===1?` The issue is that ${E(q.problem)}.`:i===2&&peer?` ${E(peer.name)} may take part alongside other commitments.`:''}`)}));
 p.biography.relatedMentor=peer?.id||null;p.biography.colleagueSince=year;p.biography.labOriginIndex=originIndex;p.biography.studentMemoryIndex=studentIndex;p.biography.privateTraceIndex=traceIndex;p.biography.storyNote=P('这些是人物背景与可用的故事分岔，不是当前存档已经发生的事件。','These are character background and possible story branches, not events already completed in the current save.');
 }
 return {count:M.profiles.length,origins:origins.length,letters:letters.length,studentMemories:students.length,storyFamilies:Object.keys(arcs).length};
})();
