// 只在本机提供预览。双击 index.html 也能玩，无需此服务。
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const port = Number(process.env.MEETING_PORT || 8768);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png'};
http.createServer((req,res) => {
  let route;
  try { route = decodeURIComponent(new URL(req.url,'http://localhost').pathname); }
  catch { res.writeHead(400);res.end('Bad request');return; }
  const relative = route === '/' ? 'index.html' : route.replace(/^\/+/, '');
  const target = path.resolve(root,relative);
  if(!target.startsWith(root + path.sep)){res.writeHead(403);res.end('Forbidden');return;}
  fs.readFile(target,(err,data) => {if(err){res.writeHead(404);res.end('Not found');return;}res.writeHead(200,{'Content-Type':types[path.extname(target)] || 'application/octet-stream','Cache-Control':'no-store'});res.end(data);});
}).listen(port,'127.0.0.1',() => console.log(`组会求生预览: http://127.0.0.1:${port}`));
