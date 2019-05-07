const {NodeJS} = require ('Loader');

NodeJS.autoLoad(['fsPromises->fs.promises'], ['fs'], ['path']);

class Builder
{
    constructor(header, footer)
    {
        //this.page = '';
        //this.index =  NodeJS.path.resolve(`./core/Views/${index}.html`);
        this.header = header ? header : NodeJS.path.resolve("./shop/Views/tpl/header.html");
        this.footer = footer ? footer : NodeJS.path.resolve("./shop/Views/tpl/footer.html");  
    }

    HTML(html)
    {
        //let path = NodeJS.path.resolve(`./core/shop/items/test.html`);

        let htmlTorrent = '';
        html.map(el => htmlTorrent += el);

        return Promise.all([
            NodeJS.fsPromises.readFile(this.header),
            htmlTorrent,
            //NodeJS.fsPromises.readFile(this.index),
            NodeJS.fsPromises.readFile(this.footer),
        ])
        .then(files => files.map( f => f.toString('utf-8')))
        .then(files => files.join(''))
        .catch(e => console.error(e.toString()))
    }
}

module.exports = Builder;