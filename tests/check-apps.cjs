const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path'),root=path.resolve(__dirname,'..');
const store=new Map();let failKey=null;const storage={getItem:k=>store.get(k)??null,setItem:(k,v)=>{if(k===failKey){failKey=null;throw Error('quota');}store.set(k,String(v));},removeItem:k=>store.delete(k)};
const b={window:{},localStorage:storage,setTimeout:()=>1,clearTimeout:()=>{}};vm.createContext(b);const files=[...fs.readFileSync(path.join(root,'index.html'),'utf8').matchAll(/<script src="([^?]+)\?/g)].map(m=>m[1]);for(const f of files){vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),b,{filename:f});if(f==='save-manager.js')break;}
const {MEETING_SAVES:S,MEETING_WEEK:W,MEETING_ENGINE:E}=b.window,copy=x=>JSON.parse(JSON.stringify(x)),week=W.create({project:'cardiology',direction:'cardiology-6',role:'newbie',difficulty:'normal',persona:'warm',campus:true,preparation:true,rulesVersion:'10'},42);
const meeting=E.create({project:'cardiology',role:'newbie',difficulty:'normal',persona:'warm',weekContext:W.meetingContext(week),seed:42});
store.set(S.keys[0],JSON.stringify(meeting));store.set(S.keys[1],JSON.stringify([{id:'survivor',score:61}]));store.set(S.keys[3],JSON.stringify({meetings:1,experience:12,reputation:3,debt:0,totalTurns:14,history:[]}));store.set(S.keys[4],JSON.stringify(week));store.set(S.keys[6],'zh');
const original=S.snapshot();assert(S.validate(copy(original)));store.clear();S.apply(copy(original));assert.deepEqual(copy(S.snapshot().values),copy(original.values));assert(S.summary(original).includes('1 个结局'));
for(const bad of [{...copy(original),values:{...original.values,token:'private'}},{...copy(original),version:2},{...copy(original),values:{[S.keys[4]]:JSON.stringify({...week,number:-1})}},{...copy(original),values:{[S.keys[1]]:'[{"id":"x","score":"61"}]'}},{...copy(original),values:{[S.keys[2]]:'{"__proto__":{"polluted":1}}'}},{...copy(original),values:{[S.keys[6]]:'invalid'}}])assert.throws(()=>S.validate(bad));
const before=copy(S.snapshot().values),replacement=copy(original);replacement.values[S.keys[1]]='[]';replacement.values[S.keys[4]]=JSON.stringify({...week,resources:{...week.resources,energy:71}});failKey=S.keys[4];assert.throws(()=>S.apply(replacement));assert.deepEqual(copy(S.snapshot().values),before,'failed import rolls back every field');assert.equal({}.polluted,undefined);
const legacy={format:original.format,version:1,gameVersion:'0.9.0',values:{[S.keys[1]]:original.values[S.keys[1]],[S.keys[6]]:'en'}};assert(S.validate(legacy));
// Switching careers preserves the active run, shared album and a bounded pause list.
const branchKey=S.keys[7];assert(S.archive('软件测试生涯'));
const archived=S.branches()[0];assert(!Object.hasOwn(archived.backup.values,branchKey));
store.set(S.keys[4],JSON.stringify({...week,number:7}));
store.set(S.keys[1],JSON.stringify([{id:'survivor',score:61},{id:'new-ending',score:32}]));
assert(S.restoreBranch(archived.id));assert.equal(JSON.parse(store.get(S.keys[4])).number,week.number);
assert.equal(JSON.parse(store.get(S.keys[1])).length,2,'cumulative endings survive career swaps');
assert.equal(JSON.parse(S.branches()[0].backup.values[S.keys[4]]).number,7);
assert(S.validate(copy(S.snapshot())),'pause list survives full JSON backup');
const nested=copy(S.snapshot()),slots=JSON.parse(nested.values[branchKey]);slots[0].backup.values[branchKey]='[]';nested.values[branchKey]=JSON.stringify(slots);assert.throws(()=>S.validate(nested));
const pauseBefore=copy(S.snapshot().values);failKey=branchKey;assert.equal(S.archive('空间不足'),false);assert.deepEqual(copy(S.snapshot().values),pauseBefore);
for(let i=1;i<8;i++)assert(S.archive('备用生涯'+i));
assert.equal(new Set(S.branches().map(s=>s.id)).size,8,'rapid saves have distinct identities');
const full=copy(S.snapshot().values);assert.equal(S.archive('第九段'),false);assert.deepEqual(copy(S.snapshot().values),full);
assert(S.restoreBranch(S.branches()[0].id),'restore works at the pause-list limit');
assert.equal(S.branches().length,8);assert(S.removeBranch(S.branches()[7].id));assert.equal(S.branches().length,7);assert(S.archive('新的生涯'));
const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.webmanifest'),'utf8'));assert.equal(manifest.display,'standalone');for(const icon of manifest.icons)assert(fs.existsSync(path.join(root,icon.src.replace(/^\.\//,''))));
const source=fs.readFileSync(path.join(root,'scripts/DesktopLauncher.cs'),'utf8');assert(source.includes('LocalApplicationData'));assert(source.includes('DesktopProfile'));assert(source.includes('File.Copy(page,stable,true)'));assert(!source.includes('DownloadFile'));
const result={passed:true,fullSaveRoundtrip:true,weekAndMeeting:true,albumPreserved:true,invalidImportRejected:true,quotaRollback:true,legacyAlbum:true,pausedCareers:true,pauseLimitRestore:true,pauseQuotaRollback:true,localOnly:true};fs.writeFileSync(path.join(root,'.qa/apps-results.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
