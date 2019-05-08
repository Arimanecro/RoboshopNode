const {MyMod} = require ('Loader');

MyMod.autoLoad(['Home'],['{Item}->./shop/Views/itemView']);

module.exports = class Item extends MyMod.Home
{
    constructor()
    {
        super();
        this.query = `find({url:args.name},{url:1, title:1, img_small:1, img_original:1, price:1, category:1, description:1}).limit(1)`
        this.html = [MyMod.Item];
    }
}