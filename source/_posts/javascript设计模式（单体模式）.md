---
title: javascript设计模式（单体模式）
tags: [前端,javascript,javascript设计模式]
categories: 前端
date: 2017-04-25 11:38:47
---

## 单体模式

单体(Singleton)模式的思想在于保证一个特定类仅有一个实例。这意味着当您第二次使用同一个类创建新对象的时候，应该得到与第一次所创建对象完全相同对象。

> 特点：一个特定类仅有一个实例

### 简单的单体
``` js
	var obj = {
		myprop: "my value"
	};
```
<!--more-->

### 使用new操作符

预期行为：
``` js
	var uni = new Universe();
	var uni2 = new Universe();
	uni === uni2; // 结果为true
```

上面例子中，uni对象在第一次调用构造函数时候被创建。在第N次（N>1）次创建时将会返回同一个uni对象。这就是为什么uni === uni2, 因为他们本质上是指向同一个对象的两个引用。

#### 静态属性实现的实例
``` js
	function Universe() {

		// 我们有一个现有的实例吗？
		if(typeof Universe.instance === "object"){
			return Universe.instance;
		}

		// 正常进行
		this.start_time = 0;
		this.bang = "Big";
	
		// 缓存
		Universe.instance = this;

		// 隐式返回
		return this;
	}
	
	// 测试
	var uni = new Universe();
	var uni2 = new Universe();
	uni === uni2; // 结果为true
```
> 缺点: Universe.instance属性是公开的，有被修改的可能性

#### 闭包实现的实例
``` js
	function Universe() {
		// 缓存实例
		var instance = this;
		
		// 正常进行
		this.start_time = 0;
		this.bang = "Big";

		// 重写该构造函数
		Universe = function() {
			return instance;
		}
	}
	
	// 测试
	var uni = new Universe();
	var uni2 = new Universe();
	uni === uni2; // 结果为true
```
> 缺点：重写构造函数，会丢失所有在初始定义和重定义时候添加到它里面的属性。
``` js
	// 向原型添加属性
	Universe.prototype.nothing = true;
	
	var uni = new Universe();

	// 在创建初始化对象之后
	// 再次向该 原型添加属性
	Universe.prototype.everything = true;

	var uni2 = new Universe();

	// 仅有最初的原型
	// 链接到对象上

	uni.nothing; // 结果为true
	uni2.nothing; // 结果为true

	uni.everything; // 结果为undefined
	uni2.everything; // 结果为undefined

	// 结果看上去是正确的：
	uni.constructor.name; // 结果为Universe

	// 但这是很奇怪的
	uni.constructor === Universe; // 结果为false
```
之所以uni.constructor不再与Universe()构造函数相同，是因为uni.constructor仍然指向了原始的构造函数，而不是重新定义的那个构造函数。
``` js
	function Universe() {
	
		// 缓存实例
		var instance;
	
		// 重写构造函数
		Universe = function Universe() {
			return instance;
		}

		// 保留原型属性
		Universe.prototype = this;

		// 实例
		instance = new Universe();

		// 重置构造函数指针
		instance.constructor = Universe;

		// 所有功能
		instance.start_time = 0;
		instance.bang = "Big";

		return instance;
	}

	Universe.prototype.nothing = true; // 结果为true
	var uni = new Universe();
	Universe.prototype.everying = true; // 结果为true
	var uni2 = new Universe();

	uni === uni2;// 结果为true
	
	uni.nothing && uni.everying && uni2.nothing && uni2.everying; // 结果为true

	// 正常属性起作用
	uni.bang; // 结果为"Big"
	// 该构造函数指向正确
	uni.constructor === Universe; // 结果为true
```
另一种解决方案也是将构造函数和实例包装在即时函数中。在第一次调用函数时，它会创建一个对象，并且使得私有instance指向该对象。从第二次调用之后，该构造函数仅返回该私有变量。通过这个新的实现方式，前面所有代码片段的测试也都会按照预期运行。
``` js
	var Universe;

	(function() {

		var instance;
		
		Universe = function Universe() {
			
			if(instance){
				return instance;
			}

			instance = this;

			this.start_time = 0;

			this.bang = "Big";
		};

	})();
```

总结：针对一个“类”仅创建一个对象。如果您想以构造函数的方法替换类的思想并且还保持类似java的语法，我们则为您考虑了多种方法。另外，从技术上来说，javascript中所有的对象都是单体。然后有时候程序开发员也会说“单体”，他们的本意是指以模块模式创建的对象。

\*_以上内容摘自《Javascript 模式》_