---
title: javascript设计模式（工厂模式）
tags: [前端,javascript,javascript设计模式]
categories: 前端
date: 2017-04-26 13:38:47
---

## 工厂模式

设计工厂模式的目的是为了创建对象。它通常在类或者类的静态方法中实现，具有下列目标：

* 当创建相似对象时执行重复操作。
* 在编译时不知道具体类型（类）的情况下，为工厂客户提供一种创建对象的接口

先看一个实现示例：

* 公共父构造函数CarMaker
* 一个名为factory()的CarMaker的静态方法，对象。
* 从CarMaker继承的专门构造函数CarMaker.Compact、CarMaker.SUV 和CarMaker.Convertible。所有这些构造函数都被定义为父类的静态属性，以便保证全局命名空间免爱污染，因此我们也知道了当需要这些构造函数的时候可以在哪里找到它们。


``` js 
	var corolla  = CarMaker.factory('Compact');
	var solstice = CarMaker.factory('Convertible');
	var Cherokee = CarMaker.factory('SUV');

	corolla.drive();  // 结果为"Vroom, I have 4 doors"
	solstice.drive(); // 结果为"Vroom, I have 2 doors"
	Cherokee.drive(); // 结果为"Vroom, I have 17 doors"

```

<!--more-->

其中，这一部分：
``` js
	var corolla  = CarMaker.factory('Compact'); 
```

可能是工厂模式中最易辨别的部分。现在看到的工厂方法接受在运行时以字符串形式指定的类型，然后创建并返回所有请求类型的对象。代码中看不到任何具有new或对象字面量的构造函数，其中仅有一个函数根据字符串所指定类型来创建对象。


下面是工厂模式的实现示例，这将会使得前面的代码片段正常运行：

``` js 
	// 父构造函数
	function CarMaker() {}
	
	// a method of the parent
	CarMaker.prototype.drive = function() {
	    return "Vroom, I have " + this.doors + " doors";
	}
	
	// 静态工厂方法
	CarMaker.factory = function(type) {
	    var constr = type,
	        newcar;
	
	    // 如果构造函数不存在，则发生错误
	    if (typeof CarMaker[constr] !== "function") {
	        throw {
	            name: "Error",
	            message: constr + " doesn't exits"
	        }
	    }
	
	    // 在这里，构造函数是已知存在的
	    // 我们使得原型继承父类，但仅继承一次
	    if (typeof CarMaker[constr].prototype.drive !== "function") {
	        CarMaker[constr].prototype = new CarMaker();
	    }
	
	    // 创建一个新的实例
	    newcar = new CarMaker[constr]();

	    // 可选择的调用一些方法然后返回...
	    return newcar;
	}
	
	// 定义特定的汽车制造商
	CarMaker.Compact = function() {
	    this.doors = 4;
	}
	
	CarMaker.Convertible = function() {
	    this.doors = 2;
	}
	
	CarMaker.SUV = function() {
	    this.doors = 17;
	}
	
	var corolla = CarMaker.factory('Compact');
	var solstice = CarMaker.factory('Convertible');
	var Cherokee = CarMaker.factory('SUV');
	corolla.drive(); // 结果为"Vroom, I have 4 doors"
	solstice.drive(); // 结果为"Vroom, I have 2 doors"
	Cherokee.drive(); // 结果为"Vroom, I have 17 doors"

```

实现该工厂模式时并没有特别的困难。所有需要做的就是寻找能够创建所需类型对象的构造函数。在这种情况下，简洁的命名习惯可用于将对象类型映射到创建该对象的构造函数中。继承部分仅是可以放进工厂方法的一个公用重复代码片段的范例，而不是对每种类型的构造函数的重复。

## 内置对象工厂
```js
	var o = new Object(),
		n = new Object(1),
		s = Object('1'),
		b = Object(true);

	// test
	o.constructor === Object;  // 结果为true
	n.constructor === Number;  // 结果为true
	s.constructor === String;  // 结果为true
	b.constructor === Boolean; // 结果为true
```
Object()也是一个实际用途不大的工厂，值得将它作为例子面提及的原因在于它是我们身边常见的工厂模式。

\*_以上内容摘自《Javascript 模式》_