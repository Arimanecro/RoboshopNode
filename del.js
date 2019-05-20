

class fff {
  static test()
{
  console.log(fff.kkk)
}

static lala()
{
  fff.kkk = 888;
  fff.test();
}
}


fff.lala();

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
