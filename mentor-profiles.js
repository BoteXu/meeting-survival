/* 导师均为虚构；主页描述指导习惯，内部风格只用于规则。 */
window.MEETING_MENTORS=(()=>{
  'use strict';
  const C=window.MEETING_CONTENT;
  const rows=[
    ['lin-qiao','林乔','副教授','计算与可复现研究室',['engineering','science'],'reproduce',6,'开源工具、统计计算与可复现工作流','维护过一套虚构的开放工具箱，带队完成跨院复现挑战。','能提供整理好的计算资源与记录模板。','每周会抽查一次记录，漂亮截图通常不能结束讨论。','希望学生保留失败尝试；自己出差时也会异步看记录。'],
    ['he-yu','何予','教授','理论与结构研究室',['science','philosophy','military'],'socratic',-2,'数学结构、模型假设与论证边界','组织过虚构的青年论证工作坊，学生作品曾收入校内方法年鉴。','擅长把混乱问题拆成可讨论的小命题。','一个定义可能聊掉半场组会，短期进度未必快。','欢迎反例；通常先追问你为什么这样定义。'],
    ['shen-ning','沈宁','教授','实验与材料研究室',['science','engineering','medicine','agriculture'],'detail',12,'实验记录、材料表征与测量一致性','负责过虚构的共享设备项目，发表过校内年度代表作。','共享设备入口较多，愿意陪学生排查一个具体问题。','设备排期和细节核对都很严格，未经核对的结果难以过关。','周五看进度，周中看记录；临时插队需要说明理由。'],
    ['zhou-an','周安','副教授','健康与照护研究室',['medicine','education'],'warm',-3,'健康研究、照护体验与现实场景','带队完成过虚构的社区合作项目，获得学院教学奖。','愿意听学生讲困难，能介绍场景中的合作伙伴。','合作方时间有限，温和的谈话也不会替你补齐材料。','遇到不确定的事情先沟通范围，鼓励保留休息时间。'],
    ['gu-yi','顾宜','教授','田野与社会生活研究室',['law','education','literature'],'explorer',-8,'田野访问、社会关系与日常生活','整理过虚构的城市口述史专题，主持过学生田野展。','容许探索和意外发现，愿意接受与预想不同的材料。','访问安排常变，资源不多，需要学生自己管理边界。','不强求一开始就有结论，但希望解释你为何改变问题。'],
    ['xu-wen','许闻','副教授','文本与档案研究室',['history','literature','philosophy','law'],'reproduce',-5,'版本、档案、翻译与解释依据','编过虚构的档案读本，带学生办过校内史料展。','出处和版本索引齐全，适合慢慢做扎实的工作。','一条脚注可能要求返回原件，快写快交很难蒙混过去。','欢迎不同解释，引用之前先分清谁写了哪句话。'],
    ['liang-ke','梁珂','教授','组织与公共决策研究室',['economics','management','law'],'deadline',9,'组织决策、调查与政策评估','完成过虚构的地方合作报告，举办过校内决策模拟赛。','合作机会多，能帮助成果进入真实讨论场景。','截止日期密，外部需求有时会挤进原定安排。','喜欢按交付节点讨论，学生需要主动说清自己接得住多少。'],
    ['tang-ye','唐野','副教授','环境与空间研究室',['science','agriculture','engineering'],'collaborative',2,'空间观察、环境变化与跨组协作','组织过虚构的流域联合观察，建过校园空间资料库。','愿意分享入口，鼓励同门互相补位。','天气与合作排期都难控制，人情需要具体交接。','偏好把现场限制摆出来，组会里会邀请同门补充。'],
    ['meng-cheng','孟澄','教授','系统与工程研究室',['engineering','military'],'strict',16,'工程验证、系统边界与可靠性','主导过虚构的联合演示项目，指导作品获得校内工程奖。','设备和工程伙伴较充足，问题落地速度快。','演示要求高，现场失败会立即追到记录与责任边界。','欢迎提前报障碍，对最后一刻才说资源不足很不耐烦。'],
    ['su-zhi','苏知','副教授','设计与表达研究室',['arts','engineering','literature'],'vision',4,'设计迭代、交互体验与公共表达','策划过虚构的校园交互展，学生作品进入学院作品集。','想法开放，有展示机会，能帮助作品找到观众。','需求容易变大，学生需要及时收住作品范围。','先听想法，再问如何证明它对使用者有帮助。'],
    ['chen-mu','陈沐','教授','方法与解释研究室',['science','medicine','economics','management'],'minimal',1,'研究设计、统计解释与有限结论','编写过虚构的校内方法手册，开设过跨学科短课。','反馈简洁，愿意接受一个讲得清楚的小结果。','组会很少主动提示，长篇铺垫可能还没讲完就被打断。','通常先问三件事：问题、依据、还不知道什么。'],
    ['han-shu','韩舒','副教授','学习与群体研究室',['education','law','medicine'],'collaborative',-1,'学习行为、群体互动与协作方法','开展过虚构的课堂合作项目，指导学生做过校园观察节。','组员会互相看草稿，遇到难处可以协商小份工作。','帮助别人的邀请较多，容易把自己的一周排满。','强调贡献和交接，承诺之后会追问实际做了什么。'],
    ['fang-he','方禾','教授','生命与资源研究室',['agriculture','science','medicine'],'explorer',-10,'资源约束、长期观察与生命现象','维护过虚构的长期观察站，举办过学院资料开放日。','长期资料和经验丰富，失败记录也能成为讨论材料。','经费较紧，很多想法只能先做缩小版。','宁可保留一个解释得清的问题，也不催学生把故事讲满。'],
    ['ye-lan','叶岚','教授','媒介与文化研究室',['literature','arts','history','law'],'story',3,'叙事、媒介、声音与文化记忆','主编过虚构的校园文化专辑，主持过公开讲述工作坊。','表达和展示经验丰富，擅长发现材料中的故事。','讨论容易延伸到往事，故事吸引人仍要有出处。','组会允许试讲，讲得越动人越会追问材料来自哪里。'],
    ['song-qi','宋祈','副教授','模型与应用研究室',['engineering','economics','science'],'weather',8,'模型迁移、应用条件与快速试做','组织过虚构的跨组挑战，维护过校内应用案例集。','新机会和小试做很多，愿意为意外发现调整计划。','每周关注点可能变，不能只按上周的答案准备。','常带新研讨会问题回来，建议学生保存每版范围。'],
    ['lu-jian','陆简','教授','边界与证据研究室',['philosophy','law','history','military','management'],'strict',0,'证据标准、规则解释与决策边界','举办过虚构的证据讨论会，指导过跨院案例报告。','边界明确，认真处理过的材料通常能得到具体反馈。','对含糊承诺敏感，关系熟悉也不能省略依据。','不同意见可以谈，先分清事实、解释和自己的判断。']
  ];
  const levels={young:{name:'青年导师',title:'助理教授',access:.09,grant:-3,income:0,desc:'通常更常一起处理材料；外部入口与经费积累较少。'},associate:{name:'中坚导师',title:'副教授',access:.02,grant:0,income:1,desc:'有独立合作与指导经验；教学、申请和学生安排需要协调。'},senior:{name:'资深导师',title:'教授',access:-.06,grant:6,income:2,desc:'外部入口与项目积累较多；日程紧，求助不一定及时回应。'}};
  const directions={
    'lin-qiao':['data-2','statistics-1','data-8'],'he-yu':['theory-1','philosophy-1'],'shen-ning':['materials-1','chemistry-1','classic-1'],'zhou-an':['clinical-3','nursing-1'],
    'gu-yi':['anthropology-1','sociology-1','field-2'],'xu-wen':['history-1','languages-2','archaeology-1'],'liang-ke':['management-1','publicadmin-1','economics-2'],
    'tang-ye':['geography-1','environment-1','agriculture-3'],'meng-cheng':['automation-1','mechanical-1','aerospace-1'],'su-zhi':['design-1','art-2'],
    'chen-mu':['statistics-2'],'han-shu':['education-1','psychology-2'],'fang-he':['classic-2','agriculture-1'],'ye-lan':['humanities-1','music-1','journalism-2'],
    'song-qi':['data-1','economics-6','physics-2'],'lu-jian':['law-2','philosophy-2','military-1']
  };
  if(window.MEETING_MEDICAL){rows.push(
 ['bai-ning','白宁','教授','心血管与长期结局研究室',['medicine'],'detail',10,'心血管影像、肾心联系与长期结局','主持过虚构的跨科资料质控项目。','有影像与随访合作入口。','跨科窗口要协调，不能只交漂亮图。','按对象与时点核对。'],
 ['qiu-he','邱禾','副教授','神经与康复研究室',['medicine','engineering'],'collaborative',2,'认知、运动功能与康复反馈','组织过虚构的辅助技术体验展。','有原型与康复协作伙伴。','功能结局和设备表现要分别解释。','先定义任务，再讨论使用。'],
 ['tan-yu','谭予','教授','病理与测量研究室',['medicine','science'],'reproduce',8,'数字病理、检验一致性与批次','维护过虚构的学院图像资料年鉴。','记录模板与共享设备较丰富。','读片分歧和平台版本都要保存。','喜欢从不一致的那页问起。'],
 ['xu-zhi','徐知','副教授','影像与计算研究室',['medicine','engineering'],'minimal',4,'成像、外部评估与可复现计算','完成过虚构的校内影像复现挑战。','能提供环境与资料组织经验。','计算队列和站点差异常会拖后腿。','先问评估对象，再看指标。'],
 ['lan-yue','蓝悦','副教授','妇儿与生命历程研究室',['medicine'],'warm',-1,'儿童发展、围产与生命历程随访','获得过虚构的学院合作教学奖。','愿意一起拆解随访困难。','失访和量表适用范围要保留。','鼓励有限结论，承诺要落实。'],
 ['ji-shu','纪书','教授','健康政策与经济研究室',['medicine','management','economics'],'deadline',5,'服务质量、健康公平与资源评价','举办过虚构的校园服务评估赛。','合作情境多，问题容易进入讨论。','窗口与交付密，评价边界不能省。','希望每次交付只有一个明确问题。'],
 ['luo-chen','罗晨','副教授','口腔与听觉研究室',['medicine','engineering'],'vision',1,'数字口腔、声音与辅助界面','组织过虚构的跨专业体验工作坊。','欢迎不同专业一起做小原型。','对象内重复与体验反馈要分开。','想法开放，实际记录仍要到位。'],
 ['wen-yao','温遥','教授','基础医学资料研究室',['medicine','science'],'explorer',-5,'遗传、生理与分子资料解释','整理过虚构的公开资料教学案例集。','失败材料也可以继续讨论。','资源较紧，模型边界需反复说明。','先把来源与独立对象说清。']);
 Object.assign(directions,{'bai-ning':['cardiology-1','nephrology-11','cardiac-surgery-7'],'qiu-he':['neurology-4','rehabilitation-1','rehabilitation-8'],'tan-yu':['pathology-3','lab-medicine-5'],'xu-zhi':['radiology-10','nuclear-medicine-9'],'lan-yue':['pediatrics-9','obgyn-2'],'ji-shu':['health-policy-6','health-economics-2','epidemiology-11'],'luo-chen':['oral-medicine-11','ent-7'],'wen-yao':['medical-genetics-7','anatomy-physiology-3','medical-biochemistry-4']});
  }
  const profiles=rows.map(([id,name,title,lab,families,style,budget,research,achievement,strength,tradeoff,practice])=>{const level=['su-zhi','han-shu','song-qi'].includes(id)?'young':title==='教授'?'senior':'associate';return {id,name,title:levels[level].title,level,lab,families,style,budget,research,achievement,strength,tradeoff,practice,directionIds:directions[id]};});
  const find=id=>profiles.find(p=>p.id===id)||null;
  function matches(p,config){const routes=config.mixProjects||[config.project];return routes.some(id=>p.families.includes(C.projects.find(d=>d.id===id)?.family));}
  function config(c){const p=find(c.mentorId);return p?{...c,mentorId:p.id,persona:p.style}:c;}
  function apply(w,old){const p=find(w.config.mentorId),g=w.group;if(!p||!g)return;const m=g.members.find(m=>m.id==='mentor-0');if(!m)return;const changed=m.profileId!==p.id;Object.assign(m,{profileId:p.id,name:p.name+'老师',mentorStyle:p.style});if(changed){m.level=p.level;delete m.promotion;g.balance=Math.max(0,Math.min(100,g.balance+p.budget+levels[p.level].grant));g.income+=levels[p.level].income;g.news.after=g.balance;g.funding=p.lab+' · '+g.funding;if(g.funding.length>100)g.funding=g.funding.slice(-100);}}
  const promotionStages={working:'积累成果',review:'等待评审',deferred:'本次暂缓',promoted:'本次晋升通过',established:'继续承担资深岗位'};
  function advance(w,previous,rand){if(!w.world||!w.group||w.config.rulesVersion==='08')return;const g=w.group;g.promotionNews=[];
    for(const m of g.members.filter(m=>m.rank==='mentor')){if(!m.level)m.level=['young','associate','senior'][Math.floor(rand(w)*3)];if(!m.promotion)m.promotion={points:0,since:w.number,stage:m.level==='senior'?'established':'working',reviewAt:null,history:[]};const a=m.promotion,n=w.world.npcs[m.id];if(m.level==='senior'){a.stage='established';continue;}
      if(a.stage==='review'&&w.number>=a.reviewAt){const pass=rand(w)<Math.min(.85,.35+a.points*.025+(previous?.meeting?.score>=65?.1:0));if(pass){m.level=m.level==='young'?'associate':'senior';g.balance=Math.min(100,g.balance+9);g.income=Math.min(25,g.income+2);g.news.after=g.balance;a.points=0;a.since=w.number;a.stage='promoted';const text=m.name+'晋升为'+levels[m.level].title+'，新增了一些资源入口，也多了申请与协调事务。';g.promotionNews.push(text);a.history.push({week:w.number,status:'promoted',level:m.level,text});if(n){n.goal='grant';n.mood=-1;}}
        else{a.points=Math.max(0,a.points-2);a.stage='deferred';a.since=w.number;const text=m.name+'这次晋升暂缓，评审要求补充材料；这一周正在重新整理申报。';g.promotionNews.push(text);a.history.push({week:w.number,status:'deferred',level:m.level,text});if(n){n.goal='paper';n.mood=-1;}}a.reviewAt=null;
      }else if(a.stage!=='review'){a.points+=1+Math.floor(rand(w)*3)+(n?.goal==='paper'||n?.goal==='grant'?1:0)+(previous?.meeting?.score>=65?1:0);if(w.number-a.since>=3&&a.points>=8&&rand(w)<.65){a.stage='review';a.reviewAt=w.number+1;const text=m.name+'开始申报下一层级，评审结果至少要等到下一周；外部成果仍在补材料。';g.promotionNews.push(text);a.history.push({week:w.number,status:'review',level:m.level,text});if(n){n.goal='grant';n.mood=-1;}}else a.stage='working';}a.history=a.history.slice(-12);
    }
  }
  function news(w){return (w.group?.promotionNews||[]).join(' ');}
  function valid(w){return !w.group||w.group.members.every(m=>!m.promotion||(Object.hasOwn(levels,m.level)&&Number.isInteger(m.promotion.points)&&m.promotion.points>=0&&Object.hasOwn(promotionStages,m.promotion.stage)&&Array.isArray(m.promotion.history)&&m.promotion.history.length<=12&&(m.promotion.reviewAt===null||Number.isInteger(m.promotion.reviewAt))));}
  return {profiles,levels,promotionStages,find,matches,config,apply,advance,news,valid};
})();
