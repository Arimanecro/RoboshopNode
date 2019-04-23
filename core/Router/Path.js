//const {NodeJS} = require ('../Loader');

//NodeJS.autoLoad(['{StringDecoder}->string_decoder'],['http']);
const path = require('path');

module.exports = class Path
{
    //static http = {'req': http.request, 'res': http.response}
    static get(url, method, args=[])
    {
        let storage = {};
        let staticMethod = method.includes('::');

        let m = staticMethod ? method.split("::") : method.split("->");
        const p = path.resolve(m[0]);
        const mod = require(`${p}.js`);

        if(staticMethod) {
           Reflect.get(mod, `${m[1]}`)(args ? args : null); 
        }
        else {
            storage[m[0]] = mod;
            let obj = new storage[m[0]]
            obj[m[1]](args ? args : null);
        }


            // if(req.url == url && req.method == 'GET')
            // {
            //     console.log(NodeJS.http.request());
            //     //let parseURL = NodeJS.url.parse(url, true);
            //     res.writeHead(200, { 'Content-Type': 'text/html' });
            //     const decoder = new NodeJS.StringDecoder('utf-8');
            //     let buffer = '';
            //     req.on('data', () => buffer+=decoder.write(data));
            //     req.on('end', () => buffer+=decoder.end());
            //     res.end(`<h1>NODE JS -- ${buffer}</h1>`);
            //     //res.writeHead({'Content-type': 'text/html'})
            //     //res.write(await includeFile('index.html'));
            //     //res.end();
            // } 
    }

    static match(url, tpl)
    {

    }
}