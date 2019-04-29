const {NodeJS} = require ('Loader');

NodeJS.autoLoad(['http'], ['url'], ['fs'], ['path']);

module.exports = class Path
{
    static css(req, res)
    {
        const urlFile = NodeJS.path.resolve( 'public/' + req.url);
        const allowedImg = ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg']

        let match = false;
        let contentType = '';
        let img = '';

        if(NodeJS.path.extname(req.url) == '.css')
        {
            contentType = 'text/css';
            match = true;
        }
        else if(NodeJS.path.extname(req.url) == '.js')
        {
            contentType = 'text/javascript';
            match = true;
        }
        else if(allowedImg.indexOf(NodeJS.path.extname(req.url)) != -1){
            img =  NodeJS.path.extname(req.url).slice(1);
            if(img == 'svg') {img = 'svg+xml';}
            contentType = `image/${img}`;
            match = true;
        }

        if(match && NodeJS.fs.existsSync(urlFile))
        {
            const src = NodeJS.fs.createReadStream(urlFile);
            let stat = NodeJS.fs.statSync(urlFile);

            res.writeHead(200, {'Content-Type': `${contentType}`, 
                                'Content-Length' : `${stat.size}`,
                                });
            src.pipe(res);

            src.on('error', err => console.error(err))
            src.on('end', err => err ? console.error(err) : null);
        }
        else{
           //console.error(`Error: Unexist file --> ${urlFile}`); 
        }
    }

    static get(url, method, args=null)
    {
        const {req, res} = args;

        if(req.url == url && req.method == 'GET'){
            let parseURL = NodeJS.url.parse(url, true);
            Path.detectTypeOfMethod(parseURL, method, args);
        }
    }

    static detectTypeOfMethod(url, method, args)
    {
        let storage = {};
        let staticMethod = method.includes('::');

        let m = staticMethod ? method.split("::") : method.split("->");
        const p =  NodeJS.path.resolve(m[0]);
        const mod = require(`${p}.js`);

        if(staticMethod) {
           Reflect.get(mod, `${m[1]}`)(args ? args : null); 
        }
        else {
            storage[m[0]] = mod;
            let obj = new storage[m[0]]
            obj[m[1]](args ? args : null);
        }
    }

    static match(url, tpl)
    {

    }
}