/* 体量扩展包：独立问题、日常与后续结局。虚构情景只服务游戏。 */
window.MEETING_EXPANSION=(()=>{
  'use strict';
  const C=window.MEETING_CONTENT,L=window.MEETING_LIFE_SURPRISES;
  const copy=x=>JSON.parse(JSON.stringify(x));
  C.extraFlags=[...new Set([...(C.extraFlags||[]),'repair','detour','overreach','sidequest',...C.projects.map(p=>'journey_'+p.id)])];
  // 六个新增问题与前面的三个问题共同构成九条学科事件链。
  const routes=[
    ['classic',['图片裁切遮住了对照区域','样本来源少记了一次交接','阴性结果没有出现在汇报里','不同批次的观察被直接合并','同门发现图注和记录不一致','观察条件变化后原结论不再成立'],['实验室进入补号模式','猫替记录做了封面','先把这一批看明白','一张能对回记录的图']],
    ['data',['训练集里混入了测试材料','基线模型比新方法还好','演示网页在断网后无法使用','运行时间没有计入前处理','提示词改变后输出不稳定','许可证限制了原定演示方式'],['代码正在解释第二个异常','模型申请了年休假','先修一条可复现路径','终于有别人跑通了它']],
    ['theory',['引理只能在更强条件下成立','一个无穷操作没有交换依据','符号在两页之间悄悄换了含义','特例不能推出一般结论','证明依赖另一个尚未证明的命题','数值例子看似支持却不能完成证明'],['黑板暂时收回了等号','附录成为第二间会议室','把命题缩到能够证明','补上的条件终于站住了']],
    ['field',['观察者的位置改变了访谈回答','匿名化后关键语境消失','两次入场面对不同的群体规则','沉默被误解成一致赞同','同门对同一段叙述做出相反编码','研究问题被新发现带去了另一处'],['田野记录要求重新排队','录音笔获得全勤奖','让材料先讲自己的故事','一段解释找到了来处']],
    ['clinical',['纳入条件在两张表里不同','随访缺口集中在一类病例','时间顺序不支持原先的解释','同一人的多张图被当成多个人','终点定义在中途换过一次','一项缺失记录影响了关键比较'],['病例清单申请延期汇报','排班表成为通讯作者','先把一份清单核对完','终于数清了独立的病例']],
    ['physics',['近似条件超出了原来的范围','测量方向改变了信号幅度','背景扣除方式左右了主要趋势','理论量与仪器读数不是同一对象','时间采样没有覆盖快速变化','漂亮拟合掩盖了系统偏差'],['标定记录要求重新开场','误差条领取了主角奖','先确认仪器看到了什么','小信号有了可靠的边界']],
    ['chemistry',['同名材料来自不同批次','谱峰归属有两种竞争解释','处理前后的条件没有一一对应','图里只保留了最好的一次结果','保存时间可能改变材料表现','一种杂质解释了原先的亮点'],['瓶签开始主持核对会议','样品请求按字母毕业','先把一个峰解释清楚','材料终于对应上了谱图']],
    ['economics',['变量的单位在两个时期改变','样本选择遗漏了一种关键群体','政策时间与结果变化对不上','标准误口径与抽样层次不同','控制变量可能改变目标解释','更换时间窗口后估计不稳定'],['回归表进入补充说明期','显著性星号组成了星座','先回答一个有限的问题','识别条件终于写在第一页']],
    ['humanities',['叙述者的话被当成作者判断','译本差异影响了核心概念','章节顺序改变了文本解读','一条脚注引用了未核对的转述','反例文本被排除在选材之外','修辞分析没有接上主要论点'],['正文等待脚注的证词','脚注成立了自治委员会','先把一段文本读透','论点终于能带着出处走路']],
    ['art',['访谈需求与设计目标不一致','信息层级让重要按钮被忽略','设计稿没有覆盖低视力使用者','用户任务与评分标准不对应','甲方临时改变了作品投放媒介','不同版本没有记录修改理由'],['第七版仍然没有定稿','第一版获得终身成就奖','把一个场景真的做通','作品终于等到了真实反馈']],
    ['philosophy',['思想实验偷偷改变了设定','对反方观点的概括过于简单','描述性判断滑向了规范性判断','同一术语在论证途中改变了范围','直觉一致并不等于论证成立','文献的主张被自己的解释替代'],['概念定义再次退回草稿','思想实验里的人申请散会','先澄清一个真正的争点','反对意见成为了论证台阶']],
    ['law',['不同效力层级的规范被混用','事实认定和价值判断没有分开','案例选择遗漏了关键的相反裁判','一般规则与程序条件互相冲突','比较法材料缺少适用背景','建议修改的范围超出原论据'],['会议室进入补充举证期','例外条款申请成为一般规则','先说明这个规则为什么适用','一份有边界的理由写好了']],
    ['politics',['材料中的国家与组织层次混用','概念指标不能覆盖讨论对象','时间先后被当成解释路径','两份材料的作者立场不同','比较个案缺少共同背景','制度安排与实际执行分开发展'],['解释路径等待第二轮审议','晚饭加入了战略议程','先拆开材料立场与判断','一个比较终于有了共同基准']],
    ['education',['课堂活跃被当成学习效果','教学目标写得无法观察','评分规则奖励了另一种能力','干预前的基础差异被忽略','一次观察无法支撑稳定判断','学生反馈与教师预想相反'],['教案回到了备课桌','下课铃获得了最佳教学奖','先改一项能够观察的任务','目标与评价终于在同一页']],
    ['sports',['测试前的休息条件不一致','设备时间戳与手写记录错位','训练量和训练强度被合成一个数','学习效应可能解释短期提升','场地改变了动作执行方式','个体差异被平均值盖住了'],['测试记录先进入休赛期','计时器跑赢了汇报人','先看清一个动作的变化','记录终于追上了训练过程']],
    ['psychology',['量表总分掩盖了不同维度','题目顺序改变了回答倾向','多次探索没有记录分析分支','样本来源限制了外推范围','反向题可能被误解','访谈解释与量化结果并不吻合'],['分析计划要求暂停解释','量表开始测量导师耐心','先承认一个没有测到的概念','一条解释经得住不同口径']],
    ['languages',['语体差异被译成同一种口吻','一个术语对应多个专业语境','省略的信息在译文里被补成事实','文化背景没有在注释里说明','字面准确却改变了交际意图','平行文本并不是同一类受众'],['译注比正文先进入返工','标点获得了跨语种工位','先保留一种有依据的读法','一句译文终于接住了语境']],
    ['journalism',['评论数量被当成独立受众','平台规则改变了可见样本','传播路径缺少首发来源','标题编码和正文含义不一致','删帖造成了系统性缺失','情绪标签没有可靠的判断规则'],['编码表要求重新核验','热搜把附录送上了榜单','先追到一个可确认的来源','传播路径终于找到了首发点']],
    ['history',['后来的记载被当成同时代证据','地名变化影响了事件对应','档案的保存偏差没有说明','纪年换算造成了年表错位','二手引文被误当成原始史料','器物背景与文本叙述不一致'],['史料冲突留在了会议记录','年表开始给研究生排班','先承认这段历史还不确定','两份材料终于能各自说话']],
    ['earth',['空间分辨率不足以支撑局部判断','季节变化被并入长期趋势','模型采用了不同的参考基准','观察点的可达性影响了取样','时间平均掩盖了短时异常','地形背景改变了比较条件'],['模型暂时回到坐标原点','地图给导师标出了食堂','先说明一个尺度下的判断','现场记录终于接上了坐标']],
    ['environment',['背景浓度没有同步记录','监测点更换改变了时间序列','天气条件影响了主要指标','缺失材料集中在异常时段','局部变化被外推成整个系统','指标改善没有对应实际过程'],['趋势图进入背景调查期','植被给工位发了绿化奖','先分清背景与目标变化','一个比较保留了环境条件']],
    ['electrical',['测量带宽限制了可见信号','接地方式改变了噪声表现','仿真和硬件使用不同参数','指标没有覆盖启动瞬间','接口延迟被归入算法耗时','测试脚本漏掉了异常状态'],['接口协议等待重新握手','示波器申请主动提问','先让一个条件下的信号稳定','硬件和仿真终于对齐了参数']],
    ['mechanical',['装配公差累积超过预想','仿真忽略了一个接触条件','负载记录与测试时段不一致','稳定动作无法覆盖启停阶段','控制策略只适用于一类工况','维护状态改变了样机表现'],['装配图回到了修改工位','机械臂举手申请散会','先把一类工况做可靠','样机终于交出可核对轨迹']],
    ['civil',['模型约束与现场支撑不同','尺度缩小改变了材料表现','使用需求没有进入评估指标','图纸改版未同步到说明书','边界荷载没有单独讨论','交通流变化超出了观察时段'],['方案先进入补充勘察期','模型给自己搭了休息平台','先把一个边界工况说清','图纸终于接住了现场条件']],
    ['energy',['系统边界决定了效率口径','稳态表现掩盖了瞬态波动','不同负载下指标不可直接比较','损失项在两个表里重复计算','测量区间没有覆盖启动过程','材料差异影响了长期表现'],['能量账本要求重新对账','电池替研究者申请充电','先把系统边界画清楚','一份输入输出终于对上了']],
    ['aerospace',['离散步长改变了仿真轨迹','扰动情景没有覆盖关键方向','坐标约定改变了误差符号','简化模型忽略了一个反馈环节','场景切换造成了指标断点','公开案例无法支撑所有推演设定'],['仿真轨迹进入待核对航线','卫星向食堂发出了导航请求','先守住一个可解释情景','模型终于标清了适用空域']],
    ['agriculture',['地块位置与管理方式同时变化','记录时间遗漏了关键生长阶段','一批样本没有对应现场照片','天气改变了计划的观察窗口','产量指标遗漏了品质差异','单个季节无法支持全年判断'],['地块记录等待重新配对','苗圃给研究生颁了生长奖','先把一个季节讲清楚','现场记录终于追上了生长']],
    ['veterinary',['个体年龄差异没有进入比较','观察者之间的记录口径不同','同一个体被记成多次独立材料','环境变化影响了行为记录','缺失观察集中在特殊个体','一类材料不能代表整个群体'],['个体记录先接受补充核对','动物给导师投了散会票','先尊重一个个体的差异','分组清单终于找回了个体']],
    ['food',['配方变化没有同步到批次记录','口味评价的顺序影响了判断','储存条件改变了展示结果','一项指标忽略了实际使用场景','不同份量被直接比较','评价者来源限制了接受度判断'],['评价表暂时退出试吃席','配方给晚饭写了获奖词','先把一批材料比较清楚','指标与实际体验终于相遇']],
    ['pharmacy',['效应名称与测量对象不同','不同来源的材料条件无法合并','暴露时段影响了比较口径','模型中的响应不等于真实应用效果','缺少反向证据的讨论','一张机制图跨过了尚无依据的环节'],['机制图先拆掉一座桥','药盒给附录安排了说明书','先守住测量实际支持的部分','一条证据链标清了缺口']],
    ['nursing',['流程执行与纸面标准不同','不同班次使用不同记录习惯','问卷回收偏向一类参与者','活动满意度被当成实际效果','时间压力改变了观察过程','个体访谈与总体归纳之间缺了依据'],['交接清单先进入补充核对','排班表给周末发了请假条','先改一个真实能执行的环节','流程和记录终于接上了班']],
    ['management',['财务指标与行为指标不能互换','案例中途发生了组织重组','公开材料遗漏了失败案例','部门口径与公司口径不同','访谈说法与实际记录矛盾','框架预设排除了意外发现'],['指标表等待统一口径','报销单成了最完整的案例','先把一个案例真正看懂','框架终于容得下一个反例']],
    ['publicadmin',['政策目标和执行指标没有对应','部门层级改变了材料含义','公开报告没有覆盖未完成项目','地区条件使同一流程结果不同','受访者只描述了理想路径','一次调整带来了未预想的成本'],['流程图回到了补充调研节点','表格申请了独立行政区','先把一个执行层级讲清楚','纸面流程终于走到了现场']],
    ['music',['作品结构与演出时长发生冲突','镜头选择改变了观众理解','排练版本和展示版本不一致','形式分析缺少实际表演依据','录音条件左右了听感判断','受众反馈与创作意图不同'],['作品进入没有掌声的返修','小节线把组会划成了幕间','先保留一次诚实的试演','作品终于接住了一条反馈']],
    ['military',['公开案例的背景条件不同','推演把不确定设定写成事实','指标只能比较一类情景','一方行动改变了原假设','资料时点不支持后来的归纳','情景的边界没有在图里标出'],['推演先撤回扩大判断','棋子一致通过了休息议案','先把一种公开情景说清楚','推演终于标出自己的边界']],
    ['interdisciplinary',['同一个指标在两学科中含义不同','接口单位没有经过共同核对','材料的独立层次不一致','一个学科的假设与另一个冲突','两种评价标准无法同时满足','合作分工遗漏了连接两侧的环节'],['接口协议停在了共同定义','两位导师分别批准了加页','先修好一个真实接口','一座有边界的桥终于接通']]
  ];
  const common=`投影仪把红色全显示成绿色|你展示的版本比老师收到的旧一天|一个图例少写了单位|合作者的名字没有放到应有的位置|一项已经撤回的判断还留在摘要里|会议纪要记录了你没有许过的承诺|外校来访者误解了题目范围|导师把你的计划和另一人的混在一起|一个附录问题被提前问到了|展示字体让关键符号变成方块|现场麦克风使最后一句听不清|计时屏和你的预演时间不一致|合作方临时改变了交付格式|一份公共材料更新了版本|你准备的链接在会议室打不开|引用的软件版本没有写清楚|共享文档被同时修改了两遍|一个表格的排序改变了对应关系|导师想看被你藏在备份里的失败尝试|同门指出一项指标其实代表另一个对象|合作方要求解释一次意外差异|你答应补充的材料仍只有一个标题|原定汇报人请假后你被临时排上|纸质材料漏印了最关键的一页|一份资料的使用范围需要重新确认|你准备的小结与前面数据不一致|两个合作者对下一步优先级不同|展示动画跳过了一个限制条件|访客询问一个你没有准备的应用场景|老师把阶段结果理解成最终答案|一个文件名引发了版本误会|同门问你为什么只展示成功的尝试|本周的计划忽略了设备维护时间|你的时间表没有给核对留出空档|一位合作者已经做了你打算做的检查|新的记录否定了昨天的简短解释|导师临时要求用三句话说明全场|一名新同学问出了最基础也最难的问题|讨论偏离了原先想回答的主问题|你引用的数字来自另一种统计口径|一项工作实际需要两个人同时在场|共享工位的交接没有留下记录|一次延期没有同步给所有合作者|你的备份只保存了成品没保存来源|汇报标题承诺了材料无法回答的效果|一条聊天消息被当作正式确认|关键记录需要找原提供者才能解释|老师问你现在最不确定的到底是哪一点|来访者把你的探索称作成熟方案|同门提出一个比原计划更小的检查|导师要求把三个目标减到一个|一个负结果需要重新写进讨论|合作者想替你扩大结论的口气|老师要你指出最薄弱的一环|有人问为什么不采用另一种路线|一页漂亮图隐藏了过多判断|一份旧笔记救回了忘掉的取舍理由|两个同门对同一问题给了相反建议|导师要你解释一次没有变化的观察|提问者只愿意听最直接的判断|老师认为你太早排除了另一种解释|你用了一个大家理解不同的词|一位同门指出问题本身还未定义|讨论需要先区分任务和研究问题|导师要你比较现有两条路径的成本|原定收尾被一位迟到的来访者打断|一项长期承诺被要求写出首个交付物|大家都等着别人回答同一个缺口|老师问哪些检查由你实际完成|汇报里没有说明同门负责的部分|过大的待办让下一周已经排满|一项更换工具的计划没有迁移材料|有人的善意补充改变了你的原话|一位参会者完全不同意你的问题设定|导师让你删掉最满意但最无关的一页|讲完以后大家仍没听懂为什么要做|一页时间线藏着无法实现的顺序|同行的结果比你更快但问题并不相同|老师要你说明尚未检查的条件|讨论中的例子不属于原定材料范围|导师问这一步失败会怎样调整|一个具体限制改变了所有人的建议|你必须在质量与截止时间之间取舍|原来的评估方式不适合新对象|合作方要你先说清不会负责的部分|老师要求把可确认和想象的分开|你的说明使用了尚未定义的缩写|一项独立检查揭示了新的矛盾|大家希望你给一个可以执行的复查顺序|汇报末尾出现了上次没完成的任务|一位同门承认自己刚才的建议有误|导师想知道你愿意撤回哪一句话|所有人都在等一个真实的结束点|你要把没有答案的一页带回下周|有人愿意帮忙但只能做很小一部分|一次诚实的暂停改变了讨论方向`.split('|');
  if(routes.length!==36||common.length!==96)throw new Error('扩展内容清单不完整');
  const meetingChoices=(issue,quip,p)=>[
    {text:`拿出已核对的依据，把「${issue}」拆成能确认和还需复查的部分。`,label:'现场回应',result:'问题被拆到了可以核对的范围。',flavor:'你留下了取舍和来源。讲清依据仍然需要对方愿意继续听。',effects:{evidence:8,patience:2,mood:-3,time:-3},flags:{rigor:1,repair:2,...(p?{['journey_'+p.id]:1}:{})},risk:null},
    {text:`承认「${issue}」现在还没解决，先缩小结论，约一个具体补查。`,label:'现场回应',result:'方向改变了，代价也留下了。',flavor:'缩小范围保住了一部分判断，也会占用下一周的时间。',effects:{evidence:3,patience:4,mood:2,time:-2},flags:{honest:1,debt:1,detour:2,...(p?{['journey_'+p.id]:1}:{}),...(p?.flag?{[p.flag]:1}:{})},risk:null},
    {text:`“${quip}。要不先给它留一个工位？”`,label:'现场回应',result:'现场听到了一个意外的解释。',flavor:'气氛可能松一点，问题也可能变得更尖锐。玩笑不会完成核对。',effects:{evidence:-5,patience:-6,mood:9,time:-1},flags:{chaos:1,overreach:2,sidequest:2,...(p?{['journey_'+p.id]:1}:{})},risk:{chance:.28,effects:{patience:-7,evidence:-5},flavor:'提问者没有接住玩笑，把你带回了尚未解决的缺口。'}}
  ];
  const expandedMeetingIds=[],expandedLifeIds=[],expandedCampusIds=[],expandedEndingIds=[],routeRules=[];
  for(const [project,extra,endNames] of routes){const p=C.projects.find(x=>x.id===project),base=window.MEETING_SURPRISE_CONTENT.disciplines.find(x=>x[0]===project).slice(1,4),issues=[...base,...extra];
    for(let i=0;i<9;i++){const issue=issues[i],id=`extended-meeting-${project}-${i}`,phase=[1,2,3,4,5,6,7,8,8][i];expandedMeetingIds.push(id);C.events.push({id,phase,project,who:i%3===0?'boss':i%3===1?'stats':'senior',title:issue,scene:`${p.name}的讨论停在了一个具体细节上。${issue}。这次对方要你说明依据、取舍和还没有完成的检查。`,quote:'“别只说会处理，现在打算怎么接住它？”',answerKind:['literature','method','record','boundary'][i%4],choices:meetingChoices(issue,p.ending,p)});
      if(i>=3)L.incidents.push({id:`discipline-${project}-${i}`,project,title:issue,scene:`你在${p.name}的准备过程中发现：${issue}。直接沿用旧材料可能让问题在周五变大。`,texts:[`先核对「${issue}」，之后继续原定事项。`,`找同门定位「${issue}」，留下待核对的线索。`,`停止沿用这份材料，缩小安排并登记「${issue}」。`],effects:[{energy:-6-i%3,stress:4},{energy:-4,notes:4,stress:5},{energy:5,stress:5}],trait:['study','backup','negative'][i%3]});
    }
    for(let i=0;i<7;i++){const day=[0,1,2,3,5,6,6][i],slot=i===6?1:0,kind=['literature','method','record','boundary','record','rehearsal','literature'][i],issue=issues[i],id=`extended-life-${project}-${i}`;expandedLifeIds.push(id);C.lifeEvents.push({id,project,day,slot,prepKind:kind,title:`${p.name} · ${issue}`,scene:`今天的材料暴露了一件具体的事：${issue}。这半天可以核对，也可以先留下线索或改变安排。`,choices:[
        {text:`打开来源与记录，认真核对「${issue}」。`,flavor:'你核对了对应材料，也记录了还不能解释的部分。这份准备有真实的行动来源。',effects:{notes:11,slides:6,energy:-11,stress:3},traits:{study:1,backup:1},career:{},preparationGains:{[kind]:2}},
        {text:`和同门讨论「${issue}」，先留下可继续查的线索。`,flavor:'交流让问题更具体，但这半天还没有完成正式核对。',effects:{notes:6,energy:-4,stress:-2},traits:{collaboration:1},career:{senior:2},preparationGains:{[kind]:1}},
        {text:'先调整范围，吃点东西或休息，把核对放到后面。',flavor:'你保留了生活的余量，材料里的疑点仍然没有解决。',effects:{energy:12,stress:-7},traits:{rest:1,pivot:1},career:{},preparationGains:{}}
      ]});}
    const kinds=['failure','comedy','open','success'];for(let i=0;i<4;i++){const id=`extended-ending-${project}-${i}`;expandedEndingIds.push(id);routeRules.push({id,project,index:i});C.endings.push({id,project,kind:kinds[i],icon:['📉','🎭','🧭','🌱'][i],title:endNames[i],subtitle:['这一阶段没有通过，先把缺口带回生活。','主问题还在，会议室先留下了一个名场面。','原来的路线暂停，一条更小的路开始了。','不是所有问题都解决了，但这一步终于接上了。'][i],desc:`在${p.name}这条路线里，你反复遇到了材料与预想不一致的时刻。${[`${endNames[i]}。一次次扩大口气没能替代核对，今天的阶段评审只能暂停。周末要缩小任务，再决定怎样重来。`,`${endNames[i]}。你的现场插曲有了自己的观众，老师仍把主问题留在了待办。回到生活后，这场名场面还可以写番外。`,`${endNames[i]}。你承认原计划太大，撤回了一部分判断。那份没完成的材料没有白看，它给下周留下了一个能继续的问题。`,`${endNames[i]}。你用核对记录接住了几个具体追问，至少有一份小结果可以交给别人再看。下一周仍有新的条件需要面对。`][i]}`,hint:['本路线里尝试扩张或玩笑回应后，问题积累、依据仍不足时完成收尾。','本路线里出现专属插曲，累计至少两次整活后完成收尾。','本路线里选择缩小方向，累计诚实回应后完成收尾。','本路线里实际回应新的核对问题，保持依据并多次认真回应后完成收尾。'][i]});}
  }
  const sceneChoices=(title,location)=>[
    {text:`给「${title}」划出一个能完成的范围，再把它处理完。`,flavor:'你实际处理了一段安排，也保留了剩下的边界。没有做完的部分没有自动完成。',effects:{notes:7,slides:4,energy:-7,stress:3},traits:{study:1,backup:1},career:{},work:{progress:7,quality:5},preparationGains:{[location==='library'?'literature':'record']:1},card:location==='lab'?'raw':null},
    {text:'请同门一起核对一小部分，重新安排分工。',flavor:'有人接住了一小部分问题，完整检查仍要继续。',effects:{notes:4,energy:-4,stress:-4},traits:{collaboration:1},career:{senior:2},work:{progress:4,quality:3},preparationGains:{method:1},card:null},
    {text:'今天先留一个明确的待办，去吃饭、散步或休息。',flavor:'休息给状态留出了余量，问题也还在。',effects:{energy:13,stress:-9},traits:{rest:1,pivot:1},career:{},work:{progress:0,quality:0},preparationGains:{},card:null}
  ];
  for(let i=0;i<96;i++){const title=common[i],id='extended-common-'+i;expandedMeetingIds.push(id);C.events.push({id,phase:1+i%8,who:['boss','stats','senior','visitor'][i%4],title,scene:`讨论原本正在往前走，${title}。每种处理都会改变时间、现场感受和后续任务；过去积累的信任也不能替你回答。`,quote:['“现在能确认哪一部分？”','“你选这个取舍的依据是什么？”','“刚才没解决的点，今天怎么处理？”'][i%3],...(i<48?{weekRequires:'episode-'+i}:{}),answerKind:['literature','method','record','boundary'][i%4],choices:meetingChoices(title,['它已经有了自己的会议日程','这个问题可能比我更熟悉会议室','我的待办现在需要一张独立饭卡'][i%3])});
    if(i<48){const day=i%7,lifeId='extended-day-'+i;expandedLifeIds.push(lifeId);const choices=sceneChoices(title,'home');for(const c of choices)c.traits['episode-'+i]=1;C.lifeEvents.push({id:lifeId,day,title:'生活临时改了安排 · '+title,scene:`今天的消息里多了一件事：${title}。它会占用这半天，也可能在周五的讨论里回来。`,choices});}
    if(i<80)L.incidents.push({id:'extended-surprise-'+i,title,scene:`原计划之外又出现了一件事：${title}。你需要决定继续、协调还是暂停。`,texts:[`先确认「${title}」，再做原定事项。`,`请同门一起梳理「${title}」，留下后续线索。`,`把「${title}」记下来，改变今天这半天的安排。`],effects:[{energy:-5-i%3,stress:4},{energy:-4,notes:4,stress:3},{energy:7,stress:4}],trait:['backup','collaboration','deadline','negative'][i%4]});
    if(i>=48){const location=['library','lab','cafe','mentor','home','wander'][i%6],campusId='extended-campus-'+i;expandedCampusIds.push(campusId);C.campusEvents.push({id:campusId,location,title,scene:`在${C.locations.find(l=>l.id===location).name}，你碰到了一个需要自己安排的小转折：${title}。这也是这半天的一部分。`,choices:sceneChoices(title,location)});}
  }
  const shared=[
    ['failure','忙碌赢了，主问题输了','night',3,'rigor',0,'这一周你没有停下来，结果却没有找到主线。散会之后先把任务拆小。'],
    ['failure','备份保存了一个错误','backup',3,'overreach',2,'你保住了文件，也保住了尚未核对的错处。下一轮从来源重新检查。'],
    ['failure','合作群进入已读不回','collaboration',3,'debt',4,'承诺在不同人的聊天窗口之间来回，没有形成明确交付。这次先暂停合作安排。'],
    ['failure','截止时间收走了所有余量','deadline',3,'debt',3,'所有事都答应及时完成，最后没有一项留出核对时间。周末得重新排优先级。'],
    ['failure','版本齐全，来源失踪','folder',3,'overreach',2,'文件夹里什么版本都有，只有来源没对上。你需要重建可追溯的记录。'],
    ['failure','救场道具也需要下班','night',2,'chaos',3,'咖啡和玩笑没有替代睡眠与材料。今天先停下来，别让下一周照着重来。'],
    ['comedy','打印机被提名为第四导师','printer',2,'sidequest',2,'打印机的问题出现得比提问者还勤。散会时大家建议给它也发一份纪要。'],
    ['comedy','本周附件比正文更有人缘','folder',2,'chaos',2,'附件得到了许多追问，正文还在等一句评价。你给两边各建了一个休息文件夹。'],
    ['comedy','午饭收到了一份正式会议邀请','meal',3,'social',2,'讨论从会议室延伸到饭桌，最后饭桌声明自己只接受生活话题。'],
    ['comedy','校园路线图完成了答辩','wander',2,'sidequest',2,'你本周熟悉了许多去处。组会唯一完全没有争议的图，是通往食堂的路线。'],
    ['comedy','闹钟成为唯一准点的研究者','alarm',2,'chaos',2,'它每天都准时到场，你则每天都有新的解释。老师建议给它记录出勤。'],
    ['comedy','咖啡杯被授予临时工位','meal',2,'help',2,'你的杯子陪所有人听完了讨论。它没有得到学分，但得到了一次认真清洗。'],
    ['open','暂时没有结论，先有一个周末','rest',3,'honest',3,'你把没有答案的部分如实留下，也把周末留给自己。下一周仍然可以继续。'],
    ['open','合作只从一件小事开始','collaboration',3,'help',3,'这次没有承诺解决整个问题，只约了一次共同核对。这样也能成为新的开始。'],
    ['open','删掉两页，留下一问','pivot',2,'detour',0,'你的汇报变短了，问题却更清楚。被删掉的内容留在记录里，不必今天全部讲完。'],
    ['open','失败记录成了下周的起点','negative',2,'honest',2,'一段没变化的观察不再被藏起。它帮你界定了下一步更值得问什么。'],
    ['open','把交付范围还给日历','promise',2,'honest',3,'你重新说明能交什么、何时核对和哪一项还做不了。生活终于能进入同一张日历。'],
    ['open','不是最后一次，也不是全部重来','unfinished',1,'repair',0,'旧问题还在，但你带回了一条新的处理路径。下周从这一步继续。'],
    ['success','一份记录终于被别人接住','backup',3,'rigor',3,'别人能沿着你的来源重新看一遍。这份小结果有了离开你电脑的机会。'],
    ['success','一周留出了可核对的空档','study',4,'repair',0,'你没有把每段时间都塞成承诺，而是留出核对。组会里的几次回应因此有了依据。'],
    ['success','预演接住了真正的追问','rehearsal',2,'rigor',3,'预演没替你读材料，但让你能把做过的检查讲清楚。下一次还可以继续练。'],
    ['success','合作各自有了清楚的名字','collaboration',3,'honest',3,'你讲清了哪些由自己完成、哪些由同门核对。一个小分工终于形成了交付。'],
    ['success','敢停下来，也敢继续讲','rest',2,'rigor',4,'恢复与准备接到了一起。今天你撑住了几个问题，也保留了回去生活的余量。'],
    ['success','负结果走出了隐藏页','negative',2,'rigor',3,'没变化也被讲清了条件和限制。这页终于成为能讨论的材料。']
  ];
  const sharedRules=shared.map(([kind,title,trait,minimum,flag,flagMin,desc],i)=>{const id='extended-shared-ending-'+i;expandedEndingIds.push(id);C.endings.push({id,kind,icon:{failure:'📉',comedy:'🎭',open:'🧭',success:'🌱'}[kind],title,subtitle:'一周的生活与组会在这里接上了。',desc,hint:`一周多次留下${({night:'熬夜',backup:'备份',collaboration:'合作',deadline:'赶截止时间',folder:'整理文件',printer:'打印',meal:'吃饭',wander:'闲逛',alarm:'与闹钟交涉',rest:'休息',pivot:'调整方向',negative:'面对负结果',promise:'许下承诺',unfinished:'未完成事项',study:'读材料',rehearsal:'预演'})[trait]}经历，并在组会留下${({rigor:'认真核对',overreach:'扩大口气',debt:'尚未解决的承诺',chaos:'整活',sidequest:'现场插曲',social:'社交',help:'求助',honest:'诚实回应',detour:'缩小方向',repair:'补查'})[flag]}回应；${kind==='failure'?'现场依据不足或解释债较重':kind==='success'?'保持足够依据与心态':'完成收尾'}时可能出现。`});return {id,kind,trait,minimum,flag,flagMin};});
  const newBuffs=[
    ['library-light','书架这周很好找','library','notes',5],['library-chair','图书馆新换了舒服的椅子','library','energy',5],['library-quiet','安静时段延长了','library','stress',-4],
    ['lab-room','工位边多了一块空桌','lab','slides',4],['lab-check','核对时少了几次打断','lab','notes',5],['lab-calm','本周工位比较安静','lab','stress',-3],
    ['home-soft','宿舍的灯终于不闪了','home','energy',5],['home-air','窗外的声音少了一些','home','stress',-4],['home-desk','整理出了能写字的桌面','home','slides',3],
    ['meal-seat','食堂常有靠窗空位','cafe','energy',4],['meal-familiar','这周总能买到喜欢的饭','cafe','stress',-4],['meal-chat','午饭时更容易交换清楚的消息','cafe','notes',3],
    ['mentor-slot','空会议室预约顺了一点','mentor','slides',4],['mentor-board','白板上的笔终于有墨了','mentor','notes',3],['mentor-clear','预演时不容易被打断','mentor','stress',-3],
    ['friends-time','朋友恰好也有空','friends','energy',5],['friends-place','你们找到一个不用排队的地方','friends','stress',-4],['friends-laugh','这周聊天格外轻松','friends','energy',4],
    ['wander-sun','散步时常遇到好天气','wander','energy',4],['wander-route','校园近路终于开了','wander','stress',-3],
    ['backup-small','几份常用材料提前留下了副本','surprise','slides',4],['surprise-small','突发之后还有一点缓冲','surprise','energy',3],
    ['weekend-sleep','周末终于不用很早出门','weekend','energy',5],['weekend-space','周末安排少了一个冲突','weekend','stress',-4]
  ];for(const [id,title,location,key,value] of newBuffs)L.buffs.push({id,title,desc:`本周在${({library:'图书馆',lab:'研究工位',home:'宿舍与操场',cafe:'食堂与茶水间',mentor:'空会议室',friends:'朋友邀约',wander:'校园闲逛',surprise:'突发处理',weekend:'周末生活'})[location]}更容易获得${({notes:'资料线索',slides:'可用材料',energy:'精力恢复',stress:'压力缓解'})[key]}，实际结果选择后揭晓。`,byLocation:{[location]:{[key]:value}},meeting:{},support:0});
  const newSocial={boss:[
    ['boss-longreview','连续开了几场长会，希望今天更直接一点。',{preference:'direct',temper:-1,time:-2}],
    ['boss-book','读到了一本有意思的新书，开始追问概念的来路。',{preference:'detail',severity:1}],
    ['boss-revised','自己的一项判断刚被新证据修正，更愿意接受缩小结论。',{preference:'cautious',temper:2}],
    ['boss-teaching','本周教学任务繁忙，愿意支持但临时余量少。',{support:-.12,preference:'brief'}],
    ['boss-workshop','主持过一次工作坊，特别关注能执行的分工。',{preference:'cooperate',severity:1}],
    ['boss-recovered','终于完成积压任务，今天愿意多听几分钟。',{temper:2,patience:3,time:2}],
    ['boss-newcase','刚看过一个反例，对过大的判断格外敏感。',{preference:'cautious',severity:2,patience:-2}],
    ['boss-schedule','行程被临时改变，要求你先讲最主要的一点。',{preference:'brief',temper:-1,support:-.1}]
  ],stats:[
    ['stats-notebook','翻到了以前踩过的坑，想确认你有没有查同一类条件。',{preference:'detail',severity:1}],
    ['stats-repair','刚修好了一个方法问题，愿意一起拆分复查顺序。',{preference:'cooperate',support:.12}],
    ['stats-longday','今天已经听了很多背景，希望直接看到依据。',{preference:'direct',temper:-1}],
    ['stats-newbook','正在学一个新概念，对定义比平时更较真。',{preference:'detail',severity:2}],
    ['stats-appointment','有一个后续约见，时间比平时紧。',{preference:'brief',time:-1}],
    ['stats-pause','自己也在缩小一个问题，对诚实暂停更有耐心。',{preference:'cautious',temper:2}],
    ['stats-coffee','休息比上周充分，愿意听清楚细节后再判断。',{temper:1,patience:2}],
    ['stats-mixed','两份材料刚出现矛盾，今天会追问来源。',{preference:'detail',severity:1}]
  ],senior:[
    ['peer-moving','正在搬工位，手里有设备但不一定找得出来。',{support:-.08,temper:-1}],
    ['peer-anniversary','和{partner}刚过了一个开心的纪念日。',{temper:2,support:.1}],
    ['peer-trip','和{partner}安排了周末出行，临时余量比较少。',{support:-.1,preference:'brief'}],
    ['peer-offer','收到了一份新机会，愿意分享自己走过的弯路。',{temper:2,preference:'cooperate'}],
    ['peer-files','刚整理好一批旧文件，找材料比以前方便。',{support:.15,preference:'detail'}],
    ['peer-review','正准备自己的汇报，需要更明确的求助范围。',{preference:'direct',support:-.1}],
    ['peer-family','本周有家里的安排，可能只能帮一小部分。',{support:-.13,preference:'brief'}],
    ['peer-correction','刚承认过一次记录错误，对诚实核对更有耐心。',{temper:1,preference:'cautious'}],
    ['peer-puzzle','自己的问题也没解完，希望和你互相找线索。',{preference:'cooperate',support:.08}],
    ['peer-sleep','两天没睡好，今天的反应可能比平时冷一些。',{temper:-2,support:-.12}],
    ['peer-club','刚参加了一个兴趣活动，愿意聊一点工作之外的事。',{temper:2,support:.05}],
    ['peer-backup','刚经历过文件损坏，特别在意你有没有留来源。',{preference:'detail',severity:1}]
  ]};for(const id of Object.keys(newSocial))L.socialEvents[id].push(...newSocial[id]);
  const extraMeals=[
    ['food-budget','月底的饭卡，提出了预算问题','余额不多，吃饭还是得安排。','选一份吃得饱的简单饭。','和朋友商量一家实惠的小店。','自己做一点，把时间留给收拾。'],
    ['food-queue','喜欢的窗口排到了楼梯口','队伍在变长，另一边还有空位。','排这一次，接受等待占用休息。','去旁边吃一份，不把饭点用完。','问朋友能否换个更近的地方。'],
    ['food-storm','雨把晚饭路线改变了','你可以出门，也可以慢慢等。','穿好雨衣去附近吃一顿。','点外卖，接受送达时间不稳定。','在住处简单做一点。'],
    ['food-leftovers','昨天买多的食材还在冰箱里','今天可以简单解决，也可以一起做。','检查食材后，做一份简单饭。','找朋友一起做，分担收拾。','今天去食堂，把后续安排写下来。'],
    ['food-celebrate','朋友想庆祝一件很小但很开心的事','今晚不一定要有科研理由。','去吃饭，好好听朋友说。','选个更近的地方，吃完散步。','今天先休息，约一个真正有空的晚上。'],
    ['food-disagree','饭桌上的几个人，想吃的都不同','谁也不想做最后的决定。','各点各的，坐下来一起吃。','先问预算和距离，再选一个折中地方。','自己安静吃完，稍后再见朋友。'],
    ['food-closing','你到食堂时，窗口正在收尾','还有一份饭，附近也还有小店。','问清剩下的选择，认真吃一份。','去附近找个还开着的地方。','回去简单做饭，今晚少安排一件事。'],
    ['food-solo','今天没有人和你拼桌','你可以享受安静，也可以约人。','一个人慢慢吃，暂时不看消息。','问朋友要不要一起吃。','吃完出去走一小段再回去。'],
    ['food-homecall','家里来电话问你有没有好好吃饭','你刚好还没吃。','先买一份饭，边吃边聊生活。','说明现在的安排，约饭后好好聊。','回住处做饭，让今晚慢一点。'],
    ['food-season','附近小店换了季节菜单','有熟悉的也有想试的。','试一道新菜，接受口味不确定。','吃熟悉的那一份，好好休息。','找朋友分着点，边吃边聊。'],
    ['food-tea','吃完饭后有人提议喝杯茶','时间还早，也可能一聊就很晚。','坐一会儿，给聊天留一个结束时间。','聊完一起走回去，今天不再加任务。','说明想早点休息，约下一次。'],
    ['food-snack','下午突然很饿，晚饭还有一阵','继续硬扛也会影响注意力。','买一点东西，吃完安静坐一会儿。','约同门提前吃晚饭。','回去做一点简单的食物。'],
    ['food-party','一场临时饭局多出了你的座位','你并不熟悉所有人。','去坐一会儿，今天只聊生活。','和熟悉的朋友坐一起，接受晚点回去。','说明今天已有安排，约下次再见。'],
    ['food-travel','另一栋楼有家你一直想吃的店','来回要花一些时间。','走过去，把这段路也当成休息。','请朋友在更近的地方一起吃。','今天在食堂吃，留一个周末的约定。'],
    ['food-afterbad','今天的事不顺，晚饭也差点被省掉','饭不会解决所有问题，但身体需要它。','认真吃一份，今晚不继续追进度。','找朋友吃饭，说一说今天的感受。','自己做一点，吃完就休息。']
  ];for(const [id,title,scene,...texts] of extraMeals)L.locations.push({id,location:'food',title,scene,choices:texts.map((text,i)=>({text,flavor:'你给生活留出了一顿饭，恢复和意外会在实际回执里显示。',effects:[{energy:15,stress:-10},{energy:12,stress:-12},{energy:10,stress:-9}][i],traits:{meal:1,rest:1},career:{},preparationGains:{},work:{progress:0,quality:0},mealPath:text.includes('外卖')?'delivery':text.includes('做')?'cook':'meal'}))});
  const friendPlans=[['friends-picnic','带一点零食，去草地坐一会儿'],['friends-market','和朋友逛一段周末集市'],['friends-museum','看展时终于不用给图表加误差条'],['friends-cycling','沿着熟悉的路骑一小段'],['friends-cooking','每人带一道菜，凑一桌普通晚饭'],['friends-coffee','一家不讨论进展的咖啡店'],['friends-birthday','给朋友过一个不需要发表的生日'],['friends-badminton','打一会儿球，输赢不进入周报']];
  for(const [id,title] of friendPlans)L.locations.push({id,location:'friends',title,scene:'朋友也在过自己的生活。今天可以放松，也要考虑睡眠和还没有做完的补查。',choices:[
    {text:'好好参加，结束后回去休息。',effects:{energy:18,stress:-15},traits:{rest:1},career:{},preparationGains:{}},
    {text:'和朋友聊一会儿，留一点时间记好明天的安排。',effects:{energy:13,stress:-13},traits:{rest:1,collaboration:1},career:{},preparationGains:{}},
    {text:'多待一段时间，接受今晚少做一项、晚睡一点。',effects:{energy:8,stress:-15},traits:{rest:1,late:1},career:{debt:1},preparationGains:{}}
  ].map(c=>({...c,flavor:'这段时间属于生活。恢复已经留下回执，尚未做的研究准备仍然需要另找时间。',work:{progress:0,quality:0}}))});
  for(const [id,title] of [['library-corner','角落里有一排与课题无关的书'],['library-view','窗外的天色，刚好值得看一会儿'],['library-table','你找到一张不用抢座的桌子'],['library-return','还书的时候发现一个有意思的书名']])L.locations.push({id,location:'library',title,scene:'图书馆也可以是休息的地方。浏览会留下线索，真正核对仍需要专门安排。',choices:[
    {text:'看一点闲书，慢慢恢复注意力。',effects:{energy:12,stress:-11},traits:{rest:1},career:{},preparationGains:{}},
    {text:'浏览几个相关书目，只把线索记下来。',effects:{energy:7,notes:7,stress:-6},traits:{study:1},career:{},preparationGains:{literature:1}},
    {text:'和朋友交换几条书目，然后去吃饭。',effects:{energy:10,notes:3,stress:-8},traits:{meal:1,collaboration:1},career:{senior:2},preparationGains:{literature:1}}
  ].map(c=>({...c,flavor:'你留下了这一段恢复或浏览记录，线索没有被当成完整精读。',work:{progress:0,quality:0}}))});
  function decideEnding(s){if(s.wrapUp!==2)return null;const f=s.flags,st=s.stats;
    for(const rule of routeRules.filter(r=>r.project===s.project&&(f['journey_'+r.project]||0)>=1)){const match=[f.overreach>=2&&(st.evidence<55||f.debt>=3),f.sidequest>=2&&f.chaos>=2,f.detour>=2&&f.honest>=2,f.repair>=2&&f.rigor>=3&&st.evidence>=55&&st.mood>=25][rule.index];if(match)return rule.id;}
    const traits=s.weekContext?.traits||{};for(const r of sharedRules){if((traits[r.trait]||0)<r.minimum||(f[r.flag]||0)<r.flagMin)continue;if(r.kind==='failure'&&!(st.evidence<45||f.debt>=4))continue;if(r.kind==='success'&&!(st.evidence>=65&&st.mood>=30))continue;return r.id;}return null;
  }
  return {routes,common,expandedMeetingIds,expandedLifeIds,expandedCampusIds,expandedEndingIds,routeRules,sharedRules,decideEnding};
})();
