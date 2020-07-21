const STATE = {
    PENDING: 'PENDING', // 等待态
    FULFILLED: 'FULFILLED', // 执行态
    REJECTED: 'REJECTED', // 拒绝态
}

function promiseResolveProcedure(promise2, x, resolve, reject) {
    // 处理promise
    if (promise2 === x) {
        throw new Error('TypeError: promise cycle')
    }
    if (x instanceof MyPromise) {
        if (x.state === STATE.PENDING) {
            x.then((y) => {
                promiseResolveProcedure(promise2, y, resolve, reject)
            }, reject)
        } else {
            x.state === STATE.FULFILLED && resolve(x.value)
            x.state === STATE.REJECTED && reject(x.value)
        }
    } else if (
        (typeof x === 'object' || typeof x === 'function') &&
        x !== null &&
        typeof x.then === 'function'
    ) {
        x.then((y) => {
            promiseResolveProcedure(promise2, y, resolve, reject)
        }, reject)
    } else {
        resolve(x)
    }
}
class MyPromise {
    static all(promiseArray) {
        return new MyPromise((resolve, reject) => {
            const resultArray = []
            let successTimes = 0
            function processResult(data, index) {
                resultArray.push(data)
                successTimes++
                if (successTimes === promiseArray.length) {
                    resolve(resultArray)
                }
            }
            promiseArray.forEach((item, index) => {
                item.then((e) => {
                    processResult(e, index)
                })
            })
        })
    }
    constructor(fn) {
        this.resolveCallbacks = []
        this.rejectCallbacks = []
        this.value = undefined
        this.state = STATE.PENDING

        const resolve = (val) => {
            //执行所有的then方法
            if (
                (typeof val === 'object' || typeof val === 'function') &&
                typeof val.then === 'function'
            ) {
                promiseResolveProcedure(this, val, resolve, reject)
                return
            }
            setTimeout(() => {
                if (this.state === STATE.PENDING) {
                    this.value = val
                    this.state = STATE.FULFILLED
                    this.resolveCallbacks.map((fn) => fn(this.value))
                }
            })
        }

        const reject = (val) => {
            if (
                (typeof val === 'object' || typeof val === 'function') &&
                typeof val.then === 'function'
            ) {
                promiseResolveProcedure(this, val, resolve, reject)
                return
            }
            setTimeout(() => {
                if (this.state === STATE.PENDING) {
                    this.value = val
                    this.state = STATE.REJECTED
                    this.rejectCallbacks.map((fn) => fn(this.value))
                }
            })
        }
        try {
            fn(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    then(onFulfilled = (val) => val, onRejected) {
        let promise2
        if (this.state === STATE.FULFILLED) {
            promise2 = new MyPromise((resolve, reject) => {
                const x = onFulfilled(this.value)
                promiseResolveProcedure(promise2, x, resolve, reject)
            })
        }

        if (this.state === STATE.REJECTED) {
            promise2 = new MyPromise((resolve, reject) => {
                const x = onRejected(this.value)
                promiseResolveProcedure(promise2, x, resolve, reject)
            })
        }

        if (this.state === STATE.PENDING) {
            promise2 = new MyPromise((resolve, reject) => {
                this.resolveCallbacks.push(() => {
                    const x = onFulfilled(this.value)
                    promiseResolveProcedure(promise2, x, resolve, reject)
                })

                this.rejectCallbacks.push(() => {
                    if (onRejected) {
                        const x = onRejected(this.value)
                        promiseResolveProcedure(promise2, x, resolve, reject)
                    } else {
                        reject(this.value)
                    }
                })
            })
        }

        return promise2
    }

    catch(onRejected) {
        const promise2 = new MyPromise((resolve, reject) => {
            this.rejectCallbacks.push(() => {
                const x = onRejected(this.value)
                promiseResolveProcedure(promise2, x, resolve, reject)
            })
        })
        return promise2
    }

    finally(onResolved) {
        return new MyPromise((resolve, reject) => {
            onResolved()
            if (this.state === STATE.REJECTED) {
                reject(this.value)
            }
        })
    }
}
// 步骤一 异步resolve
// new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('step1')
//     }, 500)
// }).then((data) => {
//     console.log('获取到数据：', data)
// })

// 步骤二 同步resolve
// new MyPromise((resolve, reject) => {
//     resolve('step1')
// }).then((data) => {
//     console.log('获取到数据：', data)
// })

// 步骤三 resolve只调用一次
// new MyPromise((resolve, reject) => {
//     resolve('step1')
//     resolve('step2')
// }).then((data) => {
//     console.log('获取到数据：', data)
// })

// 步骤四 链式调用
// new MyPromise((resolve, reject) => {
//     resolve('step4')
// })
//     .then((data) => {
//         console.log('获取到数据：', data)
//         return 'step4.1'
//     })
//     .then((data) => {
//         console.log('获取到数据：', data)
//     })

// 步骤五 支持空then
new MyPromise((resolve, reject) => {
    reject('step5')
})
    .then()
    // .then((data) => {
    //     console.log('获取到数据：', data)
    //     return 123
    // })
    // .catch((err) => {
    //     console.log('catch', err)
    // })
    .finally((res) => {
        console.log('finally', res)
    })
    .then(
        (res) => {
            console.log('finaly-then', res)
        },
        (res) => {
            console.log(res)
        }
    )

// 步骤六 支持thenable
// new MyPromise((resolve, reject) => {
//     resolve('step6')
// })
//     .then((data) => {
//         console.log('获取到数据：', data)
//         return 'step6.1'
//     })
//     .then((data) => {
//         console.log('获取到数据', data)

//         return {
//             then(resolve, reject) {
//                 resolve({
//                     then(resolve, reject) {
//                         resolve('step6.2')
//                     },
//                 })
//             },
//         }
//     })
//     .then((data) => {
//         console.log('获取到数据：', data)
//     })

// 步骤七 then支持promise
// new MyPromise((resolve, reject) => {
//     resolve('step7')
// })
//     .then((data) => {
//         console.log('获取到数据：', data)
//         return 'step7.1'
//     })
//     .then((data) => {
//         console.log('获取到数据：', data)
//         return new MyPromise((resolve, reject) => {
//             resolve('step7.2')
//         })
//     })
//     .then((data) => {
//         console.log('获取到数据：', data)
//     })

// 步骤八 resolve支持Promise
// new MyPromise((resolve, reject) => {
//     resolve(
//         new MyPromise((resolve, reject) => {
//             resolve('step8')
//         })
//     )
// }).then((data) => {
//     console.log('获取到数据：', data)
// })

//步骤九 循环引用
// const promise = new MyPromise((resolve, reject) => {
//     resolve('step9')
// })

// const promise1 = promise
//     .then((e) => {
//         console.log(e)
//         return promise1
//     })
//     .then((e) => {
//         console.dir(e)
//     })

// 步骤十 Promise.all
// MyPromise.all([
//     new MyPromise((resolve) => resolve('step1')),
//     new MyPromise((resolve) => resolve('step2')),
// ]).then((res) => {
//     console.log('all get', res)
// })

// 步骤十一 Promise.reject
// const promise = new MyPromise((resolve, reject) => {
//     throw new Error('resolve error')
//     reject('err')
// })
//     .then(
//         (res) => {},
//         (err) => {
//             console.log('then reject', err)
//             return err
//         }
//     )
//     .then((res) => {
//         console.log(res)
//         return res
//     })

// 步骤十二 promise已存在的
// const promise = new Promise((resolve) => {
//     resolve('step12')
// })

// setTimeout((res) => {
//     promise.then((res) => {
//         console.log(res)
//     })

//     promise.then((res) => {
//         console.log(res)
//     })
// })

// 步骤十三 promise循环等待
// const promise = new MyPromise((resolve) => {
//     resolve('step12')
// })
// const promise1 = promise
//     .then((res) => {
//         return promise1
//     })

// 步骤十五 catch
// const promise = new MyPromise((resolve, reject) => {
//     // throw new Error('resolve error')
//     reject('err')
// }).then((res) => {
//     console.log(res)
// })
// .finally((res) => {
//     console.log('finally', res)
// })
// .then(
//     (res) => {
//         console.log('finally-then', res)
//     },
//     (res) => {
//         console.log(res)
//     }
// )
