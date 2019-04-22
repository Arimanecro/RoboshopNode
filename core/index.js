
const {NodeJS, MyMod} = require ('./Loader.js');

NodeJS.autoLoad(['Server->http'], 
                ['url'], 
                ['StringDecoder->string_decoder']);

//MyMod.autoLoad(['Delete->./del.js']);

const server = new NodeJS.Server((req, res) => {

  let parseURL = NodeJS.url.parse(req.url, true);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const decoder = new NodeJS.StringDecoder('utf-8');
  let buffer = '';
  req.on('data', () => buffer+=decoder.write(data));
  req.on('end', () => buffer+=decoder.end());
  res.end(`<h1>NODE JS -- ${buffer}</h1>`);
});

server.listen(8000, ()=>console.info('\x1b[36m%s\x1b[0m', 'Server was started!'));