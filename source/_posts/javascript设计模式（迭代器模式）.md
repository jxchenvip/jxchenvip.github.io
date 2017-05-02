---
title: javascript设计模式（迭代器模式）
tags: [前端,javascript,javascript设计模式]
categories: 前端
date: 2017-04-27 14:13:47
---

## 迭代器模式

在迭代器模式中，通常有一个包含某种数据集合的对象。该数据可能存储在一个复杂数据结构内部，而要提供一种简单的方法能够访问数据结构中每个元素。对象的消费者并不需要知道如果组织数据，所有需要做的就是取出单个数据进行工作。

在迭代器模式中，对象需要提供一个next()方法。依次调用next()必须返回下一下连续的元素。当然，在特定数据结构中，"下一个"所代码的意思是由您来决定的。

假定对象名为agg, 右要以类似下面这样的一个循环中通过简单调用next()即可访问每个数据元素：

``` js
	var element;
	while (element = agg.next()) {
		// 处理该元素...
		console.log(element);
	}
 
```

<!-- more -->

在迭代器模式中，聚合对象通常全党提供了一个较为方便的hasNext()方法，因此，该对象的用户可以使用该方法来确定是否已经到达了数据的末尾。此外，还有另一种顺序访问所有元素的方法，这次是使用hasNext()， 其用法如下所示：

``` js
	while (agg.hasNext()) {
		// 处理下一个元素...
		console.log(agg.next());
	}

```
当实现迭代器模式时，私下的存储数据和指向下一个可用元素的指针（索引）是很有意义的。为了演示一个实现示例，让我们假定数据只是普通数据，而 “特殊” 的检索下一个连续元素的逻辑为返回每隔一个的数组元素。

```js
	var agg = (function() {
	    var index = 0,
	        data = [1, 2, 3, 4, 5],
	        length = data.length;
	
	    return {
	        next: function() {
	            var element;
	
	            if (!this.hasNext()) {
	                return null;
	            }
	
	            element = data[index];
	            index = index + 2;
	            return element;
	        },
	        hasNext: function() {
	            return index < length;
	        },
	        // 重置指针到初始位置
	        rewind: function() {
	            index = 0;
	        },
	        // 返回当前元素
	        current: function() {
	            return data[index];
	        }
	    }
	}());
	
	// 测试
	// 这个循环记录1， 3， 5
	while (agg.hasNext()) {
	    console.log(agg.next());
	}
	
	// 回退
	agg.rewind();
	console.log(agg.current()); // 1
```

总结：提供一个API来遍历或操纵复杂的自定义数据结构。

\*_以上内容摘自《Javascript 模式》_