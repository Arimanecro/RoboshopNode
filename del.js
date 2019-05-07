chunk = (arr, size) =>
arr.reduce(
  (chunks, el, i) =>
    (i % size ? chunks[chunks.length - 1].push(el) : chunks.push([el])) &&
    chunks,
  []
);

let a = [{name:'ariman', age:34}, {name:'baal', age:35}, {name:'lucifer', age:36}]
let b = chunk(a, 2)
//console.log(b)
console.log(b.map(v => v.map(v1 => `${v1['name']}`)));

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
