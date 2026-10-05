/* Every direction receives its own research object and worksheet. Concepts may
   recur as prerequisites; there is no fallback to a shared professional case.
   Composition is disclosed, and fictional worksheets never assert real results. */
window.MEETING_KNOWLEDGE_FULL_CASES=(()=>{
 'use strict';const N=window.MEETING_NARRATIVE_WORLD;if(!N)return null;
 const D=window.MEETING_DIRECTIONS,C=window.MEETING_CONTENT,P=N.pair,E=N.english;
 const anchors=new Map(window.MEETING_KNOWLEDGE_DOMAINS.rows.map(r=>[r.id,r]));
 const facets=window.MEETING_KNOWLEDGE_FACETS.rows,contexts=window.MEETING_KNOWLEDGE_CONTEXTS.rows;
 const map=new Map();
 function pair(v){return P(v[0],v[1]);}
 function eligible(c,d,family){
  if(!c.match.test(d.name))return false;
  if(c.id==='archive')return ['literature','history','philosophy','law','arts','military'].includes(family)||/文献|原典|校勘|档案|古籍/.test(d.name);
  if(c.id==='legal')return family==='law'&&!(d.route==='law-society'&&/经验|司法社会|法律职业|法律意识|法律服务|法律教育/.test(d.name));
  if(c.id==='model')return family!=='philosophy';
  if(c.id==='measurement'&&family==='philosophy')return false;
  if(c.id==='education'&&['education-theory','higher-education'].includes(d.route))return false;
  if(c.id==='performance')return family==='arts';
  if(c.id==='reading')return ['literature','philosophy','history','arts','military'].includes(family);
  if(c.id==='public')return /博物馆|展示|展览|展签|公众|公共传播/.test(d.name);
  return true;
 }
 function matches(d){const family=C.projects.find(p=>p.id===d.route).family;return facets.filter(r=>r.scope.split(',').includes(family)&&r.match.test(d.route+'::'+d.name));}
 for(const d of D.all){
  const family=C.projects.find(p=>p.id===d.route).family,a=anchors.get(d.route),fm=matches(d);
  if(!a||!fm.length)throw new Error('Unowned professional case '+d.id);
  const cm=contexts.filter(c=>eligible(c,d,family)),context=(/伦理|公平|道德|问责/.test(d.name)&&!/史/.test(d.name)?cm.find(c=>c.id==='ethics'):null)||cm[0]||null;
  const documentary=context&&['history','archive','public','ethics','interview','reading','legal','education'].includes(context.id);
  // Historical and ethical inquiry must not become a live laboratory worksheet.
  let chosen=fm.filter(f=>!documentary||['history','historyall','textual','digitalhumanities','ethics','memory','publictechnology','publicinstitutions','culturalrecords','legal','contract','criminal','administrative','intellectual','legalevidence','fieldwork','religion','philosophy','philosophicalpractice','literary','artcontext','media','readingpublic'].includes(f.id));
  if(!chosen.length)chosen=fm;
  if(context?.id==='education')chosen=fm.filter(f=>f.id==='learning'||f.id==='learningenvironment'||f.id==='psychology'||f.id==='linguistics');
  if(!chosen.length)chosen=fm;
  if(d.route==='law-society'&&/经验|司法社会|法律职业|法律意识|法律服务/.test(d.name))chosen=[fm.find(f=>f.id==='sociolegal'),...fm.filter(f=>f.id==='social')].filter(Boolean);
  if(d.route==='education-theory'&&!/史|伦理|公平/.test(d.name))chosen=[fm.find(f=>f.id==='educationtheory'),...fm.filter(f=>f.id==='learning')].filter(Boolean);
  const f=chosen[0],g=chosen.find(x=>x.id!==f.id)||null;
  const av=a.values.map(pair),fv=f.values.map(pair),gv=g?.values.map(pair),cv=context?.values.map(pair);
  const source=documentary?P(cv[0]+'；相关领域文献对“'+av[1]+'”的用语与记录方式',()=>`${E(cv[0])}; disciplinary documents' terms and recording practices for ${E(av[1])}`):av[1];
  const objects=window.MEETING_KNOWLEDGE_OBJECTS.rows.filter(o=>o.match.test(d.name));
  const details=objects.map(o=>pair([o.zh,o.en]));
  const precise=[...objects].sort((a,b)=>(b.match.exec(d.name)?.[0].length||0)-(a.match.exec(d.name)?.[0].length||0))[0];
  const fineFocus=precise?pair([precise.zh,precise.en]):av[1];
  const additional=details.length?P('需对照的具体条目：'+details.join('；'),()=>`Specific fields to compare: ${details.map(E).join('; ')}`):P('需对照'+av[0]+'中的定义、对象索引与适用条件',()=>`Compare definitions, object indexes and applicable conditions within ${E(av[0])}`);
  const material=P(d.name+'研究档案：'+source+'；'+fv[0]+(gv?'；'+gv[0]:'')+(cv&&!documentary?'；'+cv[0]:'')+'。'+additional,()=>`${E(d.name)} research file: ${E(source)}; ${E(fv[0])}${gv?'; '+E(gv[0]):''}${cv&&!documentary?'; '+E(cv[0]):''}. ${E(additional)}`);
  const concept=P(fv[1]+(gv?' / '+gv[1]:''),f.values[1][1]+(g?' / '+g.values[1][1]:''));
  const definition=P(fv[2]+(gv?' '+gv[2]:'')+(!documentary?' '+av[2]:''),f.values[2][1]+(g?' '+g.values[2][1]:'')+(!documentary?' '+a.values[2][1]:''));
  const check=P('核对'+fineFocus+'，分别标出支持“'+fv[3]+'”和“'+fv[4]+'”的条目'+(cv?'；再'+cv[2]:''),()=>`Check ${E(fineFocus)} and mark the items supporting ${E(fv[3])} and ${E(fv[4])}${cv?'; then '+E(cv[2]):''}`);
  const snag=P('没有分开核对'+fineFocus+'，就把“'+fv[4]+'”写成“'+fv[3]+'”'+(cv?'；'+cv[3]:''),()=>`Without separately checking ${E(fineFocus)}, ${E(fv[4])} is described as ${E(fv[3])}${cv?'; '+E(cv[3]):''}`);
  const limit=P('本档案只讨论'+d.name+'中的“'+concept+'”。'+fv[2]+(gv?' '+gv[2]:''),()=>`This file concerns ${E(concept)} within ${E(d.name)}. ${E(fv[2])}${gv?' '+E(gv[2]):''}`);
  const foundation=P('在'+d.name+'中，怎样核对'+fineFocus+'，分开“'+fv[3]+'”与“'+fv[4]+'”？'+(cv?' '+cv[1]:''),()=>`In ${E(d.name)}, how can ${E(fineFocus)} be checked to distinguish ${E(fv[3])} from ${E(fv[4])}?${cv?' '+E(cv[1]):''}`);
  const frontier=P('下一项'+d.name+'研究要回答：'+(cv?cv[4]:'怎样检验“'+fv[3]+'”，并保留“'+fv[4]+'”这个竞争解释？')+(gv?' 同时怎样处理“'+gv[1]+'”？':''),()=>`For the next ${E(d.name)} study: ${cv?E(cv[4]):'how can '+E(fv[3])+' be tested while retaining '+E(fv[4])+' as a competing account?'}${gv?' How will '+E(gv[1])+' also be addressed?':''}`);
  map.set(d.id,Object.freeze({id:d.id,owner:d.id,route:d.route,topic:d.topic,tier:'direction-case',material,concept,definition,check,snag,limit,foundation,frontier,anchor:a.id,facets:chosen.map(f=>f.id),context:context?.id||'domain-comparison',objects:details,authorship:'domain-and-facet-composition',expertReviewed:false}));
 }
 return {all:map,get:id=>map.get(typeof id==='string'?id:id?.id)||null,matches};
})();
