(() => {
  const S=window.MEETING_SURPRISE_CONTENT;
  for(const d of window.MEETING_CAST.routes)S.disciplines.push([d.id,...d.incidents,d.name+'的条件需要重查','本版材料里出现了未核对的条件，扩大说法没有让缺口消失。']);
  window.MEETING_MEDICAL?.installSurprises();
})();
