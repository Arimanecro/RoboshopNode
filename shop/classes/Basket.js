const {NodeJS, MyMod} = require ('Loader');

NodeJS.autoLoad(['url'], ['fs']);
MyMod.autoLoad(['Builder'], ['BasketView->./shop/Views/basketView']);

module.exports =  class Basket
{
    static async Index(args)
    {
        const {res} = args;
        try{
        let page = await new MyMod.Builder(true).HTML([MyMod.BasketView(args.class)]);

        await res.writeHead(200, { 'Content-Type': 'text/html',
                                   'Content-Length' : Buffer.byteLength(page, 'utf8')
        });
        await res.end(`${page}`); 
        
           
        }
        catch(e) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end(`<h1>Server Error</h1>`);
            console.error(e);
        }
    }
}