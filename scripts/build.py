"""Build the self-contained offline game and portable ZIP using standard Python."""
from pathlib import Path
import hashlib
import json
import re
import zipfile

root = Path(__file__).resolve().parents[1]
source_files = [
    'README.md', 'index.html', 'style.css', 'content.js', 'content-expand.js',
    'content-disciplines.js', 'content-v03.js', 'content-cast-v08.js', 'content-week.js', 'campus-content.js', 'campus-engine.js', 'campus-ui.js', 'campus.css', 'preparation.js', 'uncertainty.js', 'life-surprise-content.js', 'cast-surprises-v08.js', 'life-surprises.js', 'content-expansion-v06.js', 'preparation-ui.js', 'preparation.css', 'v06.css', 'opportunities.css', 'cross-discipline.js', 'group-dynamics.js', 'assignments.js', 'side-stories.js', 'living-world.js', 'research-directions.js', 'research-directions-extra.js', 'living-world-ui.js', 'research-directions-ui.js', 'living-world.css', 'locale-data.js', 'i18n.js', 'week-engine.js', 'weekly-ui.js', 'week.css', 'engine.js', 'game.js', 'server.cjs', '怎么玩.md',
    'docs/preview.png', 'docs/PLAY_MODES.md', 'scripts/build.py', 'tests/check-engine.cjs',
    'tests/check-portable.cjs', 'tests/check-week.cjs', 'tests/check-campus.cjs', 'tests/check-preparation.cjs', 'tests/check-uncertainty.cjs', 'tests/check-surprises.cjs', 'tests/check-expansion.cjs', 'tests/check-opportunities.cjs', 'tests/check-stories.cjs', 'tests/check-world.cjs', 'tests/check-cast.cjs', 'tests/check-directions.cjs', 'tests/check-localization.cjs', 'tests/campus-ending-witnesses.json', 'tests/weekly-ending-witnesses.json', 'tests/v02-save-snapshots.json', 'tests/legacy-content.js', 'tests/legacy-engine.js',
]
html = (root / 'index.html').read_text(encoding='utf-8')
for css in ['style.css', 'week.css', 'campus.css', 'preparation.css', 'v06.css', 'opportunities.css', 'living-world.css']:
    asset_version = '0.8.0'
    html = html.replace('<link rel="stylesheet" href="'+css+'?v='+asset_version+'">', '<style>\n' + (root / css).read_text(encoding='utf-8') + '\n</style>')
for filename in ['content.js', 'content-expand.js', 'content-disciplines.js', 'content-v03.js', 'content-cast-v08.js', 'content-week.js', 'campus-content.js', 'campus-engine.js', 'preparation.js', 'uncertainty.js', 'life-surprise-content.js', 'cast-surprises-v08.js', 'life-surprises.js', 'content-expansion-v06.js', 'cross-discipline.js', 'group-dynamics.js', 'assignments.js', 'side-stories.js', 'living-world.js', 'research-directions.js', 'research-directions-extra.js', 'engine.js', 'week-engine.js', 'game.js', 'campus-ui.js', 'preparation-ui.js', 'living-world-ui.js', 'research-directions-ui.js', 'weekly-ui.js', 'locale-data.js', 'i18n.js']:
    asset_version = '0.8.0'
    tag = '<script src="' + filename + '?v=' + asset_version + '"></script>'
    assert html.count(tag) == 1
    js = (root / filename).read_text(encoding='utf-8')
    assert '</script' not in js.lower()
    html = html.replace(tag, '<script>\n' + js + '\n</script>')
assert not re.search(r'<script\s+src=|<link[^>]+stylesheet', html)
assert '原创娱乐小游戏 / v0.8.0' in html
portable = root / '组会求生_直接玩.html'
portable.write_text(html, encoding='utf-8', newline='\n')
international=[]
for language in ['en', 'ja', 'ko']:
    entry=(root/'index.html').read_text(encoding='utf-8').replace('lang="zh-CN"', 'lang="'+language+'" data-default-language="'+language+'"')
    (root/(language+'.html')).write_text(entry,encoding='utf-8',newline='\n')
    offline=root/('meeting-survival-'+language+'.html')
    offline.write_text(html.replace('lang="zh-CN"','lang="'+language+'" data-default-language="'+language+'"'),encoding='utf-8',newline='\n')
    international.extend([language+'.html',offline.name,'docs/PLAY.'+language+'.md'])
bundle = root / '组会求生_试玩包.zip'
with zipfile.ZipFile(bundle, 'w', compression=zipfile.ZIP_DEFLATED) as z:
    for filename in source_files + [portable.name] + international:
        z.write(root / filename, '组会求生/' + filename)
with zipfile.ZipFile(bundle) as z:
    assert z.testzip() is None
    assert z.read('组会求生/' + portable.name) == portable.read_bytes()
print(json.dumps({
    'version': '0.8.0', 'portable': portable.name, 'zip': bundle.name,
    'portable_sha256': hashlib.sha256(portable.read_bytes()).hexdigest(),
    'zip_sha256': hashlib.sha256(bundle.read_bytes()).hexdigest(),
}, ensure_ascii=True))
