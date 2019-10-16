const { NodeJS, MyMod } = require("Loader");

NodeJS.autoLoad(["url"], ["fs"]);
MyMod.autoLoad(
  ["Builder"],
  ["Mongo->mongodb.MongoClient"],
  ["{searchView}->./shop/Views/searchView"]
);

module.exports = class Search {
  static async Index(args) {
    const { res, word } = args;
    try {
      const Mongo = await new MyMod.Mongo("*******", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).connect();
      const db = await Mongo.db("dev");
      const count = await db
        .collection("roboshop")
        .find({ $text: { $search: word } })
        .count();
      await db
        .collection("roboshop")
        .find({ $text: { $search: word } })
        .skip(args.page > 0 ? (args.page - 1) * 16 : 0)
        .limit(16)
        .toArray(async (err, docs) => {
          Mongo.close();
          docs.word = word;
          docs.count = count;
          let page = await new MyMod.Builder().HTML([MyMod.searchView(docs)]);
          await res.writeHead(200, {
            "Content-Type": "text/html",
            "Content-Length": Buffer.byteLength(page, "utf8")
          });
          await res.end(`${page}`);
        });
    } catch (e) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end(`<h1>Server Error</h1>`);
      console.error(e);
    }
  }
};
