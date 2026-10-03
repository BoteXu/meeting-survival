const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'组会求生_直接玩.html'),'utf8');
assert(html.includes('原创娱乐小游戏 / v0.7.0'));
assert(!/<script\s+src=|<link[^>]+stylesheet|(?:src|href)=["']https?:\/\/|(?:fetch|XMLHttpRequest|WebSocket)\s*\(|url\(["']?https?:\/\//.test(html),'离线版本没有外部依赖');
const scripts=Array.from(html.matchAll(/<script>([\s\S]*?)<\/script>/g),m=>m[1]);
assert.equal(scripts.length,24);
const scope={window:{}};vm.createContext(scope);
scripts.forEach((source,i)=>{new vm.Script(source,{filename:'portable-'+i});if(i<18)vm.runInContext(source,scope);});
const C=scope.window.MEETING_CONTENT,E=scope.window.MEETING_ENGINE;
assert.equal(C.projects.length,36);assert.equal(C.events.length,734);assert.equal(C.endings.length,304);assert.equal(C.preparationEvents.length,180);assert.equal(C.preparationQuestions.length,144);
for(const project of C.projects){const s=E.create({project:project.id,seed:4,persona:'warm'});assert(E.isValid(s));E.choose(s,0);E.advance(s);assert.equal(E.current(s).project,project.id);}
console.log(JSON.stringify({passed:true,version:'0.7.0',scripts:24,disciplines:C.projects.length,meetingScenarios:C.events.length,endings:C.endings.length,externalDependencies:0}));
