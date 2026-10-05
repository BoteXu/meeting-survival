/* Fine objects add actual fields to records; these are not display-name aliases. */
window.MEETING_KNOWLEDGE_OBJECTS=(()=>{
 const rows=[];function add(text){for(const line of text.trim().split('\n')){const a=line.indexOf(';'),v=line.slice(a+1).split('|');rows.push({match:new RegExp(line.slice(0,a)),zh:v[0],en:v[1]});}}add(`
微分|方程;解的初值、边界条件与正则性|solution initial values, boundary conditions and regularity
动力系统;相空间、初值集合与稳定性定义|phase spaces, initial-state sets and stability definitions
离散|组合|图论;有限结构、邻接关系与组合约束|finite structures, adjacency relations and combinatorial constraints
运筹;决策变量、资源约束与最优性条件|decision variables, resource constraints and optimality conditions
代数|数论;运算规则、整除条件与结构保持映射|operations, divisibility conditions and structure-preserving maps
拓扑|几何;邻域、几何量与映射保持的性质|neighborhoods, geometric quantities and properties preserved by maps
贝叶斯;先验预测、似然定义与后验敏感性|prior predictions, likelihood definitions and posterior sensitivity
稳健|非参数;污染范围、秩信息与分布条件|contamination scope, rank information and distribution conditions
因果|计量;目标比较、干预起点与选择机制|target comparisons, intervention starts and selection mechanisms
恒星|星系;光度选择、红移或距离与分类口径|luminosity selection, redshift or distance, and classification definitions
宇宙;模型参数、观测约束与宇宙时期|model parameters, observational constraints and cosmological epochs
行星;轨道周期、检出机会与宿主条件|orbital periods, detection opportunities and host conditions
星际;介质状态、视线积分与谱线指认|medium states, line-of-sight integration and line identification
光谱;谱线位置、响应背景与分辨能力|line positions, response backgrounds and resolving power
凝聚|相变;序参量、系统尺寸与控制参数|order parameters, system sizes and control parameters
有机;结构指认、异构体与组成纯度|structural identification, isomers and compositional purity
无机;配位状态、物相与组成比例|coordination states, phases and composition ratios
物理化学;状态函数、平衡条件与动力学量|state functions, equilibrium conditions and kinetic quantities
分析化学;鉴定依据、校准范围与检出限|identification evidence, calibration ranges and detection limits
高分子|聚合物;分子量分布、链结构与材料状态|molecular-weight distributions, chain structures and material states
土壤;采样层厚、容重与有机质分布|sampling thickness, bulk density and organic-matter distributions
森林|林木|林业;林分阶段、更新个体与调查覆盖|stand stages, regenerating individuals and survey coverage
草地|牧草|草坪;植被覆盖、利用强度与季节窗口|vegetation cover, use intensity and seasonal windows
作物|农艺;种质来源、品种、田块位置与生育阶段|germplasm origins, cultivars, field positions and growth stages
园艺|果树|蔬菜|花卉;成熟阶段、品种差异与采后环境|maturity stages, cultivar differences and postharvest environments
昆虫|植保;观察努力、寄主状态与识别口径|observation effort, host conditions and identification definitions
水产|渔业;水域条件、捕获选择与资源分母|water conditions, catch selection and resource denominators
畜牧|动物福利;个体行为、管理群体与生活环境|individual behavior, management groups and living environments
地震;台站覆盖、到时资料与事件定位|station coverage, arrival-time records and event locations
地磁;参考场、时段变化与仪器漂移|reference fields, time variation and instrument drift
重力;位置高程、参考基准与密度假设|positions and elevations, reference datums and density assumptions
矿物|岩石|地层;物相指认、层位关系与形成序列|phase identification, stratigraphic relationships and formation sequences
水文|地下水;水位基准、补给条件与收支范围|water-level references, recharge conditions and budget extents
海洋;水层位置、季节与水团背景|water-layer positions, seasons and water-mass contexts
气候;基准时期、空间覆盖与异常序列|baseline periods, spatial coverage and anomaly series
天气|气象;站点位置、观测时次与天气过程|station positions, observation times and weather processes
遥感;地面参照、像元支持与反演条件|ground references, pixel supports and inversion conditions
传感;传感器响应、漂移与参考量|sensor responses, drift and reference quantities
通信|信道;链路条件、带宽与误码判据|link conditions, bandwidth and error criteria
机械;载荷路径、连接间隙与服役状态|load paths, connection clearances and service states
机器人;感知误差、控制任务与障碍情境|perception errors, control tasks and obstacle settings
电路|芯片;工作点、时序约束与功耗分项|operating points, timing constraints and power components
电力|电网;负荷时序、网络限制与供电服务|load sequences, network constraints and supply services
储能;充放电历程、退化与可用容量|charge-discharge histories, degradation and usable capacity
建筑;空间使用、热环境与使用者路径|space use, thermal environments and user paths
车辆;驾驶任务、道路条件与车辆状态|driving tasks, road conditions and vehicle states
交通|出行;完整出行链、等待与目的地机会|full journey chains, waiting and destination opportunities
船舶|港口;海况、载荷状态与协作时间|sea states, loading conditions and coordination times
食品;批次组成、储存条件与感官任务|batch composition, storage conditions and sensory tasks
软件;输入契约、依赖版本与错误复现|input contracts, dependency versions and error reproduction
数据库;事务交错、读写语义与恢复状态|transaction interleavings, read-write semantics and recovery states
机器学习;来源划分、基线与错误类型|source splits, baselines and error types
人机|交互;任务路径、辅助条件与错误恢复|task paths, assistance conditions and error recovery
冠心|冠脉;血管评价、症状与缺血相关资料|vascular assessments, symptoms and ischemia-related records
心律|心电;监测时长、节律判定与症状日记|monitoring duration, rhythm adjudication and symptom diaries
心力衰竭;功能分型、活动耐量与再住院窗口|functional groups, activity tolerance and rehospitalization windows
心肌病;表型定义、家系线索与负荷背景|phenotype definitions, family clues and loading contexts
瓣膜|结构性心;结构分级、血流条件与功能负担|structural grades, flow conditions and functional burden
主动脉;部位定义、形态轨迹与观察时点|anatomical locations, morphological trajectories and observation times
高血压;测量场景、日内变化与长期负担|measurement settings, daily variation and long-term burden
气道;通气指标、症状与活动状态|ventilation measures, symptoms and activity states
间质性肺;影像范围、气体交换与功能轨迹|imaging extent, gas exchange and functional trajectories
肺血管;血流负荷、运动表现与血管资料|flow loading, exercise performance and vascular records
胃肠动力;动力读数、摄入条件与症状时段|motility readings, intake conditions and symptom periods
肝|胆;组织或功能读数、代谢背景与病程|tissue or function readings, metabolic contexts and disease course
胰腺;结构资料、功能变化与观察窗口|structural records, functional change and observation windows
糖尿;糖代谢轨迹、暴露时间与并存疾病|glucose-metabolism trajectories, exposure duration and comorbidity
肥胖;身体组成、能量背景与功能结局|body composition, energy context and functional outcomes
甲状腺;反馈状态、功能读数与测量时点|feedback states, functional readings and measurement times
骨代谢;骨量、更新标志与骨折相关结局|bone quantity, turnover markers and fracture-related outcomes
肾上腺|垂体;激素反馈、节律与目标组织表现|hormonal feedback, rhythms and target-tissue findings
肾;滤过轨迹、尿液标志与容量背景|filtration trajectories, urine markers and volume contexts
透析;实际暴露、残余功能与随访质量|actual exposure, residual function and follow-up quality
贫血;细胞数量、形态与功能负担|cell counts, morphology and functional burden
凝血|血栓|血小板;凝血读数、血栓或出血结局与背景|coagulation readings, thrombosis or bleeding outcomes and context
造血;细胞谱系、来源关系与随访阶段|cell lineages, origin relationships and follow-up stages
自身抗体|风湿|关节炎;标志物、活动度与功能体验|markers, activity and functional experience
脑血管;事件时点、病灶资料与功能轨迹|event times, lesion records and functional trajectories
癫痫;事件判定、记录覆盖与症状叙述|event adjudication, recording coverage and symptom accounts
退行|认知障碍;任务表现、生活功能与阶段条件|task performance, everyday function and stage conditions
头痛;症状日记、发作窗口与生活影响|symptom diaries, episode windows and everyday impact
睡眠;夜间记录、白天功能与观察条件|night records, daytime function and observation conditions
脊柱|脊髓;结构位置、神经功能与活动负担|structural locations, neurological function and activity burden
关节|软骨;活动任务、负荷背景与组织状态|activity tasks, loading contexts and tissue states
排尿|盆底;功能任务、压力条件与主观负担|functional tasks, pressure conditions and subjective burden
瘢痕|创面;形态条件、修复阶段与功能体验|morphological conditions, repair stages and function experience
妊娠|围产|孕产;生命阶段、母婴对象索引与结局定义|life stages, maternal-child indexes and outcome definitions
视网膜;结构层次、视功能与图像条件|structural layers, visual function and image conditions
青光眼;压力读数、结构轨迹与视野表现|pressure readings, structural trajectories and visual-field findings
角膜|眼表;表面状态、感觉报告与功能任务|surface states, sensory reports and functional tasks
白内障;视觉条件、功能结局与随访窗口|visual conditions, functional outcomes and follow-up windows
听觉|耳科;听觉任务、环境噪声与交流负担|hearing tasks, background noise and communication burden
前庭;平衡任务、症状时段与生活活动|balance tasks, symptom periods and everyday activities
鼻|嗅觉;感觉评价、局部状态与气流背景|sensory assessments, local states and airflow contexts
皮肤;拍摄条件、形态评价与患者体验|photography conditions, morphology and patient experience
口腔|牙|颌;局部状态、咀嚼或发音与生活负担|local conditions, chewing or speech and everyday burden
肿瘤;分型、对象进入与患者结局窗口|subtypes, entry and patient-outcome windows
感染;判定口径、暴露机会与服务路径|adjudication definitions, exposure opportunities and care pathways
药代|药效;暴露时间、作用终点与模型条件|exposure times, effect endpoints and model conditions
受体;结合、效能与受体储备的分项资料|separate binding, efficacy and receptor-reserve records
护理|照护;实施时间线、交接信息与本人报告|delivery timelines, handover information and patient reports
民族|族群;身份称谓、互动位置与传承实践|identity terms, interaction positions and transmission practices
家庭|亲属;亲属角色、家务分担与资源流动|kinship roles, household labor and resource flows
城市|社区;进入机会、空间路径与地方制度|entry opportunities, spatial paths and local institutions
劳动|职业;进入退出、工时与收入分布|entry and exit, working hours and income distributions
迁移;出发地、进入目的地与迁移选择|origins, destination entry and migration selection
民法|民商;权利主体、法律行为与效力要件|rights holders, legal acts and validity elements
合同;意思表示、成立时点与履行义务|expressions of intent, formation times and performance duties
物权;权利客体、归属与公示资料|objects of rights, attribution and publicity records
公司|证券|破产;主体关系、信息义务与利益顺位|entity relationships, information duties and priority interests
刑;行为、主观要素与证明责任|conduct, mental elements and burdens of proof
行政|宪法;权限依据、程序机会与理由说明|authority grounds, procedural opportunities and reasons
国际法|条约;法域、多语条款与缔约背景|jurisdictions, multilingual provisions and negotiation contexts
专利;权利要求、技术特征与适用版本|claims, technical features and applicable versions
著作|版权;作品表达、使用方式与许可条件|expressive works, modes of use and licensing conditions
商标;标志、使用场景与混淆判断条件|signs, use settings and confusion-assessment conditions
政治|治理;规则来源、执行条件与行动者立场|rule origins, implementation conditions and actors' positions
和平|威慑|安全;公开信号、相互解释与承诺兑现|public signals, mutual interpretations and fulfilled commitments
新闻;来源核实、采访位置与编辑取舍|source verification, interview positions and editorial selections
受众|观众;接触机会、理解路径与未参与者|exposure opportunities, understanding paths and nonparticipants
语音|音系;录音条件、最小对立与发音位置|recording conditions, minimal contrasts and articulatory positions
语法|句法;最小句对、结构位置与可接受度背景|minimal sentence pairs, structural positions and acceptability contexts
语义|语用;表达形式、上下文与会话推论|expression forms, context and conversational inferences
翻译;原文版本、读者任务与译法取舍|source versions, reader tasks and rendering tradeoffs
文学|叙事;叙述声音、关键片段与版本语境|narrative voices, key passages and edition contexts
认识|证成|证言;主张、理由与来源依赖|claims, reasons and source dependence
模态|可能世界;可及关系、量词范围与反例条件|accessibility relations, quantifier scopes and counterexample conditions
伦理|道德;行动理由、受益负担与申诉机会|action reasons, benefits and burdens, and appeals
美学|艺术哲学;审美对象、经验描述与评价理由|aesthetic objects, experience descriptions and evaluative reasons
宗教|儒|佛|道家;原典用语、注释传统与实践情境|original terms, commentary traditions and practice contexts
绘画|图像|雕塑|书法;作品状态、观看位置与形式细节|work conditions, viewing positions and formal details
音乐|演奏|作曲;谱本、演奏选择与声学条件|scores, performance choices and acoustic conditions
电影|影视;镜头顺序、声画关系与发行版本|shot orders, audiovisual relations and release versions
戏剧|表演|舞蹈|戏曲;排演文本、行动选择与观众位置|rehearsal texts, action choices and audience positions
考古;层位关系、形成过程与出土位置|stratigraphic relationships, formation processes and find locations
口述|记忆;讲述时点、在场位置与重述框架|telling times, witness positions and retelling frames
财政|税;法定支付、行为反应与最终负担|statutory payment, behavioral response and ultimate burden
金融|银行|资产|保险;计量时点、现金流与风险背景|measurement dates, cash flows and risk contexts
贸易;价值链位置、增加值与中间品重复|value-chain positions, value added and repeated intermediate goods
会计|审计;确认依据、证据覆盖与职业判断|recognition grounds, evidence coverage and professional judgment
运营|排队|库存;到达波动、处理能力与积压|arrival variability, processing capacity and backlog
信息检索|图书馆|情报;检索任务、相关性判断与遗漏材料|retrieval tasks, relevance judgments and missed items
旅游|酒店;到访选择、服务链与居民负担|visit selection, service chains and resident burdens
课程|教学|学习;目标任务、辅助条件与延迟迁移|goal tasks, assistance and delayed transfer
心理;任务版本、状态条件与构念定义|task versions, state conditions and construct definitions
体育|运动;训练暴露、恢复阶段与测试熟悉|training exposure, recovery stages and test familiarity
`);return {rows,add};
})();
