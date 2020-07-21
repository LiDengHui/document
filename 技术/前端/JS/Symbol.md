# Symbol

## Symbol.species
用于控制生成新实例时，类的内置方法使用哪个构造器

## Symbol.iterator
用于生成对象的迭代器
```js
var a = {
    1: "张三",
    2: "12"
}
a[Symbol.iterator] = function() {
    index = 0;
    return {
        next: ()=>{
            index++;
            return {
                value: this[index],
                done: !this[index]
            }
        }

    }
}

for (var i of a) {
    console.log(i)
    //张三
    //12
}

```

## Symbol.toPrimitive
在做类型转换时，将对象转为原生类型值

```js
var arr = [1, 2, 3, 4]

console.log(arr + 10)
// 1,2,3,410

arr[Symbol.toPrimitive] = function(hint) {
    if (hint === "default" || hint === "number") {
        return this.reduce((acc,curr)=>acc + curr, 0)
    }
}
console.log(arr + 10)
//20

```

## Symbool