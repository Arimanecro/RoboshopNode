const {NodeJS, MyMod} = require ('Loader');

NodeJS.autoLoad(['{Server}->http']);
MyMod.autoLoad(['Mongo->mongodb.MongoClient'],['Path->./core/Router']);

const server = new NodeJS.Server((req, res) => {

  MyMod.Path.css(req, res);
  MyMod.Path.get('/', 'shop/items/Home::Index', {req, res}); // {req, res} || []
  
});

MyMod.Mongo.connect('mongodb://localhost:27017/local', { useNewUrlParser: true }, (err) =>  { if(err) throw new Error(`MongoDB error: ${err}`);console.info('\x1b[36m%s\x1b[0m','MongoDB was started')});

server.listen(8000, ()=>console.info('\x1b[33m%s\x1b[0m', 'Server was started!'));