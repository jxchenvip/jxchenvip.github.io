---
title: javascript设计模式（外观模式）
tags: [前端,javascript,javascript设计模式]
categories: 前端
date: 2017-04-30 15:10:47
---

## 外观模式

外观（facade）模式是一种简单的模式，它为对象提供了一个可选择的接口。这是一种非常好的设计实践，可保持方法的简洁性并且不会使他们处理过多的工作。如果原来有许多接受多个参数的uber方法，相比而言，按照本实现方法，最终将会创建更多数量的方法。有时候，两个更多的方法可能普遍的被一起调用。在这样的情况下，创建另一个方法以包装重复的方法调用是非常有意义的。

例如，当处理浏览器事件时，您有以下方法：


``` js 
	stopPropagation();

```




中止事件以避免其冒泡上升到父节点。





``` js
	preventDefault();
```

<!-- more -->

阻止浏览器执行默认动作（例如，阻止下面的链接或提交表单）。

以上是两个单独的方法且各自具有不同的目标，它们之间应保持互相独立，但在同一时间，它们经常被一起调用。为此，并不需要在程序中到处复制这两个方法调用，可以创建一个外观方法从而同时调用这两个方法：


```js
	var myevent = {
		//...
		stop: function(e) {
			e.preventDefault();
			e.stopPropagation();
		}
		//...
	};

```

外观模式也非常适合于浏览器脚本处理，据此可将浏览器之间的差异隐藏在外观之后。继续返回到前面的例子，可以添加代码来处理在IE事件API中的差异。

```js
	var myevent = {
		//...
		stop: function() {
			// 其他
			if(typeof e.preventDefault === "function") {
				e.preventDefault();
			}
		
			if(typeof e.stopPropagation === "function") {
				e.stopPropagation();
			}
		
			// IE 浏览器
			if(typeof e.returnValue === "boolean") {
				e.returnValue = false;
			}
		
			if(typeof e.cancelBubble === "boolean") {
				e.cancelBubble = true;
			}
		}
		//...
	};

```

外观模式对于重新设计和重构的工作也很有帮助。当需要替换一个具有不同实现的对象时，不得不花费一段时间对它重新进行修改（这是一个复杂的对象），而且同时还要编写使用该对象的新代码。通过使用外观模式，可以首先考虑新对象的API,然后继续在原有对象的前面创建一个外观。这样，当您着手完全取代原有对象的时候，仅需要修改更少的客户端代码，这是由于任何最新的客户端代码都已经使用了这个新API。


总结：通过把常用方法包装到一个新方法中，从而提供一个更为便利的API。

\*_以上内容摘自《Javascript 模式》_