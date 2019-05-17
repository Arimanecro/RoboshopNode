const {NodeJS, MyMod} = require ('Loader');

NodeJS.autoLoad(['url'], ['fs']);
MyMod.autoLoad(['Mongo->mongodb.MongoClient'],['Builder'],['Path->./core/Router'],
               ['Slider, SpecialItems, LatestItems, FeaturedItems->./shop/Views/homeView']);

module.exports =  class Home
{

    constructor()
    {   
        this.name = this.constructor.name;
        this.query = `find({}, {url:1, title:1, img_small:1, img_medium:1, price:1}).limit(0, 30)`;
        this.html = [MyMod.SpecialItems, MyMod.Slider, MyMod.LatestItems, MyMod.FeaturedItems];
    }

    async Index(args)
    { 
        const name = (this.constructor.name == 'Item') ? true : false;
        const {res} = args;
        if(!args.page) {args.page = 1}

        try {
            const Mongo = await new MyMod.Mongo('mongodb://localhost:27017/local', { useNewUrlParser: true }).connect();
            const db = await Mongo.db('local');
            //db.collection('roboshops').createIndex({ category: 1, url: 1 }, { unique: true });
            await eval(`db.collection('roboshops').${this.query}`).toArray(async (err, docs) => {

            if(!docs.length) { MyMod.Path.redirect(res); return; }
            Mongo.close();

            let page = await new MyMod.Builder(name).HTML(this.html.map(h => h(docs)));

            await res.writeHead(200, { 'Content-Type': 'text/html' });
            await res.end(`${page}`);
            });
        }
        catch(e) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end(`<h1>Server Error</h1>`);
            console.error(e);
        }
    }
}