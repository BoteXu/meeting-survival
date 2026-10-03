/* Overview entrances remain on one screen; scenes move into a modal without cloning handlers. */
window.MEETING_DASHBOARD_UI=(()=>{
 let lastAuto='';const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function clear(){const d=document.querySelector('#daily-event-dialog');if(d){if(d.open)d.close();d.replaceChildren();}}
 function decorate(w){if(!['life','meeting','report'].includes(w.status))return;const board=document.querySelector('#daily-scene');if(!board)return;if(w.status!=='life'){const menu=document.querySelector('.life-hub-menu');if(menu){const layout=document.createElement('div');layout.className='dashboard-overview dashboard-report';board.before(layout);layout.append(board,menu);}const stage=document.querySelector('#academy-stage');if(stage)document.querySelector('#life-research')?.prepend(stage);return;}const event=window.MEETING_WEEK.current(w),nodes=[...board.childNodes],id=w.id+':'+w.day+':'+w.slot+':'+event.id;
   let modal=document.querySelector('#daily-event-dialog');if(!modal){modal=document.createElement('dialog');modal.id='daily-event-dialog';modal.className='daily-event-dialog';document.body.append(modal);}clear();
   const head=document.createElement('div');head.className='dialog-head';head.innerHTML='<strong>📨 '+(w.pending?'行动后果':'当天事件')+'</strong><button class="close" aria-label="收起事件">×</button>';modal.append(head,...nodes);head.querySelector('button').onclick=()=>modal.close();
   const active=!!(w.surprise||window.MEETING_ASSIGNMENTS.offer(w)||w.academy?.plan||w.campus?.plan||w.world?.plan||w.world?.focus||w.sideStories?.plan||w.taskFocus||w.publication?.plan||w.routeStories?.plan),summary=document.createElement('section');summary.className='daily-overview-card';summary.innerHTML='<p class="eyebrow">'+(active?'📨 有新情况':'☀️ 今日安排')+' · '+window.MEETING_CONTENT.weekDays[w.day]+' · '+(w.slot?'下半天':'上半天')+'</p><h1>'+esc(event.title)+'</h1><p>'+esc(w.pending?w.pending.flavor:event.scene)+'</p><button class="primary" id="open-daily-event">'+(w.pending?'查看行动后果':active?'处理这次事件':'打开当天安排')+' →</button>';board.append(summary);summary.querySelector('button').onclick=()=>modal.showModal();
   const menu=document.querySelector('.life-hub-menu');if(menu){const layout=document.createElement('div');layout.className='dashboard-overview';board.before(layout);layout.append(board,menu);}
   const stage=document.querySelector('#academy-stage');if(stage)document.querySelector('#life-research')?.prepend(stage);
   if(w.pending||active&&id!==lastAuto){lastAuto=id;modal.showModal();}
 }
 document.addEventListener('keydown',e=>{const d=document.querySelector('#daily-event-dialog');if(!d?.open||e.altKey||e.ctrlKey||e.metaKey||e.repeat||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)||![1,2,3].includes(Number(e.key)))return;const b=d.querySelectorAll('[data-life]')[Number(e.key)-1];if(b&&!b.disabled){e.preventDefault();b.click();}});
 return {clear,decorate};
})();
