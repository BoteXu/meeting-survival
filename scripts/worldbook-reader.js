const $=id=>document.getElementById(id),m=DATA.manifest;
/* Reader state is separate from every game save. Only one chapter enters the DOM. */
const BOOK_KEY='meeting-survival-worldbook-reading-v1',byId=new Map(DATA.chapters.map(c=>[c.id,c])),searchText=new Map(),lastByKind={};
let kind='encyclopedia',page=0,current=DATA.chapters[0].id,fontSize=17,visible=[],saveTimer;
const normalize=s=>String(s).normalize('NFKC').toLocaleLowerCase().replace(/\s+/g,' ').trim();
function note(text){$('reader-status').textContent=text;}
function loadBookmark(){try{const v=JSON.parse(localStorage.getItem(BOOK_KEY)||'null');return v&&byId.has(v.chapter)?v:null;}catch{return null;}}
const initialBookmark=loadBookmark();
function snapshot(){return {chapter:current,kind,family:$('family').value,query:$('search').value.slice(0,300),page,fontSize,scrollY:Math.max(0,Math.round(window.scrollY))};}
function save(){try{localStorage.setItem(BOOK_KEY,JSON.stringify(snapshot()));}catch{note('本机暂时无法保存阅读进度，本页仍可正常阅读。');}}
function writeHistory(mode){try{history[mode==='push'?'pushState':'replaceState']({worldbook:snapshot()},'', '#'+encodeURIComponent(current));}catch{note('此浏览器无法更新章节链接，本页仍可正常阅读。');}}
function hashId(){try{return {id:decodeURIComponent(location.hash.slice(1)),bad:false};}catch{return {id:'',bad:true};}}
function matches(c){const f=$('family').value,q=normalize($('search').value);if(c.kind!==kind||f!=='all'&&c.family!==f)return false;if(!q)return true;if(!searchText.has(c.id))searchText.set(c.id,normalize(c.title+' '+c.text));return searchText.get(c.id).includes(q);}
function applyFont(){document.documentElement.style.setProperty('--reading-size',fontSize+'px');$('font-size').textContent=fontSize+'px';$('font-minus').disabled=fontSize<=16;$('font-plus').disabled=fontSize>=24;}
function drawChapter(){const c=byId.get(current),shown=visible.some(x=>x.id===current);$('links').replaceChildren();
 if(!c||!shown){$('title').textContent='没有匹配的章节';$('meta').textContent=kind==='novel'?'校园小说':'设定百科';$('text').textContent='这个分类或关键词下暂时没有内容。可以清空搜索、更换学科，或切换到另一种阅读内容。';$('chapter-prev').disabled=$('chapter-next').disabled=true;return;}
 lastByKind[kind]=current;$('title').textContent=c.title;$('meta').textContent=`${c.kind==='novel'?'校园小说':'设定百科'} · ${DATA.familyNames[c.family]||'共同世界'} · ${c.chineseCharacters.toLocaleString()} 汉字`;$('text').textContent=c.text;
 const at=visible.findIndex(x=>x.id===current);$('chapter-prev').disabled=at<=0;$('chapter-next').disabled=at<0||at>=visible.length-1;
 if(c.mentor){const counterpart=DATA.chapters.find(x=>x.mentor===c.mentor&&x.kind!==c.kind);if(counterpart){const b=document.createElement('button');b.textContent=c.kind==='novel'?'查看这个人物的百科档案':'阅读这个团队的学年故事';b.onclick=()=>navigate(counterpart.id,{reveal:true});$('links').append(b);}}
}
function render({pick=true,historyMode='replace',scroll=false}={}){visible=DATA.chapters.filter(matches);if(visible.length&&!visible.some(c=>c.id===current)&&pick)current=visible[0].id;page=Math.max(0,Math.min(page,Math.max(0,Math.ceil(visible.length/24)-1)));$('catalogue').replaceChildren();
 for(const c of visible.slice(page*24,(page+1)*24)){const b=document.createElement('button');b.textContent=c.title;b.setAttribute('aria-pressed',String(c.id===current));b.onclick=()=>navigate(c.id);$('catalogue').append(b);}
 if(!visible.length)$('catalogue').textContent='没有匹配条目，试试其他关键词。';$('page').textContent=`${page+1} / ${Math.max(1,Math.ceil(visible.length/24))} · ${visible.length} 条`;$('prev').disabled=page===0;$('next').disabled=(page+1)*24>=visible.length;
 for(const k of ['encyclopedia','novel'])$(k).setAttribute('aria-pressed',String(kind===k));drawChapter();applyFont();if(historyMode)writeHistory(historyMode);if(scroll){$('title').scrollIntoView({block:'start',behavior:'instant'});$('title').focus({preventScroll:true});}save();
}
function navigate(id,{reveal=false,historyMode='push',scroll=true}={}){const c=byId.get(id);if(!c)return;current=id;kind=c.kind;if(reveal){if($('family').value!=='all'&&$('family').value!==c.family)$('family').value=c.family;if(!matches(c))$('search').value='';}visible=DATA.chapters.filter(matches);page=Math.max(0,Math.floor(visible.findIndex(x=>x.id===current)/24));render({historyMode,scroll});}
function restore(v,{historyMode='replace'}={}){if(!v||!byId.has(v.chapter))return false;current=v.chapter;kind=['encyclopedia','novel'].includes(v.kind)?v.kind:byId.get(current).kind;$('family').value=['all','core',...Object.keys(DATA.familyNames)].includes(v.family)?v.family:'all';$('search').value=String(v.query||'').slice(0,300);page=Number.isInteger(v.page)&&v.page>=0?v.page:0;fontSize=Math.max(16,Math.min(24,Number(v.fontSize)||17));render({historyMode});const y=Number(v.scrollY);if(Number.isFinite(y)&&y>=0)requestAnimationFrame(()=>window.scrollTo(0,Math.min(y,500000)));return true;}
$('statistics').textContent=`正文 ${m.chineseCharacters.toLocaleString()} 汉字 · 百科 ${(m.encyclopediaShare*100).toFixed(1)}% / 小说 ${((1-m.encyclopediaShare)*100).toFixed(1)}% · ${m.mentorProfiles.toLocaleString()} 位导师 · ${m.volumes.length} 册`;
$('method').textContent=m.method;$('counting').textContent=m.counting+` 去重段落正文 ${m.distinctBodyCharacters.toLocaleString()} 汉字；相近的按人物改写段落仍在去重统计内。`;
for(const [id,name]of Object.entries(DATA.familyNames)){const o=document.createElement('option');o.value=id;o.textContent=name;$('family').append(o);}
for(const k of ['encyclopedia','novel'])$(k).onclick=()=>{const c=byId.get(current),counterpart=c?.mentor&&DATA.chapters.find(x=>x.mentor===c.mentor&&x.kind===k);kind=k;current=counterpart?.id||lastByKind[k]||current;page=0;render({historyMode:'push'});};
$('search').oninput=()=>{page=0;render();};$('family').onchange=()=>{page=0;render({historyMode:'push'});};$('prev').onclick=()=>{page--;render({pick:false});};$('next').onclick=()=>{page++;render({pick:false});};
$('chapter-prev').onclick=()=>{const at=visible.findIndex(x=>x.id===current);if(at>0)navigate(visible[at-1].id);};$('chapter-next').onclick=()=>{const at=visible.findIndex(x=>x.id===current);if(at>=0&&at<visible.length-1)navigate(visible[at+1].id);};
$('font-minus').onclick=()=>{fontSize=Math.max(16,fontSize-1);applyFont();save();};$('font-plus').onclick=()=>{fontSize=Math.min(24,fontSize+1);applyFont();save();};$('reader-top').onclick=()=>window.scrollTo({top:0,behavior:'smooth'});
$('resume').disabled=!initialBookmark;$('resume').onclick=()=>{if(restore(initialBookmark,{historyMode:'push'}))note('已恢复上次阅读的位置。');};
window.addEventListener('scroll',()=>{clearTimeout(saveTimer);saveTimer=setTimeout(save,200);},{passive:true});window.addEventListener('pagehide',save);
window.addEventListener('popstate',e=>{if(restore(e.state?.worldbook,{historyMode:null}))return;const h=hashId();navigate(byId.has(h.id)?h.id:DATA.chapters[0].id,{reveal:true,historyMode:null,scroll:false});});
window.addEventListener('hashchange',()=>{const h=hashId();if(h.id===current&&!h.bad)return;if(byId.has(h.id))navigate(h.id,{reveal:true,historyMode:'replace'});else{navigate(DATA.chapters[0].id,{reveal:true,historyMode:'replace',scroll:false});note('章节链接无法识别，已返回共同世界。');}});
const start=hashId();if(start.id&&byId.has(start.id)){navigate(start.id,{reveal:true,historyMode:'replace',scroll:false});if(initialBookmark?.chapter===start.id)restore(initialBookmark);}else if(!start.bad&&!start.id&&initialBookmark){restore(initialBookmark);note('已恢复上次阅读的位置。');}else{render();if(start.bad||start.id)note('章节链接无法识别，已返回共同世界。');}
