const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert/strict'),root=path.resolve(__dirname,'..'),b={window:{}};vm.createContext(b);
for(const[,f]of fs.readFileSync(path.join(root,'index.html'),'utf8').matchAll(/<script src="([^?]+)\?/g)){if(f==='save-manager.js')break;vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),b,{filename:f});}
vm.runInContext(fs.readFileSync(path.join(root,'locale-data.js'),'utf8'),b);
const x=b.window,K=x.MEETING_DIRECTION_KNOWLEDGE,D=x.MEETING_DIRECTIONS,L=x.MEETING_DIRECTION_LIBRARY,B=x.MEETING_DIRECTION_DOSSIERS,S=x.MEETING_DIRECTION_STUDY,Q=x.MEETING_DIRECTION_DIALOGUE,N=x.MEETING_NARRATIVE_WORLD;
const materials=new Set(),definitions=new Set(),families=new Set(),newDirs=D.all.filter(d=>d.knowledgeAddition);
assert.equal(newDirs.length,42);assert.equal(x.MEETING_KNOWLEDGE_CATALOGUE.records.length,94);assert.equal(K.all.size,D.all.length);assert.equal(K.all.size,2542);
assert.equal(new Set(x.MEETING_KNOWLEDGE_DOMAINS.rows.map(r=>r.id)).size,219);
const normalizedMaterials=new Set();
for(const r of K.all.values()){
 const d=D.find(r.id),bank=L.get(r.id),dossier=B.get(r.id);assert.equal(r.owner,d.id);assert.equal(bank.knowledgeOwner,d.id);assert.equal(dossier.profile,'owned-'+d.id);
 assert(!materials.has(r.material),'professional material reused: '+r.id);materials.add(r.material);
 const normalized=r.material.replaceAll(d.name,'{object}');assert(!normalizedMaterials.has(normalized),'renamed professional material '+r.id);normalizedMaterials.add(normalized);
 assert(r.definition&&r.definition.length>12,r.id+' missing concept');definitions.add(r.definition);
 for(const key of ['material','check','snag','limit'])assert.equal(bank[key],r[key]);assert.equal(dossier.foundation.question,r.foundation);assert.equal(dossier.frontier.question,r.frontier);
 for(const kind of ['method','literature','record','boundary','rehearsal'])for(const mode of ['foundation','frontier']){const questions=K.questions(r.id,kind,mode);assert.equal(new Set(questions).size,4);for(let i=0;i<4;i++){assert.equal(Q.question(bank,kind,mode,i),questions[i]);assert(!/[\u3400-\u9fff]/.test(N.english(questions[i])),r.id+' English '+kind);}}
 const study=S.get(r.id);assert.equal(study.exercise.id,r.id+'-knowledge-exercise');assert.equal(study.exercise.choices.length,3);assert(new Set(study.exercise.choices.map(c=>c.answer)).size===3);
 families.add(x.MEETING_CONTENT.projects.find(p=>p.id===d.route).family);
}
assert.equal(families.size,14);
for(const d of newDirs){const teachers=x.MEETING_MENTORS.profiles.filter(p=>p.directionIds.includes(d.id));assert(teachers.length>=6,d.id);assert(new Set(teachers.map(p=>p.level)).size===3);assert(teachers.every(p=>p.routeIds.includes(d.route)),d.id+' mentor route');assert(D.neighbors(d.id).some(n=>n.route===d.route));}
// Exact ownership: a similarly named new object must not borrow another case.
assert.equal(K.get({id:'not-authored',name:D.find('data-6').name,route:'data'}),null);
assert.equal(L.get('film-studies-3').packet,'media');assert.equal(L.get('theory-4').packet,'math');assert(L.get('data-6').snag.includes('串行化'));
for(const d of D.all.filter(d=>/医学教学研究/.test(d.name))){assert(K.get(d.id).material.includes('教学任务'));assert(!K.get(d.id).definition.includes('组织损伤'));}
assert(K.get('law-society-1').definition.includes('实际经验'));assert.equal(x.MEETING_KNOWLEDGE_FULL_CASES.get('logic-studies-9').context,'domain-comparison');
const before=JSON.stringify(D.all);K.audit();K.questions('data-6','method','foundation');S.get('data-6');assert.equal(JSON.stringify(D.all),before);
const csv=v=>'"'+String(v??'').replaceAll('"','""')+'"';fs.writeFileSync(path.join(root,'docs/KNOWLEDGE_OWNERSHIP.csv'),'\uFEFF'+[['direction_id','route','direction','owner','tier','material','concept','definition','expert_reviewed'],...K.audit().map(r=>Object.values(r))].map(r=>r.map(csv).join(',')).join('\r\n'));
console.log(JSON.stringify({passed:true,directions:D.all.length,mentors:x.MEETING_MENTORS.profiles.length,newDirections:newDirs.length,ownedCases:K.all.size,distinctConceptExplanations:definitions.size,distinctMaterialsAfterRemovingDirectionNames:normalizedMaterials.size,families:families.size,backgroundOnly:D.all.length-K.all.size,individuallyAuthoredNewCases:94,composedCases:2416,priorPharmacyCases:32,expertReviewed:false}));
