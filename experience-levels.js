window.MEETING_EXPERIENCE=(()=>{
 const levels=[{id:'simple',name:'简化版',icon:'🌱',desc:'日常选择、文献准备、核心课题与组会。先熟悉游戏。',features:['core']},{id:'medium',name:'中等版',icon:'🌿',desc:'加入投稿、学科课题剧情和临时交办。安排开始跨周。',features:['core','publication','routes','assignments']},{id:'full',name:'完整版',icon:'🌳',desc:'开放人物生涯、学位阶段、合作署名、借用约定和连续校园支线。',features:['core','publication','routes','assignments','academy','sideStories']}];
 const level=c=>levels.find(l=>l.id===c.featureSet)||levels[2];
 const enabled=(w,feature)=>level(w.config).features.includes(feature);
 const config=c=>({...c,featureSet:c.challenge?'full':level(c).id});
 return {levels,level,enabled,config,valid:w=>!w.config.featureSet||levels.some(l=>l.id===w.config.featureSet)};
})();
