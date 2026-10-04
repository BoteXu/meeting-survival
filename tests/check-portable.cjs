const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path'),root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'组会求生_直接玩.html'),'utf8'),index=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert(html.includes('原创娱乐小游戏 / v0.14.3'));assert(!/<script\s+src=|<link[^>]+stylesheet|src=["']https?:\/\/|url\(["']?https?:\/\//.test(html),'offline resources are bundled');
const names=[...index.matchAll(/<script src="([^?]+)\?/g)].map(m=>m[1]),scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);assert.equal(scripts.length,names.length);
const scope={window:{}};vm.createContext(scope);scripts.forEach((s,i)=>{new vm.Script(s,{filename:names[i]});if(i<names.indexOf('save-manager.js'))vm.runInContext(s,scope);});
const {MEETING_CONTENT:C,MEETING_ENGINE:E,MEETING_DIRECTIONS:D}=scope.window;assert.equal(C.projects.length,219);assert.equal(C.events.length,2234);assert.equal(C.endings.length,766);assert.equal(D.all.length,2484);assert.equal(C.preparationEvents.length,1095);assert.equal(C.preparationQuestions.length,876);
for(const project of C.projects){const s=E.create({project:project.id,seed:4,persona:'warm'});assert(E.isValid(s));E.choose(s,0);E.advance(s);assert.equal(E.current(s).project,project.id);}
console.log(JSON.stringify({passed:true,version:'0.14.3',scripts:scripts.length,disciplines:C.projects.length,directions:D.all.length,meetingScenarios:C.events.length,endings:C.endings.length,externalGameResources:0}));
