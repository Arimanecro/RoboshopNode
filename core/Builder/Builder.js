const {NodeJS} = require ('Loader');

NodeJS.autoLoad(['fsPromises->fs.promises'], ['path']);

class Builder
{
    constructor(index, header, footer)
    {
        this.page = '';
        this.index =  NodeJS.path.resolve(`./core/Views/${index}.html`);
        this.header = header ? header : NodeJS.path.resolve("./core/Views/tpl/header.html");
        this.footer = footer ? footer : NodeJS.path.resolve("./core/Views/tpl/footer.html");  
    }

    HTML()
    {
        return Promise.all([
            NodeJS.fsPromises.readFile(this.header),
            NodeJS.fsPromises.readFile(this.index),
            NodeJS.fsPromises.readFile(this.footer),
        ])
        .then(files => files.map( f => f.toString('utf-8')))
        .then(files => files.join(''))
        .catch(e => console.error(e.toString))
    }
}

module.exports = Builder;