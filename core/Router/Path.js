const {NodeJS, Loader} = require ('Loader');

NodeJS.autoLoad(['http'], ['fs'], ['path']);

function destructuringWrapper(args)
{
    (Array.isArray(args)) && ( [req, res] = args);
    (args.__proto__.constructor.name == 'Object') && ( {...args} );
    return args;
}

module.exports = class Path
{

    static mimeType(req, res)
    {
        //console.log(`MIMETYPE---${req.url}`);
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
        else { } //console.error(`Error: Unexist file --> ${urlFile}`);   
        
    }

    static get(url, method, args=null)
    {
        
        let {req, matchURL} = args;
        if(req.method == 'GET'){
                let match = Path.match(req.url, url);
                if(Object.keys(match).length)
                {console.log(method);
                    //let parseURL = NodeJS.url.parse(url, true);
                    Path.detectTypeOfMethod( method, {...match, ...args});
                    matchURL.url = true;
                    throw 'stop';
                }
            }
    }

    static post(url, method, args=null)
    {
        let {req, res} = args;
        if(req.method == 'POST'){
            req.on('data', function (data) {
                //console.log(data.toString());
                let POST = {};
                data = data.toString();
            data = data.split('&');
            for (var i = 0; i < data.length; i++) {
                var _data = data[i].split("=");
                POST[_data[0]] = _data[1];
            }
            console.log(POST);
                res.writeHead(200, "OK", {'Content-Type': 'application/json'});
                res.end(`${data.toString()}`);
            });
        }

    }

    static notFound(args)
    {
          let {res} = args;
          const src = NodeJS.fs.createReadStream(NodeJS.path.resolve('./shop/Views/tpl/404.html'));
          src.pipe(res);
          throw 'stop';
        //   src.on('error', err => console.error(err))
        //   src.on('end', err => err ? console.error(err) : null);  
    }

    static detectTypeOfMethod(method, args)
    {
        
        let storage = {};
        let staticMethod = method.includes('::');

        let m = staticMethod ? method.split("::") : method.split("->");
        const p =  m[0];// NodeJS.path.resolve(m[0]);
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

    static match(_url, _tpl)
    {
        let url = _url.split('/');
        let tpl = _tpl.split('/');
        let correct = false;

        if(url.length === tpl.length){

            let urls = {};
            tpl.forEach((v,k) => {
                if(v.includes('@')){
                let t = Loader.trimByChar(v, '@');
                urls[t] = url[k];
                }
                else {
                    if(_url == '/' && _tpl == '/') {  
                        urls['/'] = _tpl;
                        correct = true;
                    }
                    else if(v === url[k] && v != ''){
                        urls[v] = url[k];
                        correct = true;
                    }
                    else { 
                        correct = false;
                    }
                }
            }) ;
            return correct ? urls : false;
        }
        else { return false;}
    }

    static redirect(res)
    {
         res.writeHead(301, { "Location": '/404' });
         res.end();
    }

    static incorrectURL(url, res)
    {
        return url ? null : Path.redirect(res);
    }

}