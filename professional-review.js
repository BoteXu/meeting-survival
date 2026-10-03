/* 按路线审核后的研究语境。目录为游戏分支，不是官方学位目录的逐项复刻。 */
window.MEETING_PROFESSIONAL=(()=>{
  const C=window.MEETING_CONTENT,copy=x=>JSON.parse(JSON.stringify(x));
  const reviewed={
    classic:['生物现象、材料批次与观察记录','同一对象内的重复观察不能自动代表多个独立对象','这些观察来自哪些独立对象，批次与组别是否重叠？'],
    data:['数据划分、基线与复现环境','测试集不能参与训练与模型选择','训练、选择和最终评估的材料有没有发生交叉？'],
    theory:['定义、假设、证明与反例','数值例子不能完成一般性证明','这个步骤依赖哪条已证明的条件，在哪个范围成立？'],
    field:['田野关系、同意范围与研究者位置','田野资料支持语境中的解释，不自动代表总体分布','这句话形成于哪一种关系与语境，你的位置影响了什么？'],
    clinical:['对象、随访、研究设计与结局','相关性不能直接写成治疗效果，人数与图像数要分开','对象、记录和随访分别按什么单位统计？'],
    physics:['物理量、测量条件与近似','仪器读数与理论量需要明确对应，不靠拟合好看证明机制','这个近似在哪个尺度有效，系统偏差如何进入解释？'],
    chemistry:['材料来源、测量与谱图解释','一个谱峰不能独自确定全部材料结构','这一峰还有什么解释，材料批次与测量条件怎样对应？'],
    economics:['估计目标、识别条件与制度背景','显著性不能替代识别条件或实际意义','这个比较依赖哪个识别条件，换一个窗口为什么会变？'],
    humanities:['文本版本、叙述声音与解释','作者、叙述者和人物的立场需要分开','这句话是谁说的，来自哪一版文本，解释依据在哪里？'],
    art:['创作问题、媒介选择与作品过程','创作研究不必套用实验显著性；作品目标与形式要对应','这次形式取舍回应哪一个创作问题，过程记录在哪里？'],
    philosophy:['概念、论证与反对意见','描述性前提不能直接推出规范性判断','这个应当判断还需要哪一个规范前提？'],
    law:['规范效力、适用条件与事实认定','规范研究与经验研究有不同证据要求','这项规范在什么效力层级，适用到这一事实需要哪些条件？'],
    politics:['概念、制度与比较层次','国家、组织与个体层次不能任意互换','比较的是哪一个层次，制度安排与实际执行怎样区分？'],
    education:['学习目标、教学过程与评价','课堂活跃或满意度不能单独代表学习效果','任务评价测到的是教学目标，还是学生更熟悉的另一种能力？'],
    sports:['训练负荷、测量条件与个体变化','重复测试要考虑熟悉任务和休息条件','这次变化能否区分训练、任务熟悉和测试条件的影响？'],
    psychology:['构念、测量与分析计划','量表总分不是构念本身，探索与验证应区分','量表如何对应你讨论的构念，探索中改过哪些分析分支？'],
    languages:['语言材料、语境与理论解释','译文与原文、语言形式与使用语境需要对应','这个例句来自什么语境，另一种表达会怎样影响判断？'],
    journalism:['传播内容、受众与媒介过程','曝光、互动与说服效果属于不同指标','你记录的是传播接触、参与行为，还是态度变化？'],
    history:['史料出处、形成背景与时序','材料缺失不能直接写成事件不存在','这份记载在何时由谁形成，缺页限制了哪一段判断？'],
    earth:['地学过程、时空尺度与观测覆盖','点位、区域与不同季节的解释范围不同','这个观测窗口覆盖了哪一种过程，尺度改变后结论怎样调整？'],
    environment:['系统边界、环境变化与取舍','关联箭头不能直接成为作用机制','观测到的联系与假设的机制分别有哪份依据？'],
    electrical:['电路或器件、信号与测试条件','电子性能与通信系统性能不能混为一个指标','这个指标属于器件还是系统，测试工况与接口是什么？'],
    mechanical:['机械结构、工况与可靠性','仿真或一次演示不能代表全部真实工况','失效工况有没有进入评价，仿真与实测分别支持哪一段？'],
    civil:['结构、场地条件与工程评价','模型材料或单一场地不能自动覆盖其他工程条件','模型边界和场地条件怎样对应，哪里仍需要独立核对？'],
    energy:['能量边界、工况与资源','能量、功率与效率不能随意互换','系统边界包含哪些输入输出，这个效率采用什么时间与工况？'],
    aerospace:['空间或飞行情境、系统与公开资料','仅使用公开的学术情境；工况与任务要求需对应','这段公开资料支持哪一种工况，哪一段只是任务设想？'],
    agriculture:['生长条件、地块与产出','地块、单株与重复测量属于不同层次','这次比较的独立单位是地块还是植株，季节条件怎样进入记录？'],
    veterinary:['动物对象、健康与照护','动物种属、群体与个体层次要保持一致','不同种属或照护条件能否放在同一个解释范围？'],
    food:['食品组成、保存条件与评价','组成、可接受性与健康结局是不同问题','测到的组成能回答使用或健康问题到哪一步？'],
    pharmacy:['药学资料、作用边界与使用情境','模型中的作用线索不能直接变成临床获益','资料来自哪一种模型，作用线索与实际使用之间还缺什么？'],
    nursing:['照护流程、执行条件与体验','满意度与照护实际效果需要不同依据','交接执行与纸面流程在哪里不同，记录覆盖哪些班次？'],
    management:['组织案例、指标与行为','公司层次的指标不能直接解释个体行为','这个指标属于哪个组织层次，失败案例是否进入了材料？'],
    publicadmin:['政策目标、执行层次与公众经验','纸面流程不能代替实际执行记录','哪一个执行层次产生了差异，未完成项目如何记录？'],
    music:['音乐结构、表演与听觉经验','音乐、舞台与影像研究可交叉，但需明确对象','讨论的是谱面结构、这次表演，还是录音条件下的听觉经验？'],
    military:['公开战略材料、组织与情景解释','推演设定不等于事实，仅使用公开非操作性内容','公开案例与当前设定有哪些背景差异，判断能到哪一层？'],
    interdisciplinary:['两侧依据、接口定义与共同范围','两个学科名称放在一起不构成交叉验证','两侧采用同一个词时，定义、单位和评价标准是否真正对应？'],
    statistics:['估计目标、抽样、缺失与不确定性','置信区间不等于个体预测区间','这个区间针对参数还是未来个体，哪些重复记录共享同一对象？'],
    astronomy:['观测窗口、背景与标定','没有检测到信号不自动证明对象不存在','灵敏度、背景和观测窗口怎样限制这个未检出的解释？'],
    sociology:['群体、社会情境与抽样','受访者陈述与行为记录、个案与总体应区分','这个解释依赖谁进入材料，谁没有被观察到？'],
    anthropology:['关系、参与观察与语境','研究者位置与转译要保留在解释里','这段转译遗漏了哪些语境，原提供者如何理解它？'],
    archaeology:['层位、出处与年代范围','形式相似不自动表示年代或用途相同','层位与出处分别提供了什么依据，复原中哪段仍是设想？'],
    geography:['尺度、空间关系与投影','空间聚集不自动解释形成原因','区域划分与尺度改变后，聚集模式和解释是否仍然一致？'],
    materials:['结构、批次、测量与性能','局部表征不能自动推成整体性能','这张局部图和性能曲线是否来自同一批材料、同一条件？'],
    automation:['控制目标、模型与扰动','稳定性与控制性能不能互相替代','稳定以外，延迟和未建模扰动影响了哪一个性能目标？'],
    communications:['信道、编码、资源与误差','比较条件与完整资源开销都要说明','基线使用同样信道条件吗，辅助开销是否进入了比较？'],
    architecture:['场所、空间需求与使用','图纸表现不能直接代表使用体验','谁在什么时间使用这个空间，反馈对应哪一版图纸？'],
    design:['任务、原型版本与使用者反馈','评价要包含未完成任务者，不只看熟悉用户','没有完成的人卡在了哪里，这条反馈属于哪一版原型？'],
    publichealth:['群体、执行与健康指标','总体均值变化可能遮蔽受益不均','指标改善中哪些群体没有受益，回收差异如何限制判断？']
  };
  for(const d of window.MEETING_MEDICAL.routes){const p=C.projects.find(p=>p.id===d.id);p.desc=d.incidents[0]+'，解释得清楚也是进展。';p.topics=[d.dirs[0]+'的研究问题',d.name+'的设计与资料条件',d.name+'的记录与解释范围'];reviewed[d.id]=[d.name+'的对象、资料窗口与专业比较',d.incidents.join('；'),d.incidents[0]+'，你准备怎样核对这次比较的范围？'];const events=C.events.filter(e=>e.project===d.id&&e.id.includes('-med-'));events[1].title=events[1].quote=d.incidents[0]+'。这一段比较还能保留吗？';events[2].title=events[2].quote=d.incidents[1]+'。先查哪一份记录？';events[4].title=events[4].quote=d.incidents[2]+'。这一页需要怎样修改？';}
  const findings=[['statistics','不确定区间被当作个体范围','参数的不确定区间被误作个体预测范围'],['publichealth','时间变化被当成单一作用','时间变化被当成单一因素的作用'],['clinical','排班表和你签署休战协议','排班表和你签署休战协议']];
  for(const [route,a,b] of findings){for(const e of [...C.events,...C.lifeEvents,...C.preparationEvents,...C.endings]){if(e.project&&e.project!==route)continue;for(const k of ['title','scene','quote','desc'])if(typeof e[k]==='string')e[k]=e[k].replaceAll(a,b);}}
  // A real research question per route; fictional anecdotes remain jokes in the choices.
  for(const p of C.projects){const d=reviewed[p.id];if(!d)throw Error('缺少专业审核 '+p.id);C.events.push({id:'reviewed-'+p.id,project:p.id,phase:4,who:'boss',title:d[2],quote:d[2],scene:'本周的专业讨论聚焦「'+d[0]+'」。'+d[1]+'。',answerKind:'boundary',choices:[{text:'对照本周已经准备的材料，解释这项判断的依据和适用范围。',effects:{evidence:7,patience:1,time:-3},flags:{rigor:1},result:'材料和专业问题接到了同一页。',flavor:'完整回应只在相应准备已经完成时可用。'},{text:'说清目前还无法回答的部分，约定一个能实际完成的补查。',effects:{evidence:-2,patience:2,time:-2},flags:{honest:1,debt:1},result:'未解决的部分仍有后续。',flavor:'承诺会进入下一周，不会替你完成核对。'},{text:'先画一张解释草图，把这项判断与其他可能解释并列。',effects:{evidence:1,patience:-1,mood:3,time:-3},flags:{honest:1},result:'讨论有了可以继续拆分的结构。',flavor:'草图是解释计划，尚不等于核对完成。'}]});}
  function annotate(s,raw){if(!raw)return raw;const p=s.weekContext?.world?.artifact;if(!p||!raw.project||raw.project==='interdisciplinary'||raw.project!==p.route||raw.academicTalk)return raw;const e=copy(raw),dir=window.MEETING_DIRECTIONS.find(p.direction);e.scene='当前研究分支：'+dir.name+' · 课题 v'+p.version+'。'+e.scene;if(e.id.includes('-med-')&&e.phase>=3){const c=e.choices.find(c=>c.flags?.rigor),source=p.checks.findLast(c=>c.version===p.version&&c.route===p.route&&(!c.direction||c.direction===p.direction));if(c)c.prepared={kind:'record',route:p.route,minimum:2,level:source?2:0,available:!!source,source:copy(source||null),reason:'展示本版记录需要本研究分支、当前课题版本的实际核对。'};}return e;}
  return {reviewed,findings,annotate};
})();
