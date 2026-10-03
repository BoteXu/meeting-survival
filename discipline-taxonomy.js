/* 菜单层级为浏览结构；研究方向 ID 才决定实际课题与准备证据。 */
window.MEETING_TAXONOMY=(()=>{
 const C=window.MEETING_CONTENT,D=window.MEETING_DIRECTIONS;
 const icons={philosophy:'🦉',economics:'📈',law:'⚖️',education:'📚',literature:'📜',history:'🏺',science:'🔭',engineering:'⚙️',agriculture:'🌾',medicine:'🩺',military:'🧭',management:'🏛️',arts:'🎨',interdisciplinary:'🧩'};
 // Curated subdivisions are optional research fields, not a claim of official degree levels.
 const rows=[
 ['cardiology','疾病与临床问题:1,2,3,4,5,8','影像与功能评价:6,7,12','遗传与基础联系:9,10,11'],
 ['radiology','成像与信号:1,2,3,4','系统与对象:5,6,7,8','评价与计算:9,10,11,12'],
 ['neurology','疾病与临床资料:1,2,3,5','功能与随访:4,6,7,8','测量与机制资料:9,10,11,12'],
 ['pediatrics','生长与生命历程:1,2,3,9','专科与照护资料:4,5,6,7','评价与长期资料:8,10,11,12'],
 ['oral-medicine','临床与组织资料:1,2,3,4','功能与修复研究:5,6,7,8','数字与评价研究:9,10,11,12'],
 ['civil-law','民法与生活关系:1,2,3,4,10','商法与组织关系:5,6,7,8','知识与数字交易:9,11,12'],
 ['criminal-law','规范与刑事政策:1,2,3,8,10','程序与司法材料:4,5,9,11','犯罪与教育研究:6,7,12'],
 ['linguistics-studies','语言结构:1,2,3,4','使用与社会情境:5,6,9,11','学习与资料方法:7,8,10,12'],
 ['chinese-language','文学史与作品:1,2,3,11','语言与文献:5,6,7,8','理论与表达:4,9,10,12'],
 ['chinese-history','时期与地域:1,2,8,12','制度与社会过程:3,4,5,9,10','思想文化与史学:6,7,11'],
 ['software-engineering','需求与架构:1,2,10','测试与质量:3,4,6,11','开发与维护:5,7,8,9,12'],
 ['electrical-engineering','设备与测量:1,4,5,9','系统与能源:2,6,7,8,11','转换与自动化:3,10,12'],
 ['systems-biology','系统与公共资料:1,2,7,8','生态与演化资料:3,4,6,10','发育与资料评价:5,9,11,12'],
 ['finance-studies','市场与价格:1,3,7,8,10','组织与金融机构:2,4,5','方法与家庭情境:6,9,11,12'],
 ['curriculum-studies','课程与教学设计:1,2,4,5,10','课堂与学习过程:3,8,9,11','反馈与评价:6,7,12'],
 ['crop-science','生长与生产条件:1,2,7,9,12','遗传与资源资料:3,4,5','品质与资料方法:6,8,10,11'],
 ['information-management','图书情报与服务:1,2,5,7,9','档案与数字保存:3,8,11','知识组织与伦理:4,6,10,12'],
 ['musicology-studies','历史与社会:1,2,10,11,12','作品与表演:3,4,5,6','教育与技术:7,8,9']
 ];
 const groups=Object.fromEntries(rows.map(([route,...items])=>[route,items.map((s,i)=>{const [name,indices]=s.split(':');return {id:route+'-field-'+i,name,directionIds:indices.split(',').map(n=>route+'-'+n)};})]));
 let family=null,route=null,field=null,deferred=false,explicit=false;
 function chooseFamily(id){if(!C.families.some(f=>f.id===id))return false;if(id!==family){window.MEETING_MEDICAL_TAXONOMY?.reset();route=null;field=null;deferred=false;explicit=false;}family=id;return true;}
 function chooseRoute(id){const p=C.projects.find(p=>p.id===id);if(!p||p.family!==family)return false;if(route!==id){field=null;deferred=true;explicit=false;}route=id;return true;}
 function chooseField(id){if(id===null||id==='all'){field=id;deferred=true;explicit=false;return true;}if(!(groups[route]||[]).some(g=>g.id===id))return false;field=id;deferred=true;explicit=false;return true;}
 function list(c){const a=family==='medicine'?(window.MEETING_MEDICAL_TAXONOMY?.list(D.list(c))||D.list(c)):D.list(c),g=(groups[route]||[]).find(g=>g.id===field);return g?a.filter(d=>g.directionIds.includes(d.id)):a;}
 function back(){window.MEETING_MEDICAL_TAXONOMY?.reset();family=null;route=null;field=null;deferred=false;explicit=false;}
 return {icons,groups,chooseFamily,chooseRoute,chooseField,list,back,backToFamily:()=>{route=null;field=null;deferred=false;explicit=false;},state:()=>({family,route,field,deferred,explicit}),chooseDirection:()=>{deferred=false;explicit=true;},defer:()=>{deferred=true;explicit=false;},menuConfig:()=>({directionDeferred:deferred,...((groups[route]||[]).find(g=>g.id===field)?{mentorAllowedDirections:groups[route].find(g=>g.id===field).directionIds}:{}),...(family==='medicine'?window.MEETING_MEDICAL_TAXONOMY?.menuConfig():{})}),ready:()=>!!route};
})();
