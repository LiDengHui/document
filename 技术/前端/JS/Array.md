# Array

# new Array() 与 Array.of()

```js
new Array(3) // [undefined,undefined,undefined]

Array.of(3) // [3]
```

# Array.from(arrLike, mapFn)
从一个类型Array对象上产生一个数组,如果有迭代器，优先使用迭代器，没有迭代器使用length属性，都没有数组长度为0， mapFn返回值为新数组

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
                done:  !this[index]
            }
        }

    }
}

console.dir(Array.from(a))// ["张三", "12"]
```


