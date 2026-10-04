/* Keep each working screen focused; moving nodes preserves the existing action handlers. */
window.MEETING_HUB_UI=(()=>{
 let view='home',lastWeek=null;const labels={home:'☀️ 当天事件',planning:'📖 准备与生活',research:'🔎 课题与投稿',community:'🏫 课题组与关系'};
 function drawer(nodes,title,anchor){nodes=nodes.filter(Boolean);if(!nodes.length)return null;const e=document.createElement('details');e.className='setup-hub';const summary=document.createElement('summary');summary.textContent=title;e.append(summary);anchor.before(e);nodes.forEach(n=>e.append(n));return e;}
 function landing(){const app=document.querySelector('#app'),T=window.MEETING_TAXONOMY,t=T.state();if(!document.querySelector('#start')||document.querySelector('.setup-hub'))return;
   const hero=app.querySelector('.hero');if(hero)hero.hidden=!!t.family;const families=app.querySelector('.taxonomy-families');if(families)families.hidden=!!t.family;
   if(t.route){app.querySelector('.discipline-grid').hidden=true;app.querySelector('#discipline-search').hidden=true;}
   const roles=app.querySelector('.roles'),heading=roles?.previousElementSibling,anchor=app.querySelector('.setup-bottom');drawer([heading,roles],'🎭 人设与能力 · 点开设置',anchor);drawer([app.querySelector('.academy-setup')],'🎓 生涯阶段与开局剧本 · 点开设置',anchor);drawer([app.querySelector('.world-setup')],'🎲 校园节奏与同局挑战 · 点开设置',anchor);
   const mentorInfo=app.querySelector('.mentor-setup');if(mentorInfo)mentorInfo.hidden=true;
   let help=document.createElement('button');help.className='plain';help.id='guide-replay';help.textContent='📘 新手引导 · 重看';help.onclick=guide;app.querySelector('.taxonomy-path')?.after(help);
   const search=app.querySelector('#discipline-search'),med=t.family==='medicine'?window.MEETING_MEDICAL_TAXONOMY:window.MEETING_DISCIPLINE_TREE;if(!med.branch()||med.routes().length===1){if(search)search.hidden=true;}
 }
 function life(w){const app=document.querySelector('#app');if(!['life','meeting','report'].includes(w.status))return;const tick=w.id+':'+w.day+':'+w.slot+':'+w.status;if(lastWeek!==tick){view='home';lastWeek=tick;}if(w.status==='life'&&(w.pending||w.presentation||w.taskFocus||w.campus?.plan||w.world?.plan||w.routeStories?.plan||w.publication?.plan||w.academy?.plan||w.sideStories?.plan))view='home';
   const nav=app.querySelector('.life-section-nav');if(!nav)return;nav.innerHTML=Object.entries(labels).map(([id,name])=>`<button data-life-hub="${id}" aria-pressed="${id===view}">${name}</button>`).join('');
   const panels={home:app.querySelector('#daily-scene'),planning:app.querySelector('#life-planning'),research:app.querySelector('#life-research'),community:app.querySelector('#life-community')};
   const menu=document.createElement('section');menu.className='life-hub-menu';menu.innerHTML='<h3>这半天，还想去哪里？</h3><p>从入口进入一个模块，安排仍然共用这半天。</p>'+Object.entries(labels).filter(([id])=>id!=='home').map(([id,name])=>`<button data-hub-entry="${id}"><strong>${name}</strong><small>${id==='planning'?'文献、校园去处、吃饭与临时交办':id==='research'?'课题、资源排期、合作与期刊进度':'人物、消息、年鉴与校园故事'}</small></button>`).join('');panels.home.after(menu);
   const back=document.createElement('button');back.className='secondary hub-back';back.textContent='← 返回当天事件';nav.after(back);back.onclick=()=>show('home');
   function show(id){view=id;nav.hidden=id==='home';for(const [key,node] of Object.entries(panels)){if(node){node.classList.add('hub-panel');node.hidden=key!==id;}}menu.hidden=id!=='home';back.hidden=id==='home';app.querySelector('.week-tasks').hidden=id!=='community';app.querySelector('.week-bottom').hidden=id!=='home';nav.querySelectorAll('[data-life-hub]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lifeHub===id)));nav.scrollIntoView({block:'start',behavior:'smooth'});}
   nav.querySelectorAll('[data-life-hub]').forEach(b=>b.onclick=()=>show(b.dataset.lifeHub));menu.querySelectorAll('[data-hub-entry]').forEach(b=>b.onclick=()=>show(b.dataset.hubEntry));
   // Apply initial state without scrolling the daily event away from its heading.
   nav.hidden=view==='home';for(const [key,node] of Object.entries(panels))if(node){node.classList.add('hub-panel');node.hidden=key!==view;}menu.hidden=view!=='home';back.hidden=view==='home';app.querySelector('.week-tasks').hidden=view!=='community';app.querySelector('.week-bottom').hidden=view!=='home';
 }
 function guide(){let e=document.querySelector('#beginner-guide');if(!e){e=document.createElement('dialog');e.id='beginner-guide';e.className='beginner-guide';document.body.append(e);}let step=0;
   const slides=[
 ['01 · 学科与导师','先选大类、专业、细分领域，再去导师主页了解成果和资源。选定导师与一个具体方向后，才会开始这段生涯。'],
 ['02 · 总览与当天事件','总览显示日期、精力、资料、压力和功能入口。打开当天安排作出选择；临时交办和突发用弹窗出现，收起弹窗不会替你完成事件。'],
 ['03 · 准备与生活','这个入口可以读文献、去图书馆、吃饭、放松或处理临时交办。每次安排占用当前时间片段，后果在选择后显示。'],
 ['04 · 课题与投稿','这里管理方向、资源预约、实际核对、合作贡献与投稿。排期和外审需要等待，窗口开放后仍要亲自处理；修稿、拒稿和接收会连续影响后续。'],
 ['05 · 课题组与关系','这里看导师、师兄师姐和师弟师妹的消息与研究进度，也能求助、带教、安排归还、回看年鉴与已了解的人物往事。“相处记录”能查借用、带教与合作中的实际交接。别人有自己的截止日期，不一定随时有空。'],
 ['06 · 组会与准备依据','按开局选择的频率安排组会，周初可以查看下一场的时间。精读与实际核对留下当前方向、当前版本的记录，决定哪些回答有依据。追问会接回前面的承诺，翻车后也能继续生活。'],
 ['07 · 结算、暂停与存档','结算本段会留下当前经历，可继续或保存暂停。体验时长只是阶段节点，毕业另按学位时间线检查。存档与安装入口能导出、导入完整备份；时间跳过遇到重要事件会停下。']];
   function render(){e.innerHTML=`<div class="dialog-head"><h2>新手引导 · ${step+1}/${slides.length}</h2><button class="close" id="guide-close" aria-label="关闭引导">×</button></div><p class="eyebrow">${slides[step][0]}</p><p>${slides[step][1]}</p><div class="guide-actions"><button class="secondary" id="guide-skip">跳过，我先试试</button><button class="primary" id="guide-next">${step===slides.length-1?'开始探索':'下一步'} →</button></div>`;e.querySelector('#guide-close').onclick=finish;e.querySelector('#guide-skip').onclick=finish;e.querySelector('#guide-next').onclick=()=>{if(step===slides.length-1)finish();else{step++;render();}};}
   function finish(){try{localStorage.setItem('meeting-survival-guide-v11-dashboard','seen');}catch{}e.close();}render();e.showModal();
 }
 queueMicrotask(()=>{try{if(!localStorage.getItem('meeting-survival-guide-v11-dashboard'))guide();}catch{}});
 return {landing,life,guide};
})();
