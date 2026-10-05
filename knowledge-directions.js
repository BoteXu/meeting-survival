(() => {
 'use strict';const C=window.MEETING_KNOWLEDGE_CATALOGUE,D=window.MEETING_DIRECTIONS;
 const parents={'finance-studies-knowledge-liquidity':'finance-studies-3','curriculum-studies-knowledge-inquiry':'curriculum-studies-9','linguistics-studies-knowledge-pragmatics':'linguistics-studies-5','chinese-language-knowledge-philology':'chinese-language-8','musicology-studies-knowledge-performance':'musicology-studies-5','theory-knowledge-spectral':'theory-1','physics-knowledge-phase':'physics-5','information-management-knowledge-retrieval':'information-management-5'};
 for(const r of C.records){if(!r.name){if(!D.find(r.id))throw new Error('Unknown knowledge direction '+r.id);continue;}
  const route=r.id.split('-knowledge-')[0],near=D.find(parents[r.id])||D.all.find(d=>d.route===route&&!d.catalogAddition);
  if(!near||D.find(r.id))throw new Error('Invalid new knowledge direction '+r.id);
  D.all.push({id:r.id,route,name:r.name,topic:r.concept,tags:[...near.tags],kind:'method',icon:'📚',catalogAddition:true,knowledgeAddition:true,parentDirection:near.id});
  // Same-route links permit pivots while the engine still invalidates old evidence.
  D.connect(r.id,near.id);
 }
})();
