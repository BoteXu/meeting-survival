/* 分门类的虚构研究路线。分类同时包含正式专业与研究主题，不作为学位资格目录。 */
window.MEETING_SPECIALTIES=(()=>{
 const C=window.MEETING_CONTENT;
 const text=`
metaphysics;philosophy;形而上学与本体论;proof;存在论,模态问题,时间哲学,因果概念,对象同一性,属性理论,可能世界,身心问题,社会本体论,过程哲学,分析形而上学,传统形而上学;概念承诺、论证前提与反例
epistemology;philosophy;认识论与科学哲学;proof;知识分析,怀疑论,证成理论,社会认识论,科学解释,科学实在论,归纳问题,模型与理想化,测量哲学,专家知识,证言研究,技术知识;知识主张的依据与适用条件
logic-studies;philosophy;逻辑学;proof;数理逻辑,哲学逻辑,模态逻辑,非经典逻辑,论证理论,逻辑史,语义理论,证明理论,模型论,计算逻辑,规范逻辑,逻辑教育;形式语言、推理规则与语义条件
ethics-studies;philosophy;伦理学与价值研究;archive;规范伦理,元伦理,应用伦理,生命伦理,技术伦理,环境伦理,职业伦理,公共伦理,道德心理哲学,伦理思想史,价值冲突,责任与行动;规范理由与经验陈述的区别
religion-studies;philosophy;宗教学;archive;宗教史,宗教哲学,宗教社会学,宗教人类学,宗教文本,宗教艺术,仪式研究,比较宗教,宗教与现代性,宗教与地方社会,宗教与伦理,宗教数字资料;文本、实践与历史语境
economic-theory;economics;经济理论与行为;proof;微观理论,宏观理论,博弈论,信息经济,行为经济,实验经济,制度经济,政治经济,经济思想史,不确定性决策,匹配与市场设计,经济网络;模型均衡、假设与行为资料
development-econ;economics;发展与劳动经济;survey;发展经济,劳动市场,教育经济,人口经济,城乡发展,迁移与收入,贫困与不平等,家庭经济,健康与劳动,职业流动,区域发展,政策评价;政策分配、样本范围与识别条件
finance-studies;economics;金融学;compute;资产定价,公司金融,金融市场,银行研究,保险经济,风险度量,金融计量,行为金融,金融科技,国际金融,家庭金融,金融史;信息时间、风险口径与评价样本
trade-econ;economics;国际与产业经济;survey;国际贸易,国际投资,产业组织,企业生产率,全球价值链,数字贸易,服务贸易,竞争与监管,技术创新,产业转型,贸易史,开放与就业;企业层次、市场范围与比较条件
resource-econ;economics;公共与资源经济;survey;财政与税收,公共支出,环境经济,资源经济,能源经济,农业经济,城市经济,交通经济,气候政策评价,公共服务需求,外部性研究,公共选择;评价边界、资源取舍与受益差异
civil-law;law;民商法学;archive;民法总论,合同法,物权法,侵权责任,公司法,证券法研究,破产法,保险法研究,知识产权,家庭与继承,消费者保护,数字交易法;事实关系、规范效力与适用范围
criminal-law;law;刑事法学;archive;刑法理论,刑法史,刑事政策,刑事诉讼,证据研究,犯罪学,少年司法,刑罚理论,司法案例,比较刑法,刑事司法治理,刑事法教育;规范论证、案件事实与程序条件
constitutional-law;law;宪法与行政法;archive;宪法理论,基本权利,行政法理论,行政程序,行政诉讼,公共机构治理,地方制度,比较宪法,法治评价,信息公开研究,公共服务法,数字行政;权力依据、程序与权利边界
international-law;law;国际与比较法;archive;国际公法,国际私法,国际经济法,国际组织法,国际环境法,国际争端研究,比较民法,比较公法,跨境法律关系,区域法律制度,国际法史,法律翻译;法域、适用规则与材料出处
law-society;law;法社会学与法学方法;field;法律经验研究,司法社会学,法律职业,法律意识,法制史,法哲学,法律解释,法律与技术,纠纷解决,法律服务,法学文献方法,法律教育;规范判断与经验材料分别论证
education-theory;education;教育学原理与教育史;archive;教育哲学,教育社会学,教育史,比较教育,教育制度,教育公平,教育伦理,家庭教育,学校文化,教育思想史,教育政策史,教育知识论;教育目标、历史语境与制度条件
curriculum-studies;education;课程与教学论;field;课程理论,教学设计,课堂研究,学科教学,教材分析,教师反馈,学习评价,项目学习,探究教学,跨学科课程,课程实施,教学反思;教学目标与实际课堂证据
early-education;education;学前与特殊教育;field;儿童发展,游戏与学习,幼儿园课程,家庭协作,融合教育,特殊教育评价,语言发展教育,感知与运动支持,支持技术,教育参与,早期教育环境,教育服务;儿童经验、任务条件与支持需要
higher-education;education;高等与职业教育;survey;大学治理,研究生教育,高等教育评价,职业教育,专业与课程,大学生发展,学术职业,产教合作,继续教育,教育与就业,国际教育,校园支持;机构制度与学生经历的层次
education-technology;education;教育技术与学习设计;design;学习分析,数字学习环境,在线协作,教学媒体,教育游戏,智能辅导评价,资源设计,教师数字实践,学习可及性,教育技术伦理,沉浸学习,技术整合;工具版本、学习任务与效果边界
chinese-language;literature;中国语言文学;archive;古代文学,现代文学,当代文学,文艺理论,汉语语法,汉语词汇,汉语方言,古典文献,文学批评,文学与媒介,地域文学,文学教育;作品版本、语言材料与解释语境
foreign-literatures;literature;外国文学与比较文学;archive;英语文学,法语文学,德语文学,俄语文学,日本文学,韩国文学,跨文化比较,世界文学,文学翻译,后殖民研究,文学与迁移,比较诗学;语种、译本与比较范围
linguistics-studies;literature;语言学与应用语言;field;语音学,音系学,句法学,语义学,语用学,社会语言学,心理语言学,语料库语言学,语言接触,语言习得,语言政策,语言技术评价;语言单位、语料条件与使用情境
translation-studies;literature;翻译与跨文化传播;archive;翻译理论,翻译史,文学翻译,口译研究,专业翻译,视听翻译,机器翻译评价,翻译技术,译者研究,翻译教育,跨文化交流,翻译伦理;翻译目的、文本版本与取舍依据
media-studies;literature;新闻与媒介研究;survey;新闻史,新闻生产,传播理论,受众研究,平台传播,视觉传播,健康传播,科学传播,公共传播,媒介伦理,数字新闻,媒介档案;消息来源、传播过程与受众范围
chinese-history;history;中国史;archive;中国古代史,中国近现代史,制度史,经济史,社会史,文化史,思想史,地方史,人口史,交通与交流史,中国史学史,中国历史地理;史料年代、地域与史家解释
world-history;history;世界史;archive;古代世界史,中世纪史,世界近代史,世界现代史,区域史,全球史,国际关系史,殖民与帝国史,跨国史,世界经济史,环境史,世界史学史;跨地区资料与历史比较
historical-documents;history;历史文献与古籍;archive;版本学,目录学,校勘学,文献整理,手稿研究,碑刻文献,简牍文献,地方志,历史地图,古籍数字化,文本传承,文献收藏史;原件、整理本与传承链
heritage-studies;history;考古与文化遗产;field;聚落考古,城市考古,墓葬资料,陶瓷考古,建筑考古,水下考古资料,年代资料评价,遗产展示,遗产公众参与,保护史,博物馆史,考古档案;出处、层位与复原中的未知
public-history;history;公众史学与历史表达;design;口述历史,社区记忆,历史展览,数字公众史,历史影像,历史教育,纪念与记忆,地方博物馆,历史写作,公众档案,历史游戏评价,公共史学伦理;讲述者位置、材料权限与受众理解
geophysics-studies;science;地球物理与地球系统;environment;固体地球物理,地球动力学,地震观测,地磁观测,重力资料,地球物理反演,岩石物理,地球化学资料,构造研究,地球系统模型,地球观测质控,地学数据复现;观测标定、尺度与反演假设
ocean-science;science;海洋科学;environment;物理海洋,海洋化学,海洋生态,海洋地质,海气相互作用,海洋遥感,近岸过程,海洋观测,海洋时间序列,海洋模型,海洋数据质量,海洋环境史;航次窗口、空间范围与观测条件
mechanics-science;science;力学;proof;理论力学,固体力学,流体力学,计算力学,实验力学,多尺度力学,非线性动力学,材料力学,结构稳定,生物力学,力学测量,力学模型验证;边界条件、尺度与守恒关系
photonics;science;光学与光子科学;bench;几何光学,物理光学,量子光学理论,光谱研究,成像科学,光学材料,光电测量,光学仪器,计算成像,光学噪声,光学标定,光学数据复现;光路条件、信号与背景
systems-biology;science;生命系统与生态资料;compute;系统生物学,生物信息学,计算生态,群体遗传资料,发育资料比较,进化资料研究,公共组学资料,网络生物学,生命系统模型,生态时间序列,生物资料质控,生命科学教学;独立对象、来源批次与模型范围
software-engineering;engineering;软件工程;compute;软件需求,软件架构,软件测试,程序分析,软件维护,软件可靠性,软件工程教育,开源协作,开发工具,软件可用性,软件度量,软件复现;版本、任务与可重现故障
electrical-engineering;engineering;电气工程;engineer;电机研究,电力系统,电力电子,绝缘与可靠性,电气测量,可再生能源接入,电网运行评价,电能质量,电气设备诊断,电气自动化,储能系统评价,电气工程教育;运行工况、接口与安全边界
hydro-marine;engineering;水利与海洋工程;engineer;水文资料,水资源系统,水工结构,河流工程,海岸工程,港口工程,海洋结构,工程数值模型,工程监测,泥沙资料,工程环境评价,水利工程史;边界输入、观测窗口与模型比例
geomatics-engineering;engineering;测绘与遥感工程;compute;大地测量,工程测量,摄影测量,遥感信息,地理信息工程,导航资料评价,地图表达,点云处理,时空数据,测绘质量,多源资料配准,测绘工程教育;坐标基准、精度口径与配准版本
process-engineering;engineering;化工与过程工程;engineer;化工热力学,传递过程,反应工程理论,过程系统,分离过程理论,过程控制,过程强化评价,资源循环,过程模拟,过程测量,工况可靠性,化工工程教育;物料边界、工况与模型前提
crop-science;agriculture;作物科学;environment;作物栽培,作物生理,作物遗传资料,作物育种评价,种质资料,作物品质,农田管理,农艺试验设计,农业气候,作物模型,作物表型资料,作物生产系统;地块、季节与重复测量
horticulture-studies;agriculture;园艺学;environment;果树研究,蔬菜研究,花卉研究,设施园艺,园艺品质,园艺生理,园艺资源资料,园艺生态,采后评价,园艺生产系统,园艺表型,城市园艺;生长阶段、环境与评价窗口
soil-resources;agriculture;农业资源与土壤;environment;土壤学,植物营养资料,农业资源,土壤生态,农田环境,土壤空间分析,土壤水分,土地利用,资源循环,土壤测量,农业资源评价,农业环境史;地块层次、测量批次与尺度
forest-science;agriculture;林学与林业研究;environment;森林生态,森林培育,森林资源,森林经营,林木资料,森林土壤,林业遥感,森林碳资料,城市林业,林产品评价,森林健康资料,林业社会研究;林分层次、长期观测与经营情境
aquatic-science;agriculture;水产与渔业科学;environment;水产生态,渔业资源,水产营养资料,水产遗传资料,养殖环境评价,水产品质量,水产动物福利,渔业管理,渔业社会研究,水产生产系统,渔业统计,水域观测;池塘或水域单位、季节与观察条件
strategic-studies;military;战略与安全研究;archive;战略思想史,安全理论,公开战略文本,区域安全研究,国际安全机制,安全伦理,危机叙事研究,战略传播史,公共安全政策,比较安全制度,战略文化,安全教育;公开材料、情境设定与判断层次
military-history;military;军事历史与文化;archive;军事思想史,军制史,军事社会史,战争记忆,军事教育史,军史文献,军事博物馆,军史口述资料,军事文化,和平研究史,军事史学史,军事人物资料;史料出处、年代与叙述立场
defense-management;military;国防管理与公共事务;survey;国防经济公开资料,国防教育,组织管理研究,人力培养研究,资源配置公开资料,公共事务协作,国防政策史,管理制度比较,项目评价方法,国防文化传播,教育成效评价,公开资料质量;组织层次、资源口径与公开证据
military-technology-history;military;军事科技史与技术评价;archive;技术发展史,装备史公开资料,标准史,技术组织史,科技政策史,技术伦理,公共技术展示,技术叙事,创新制度比较,科技教育史,技术档案,技术资料评价;公开技术描述与可验证资料
peace-conflict;military;和平与冲突研究;survey;和平理论,冲突叙事,协商制度研究,国际组织资料,和平教育,记忆与和解,公众安全感,冲突数据质量,文化与和平,迁移与冲突资料,公共政策比较,和平传播;记录范围、概念定义与比较条件
business-management;management;工商管理与组织;survey;企业战略,组织行为,人力资源,创新管理,创业研究,企业治理,组织文化,管理案例,服务管理,团队协作,管理伦理,管理教育;组织与个体层次、案例选择
accounting-studies;management;会计与审计研究;archive;财务会计,管理会计,审计研究,信息披露,公司治理,会计史,公共部门会计,非财务报告,审计数据,会计规范,职业判断,会计教育;报告口径、时期与资料来源
information-management;management;信息资源与图书情报;archive;图书馆学,情报学,档案管理,知识组织,信息检索,科学计量,用户信息行为,数字保存,公共信息服务,知识管理,数据治理,信息伦理;信息来源、检索覆盖与记录版本
operations-management;management;工业工程与运营管理;engineer;生产系统,运营研究,质量管理,供应链,服务运营,人因工程,项目管理,可靠性管理,流程改进,运营模型,库存评价,工业工程教育;流程单位、资源约束与评价周期
public-governance;management;公共治理与社会保障;survey;行政管理,社会保障,社会政策,公共预算,公共服务,应急管理研究,基层治理,非营利组织,数字治理,政策执行,公众参与,治理评价;执行层次、公众范围与制度情境
fine-art-studies;arts;美术学与视觉实践;design;绘画研究,雕塑研究,版画研究,书法研究,视觉材料,美术史,美术理论,当代艺术,公共艺术,美术教育,材料表达,展览研究;作品过程、材料与解释依据
musicology-studies;arts;音乐学与音乐实践;design;音乐史,民族音乐学,音乐分析,作曲研究,演奏实践,声乐研究,音乐教育,音乐技术,录音评价,音乐心理资料,音乐与社会,音乐文献;谱面、表演版本与听觉条件
film-studies;arts;电影与影像研究;design;电影史,电影理论,影像叙事,纪录片研究,视听语言,影像档案,影视制作研究,观众研究,电影文化,数字影像,影像教育,跨媒介影像;镜头材料、制作过程与观看语境
theatre-studies;arts;戏剧与表演研究;design;戏剧史,剧本研究,舞台设计,表演实践,戏曲研究,舞蹈研究,戏剧教育,剧场观众,排练过程,剧场技术评价,表演档案,参与式表演;剧本、排练与具体场次
art-design-theory;arts;艺术理论与设计史;archive;艺术哲学,设计史,艺术制度,策展理论,艺术批评,视觉文化,艺术社会学,艺术与科技,工艺史,艺术收藏史,设计伦理,艺术教育史;作品出处、展示语境与价值判断
`;
 const familyRules={philosophy:['概念或定义改变了论证','反例的前提与原命题不一致','引文省略了限定条件','model,ethics,text'],economics:['比较组在干预前已经不同','资料年份和评价期不一致','模型漏掉了一个资源条件','inference,resources,governance'],law:['引用的规则版本不一致','案情摘要遗漏了程序背景','经验结果被当成规范理由','governance,ethics,text'],education:['课堂任务和评价目标不同','只收到了积极参与者的反馈','学校层次与个人层次混用','learning,interaction,inference'],literature:['整理本与原文存在差异','语料只覆盖一种使用情境','译文省去了关键的限定','text,culture,interaction'],history:['史料年代与叙述年代错位','转引没有保留原件出处','后来术语被套进当时语境','text,culture,space'],science:['观测条件没有进入模型','测量批次与比较组重叠','独立对象和重复记录混算','measurement,model,inference'],engineering:['接口更新后旧记录不能重现','演示工况与目标场景不同','失效情况没有进入评价','systems,measurement,resources'],agriculture:['地块内多次观察被当成多个地块','季节变化与研究条件重叠','未完成观测的地块未被说明','environment,life,measurement'],military:['公开摘要没有保留原出处','情景设定被写成历史事实','不同组织层次的记录混用','text,governance,ethics'],management:['机构指标被用来解释个人','案例只留下了成功项目','记录口径随着流程变化','resources,governance,inference'],arts:['作品版本和评价对象不一致','观众反馈没有注明观看情境','创作意图被当成接受效果','creative,culture,interaction']};
 const routes=text.trim().split('\n').map(s=>{const [id,family,name,resource,names,focus]=s.split(';'),r=familyRules[family];return {id,family,name,resource,dirs:names.split(','),focus,incidents:r.slice(0,3),tags:r[3].split(','),icon:C.families.find(f=>f.id===family)?.icon||({philosophy:'🦉',economics:'📈',law:'⚖️',education:'📚',literature:'📜',history:'🏺',science:'🔭',engineering:'⚙️',agriculture:'🌾',military:'🧭',management:'🏛️',arts:'🎨'})[family]};});
 for(const d of routes){const flag='route_'+d.id;C.extraFlags.push(flag);C.projects.push({id:d.id,family:d.family,icon:d.icon,name:d.name,desc:d.focus+'，计划还要留出生活。',flag,tag:d.name+'路线',effects:{evidence:3,mood:2},topics:[d.dirs[0]+'的研究问题',d.focus,d.dirs[2]+'的资料与解释'],ending:d.name+'的附录终于有了目录'});const questions=['这个问题与「'+d.dirs[0]+'」的已有工作是什么关系？','在「'+d.focus+'」中，哪些条件决定这个方法能否使用？','原始材料如何对应「'+d.dirs[2]+'」的这一版判断？',d.incidents[0]+'，你能保留哪一段解释？',d.incidents[1]+'，哪份记录需要重新核对？','下一步的资源入口和等待条件是什么？','这周的结论和下周的承诺分别有哪些？'];questions.forEach((quote,i)=>C.events.push({id:d.id+'-special-'+i,project:d.id,phase:[1,2,3,4,6,7,8][i],who:i===1?'stats':i===2?'senior':'boss',title:quote,quote,scene:d.name+'正在讨论「'+d.focus+'」。'+d.incidents[i%3]+'。',choices:[{text:'拿出当前课题的准备记录，把条件、判断与未知分别讲清。',effects:{evidence:7,patience:1,time:-3},flags:{rigor:1},result:'这个判断有了可以继续核查的来路。',flavor:'对方开始追问其中一个条件。'},{text:'说明目前的缺口，约一个能完成的补查，不承诺整份课题。',effects:{evidence:-1,patience:2,time:-2},flags:{honest:1,debt:1,[flag]:1},result:'问题被留成了具体的下一步。',flavor:'这项承诺还要占用之后的生活片段。'},{text:'把这次意外记进本专业的组会年鉴，请大家替章节取名。',effects:{mood:7,patience:-4,evidence:-3,time:-2},flags:{chaos:1,[flag]:1},result:'章节标题受到了欢迎。',flavor:'老师把气氛接住，又把记录翻回了原页。'}]}));const id='discipline-'+d.id;C.disciplineEndings.push({id,project:d.id,flag});C.endings.push({id,kind:'funny',icon:d.icon,title:d.name+'的附录终于有了目录',subtitle:'正文还在修改，目录先被同门收藏。',desc:'你替每个问题留下了材料的来路。有人来借附录，也有人只来借你的食堂攻略。',hint:'在这一专业持续沟通边界或整活，并抵达收尾。'});}
 function installSurprises(){for(const d of routes)window.MEETING_SURPRISE_CONTENT.disciplines.push([d.id,...d.incidents,d.name+'的关键条件没有归档','一个关键条件没有核对，追问逐步缩小到你暂时无法回答的那页。']);}
 function installDirections(D){for(const d of routes){d.dirs.forEach((name,i)=>D.all.push({id:d.id+'-'+(i+1),route:d.id,name,topic:d.focus,icon:d.icon,tags:d.tags,kind:['literature','method','record','boundary'][i%4]}));for(const p of C.projects.filter(p=>p.family===d.family&&p.id!==d.id))D.connect(d.id,p.id);const shared={proof:'theory',compute:'data',archive:'humanities',field:'field',survey:'statistics',design:'design',engineer:'mechanical',environment:'environment'}[d.resource];D.connect(d.id,shared);}}
 return {routes,familyRules,find:id=>routes.find(d=>d.id===id),installSurprises,installDirections};
})();
