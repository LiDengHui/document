// function* something() {
//   try {
//     var nextVal;
//     while (true) {
//       if (nextVal === undefined) {
//         nextVal = 1;
//       } else {
//         nextVal = (3 * nextVal) + 6;
//       }
//       yield nextVal;
//     }
//   } finally {
//     console.log("cleaning up!")
//   }
// }


// var it = something();
// console.dir(it)
// for (var v of it) {

//   if (v > 500) {
//     console.dir(it.return("hello"))
//     console.log(it.return('Hello World').value)
//   }
// }

// // yield
// function* foo() {
//   console.log("*foo() starting")

//   yield 3;
//   yield 4;

//   console.log("*foo() finished");
//   return 1;
// }

// function* bar() {
//   yield 1;
//   yield 2;
//   console.dir(yield* foo());
//   yield 5;
// }

// var it = bar();

// console.log(it.next().value);
// console.log(it.next().value);
// console.log(it.next().value);
// console.log(it.next().value);
// console.log(it.next().value);
// console.log(it.next().value);

console.log("----", "异常委托");


function* foo() {
  try {
    yield "B";
  } catch (err) {
    console.log("error caught inside *foo():", err)
  }

  yield "C";

  throw "D"
}

function* bar() {
  yield "A";

  try {
    yield* foo();
  } catch (err) {
    console.log("error caught insided *bar():", err);
  }

  yield "E";

  yield* baz();

  yield "G";
}

function* baz() {
  throw "F"
}

var it = bar();

console.log("outside:", it.next().value)
console.log("outside:", it.next().value)

console.log("outside:", it.throw(2).value)

// console.log("outside:", it.next().value)


try {
  // console.log("outside:", it.next().value)

} catch (err) {
  // console.log("error caught outside:", err);

}

// console.log("outside:", it.next().value)
// console.log("outside:", it.next().value)
