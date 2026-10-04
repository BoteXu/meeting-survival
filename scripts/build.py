"""Build the self-contained offline game and portable ZIP using standard Python."""
from pathlib import Path
import hashlib
import json
import re
import zipfile

root = Path(__file__).resolve().parents[1]
source_files = [
    'direction-dossiers.js','week-rhythm.js','tests/check-direction-dossiers.cjs','tests/check-week-rhythm.cjs','tests/check-dossiers-browser.cjs','docs/RESEARCH_DOSSIERS.md','docs/DIRECTION_DOSSIERS.csv','docs/QA_v0.14.6.md','docs/dossier-mobile-v146.png','docs/dossier-desktop-v146.png','docs/rhythm-mobile-v146.png','docs/mentor-mobile-v146.png',
    'research-agenda-content.js','research-agenda.js','tests/check-research-agenda.cjs','tests/check-research-agenda-browser.cjs','docs/RESEARCH_AGENDAS.md','docs/RESEARCH_AGENDAS.csv','docs/RESEARCH_REFERENCES.csv','docs/QA_v0.14.4.md','docs/mentor-mobile-v145.png','docs/meeting-mobile-v145.png','docs/library-mobile-v145.png','docs/agenda-mobile-v145.png','docs/agenda-desktop-v145.png',
    'direction-study-content.js','direction-library.js','tests/check-direction-study.cjs','docs/DIRECTION_STUDY.csv','direction-library-ui.js','mentor-appointments.js','refinement.css','tests/check-direction-library.cjs','tests/check-mentor-appointments.cjs','tests/check-layout-browser.cjs','tests/check-learning-browser.cjs','docs/DIRECTION_LIBRARY.md','docs/DIRECTION_BANKS.csv','docs/mentor-mobile-v144.png','docs/meeting-mobile-v144.png','docs/library-mobile-v144.png',
    'docs/WORLD.md','docs/WORLD_JOURNALS.csv','world-setting.js','world-handbook-ui.js','tests/check-world-setting.cjs','docs/QA_v0.14.6.md','docs/QA_v0.14.3.md','docs/QA_v0.14.2.md','docs/QA_v0.14.1.md','docs/QA_v0.14.0.md','docs/QA_v0.13.0.md','docs/NARRATIVE.md','tests/check-browser.cjs','tests/check-random-mentors.cjs','tests/check-offline-browser.cjs','docs/mentor-mobile-v14.png','narrative-world.js','research-vignettes.js','faculty-portraits.js','faculty-lives.js','faculty-dossier-ui.js','people-memory.js','tests/check-social-continuity.cjs','tests/check-social-browser.cjs','tests/v142-social-challenge.json','docs/people-mobile-v143.png','docs/mentor-mobile-v143.png','tests/check-career-continuity.cjs','tests/v141-career-challenge.json','tests/check-continuity-browser.cjs','docs/dossier-mobile-v142.png','docs/mentor-mobile-v142.png','editorial-scenes.js','story-editorial.js','tests/check-narrative.cjs','tests/check-faculty-ui.cjs','docs/QA_v0.12.0.md',
    'discipline-catalogue-content.js','discipline-tree.js','discipline-tree-ui.js','faculty-biographies.js','tests/check-complete-disciplines.cjs','docs/DISCIPLINE_COVERAGE.csv',
    'experience-levels.js','experience-levels-ui.js','tests/check-levels.cjs','dashboard-ui.js','career-timeline.js','career-timeline-ui.js','tests/check-timeline.cjs',
    'medical-taxonomy.js','medical-taxonomy-ui.js','hub-ui.js','hub.css','tests/check-medical-tree.cjs','discipline-specialties.js','discipline-taxonomy.js','taxonomy.css','tests/check-taxonomy.cjs','docs/DISCIPLINES.md','direction-review.js','docs/DIRECTION_REVIEW.csv','medical-specialties.js','academic-life-content.js','academic-life.js','academic-dialogue.js','professional-review.js','academic-life-ui.js','academic-life.css','save-manager.js','install-app.js','sw.js','manifest.webmanifest','icons/app-192.png','icons/app-512.png','icons/app.ico','scripts/DesktopLauncher.cs','scripts/build-desktop.ps1','docs/APPS.md','docs/PROFESSIONAL_REVIEW.md','tests/check-direction-review.cjs','tests/check-academy.cjs','tests/check-apps.cjs',
    'README.md', 'index.html', 'style.css', 'content.js', 'content-expand.js',
    'content-disciplines.js', 'content-v03.js', 'content-cast-v08.js', 'content-week.js', 'campus-content.js', 'campus-engine.js', 'campus-ui.js', 'campus.css', 'preparation.js', 'uncertainty.js', 'life-surprise-content.js', 'cast-surprises-v08.js', 'life-surprises.js', 'content-expansion-v06.js', 'preparation-ui.js', 'preparation.css', 'v06.css', 'opportunities.css', 'cross-discipline.js', 'group-dynamics.js', 'assignments.js', 'side-stories.js', 'living-world.js', 'research-directions.js', 'research-directions-extra.js', 'living-world-ui.js', 'research-directions-ui.js', 'living-world.css', 'route-stories.css', 'mentor-profiles.js', 'route-stories.js', 'mentor-profiles-ui.js', 'route-stories-ui.js', 'publication.js', 'publication-ui.js', 'locale-data.js', 'i18n.js', 'week-engine.js', 'weekly-ui.js', 'week.css', 'engine.js', 'game.js', 'server.cjs', '怎么玩.md',
    'docs/preview.png', 'docs/PLAY_MODES.md', 'scripts/build.py', 'tests/check-engine.cjs',
    'tests/check-portable.cjs', 'tests/check-week.cjs', 'tests/check-campus.cjs', 'tests/check-preparation.cjs', 'tests/check-uncertainty.cjs', 'tests/check-surprises.cjs', 'tests/check-expansion.cjs', 'tests/check-opportunities.cjs', 'tests/check-stories.cjs', 'tests/check-world.cjs', 'tests/check-routes.cjs', 'tests/check-publication.cjs', 'tests/check-cast.cjs', 'tests/check-directions.cjs', 'tests/check-localization.cjs', 'tests/campus-ending-witnesses.json', 'tests/weekly-ending-witnesses.json', 'tests/v02-save-snapshots.json', 'tests/legacy-content.js', 'tests/legacy-engine.js',
]
source_files += ['世界设定集.html','scripts/build-worldbook.cjs','scripts/worldbook-prose.cjs','scripts/worldbook-continuity.cjs','scripts/worldbook-reader.js','tests/check-fine-details.cjs','tests/check-detail-browser.cjs','docs/mentor-mobile-v141.png','docs/worldbook-mobile-v141.png','scripts/worldbook-reader.html','tests/check-worldbook.cjs','tests/check-worldbook-browser.cjs','docs/worldbook-mobile-v14.png'] + [str(p.relative_to(root)).replace('\\','/') for p in sorted((root/'docs/worldbook').glob('*'))]
source_files = list(dict.fromkeys(['docs/QA_v0.14.5.md'] + source_files))
html = (root / 'index.html').read_text(encoding='utf-8')
for css in re.findall(r'<link rel="stylesheet" href="([^?]+)\?v=0.14.6">', html):
    asset_version = '0.14.6'
    html = html.replace('<link rel="stylesheet" href="'+css+'?v='+asset_version+'">', '<style>\n' + (root / css).read_text(encoding='utf-8') + '\n</style>')
