/* 每一个研究分支有可审阅的对象与问题，不把宽泛路线当成正式专业编码。 */
window.MEETING_DIRECTION_REVIEW=(()=>{
  const D=window.MEETING_DIRECTIONS,copy=x=>JSON.parse(JSON.stringify(x));
  const rules=[
    [/遗传|家系|变异/,'对象关系、参考版本与变异解释','参考版本改变后，哪些解释仍然成立？'],
    [/生存|长期|随访|结局|队列|登记/,'入组范围、观察时间与未完成随访','没有完成随访的人去了哪里，观察时间是否一致？'],
    [/影像|成像|图像|超声|磁共振|CT|PET|SPECT|数字病理/,'对象内重复、平台版本与图像质量','重复图像属于多少个对象，平台差异怎样处理？'],
    [/量表|报告|体验|生活质量|症状/,'测量含义、填答者与时间窗口','这个回答由谁给出，测到的是哪一种体验？'],
    [/设备|器械|原型|界面|机器人|辅助技术/,'原型版本、使用任务与失败反馈','这一版能完成哪种实际任务，没完成的人留下了什么反馈？'],
    [/代谢组|蛋白组|组学|资料整合/,'来源、批次与独立对象','不同来源和批次对上了什么对象，重复资料有没有分开？'],
    [/政策|管理|服务|公平|人力|照护整合/,'目标、执行层次与受益差异','纸面目标和实际执行哪里不同，哪些人没有受益？'],
    [/经济|成本|效用|支付|预算|资源配置/,'评价边界、价格年份与资源取舍','这份成本计入了哪些范围，价格来自哪一年？'],
    [/公共卫生|流行病|群体|健康传播/,'群体范围、信息来源与比较条件','谁进入了材料，谁没有被观察到，比较条件怎样对齐？'],
    [/文献|传统知识|档案|原典/,'出处、整理版本与术语语境','原件、整理本和后来的解释各自来自哪里？'],
    [/生理|生物力学|功能|监测|连续|步态/,'任务或测量条件、重复记录与时间','同一对象的重复记录怎样对应条件与时间？'],
    [/病理|检验|生化|测量|一致性|参考范围/,'测量口径、平台或读者差异','换一个平台或复核者，哪一项判断仍能保留？'],
    [/药物|药代|药理|用药/,'模型或使用情境、暴露记录与解释','这些记录来自什么使用情境，关联与作用判断如何区分？'],
    [/免疫|分子|细胞|组织/,'资料来源、批次与模型范围','来源与批次如何对应，模型中看到的现象能解释到哪一步？'],
    [/康复|营养|发育|衰老|老年|健康寿命/,'阶段、生活条件与功能或体验变化','年龄或生活条件改变后，这个指标还是同一含义吗？']
  ];
  const corrections={'statistics-1':{topic:'估计目标、抽样条件与不确定性'},'pharmacy-4':{name:'药剂学与递送研究'},'music-3':{topic:'声音信号、录音条件与表达判断'}};
  for(const d of D.all){Object.assign(d,corrections[d.id]||{});const med=window.MEETING_MEDICAL.find(d.route),rule=med?rules.find(([rx])=>rx.test(d.name)):null;if(med)d.topic=rule?rule[1]:'研究对象、观察窗口与资料比较条件';d.reviewFocus=med?d.name+'：'+d.topic:d.topic;d.reviewQuestion=rule?rule[2]:['philosophy','theory'].includes(d.route)?'今天采用哪些定义和前提，结论具体成立到哪里？':['humanities','history','languages','anthropology','field','archaeology','music','art'].includes(d.route)?'这份材料形成于什么语境，你的解释与材料本身如何区分？':'这一研究问题的对象、条件和判断依据怎样对应？';const specialty=window.MEETING_SPECIALTIES?.find(d.route);if(specialty){d.reviewFocus=d.name+'：'+specialty.focus;d.reviewQuestion='「'+d.name+'」中，'+specialty.focus+'怎样对应本周的实际材料？';}d.reviewStatus='editorial-reviewed';}
  // A branch pivot changes all complete preparation gates. Legacy runs keep their recorded rules.
  function life(w,raw){const p=w.world?.artifact;if(!(w.academy||window.MEETING_DAILY_TIME?.enabled(w))||!raw?.prepKind||raw.project!==p?.route||w.taskFocus)return raw;const d=D.find(p.direction),e=copy(raw);e.direction=p.direction;e.projectVersion=p.version;e.title=window.MEETING_PREPARATION.names[e.prepKind]+' · '+d.name;e.scene='当前研究分支「'+d.name+'」：'+d.reviewFocus+'。'+d.reviewQuestion+' 这半天的核对只属于当前方向、当前课题版本。';e.choices[0].flavor='你留下了「'+d.name+'」的核对笔记，依据与未知分别记在当前版本里。';return e;}
  function context(s,raw){const p=s.weekContext?.world?.artifact;if(!(s.weekContext?.academy||s.balanceVersion===1&&!s.weekContext?.world?.challenge)||!raw?.prepKind||raw.project!==p?.route)return raw;const e=copy(raw),d=D.find(p.direction),b=s.weekContext.preparation;e.title=({literature:'这个方向已有工作解决了什么，哪些问题仍未解决？',method:d.reviewQuestion,record:'原始材料怎样对应研究对象、条件与这一版结果？',boundary:'材料支持到哪一步，哪些其他解释仍需要检查？'})[e.prepKind];e.scene='「'+d.name+'」 · '+d.reviewFocus+'。老师请你依据当前方向、当前课题版本的准备记录回应。';e.choices=e.choices.map(c=>{if(c.prepared){const source=b.sources.findLast(x=>x.route===p.route&&x.kind===c.prepared.kind&&x.direction===p.direction&&x.projectVersion===p.version&&x.level>=c.prepared.minimum);c.prepared={...c.prepared,available:!!source,level:source?.level||0,source:copy(source||null),reason:'完整回应需要当前研究分支、当前课题版本的实际准备；旧方向保留为参考。'};}return c;});return e;}
  function topic(w,kind){const p=(w.academy||window.MEETING_DAILY_TIME?.enabled(w))&&w.world?.artifact,d=p&&D.find(p.direction);if(!d||d.route!==p.route)return null;return ({literature:d.name+' · 背景与研究问题',method:d.name+' · '+d.topic,record:d.name+' · 原始材料与来源',boundary:d.name+' · 解释范围与其他可能',rehearsal:d.name+' · 依据、结论与未知'})[kind];}
  function book(w){const p=(w.academy||window.MEETING_DAILY_TIME?.enabled(w))&&w.world?.artifact;if(!p||p.route==='interdisciplinary'||w.mixProjects||w.config?.project==='interdisciplinary')return w.preparation;return {...w.preparation,sources:w.preparation.sources.filter(s=>s.route===p.route&&s.direction===p.direction&&s.projectVersion===p.version)};}
  return {rules,corrections,life,context,topic,book};
})();
