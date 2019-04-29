const {NodeJS, MyMod} = require ('Loader');

NodeJS.autoLoad(['url'], ['fs'],['StringDecoder->string_decoder']);
MyMod.autoLoad(['Builder']);


module.exports =  class Home
{
    static async Index(args)
    {
        const page = await new MyMod.Builder('home').HTML();
        await (() => {
            args.res.writeHead(200, { 'Content-Type': 'text/html' });
            args.res.end(`${page}`);
        })()

    }
}