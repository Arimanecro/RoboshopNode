const path = require('path');

class Loader {
  autoLoad(...modules) {
    let partition = [];
    modules.forEach(v => {
      v.forEach(v1 => {
        partition = v1.split("->");
        let existDestructuring = partition[0].includes('{');
        
        if(!partition[1]) {partition[1] = partition[0]}
        let comma = partition[0].split(",").map(v => v.trim());
        if(partition[1][0] !== '.' )
        {
          if(comma.length > 1){
              comma.forEach(v => this[v] = require(`${partition[1]}`)[v]);
          }
          else { 
          if(existDestructuring) {
            
                partition[0] = Loader.destructuring(partition[0]);
                this[partition[0]] = require(`${partition[1]}`)[partition[0]]
          }
          else {
            if(partition[1].includes('.')){
              let c = partition[1].split('.');
              this[partition[0]] = require(`${c[0]}`)[c[1]];
            }
            else {
              this[partition[0]] = require(`${partition[1]}`);
            }
          }
          }
        }
        else {
          
          let p = path.resolve(partition[1]);
          if(comma.length > 1){
            comma.forEach(v => this[v] = require(`${p}`)[v]);
          }
          else { 
            if(existDestructuring) {
              partition[0] = Loader.destructuring(partition[0]);
              this[partition[0]] = require(`${p}`)[partition[0]]
            }
            else {
              if(p.includes('.')){
                let c = p.split('.');
                this[partition[0]] = require(`${c[0]}`)[c[1]];
              }
              else{
                this[partition[0]] = require(`${p}`);
              }
            }
          }
        }
        
      });
    });
  }

  static destructuring(string)
  {
    let start = Loader.trimByChar(string, '{');
    let end = Loader.trimByChar(start, '}');
    return end; 
  }

  static trimByChar(string, character) { 
    const first = [...string].findIndex(char => char !== character); 
    const last = [...string].reverse().findIndex(char => char !== character); 
    //console.log(string.substring(first, string.length - last));
    return string.substring(first, string.length - last); }
}

module.exports = { NodeJS: new Loader, MyMod: new Loader, Loader: Loader };