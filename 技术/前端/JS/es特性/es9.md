# es9

异步迭代器

Asyncchronous Interator， 异步执行语句 for..await... of
异步生成器 Async generator

特殊对象
next() => {value, done} done 布尔类型


创建一个迭代器

const createIterator = (items) => {
  const keys = Object(items)
  const len = keys.length;
  let pointer = 0;
  return {
    next() {
      const done = pointer>=len;
      const value= !done? items[keys[pointer++]: undefined;
    },
    return { value, done}
  }
}


const it1 = createIterator([1,2,3]);

Symbol.iterator for ...of ...

## 生成器

Generator 特殊函数 yield 表达式

function * fn() {
  console.log("正常函数我会执行")
  yield 1;
  yield 2;
  yield 3;
  console.log(执行完了)
}

console.log(iteratorFn.next());

// 异步迭代器
区别

同步: {value:"", done:false}

异步： next() => promsie()

Promise.finally();

## Rest / Spread


...

## 对象浅拷贝

正则表达式

const  dateStr= “2030-08-01”；

const reg = /[0-9]{4}-[0-9]{4}-[0-9]{2}/

const res = reg.exec(dataStr)

console.dir(res)

ES9 ?<name>

const reg1 = /(?<year>[0-9]{4})-(?<month>[0-9]{4})-(?<dat>[0-9]{2})/

const res1 = reg1.exec(dataStr)

console.dir(res1)

replace 08-01-2030

const newDate = dateStr.replace(reg1, `${month}-${day}-${year}`)

// 反向断言

// 先行断言

const 　 str = 　"$123";

const reg = /\D(?=\d+)/

const result = reg.exec(str);

console.log(result)

## 后行断言 反向断言 (?<=patterm>)

const reg2 = /(?<=\D>\d+)/;
console.log(reg2.exec(str))

## dotAll方式
. 回车符以外的单字符

const str = 'yi\ndeng';

console.log(/yi.deng/,test(str));// false

允许行终止符的出现
console.log(/yi.deng/s,test(str));// false

// 汉字匹配

const oldReg=/[\u4e00-\u9fa5]/; 

const str = ""

const newReg=/\p{Script=Han}/u;

// 非转译序列的模板字符串
\u unicode转译 \x 十六进制转译

String.row('\u{54}')








