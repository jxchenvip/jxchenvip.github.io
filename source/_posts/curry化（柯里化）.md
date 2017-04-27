---
title: curry化（柯里化）
tags: 前端
categories: 前端
---

## Curry化

Curry是一个转化过程，即我们执行函数转化过程。
```js
    // Curry化的add函数
    // 接受部分参数列表
    function add(x, y) {
        var oldx = x, oldy = y;
        if(typeof oldy === "undefined"){ // 部分
            return function(newy){
                return oldx + newy;
            }
        }
        // 完全应用
        return x + y;
    }
    // 测试
    typeof add(5); // 输出"function"
    add(3)(4); // 7
    // 创建并存储一个新函数
    var add2000 = add(2000);
    add2000(10); // 输出2010
```
<!-- more -->

在上面的代码段中，当第一次调用add()时，它为返回的内部函数创建了一个闭包。该闭包将原始的x和y值存储到私有变量oldx和oldy中。第一个私有变量oldx将在内部函数执行的时候使用。如果没有部分应用，并且同时传递x和y值，该函数则继续执行，并简单地将 其相加。这种add()实现与实际需求相比显得比较冗长，在这里只是出于演示的目的才这样实现。下一个代码段中将显示一个更为精简的实现版本，其中并没有oldx和oldy,仅是因为原始x隐式地存储在闭包中，并且还将y作为局部变量重用，而不是像前面的例子那样创建一个新的变量newy:
```js
    // curry化的add()函数
    // 接受部分参数列表
    function add(x, y) {
        if(typeof y === "undefined"){ // 部分
            return function(y){
                return x + y;
            }
        }
        // 部分应用
        return x + y;
    }
```
在这些例子中，函数add()本身负责处理部分应用。但是能够以更通用的方式执行相同的任务吗？也就是说，是否可以将任意的函数转换成一个新的可以接受部分参数的函数？接下来的代码片段展示了一个通用函数的例子，暂且称为schonfinkelize(),该函数执行了函数转换。使用名称schonfinkelize()，一部分原因于在这个单词的发音比较困难，而另一部分原因在于听起来像一个动词（使用"curry"可能会引起歧义），些外也需要一个动词来表示这是一个函数的转换。
    
下面是一个通用curry化函数的示例：
```js
    function schonfinkelize(fn){
        var slice = Array.prototype.slice,
            stored_args = slice.call(arguments, 1);
        return function() {
            var new_args = slice.call(arguments),
                args = stored_args.concat(new_args);
            return fn.apply(null, args);
        }
    }
```
schonfinkelize()函数可能不应该有那么复杂，只有由于Javascript中arguments并不是一个真实的数组。从Array.prototype中借用slice()方法可以帮助我们将arguments变成一个数组，并使用该数组工作更加方便。当schonfinkelize()第一次调用时，它存储了调用该方法后的参数（存入stored\_args中), 该方法仅剥离了第一个参数是将被curry化的函数。然后, schonfinkelize()返回了一个新函数。当这个新函数被调用时，它访问了已经私有存储数stored_args以及slice引用。这个新函数必须将原有的部分应用参数（stored\_args)合并到新参数（new\_args）, 然后再将它们应用到原始函数fn中（也仅在闭包中私有可用)。

现在，已经准备好可将任意函数curry的通用方法，让我们尝试执行以下一些测试：
```js
    // 普通函数
    function add(x, y){
        return x + y;
    }

    function schonfinkelize(fn){
        var slice = Array.prototype.slice,
            stored_args = slice.call(arguments, 1);
        return function() {
            var new_args = slice.call(arguments),
                args = stored_args.concat(new_args);
            return fn.apply(null, args);
        }
    }

    // 将一个函数curry化以获得一个新的函数
    var newadd = schonfinkelize(add, 5);
    newadd(4); // 输出9

    // 中一种选择——直接调用新函数
    schonfinkelize(add, 6)(7); // 输出13
```
转换函数schonfinkelize()并不局限于单个参数或者单步Curry化。下面是一些更多的用法示例：
```js
    // 变通函数
    function add(a, b, c, d, e) {
        return a + b + c + d + e;
    }

    // 可运行于任意数量的参数
    schonfinkelize(add, 1, 2, 3)(5, 5) //  16

    // 两步curry化
    var addOne = schonfinkelize(add, 1);
    addOne(10, 10, 10, 10);

    var addSix = schonfinkelize(addOne, 2, 3);
    addSix(5, 5); // 输出6
```
## 何时使用Curry化
当发现正在调用同一个函数，并且传递的参数绝大多数都是相同的，那么该函数可能是用于Curry化的一个很好的候选参数。可以通过一个函数集合部分应用（partially applyi)到函数中，从而动态创建一个新函数。这个新函数将会保存重复的参数（因此，不必每次都传递这些参数），并且不会使用预填充原始函数所期望的完整参数列表。

_以上内容摘自《Javascript 模式》_