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
      MyMod.Path.get('/order', 'Order::Index', {req, res, matchURL});
      MyMod.Path.post('/order', 'Order::Index', {req, res, matchURL});
      MyMod.Path.get('/search/@word', 'Search::Index', {req, res, matchURL});
      MyMod.Path.get('/search/@word/@page', 'Search::Index', {req, res, matchURL});
      MyMod.Path.post('/search/@word', 'Search::Index', {req, res, matchURL});
      MyMod.Path.get('/list-of-orders', 'ListOfOrders->Index', {req, res, matchURL});
      MyMod.Path.delete('/list-of-orders', 'ListOfOrders->Delete', {req, res, matchURL});
      MyMod.Path.get('/404', 'Path::notFound', {req, res, matchURL});

// == Detecting incorrect paths ==
      MyMod.Path.incorrectURL(matchURL.url, res);
  }
  catch(e) {
    (e !== 'stop') ? console.error(e) : null;
  }
  }
});

server.listen(8000, ()=>console.info('\x1b[33m%s\x1b[0m', 'Server was started!'));