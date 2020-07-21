# Map and WeekMap and 对象

## 区别
1. Map可以接受任意类型的值为键，Object只支持字符串，weekMap只支持对象

2. 垃圾回收Map不会自动GC(垃圾回收)，除非手动删除，或清空Map对象，WeekMap的键，当时最后一个引用的时候会自动回收