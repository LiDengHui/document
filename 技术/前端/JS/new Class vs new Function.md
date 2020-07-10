# new Class vs new Function

## 编译前

```js
function a () {
  console.dir("Funciton a")
}

class A {
  constructor() {
    console.dir('class A')
  }
}

new a();

new A();
```

## 编译后

```js es5
"use strict";

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function a() {
  console.dir("Funciton a");
}

var A = function A() {
  _classCallCheck(this, A);

  console.dir("class A");
};

new a();
new A();

```

## _classCallCheck

1. 作用: 防止`Class A`被当成函数调用`A()`;


## Symbol.hasInstance 

1. 作用: 用户可以用来自定义`instaceof`, 判断对象是不是构造器的实例。

2.  兼容性 IE不支持

3. 实现`instanceof`

example:

```js
class MyArray {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}

console.dir([] instanceof MyArray); // true;
```

