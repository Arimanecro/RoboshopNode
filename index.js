const {NodeJS, MyMod} = require ('Loader');

NodeJS.autoLoad(['{Server}->http'],['path']);
MyMod.autoLoad( ['Path->./core/Router']);

const server = new NodeJS.Server((req, res) => {

  if(NodeJS.path.extname(req.url))
  {
    MyMod.Path.mimeType(req, res);
  }
  else {
      try {
      
      MyMod.Path.get('/', 'Home->Index', {req, res});
      MyMod.Path.get('/category/@category', 'Category->Index', {req, res});
      MyMod.Path.get('/category/@category/@page', 'Category->Index', {req, res});
      MyMod.Path.get('/item/@name', 'Item->Index', {req, res});
      MyMod.Path.get('/404', 'Path::notFound', {req, res});
      
  }
  catch(e) {console.log(e)}
  }
});

server.listen(8000, ()=>console.info('\x1b[33m%s\x1b[0m', 'Server was started!'));