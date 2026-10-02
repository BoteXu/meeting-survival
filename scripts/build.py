"""Build the self-contained offline game and portable ZIP using standard Python."""
from pathlib import Path
import hashlib
import json
import re
import zipfile

root = Path(__file__).resolve().parents[1]
source_files = [
    'README.md', 'index.html', 'style.css', 'content.js', 'content-expand.js',
    'content-disciplines.js', 'engine.js', 'game.js', 'server.cjs', '怎么玩.md',
    'docs/preview.png', 'scripts/build.py', 'tests/check-engine.cjs',
    'tests/check-portable.cjs', 'tests/legacy-content.js', 'tests/legacy-engine.js',
]
html = (root / 'index.html').read_text(encoding='utf-8')
html = html.replace('<link rel="stylesheet" href="style.css">', '<style>\n' + (root / 'style.css').read_text(encoding='utf-8') + '\n</style>')
for filename in ['content.js', 'content-expand.js', 'content-disciplines.js', 'engine.js', 'game.js']:
    tag = '<script src="' + filename + '"></script>'
    assert html.count(tag) == 1
    js = (root / filename).read_text(encoding='utf-8')
    assert '</script' not in js.lower()
    html = html.replace(tag, '<script>\n' + js + '\n</script>')
assert not re.search(r'<script\s+src=|<link[^>]+stylesheet', html)
assert '原创娱乐小游戏 / v0.2' in html
portable = root / '组会求生_直接玩.html'
portable.write_text(html, encoding='utf-8')
bundle = root / '组会求生_试玩包.zip'
with zipfile.ZipFile(bundle, 'w', compression=zipfile.ZIP_DEFLATED) as z:
    for filename in source_files + [portable.name]:
        z.write(root / filename, '组会求生/' + filename)
with zipfile.ZipFile(bundle) as z:
    assert z.testzip() is None
    assert z.read('组会求生/' + portable.name) == portable.read_bytes()
print(json.dumps({
    'version': '0.2', 'portable': portable.name, 'zip': bundle.name,
    'portable_sha256': hashlib.sha256(portable.read_bytes()).hexdigest(),
    'zip_sha256': hashlib.sha256(bundle.read_bytes()).hexdigest(),
}, ensure_ascii=True))
