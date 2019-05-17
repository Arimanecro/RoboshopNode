class test { 
  static go() { return test.prototype.constructor.name; } 
  static show() {console.log(`My name is ${test.go()}`)} }

  class two extends test{
    static go() { return two.prototype.constructor.name; } 
  }

  two.go();



// class test p.split(path.sep) ../shop/items/Home.js
// {
//     static go(arg) { return Number(10) + Number(arg);}

//     ff() { console.log('method ff')}
// }

// function test (arg) { return Number(10) + Number(arg);};
//let new_fn = new Function( "return " + test.go);

//console.log(Reflect.apply(new_fn, undefined, [10]));
//let c  = Reflect.construct(new test())
//let c = test; //static
//let obj = Reflect.get(c, 'go'); //static
//console.log(obj(10));

// let o = {test};
// let n = new o['test']
// console.log(n.ff());
