const { MyMod } = require("Loader");

MyMod.autoLoad(
  ["MongoObjectId->mongodb.ObjectId"],
  ["Home"],
  ["listOfOrdersView->./shop/Views/listOfOrdersView"]
);

module.exports = class ListOfOrders extends MyMod.Home {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.collection = "orders";
    this.query = `find({category:args.category}, {url:1, title:1, img_small:1, img_medium:1, price:1, category:1}).skip( args.page > 0 ? ( ( args.page - 1 ) * 16 ) : 0 ).limit( 16 )`;
    this.html = [MyMod.listOfOrdersView];
  }

  async Delete(args) {
    const { id, res } = args;
    try {
      const Mongo = await new MyMod.Mongo("mongodb://localhost:27017/local", {
        useNewUrlParser: true
      }).connect();
      const db = await Mongo.db("local");
      await db
        .collection("orders")
        .deleteOne({ _id: new MyMod.MongoObjectId(id) }, (err, r) => {
          if (err) {
            throw new Error(e);
          }
          this.Index(args);
        });
    } catch (e) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end(`<h1>Server Error</h1>`);
      console.error(e);
    }
  }
};
