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
      let matchURL = {url:false};

// == Paths ==

      MyMod.Path.get('/', 'Home->Index', {req, res, matchURL});
      MyMod.Path.get('/category/@category', 'Category->Index', {req, res, matchURL});
      MyMod.Path.get('/category/@category/@page', 'Category->Index', {req, res, matchURL});
      MyMod.Path.get('/item/@name', 'Item->Index', {req, res, matchURL});
      MyMod.Path.get('/basket', 'Basket::Index', {req, res, matchURL, "class":"Basket"});
      MyMod.Path.get('/wishlist', 'Basket::Index', {req, res, matchURL, "class":"Wishlist"});
      MyMod.Path.get('/404', 'Path::notFound', {req, res, matchURL});

// == Detecting incorrect paths ==
      MyMod.Path.incorrectURL(matchURL.url, res);
  }
  catch(e) {console.error(e)}
  }
});

server.listen(8000, ()=>console.info('\x1b[33m%s\x1b[0m', 'Server was started!'));