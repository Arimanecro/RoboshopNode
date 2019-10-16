const { MyMod } = require("Loader");

MyMod.autoLoad(["Home"], ["{Category}->./shop/Views/categoryView"]);

module.exports = class Category extends MyMod.Home {
  constructor() {
    super();
    this.query = `find({category:args.category}).project({id:1, url:1, title:1, img_small:1, img_medium:1, price:1, category:1}).sort( { title: -1 } ).skip( args.page > 0 ? ( ( args.page - 1 ) * 16 ) : 0 ).limit( 16 )`;
    this.html = [MyMod.Category];
  }
};
