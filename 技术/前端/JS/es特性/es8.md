## ES8

// Async/Await

// next => Promise


// 异步代码

// 1. 嵌套回掉
// 2. Promise
// 3. Generators

```js
async function fn() {
  await Promise.resolve();
  console.log(1);
}


async function add(num) {
  const a = 1;
  return num +a;
}

console.log(add(2))

```

## promsie 错误处理

## await 的异步执行

## Object.values() vs Object.keys() // 继承来的没有办法

## Object.entries() vs for...in 


# String Padding


1. String.prototype.padStart(targetLength, [padString])
2. String.prototype.padEnd()

# 结尾允许逗号

# Object.getOwnPropertyDescriptors(); // 对象描述符

# SharedArrayBuffer 与 Atomics // 多线程功能

共享内存，把多线程引入js

JS主线程， web-worker线程

// postMessage();

多线程 竞争 Atomics

Atomics.load(SharedArrayBuffer, position)
Atomics.store(SharedArrayBuffer, position, newValue) //写入值
exchange() 返回替换的值
Atomics.wait(arrBuffer, 11, 11，2000) 休眠
Atomics.notify(共享视图数组，位置， 进程数)
Atomics.add(intArrBuffer, index,value)
sub()
and,or,xor
compareExchange(intArrBuffer,12,13,33)


