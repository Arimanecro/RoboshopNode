const {NodeJS, MyMod} = require ('Loader');

NodeJS.autoLoad(['{Server}->http']);
MyMod.autoLoad( ['Path->./core/Router']);

const server = new NodeJS.Server((req, res) => {

  MyMod.Path.css(req, res);
  MyMod.Path.get('/', 'Home->Index', {req, res});
  MyMod.Path.get('/category/@category', 'Category->Index', {req, res});
  MyMod.Path.get('/category/@category/@page', 'Category->Index', {req, res});
  MyMod.Path.get('/item/@name', 'Item->Index', {req, res});
  
});

//MyMod.Mongo.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err) =>  { if(err) throw new Error(`MongoDB error: ${err}`);console.info('\x1b[36m%s\x1b[0m','MongoDB was started')});

server.listen(8000, ()=>console.info('\x1b[33m%s\x1b[0m', 'Server was started!'));