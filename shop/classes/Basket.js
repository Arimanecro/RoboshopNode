const {NodeJS, MyMod} = require ('Loader');

NodeJS.autoLoad(['url'], ['fs']);
MyMod.autoLoad(['Builder'], ['BasketView->./shop/Views/basketView']);

module.exports =  class Basket
{
    static Index(args)
    {
        const {res} = args;
        try{
        let page = new MyMod.Builder(true).HTML([MyMod.BasketView(args.class)]);
        page.then(p => {
           res.writeHead(200, { 'Content-Type': 'text/html' });
           res.end(`${p}`); 
        })
           
        }
        catch(e) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end(`<h1>Server Error</h1>`);
            console.error(e);
        }
    }
}