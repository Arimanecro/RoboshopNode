const { NodeJS, MyMod } = require("Loader");

NodeJS.autoLoad(["url"], ["fs"]);
MyMod.autoLoad(
  ["Mongo->mongodb.MongoClient"],
  ["Builder"],
  ["Path->./core/Router"],
  ["Slider, SpecialItems, LatestItems, FeaturedItems->./shop/Views/homeView"]
);

module.exports = class Home {
  constructor() {
    this.name = this.constructor.name;
    this.collection = "roboshop";
    this.query = `find({}).project({id:1, url:1, title:1, img_small:1, img_medium:1, price:1}).limit(0, 30)`;
    this.html = [
      MyMod.SpecialItems,
      MyMod.Slider,
      MyMod.LatestItems,
      MyMod.FeaturedItems
    ];
  }

  async Index(args) {
    const name =
      this.constructor.name == "Item" || this.constructor.name == "ListOfOrders"
        ? true
        : false;
    const { res, req } = args;
    if (!args.page) {
      args.page = 1;
    }
    try {
      const Mongo = await new MyMod.Mongo("********", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).connect();
      const db = await Mongo.db("dev");
      //await db.collection('roboshops').createIndex( { title: "text" } );
      //db.collection('roboshops').createIndex({ category: 1, url: 1 }, { unique: true });
      await eval(`db.collection('${this.collection}').${this.query}`).toArray(
        async (err, docs) => {
          if (!docs.length) {
            MyMod.Path.redirect(res);
            return;
          }
          Mongo.close();

          let page = await new MyMod.Builder(name).HTML(
            this.html.map(h => h(docs))
          );

          if (req.method == "HEAD") {
            await res.writeHead(200, {
              "Content-Type": "text/html",
              "Content-Length": Buffer.byteLength(page, "utf8")
            });
            await res.end();
            return;
          }
          await res.writeHead(200, {
            "Content-Type": "text/html",
            "Content-Length": Buffer.byteLength(page, "utf8")
          });
          await res.end(`${page}`);
        }
      );
    } catch (e) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end(`<h1>Server Error</h1>`);
      console.error(e);
    }
  }
};
