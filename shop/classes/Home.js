const {NodeJS, MyMod} = require ('Loader');

NodeJS.autoLoad(['url'], ['fs'],['StringDecoder->string_decoder']);
MyMod.autoLoad(['Mongo->mongodb.MongoClient'],['Builder'],
               ['Slider, SpecialItems, LatestItems, FeaturedItems->./shop/Views/homeView']);

module.exports =  class Home
{

    constructor()
    {   
        this.query = `find({}, {url:1, title:1, img_small:1, img_medium:1, price:1}).limit(0, 30)`;
        this.html = [MyMod.SpecialItems, MyMod.Slider, MyMod.LatestItems, MyMod.FeaturedItems];
    }

    async Index(args)
    { 
        const {res} = args;
        if(!args.page) {args.page = 1}

        try {
            const Mongo = await new MyMod.Mongo('mongodb://localhost:27017/local', { useNewUrlParser: true }).connect();
            const db = await Mongo.db('local');
            //db.collection('roboshops').createIndex({ category: 1, url: 1 }, { unique: true });
            await eval(`db.collection('roboshops').${this.query}`).toArray(async (err, docs) => {
            Mongo.close();

            let page = await new MyMod.Builder().HTML(this.html.map(h => h(docs)));

            await res.writeHead(200, { 'Content-Type': 'text/html' });
            await res.end(`${page}`);
            });
        }
        catch(e) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end(`<h1>Server Error</h1>`);
            console.error(e.toString());
        }
    }
}