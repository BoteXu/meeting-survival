window.MEETING_DIRECTIONS=(()=>{
  'use strict';
  const C=window.MEETING_CONTENT;
  // 游戏中的研究方向，不作为正式学位目录或专业资格分类。
  const rows=[
    ['classic','分子与细胞|细胞状态与功能解释|life,measurement','生理与病理|组织功能与研究条件|life,health','组学与系统生物学|高维资料与独立样本|life,inference'],
    ['data','机器学习|模型泛化与数据划分|model,inference','软件与系统|运行边界与故障记录|systems,networks','人机交互|用户任务与使用反馈|interaction,learning'],
    ['theory','分析与微分方程|解的条件与适用范围|model,systems','概率与数理统计|随机性与推断条件|inference,model','离散数学与优化|结构约束与可行方案|networks,resources'],
    ['field','社会调查|抽样范围与社会情境|inference,governance','文化人类学|参与关系与语境解释|culture,text','社会网络|关系结构与连接含义|networks,interaction'],
    ['clinical','临床研究设计|比较对象与结局口径|health,inference','医学影像|图像记录与个体边界|health,measurement','健康服务研究|就医过程与执行条件|health,governance'],
    ['physics','凝聚态物理|微观结构与宏观性质|materials,measurement','理论与计算物理|模型假设与近似条件|model,systems','光学与测量|信号、背景与标定|measurement,networks'],
    ['chemistry','分析化学|信号来源与测量条件|measurement,materials','物理化学|结构、能量与条件解释|energy,model','高分子与软材料|材料状态与使用环境|materials,life'],
    ['economics','微观与行为经济|个体选择与识别条件|inference,interaction','宏观与发展经济|时间变化与资源分配|resources,governance','环境与公共经济|外部影响与政策比较|environment,governance'],
    ['humanities','文学史|作品版本与时代语境|text,culture','比较文学|跨文化材料的可比性|culture,text','数字人文|文本编码与解释边界|text,inference'],
    ['art','视觉与传达|表达形式与受众理解|creative,interaction','产品与交互|使用任务与原型反馈|interaction,systems','艺术史与策展|作品出处与展示语境|culture,creative'],
    ['philosophy','逻辑与科学哲学|概念定义与推理前提|model,ethics','伦理与政治哲学|规范理由与行动边界|ethics,governance','美学与解释学|经验表达与解释语境|creative,text'],
    ['law','民商法|交易关系与规范解释|resources,governance','公法与治理|权力边界与执行条件|governance,ethics','法与科技|技术使用与责任范围|systems,ethics'],
    ['politics','比较政治|比较对象与制度情境|governance,inference','国际关系|互动结构与战略条件|networks,governance','公共政策|政策目标与执行反馈|governance,resources'],
    ['education','学习科学|学习任务与过程证据|learning,inference','课程与教学|目标、活动与课堂反馈|learning,interaction','教育技术|工具使用与教学情境|systems,learning'],
    ['sports','运动生理|身体状态与训练条件|life,health','运动训练|负荷安排与表现记录|measurement,learning','运动心理|目标、体验与个体差异|interaction,health'],
    ['psychology','认知心理|任务条件与心理过程|learning,model','社会心理|互动情境与比较设计|interaction,inference','心理测量|构念、量表与测量边界|measurement,inference'],
    ['languages','语言学|语言材料与结构解释|text,model','翻译研究|目的、语境与译文取舍|culture,text','第二语言习得|学习过程与任务条件|learning,interaction'],
    ['journalism','新闻研究|来源核实与叙事范围|text,ethics','传播与媒介|信息路径与受众情境|networks,interaction','计算传播|平台记录与传播比较|networks,inference'],
    ['history','社会与文化史|史料出处与时代经验|culture,text','历史地理|空间变迁与材料年代|space,culture','考古与物质文化|器物、层位与解释链|materials,culture'],
    ['earth','自然地理|空间尺度与环境过程|space,environment','地质与地球物理|结构记录与观测条件|materials,measurement','气象与气候|时间变化与模型边界|environment,model'],
    ['environment','生态学|系统边界与观察尺度|life,environment','环境科学|来源、暴露与比较条件|environment,measurement','环境治理|执行资源与反馈口径|environment,governance'],
    ['electrical','电子与传感|测量信号与硬件条件|measurement,systems','信号处理|信号结构与噪声边界|measurement,model','通信与网络|传输任务与资源约束|networks,resources'],
    ['mechanical','机械设计|结构约束与使用条件|systems,materials','制造与工艺|过程记录与批次差异|materials,measurement','控制与机器人|反馈、扰动与运行边界|systems,model'],
    ['civil','结构工程|模型简化与承载条件|materials,model','交通与城市|出行记录与空间需求|space,networks','建筑与环境|使用情境与空间反馈|space,environment'],
    ['energy','热能与动力|能量边界与工况记录|energy,systems','电力与储能|资源调度与运行条件|energy,resources','能源与环境|效率解释与环境范围|energy,environment'],
    ['aerospace','飞行器设计|约束、工况与结构假设|systems,materials','导航与控制|轨迹误差与反馈条件|space,model','空间任务与观测|任务窗口与信号记录|space,measurement'],
    ['agriculture','作物与栽培|生长条件与观察范围|life,environment','土壤与资源|环境记录与资源条件|environment,resources','林业与生态|空间尺度与群落解释|space,life'],
    ['veterinary','动物生理|对象状态与观察条件|life,health','动物健康|比较对象与健康记录|health,inference','行为与福利|行为情境与照护边界|interaction,ethics'],
    ['food','食品科学|加工条件与评价指标|materials,measurement','营养研究|饮食记录与健康比较|health,inference','食品安全与管理|来源追溯与执行范围|health,governance'],
    ['pharmacy','药理与作用研究|作用解释与条件范围|life,health','药物分析|材料来源与测量记录|measurement,materials','药事与使用研究|使用情境与资源安排|health,resources'],
    ['nursing','护理实践研究|照护过程与个体需要|health,interaction','护理教育|学习任务与实践反馈|health,learning','社区与公共健康|服务范围与执行条件|health,governance'],
    ['management','组织与行为|组织情境与协作范围|interaction,governance','会计与财务|数据口径与资源关系|resources,inference','运营与管理科学|过程约束与优化目标|systems,resources'],
    ['publicadmin','公共政策|比较目标与实施条件|governance,inference','公共服务|服务过程与使用反馈|governance,interaction','资源与应急管理|资源余量与协作边界|resources,systems'],
    ['music','音乐与表演|表达版本与现场体验|creative,interaction','戏剧与影视|叙事结构与受众语境|creative,text','声音与媒介技术|信号记录与表达条件|creative,measurement'],
    ['military','战略与国际安全|推演范围与互动条件|governance,networks','军事历史|材料出处与时序解释|text,culture','组织与保障|资源安排与系统约束|resources,systems'],
    ['interdisciplinary','共同问题设计|两边的对象与定义|model,interaction','跨学科方法|两侧条件与证据接口|inference,systems','跨学科应用|使用情境与执行边界|health,governance'],
    ['statistics','统计推断|估计目标与识别条件|inference,model','统计学习|预测、划分与泛化范围|model,inference','空间与时间统计|依赖结构与观测尺度|space,measurement'],
    ['astronomy','恒星与星系|信号、背景与距离解释|space,measurement','宇宙学|模型假设与观测约束|space,model','时域与观测技术|观测窗口与标定记录|measurement,systems'],
    ['sociology','社会分层|群体差异与比较范围|inference,governance','组织与网络|关系结构与互动情境|networks,interaction','城市与社区|空间资源与生活经验|space,governance'],
    ['anthropology','文化人类学|参与关系与语境记录|culture,text','社会人类学|社会关系与研究者位置|interaction,governance','环境与技术人类学|技术使用与地方经验|environment,systems'],
    ['archaeology','田野考古|层位、出处与记录链|space,measurement','科技考古|材料属性与测量条件|materials,measurement','公共与文化遗产|展示语境与公众解释|culture,governance'],
    ['geography','空间分析与地理信息|投影、邻接与尺度|space,inference','人文地理|空间资源与社会情境|space,governance','自然地理|环境过程与观察边界|space,environment'],
    ['materials','功能材料|结构、性能与批次|materials,measurement','软材料与界面|材料状态与环境作用|materials,life','计算材料|模型假设与条件范围|materials,model'],
    ['automation','控制理论|反馈条件与稳定范围|systems,model','机器人与感知|任务环境与观测记录|systems,measurement','智能系统与协同|资源约束与多方互动|networks,resources'],
    ['communications','信息与编码|编码条件与误差口径|model,networks','无线与网络|信道变化与资源安排|networks,resources','通信感知融合|信号来源与测量边界|measurement,systems'],
    ['architecture','建筑设计|空间需求与使用反馈|space,interaction','城乡规划|资源、尺度与生活情境|space,governance','建筑技术与环境|工况、性能与环境范围|environment,materials'],
    ['design','交互设计|用户任务与反馈来源|interaction,learning','服务设计|协作流程与使用情境|interaction,governance','视觉与信息设计|表达结构与受众理解|creative,networks'],
    ['publichealth','流行病学|群体、比较与偏差边界|health,inference','卫生政策与管理|资源条件与执行反馈|health,governance','环境与职业健康|环境记录与群体差异|health,environment'],
  ];
  const tags={life:'生命过程',health:'健康情境',measurement:'测量与记录',inference:'比较与推断',model:'模型与假设',systems:'系统与运行',networks:'关系与信息网络',resources:'资源约束',interaction:'互动与使用',learning:'学习过程',governance:'治理与执行',environment:'环境与尺度',culture:'文化与语境',text:'文本与材料',creative:'表达与创作',ethics:'责任与边界',space:'空间与观测',materials:'材料与结构',energy:'能量与工况'};
  const edges=[['classic','clinical','pharmacy','agriculture','veterinary','materials','statistics'],['data','statistics','automation','communications','design','psychology','electrical'],['theory','statistics','physics','automation','economics'],['field','sociology','anthropology','politics','geography'],['clinical','publichealth','nursing','psychology','food'],['physics','astronomy','materials','energy','chemistry','aerospace'],['chemistry','materials','food','pharmacy','environment'],['economics','statistics','management','publicadmin','environment','sociology'],['humanities','languages','history','philosophy','journalism','music'],['art','design','architecture','music','archaeology'],['philosophy','law','psychology','theory','education'],['law','politics','publicadmin','journalism','data'],['politics','publicadmin','military','sociology'],['education','psychology','languages','design','nursing','sports'],['sports','psychology','clinical','veterinary'],['journalism','communications','sociology','data'],['history','archaeology','anthropology','geography','military'],['earth','geography','environment','astronomy','energy'],['environment','agriculture','publichealth','publicadmin'],['electrical','communications','automation','energy'],['mechanical','automation','materials','civil','aerospace'],['civil','architecture','geography','energy'],['energy','materials','automation','environment'],['aerospace','astronomy','automation','communications'],['food','publichealth','agriculture','pharmacy'],['nursing','publichealth','education'],['management','publicadmin','sociology','design'],['music','design','communications']];
  const adjacency=new Map();for(const [a,...others] of edges)for(const b of others){for(const [x,y] of [[a,b],[b,a]]){if(!adjacency.has(x))adjacency.set(x,new Set());adjacency.get(x).add(y);}}
  const icons=['📖','🧭','🔎'],kinds=['literature','method','record'],all=rows.flatMap(([route,...items])=>items.map((s,i)=>{const [name,topic,t]=s.split('|');return {id:route+'-'+(i+1),route,name,topic,tags:t.split(','),kind:kinds[i],icon:icons[i]};}));
  let selections={};const find=id=>all.find(d=>d.id===id),routes=c=>window.MEETING_MIX?.sanitize(c.mixProjects)||[c.project],list=c=>all.filter(d=>routes(c).includes(d.route)),active=w=>find(w.world?.artifact.direction)||all.find(d=>d.route===w.world?.artifact.route);
  function neighbors(id){const a=find(id);if(!a)return [];return all.filter(b=>b.id!==id&&(a.route===b.route||(adjacency.get(a.route)?.has(b.route)&&a.tags.some(t=>b.tags.includes(t))))).map(b=>({...b,connection:a.route===b.route?'同一学科内的相邻问题':a.tags.filter(t=>b.tags.includes(t)).map(t=>tags[t]).join(' · ')})).sort((x,y)=>Number(y.route===a.route)-Number(x.route===a.route));}
  function menuConfig(c){const key=routes(c).join('+'),choice=find(selections[key]);return {direction:choice&&list(c).some(d=>d.id===choice.id)?choice.id:list(c)[0]?.id};}
  function init(w,old){const a=w.world,p=a.artifact;if(p.direction)return;const chosen=find(w.config.direction),d=chosen&&list(w.config).some(x=>x.id===chosen.id)?chosen:all.find(x=>x.route===p.route);p.direction=d.id;p.route=d.route;p.references=[];if(old&&p.checks.length){p.version++;p.checks=[];p.status='draft';p.history.push({week:w.number,version:p.version,status:'draft',action:'为二级方向建立新草稿，旧资料保留为参考。'});}w.config.direction=d.id;}
  function target(w){return neighbors(active(w)?.id).find(d=>d.id===w.world.pivotTarget)||neighbors(active(w)?.id)[0];}
  function pivot(w,id){const p=w.world.artifact,from=active(w),d=neighbors(from?.id).find(x=>x.id===id);if(!d)return false;const references=p.checks.map(x=>({...x,fromDirection:from.id,toDirection:d.id,level:1})).slice(-3);p.version++;p.direction=d.id;p.route=d.route;p.checks=[];p.references=references;p.status='pivot';p.scope=2;w.world.pivotTarget=null;return d;}
  function topic(p){const d=find(p.direction);return d?d.name+' · '+d.topic:null;}
  function valid(w){const p=w.world?.artifact;return !p?.direction||(!!find(p.direction)&&find(p.direction).route===p.route&&(!w.world.pivotTarget||neighbors(p.direction).some(d=>d.id===w.world.pivotTarget)));}
  return {all,tags,edges,find,list,active,neighbors,menuConfig,init,target,pivot,topic,valid,select:(c,id)=>{if(list(c).some(d=>d.id===id))selections[routes(c).join('+')]=id;}};
})();