for filename in re.findall(r'<script src="([^?]+)\?v=0.14.6"></script>', html):
    asset_version = '0.14.6'
    tag = '<script src="' + filename + '?v=' + asset_version + '"></script>'
    assert html.count(tag) == 1
    js = (root / filename).read_text(encoding='utf-8')
    assert '</script' not in js.lower()
    html = html.replace(tag, '<script>\n' + js + '\n</script>')
assert not re.search(r'<script\s+src=|<link[^>]+stylesheet', html)
assert '原创娱乐小游戏 / v0.14.6' in html
html=re.sub(r'<link rel="(?:manifest|apple-touch-icon)"[^>]*>', '', html)
portable = root / '组会求生_直接玩.html'
portable.write_text(html, encoding='utf-8', newline='\n')
international=[]
for language in ['en', 'ja', 'ko']:
    entry=(root/'index.html').read_text(encoding='utf-8').replace('lang="zh-CN"', 'lang="'+language+'" data-default-language="'+language+'"')
    (root/(language+'.html')).write_text(entry,encoding='utf-8',newline='\n')
    offline=root/('meeting-survival-'+language+'.html')
    offline.write_text(html.replace('lang="zh-CN"','lang="'+language+'" data-default-language="'+language+'"'),encoding='utf-8',newline='\n')
    international.extend([language+'.html',offline.name,'docs/PLAY.'+language+'.md'])

# Installable website cache contains every resource needed for all four languages.
entry=(root/'index.html').read_text(encoding='utf-8')
assets=['./','./index.html','./en.html','./ja.html','./ko.html','./世界设定集.html','./manifest.webmanifest','./icons/app-192.png','./icons/app-512.png']+re.findall(r'(?:src|href)="([^"]+\?v=0.14.6)"',entry)
worker='const CACHE="meeting-survival-v0.14.6";\nconst ASSETS='+json.dumps(assets)+';\n'
worker+='''self.addEventListener('install',event=>event.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(ASSETS);await c.put('./offline-ready.json',new Response('true'));await self.skipWaiting();})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('meeting-survival-')&&k!==CACHE)await caches.delete(k);await self.clients.claim();for(const c of await self.clients.matchAll())c.postMessage({type:'offline-ready'});})()));
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin)return;event.respondWith((async()=>{const c=await caches.open(CACHE);if(event.request.mode==='navigate'){try{return await fetch(event.request);}catch{return await c.match(event.request,{ignoreSearch:true})||await c.match('./index.html');}}return await c.match(event.request)||fetch(event.request);})());});
'''
(root/'sw.js').write_text(worker,encoding='utf-8',newline='\n')

bundle = root / '组会求生_试玩包.zip'
with zipfile.ZipFile(bundle, 'w', compression=zipfile.ZIP_DEFLATED) as z:
    for filename in source_files + [portable.name] + international:
        z.write(root / filename, '组会求生/' + filename)
with zipfile.ZipFile(bundle) as z:
    assert z.testzip() is None
    assert z.read('组会求生/' + portable.name) == portable.read_bytes()
print(json.dumps({
    'version': '0.14.6', 'portable': portable.name, 'zip': bundle.name,
    'portable_sha256': hashlib.sha256(portable.read_bytes()).hexdigest(),
    'zip_sha256': hashlib.sha256(bundle.read_bytes()).hexdigest(),
}, ensure_ascii=True))
