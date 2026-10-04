/* Read-only recollections: opening this file never grants a memory. */
window.MEETING_FACULTY_DOSSIER=(()=>{
  'use strict';
  const M=window.MEETING_MENTORS,N=window.MEETING_NARRATIVE_WORLD;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const labels={labHistory:N.pair('团队的来路','How the team began'),turningPoint:N.pair('一次转折','A turning point'),studentMemory:N.pair('与学生有关的往事','A recollection about students'),life:N.pair('研究之外','Outside research'),privateTrace:N.pair('后来才听到的细节','Details learned later')};
  for(const pair of [['人物档案','Faculty dossier'],['入组前的公开经历','Public career before this run'],['已了解的往事','Recollections you have heard'],['本局职级变化','Career changes in this run'],['目前还没有听到更多往事。以后相处时，有些经历会慢慢讲起。','No further recollections yet. Some may emerge in later conversations.'],['这份档案记录你已经听过的往事，阅读不会占用生活时间。','This file records recollections you have already heard. Reading takes no game time.'],['任职年限会影响晋升申请，评议需要等待，也可能暂缓。','Time in post affects promotion applications; reviews take time and may be deferred.'],['任职经历与本局经过的时间共同影响晋升评议；评议需要等待，也可能暂缓。','Earlier service and elapsed time in this run affect promotion reviews, which take time and may be deferred.'],['同局挑战沿用原有职业节奏。','Same-run challenges retain their original career timing.']])N.pair(...pair);
  function view(w,id){
    const member=w.group?.members.find(m=>m.profileId===id),p=M.find(id);if(!member||!p)return null;
    const stored=w.campus?.facultyMemories,known=window.MEETING_STORY_EDITORIAL.memoriesValid(stored)?stored?.[id]||[]:[];
    return {name:p.name,lab:p.lab,title:window.MEETING_MENTOR_APPOINTMENTS?.titleOf(member)||M.levels[member.level||p.level].title,publicExperience:p.biography.publicExperience||p.achievement,
      sections:known.filter(key=>labels[key]&&p.biography[key]).map(key=>({key,title:labels[key],text:p.biography[key]})),
      history:(member.promotion?.history||[]).filter(h=>h.status==='promoted').map(h=>({week:h.week,text:h.text}))};
  }
  function show(w,id){
    const data=view(w,id);if(!data)return false;
    let dialog=document.querySelector('#faculty-dossier');if(dialog?.open){dialog.querySelector('.close').focus();return true;}
    if(!dialog){dialog=document.createElement('dialog');dialog.id='faculty-dossier';dialog.className='faculty-dossier';document.body.append(dialog);}
    const trigger=document.activeElement,title=N.pair('人物档案 · '+data.name,()=> 'Faculty dossier · '+N.english(data.name));
    dialog.innerHTML=`<div class="dialog-head"><h2>${esc(title)}</h2><button class="close" aria-label="关闭">×</button></div><p class="faculty-rank">${esc(data.title)} · ${esc(data.lab)}</p><p>这份档案记录你已经听过的往事，阅读不会占用生活时间。</p><details class="faculty-about"><summary>入组前的公开经历</summary><p>${esc(data.publicExperience)}</p></details>${data.history.length?`<details class="faculty-about"><summary>本局职级变化</summary>${data.history.map(h=>`<p>第 ${h.week} 周 · ${esc(h.text)}</p>`).join('')}</details>`:''}<h3>已了解的往事</h3>${data.sections.map((s,i)=>`<details class="faculty-about" ${i===0?'open':''}><summary>${esc(s.title)}</summary><p>${esc(s.text)}</p></details>`).join('')||'<p class="dossier-empty">目前还没有听到更多往事。以后相处时，有些经历会慢慢讲起。</p>'}`;
    dialog.querySelector('.close').onclick=()=>dialog.close();dialog.onclose=()=>{if(trigger?.isConnected)trigger.focus({preventScroll:true});};dialog.showModal();return true;
  }
  return {view,show};
})();
