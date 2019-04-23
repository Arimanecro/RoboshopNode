
const {NodeJS, MyMod} = require ('./core/Loader');

NodeJS.autoLoad(['{Server}->http']);
MyMod.autoLoad(['Path->./core/Router']);

const server = new NodeJS.Server((req, res) => {

  MyMod.Path.get('/', 'shop/items/Home::Index', [1,2,3]); // {req, res} || []
  
});

server.listen(8000, ()=>console.info('\x1b[36m%s\x1b[0m', 'Server was started!'));