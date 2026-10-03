"""Build the self-contained offline game and portable ZIP using standard Python."""
from pathlib import Path
import hashlib
import json
import re
import zipfile

root = Path(__file__).resolve().parents[1]
source_files = [
    'direction-review.js','docs/DIRECTION_REVIEW.csv','medical-specialties.js','academic-life-content.js','academic-life.js','academic-dialogue.js','professional-review.js','academic-life-ui.js','academic-life.css','save-manager.js','install-app.js','sw.js','manifest.webmanifest','icons/app-192.png','icons/app-512.png','icons/app.ico','scripts/DesktopLauncher.cs','scripts/build-desktop.ps1','docs/APPS.md','docs/PROFESSIONAL_REVIEW.md','tests/check-direction-review.cjs','tests/check-academy.cjs','tests/check-apps.cjs',
    'README.md', 'index.html', 'style.css', 'content.js', 'content-expand.js',
    'content-disciplines.js', 'content-v03.js', 'content-cast-v08.js', 'content-week.js', 'campus-content.js', 'campus-engine.js', 'campus-ui.js', 'campus.css', 'preparation.js', 'uncertainty.js', 'life-surprise-content.js', 'cast-surprises-v08.js', 'life-surprises.js', 'content-expansion-v06.js', 'preparation-ui.js', 'preparation.css', 'v06.css', 'opportunities.css', 'cross-discipline.js', 'group-dynamics.js', 'assignments.js', 'side-stories.js', 'living-world.js', 'research-directions.js', 'research-directions-extra.js', 'living-world-ui.js', 'research-directions-ui.js', 'living-world.css', 'route-stories.css', 'mentor-profiles.js', 'route-stories.js', 'mentor-profiles-ui.js', 'route-stories-ui.js', 'publication.js', 'publication-ui.js', 'locale-data.js', 'i18n.js', 'week-engine.js', 'weekly-ui.js', 'week.css', 'engine.js', 'game.js', 'server.cjs', '怎么玩.md',
    'docs/preview.png', 'docs/PLAY_MODES.md', 'scripts/build.py', 'tests/check-engine.cjs',
    'tests/check-portable.cjs', 'tests/check-week.cjs', 'tests/check-campus.cjs', 'tests/check-preparation.cjs', 'tests/check-uncertainty.cjs', 'tests/check-surprises.cjs', 'tests/check-expansion.cjs', 'tests/check-opportunities.cjs', 'tests/check-stories.cjs', 'tests/check-world.cjs', 'tests/check-routes.cjs', 'tests/check-publication.cjs', 'tests/check-cast.cjs', 'tests/check-directions.cjs', 'tests/check-localization.cjs', 'tests/campus-ending-witnesses.json', 'tests/weekly-ending-witnesses.json', 'tests/v02-save-snapshots.json', 'tests/legacy-content.js', 'tests/legacy-engine.js',
]
html = (root / 'index.html').read_text(encoding='utf-8')
for css in re.findall(r'<link rel="stylesheet" href="([^?]+)\?v=0.10.0">', html):
    asset_version = '0.10.0'
    html = html.replace('<link rel="stylesheet" href="'+css+'?v='+asset_version+'">', '<style>\n' + (root / css).read_text(encoding='utf-8') + '\n</style>')
for filename in re.findall(r'<script src="([^?]+)\?v=0.10.0"></script>', html):
    asset_version = '0.10.0'
    tag = '<script src="' + filename + '?v=' + asset_version + '"></script>'
    assert html.count(tag) == 1
    js = (root / filename).read_text(encoding='utf-8')
    assert '</script' not in js.lower()
    html = html.replace(tag, '<script>\n' + js + '\n</script>')
assert not re.search(r'<script\s+src=|<link[^>]+stylesheet', html)
assert '原创娱乐小游戏 / v0.10.0' in html
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
assets=['./','./index.html','./en.html','./ja.html','./ko.html','./manifest.webmanifest','./icons/app-192.png','./icons/app-512.png']+re.findall(r'(?:src|href)="([^"]+\?v=0.10.0)"',entry)
worker='const CACHE="meeting-survival-v0.10.0";\nconst ASSETS='+json.dumps(assets)+';\n'
worker+='''self.addEventListener('install',event=>event.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(ASSETS);await c.put('./offline-ready.json',new Response('true'));})()));
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
    'version': '0.10.0', 'portable': portable.name, 'zip': bundle.name,
    'portable_sha256': hashlib.sha256(portable.read_bytes()).hexdigest(),
    'zip_sha256': hashlib.sha256(bundle.read_bytes()).hexdigest(),
}, ensure_ascii=True))
