---
title: javascript设计模式（装饰者模式）
tags: [前端,javascript,javascript设计模式]
categories: 前端
date: 2017-04-28 15:10:47
---

## 装饰者模式

在装饰者模式中，可以在运行时动态添加附加功能到对象中。

装饰者模式的一个比较方便的特征在于其预期行为的可定制和可配置特性。可以从仅具有一些功能的普通对象开始，然后从可用装饰资源池中选择需要用于增强普通对象的那些功能，并且按照顺序进行装饰，尤其是当装饰顺序很重要的时候。

### 用法

假设正在开发一个销售商品的Web应用，每一笔新销售都是一个新的sale对象。该sale对象 “知道” 有关项目的价格，并且可以通过调用sale.getPrice()方法返回其价格。根据不同的情况，可以用额外的功能装饰这个对象。试想这样一个场景，销售客户在加拿大的魁北克省。在这种情况下，买方需要支付联邦税和魁北克省税。遵循这种装饰者模式，您会说需要使用联邦税装饰者和魁北克税装饰者来 “装饰” 这个对象。然后，可以用价格格式化功能装饰该对象。这种应用场景看起来如下所示：

``` js
	var sale = new Sale(100);       // 该价格为 100 美元
	sale = sale.decorate('fedtax'); // 增加联邦税
	sale = sale.decorate('quebec'); // 增加省级税
	sale = sale.decorate('money');  // 格式化为美元货币形式
	sale.getPrice();				// "$112.88"

```
<!-- more -->

在另一种情况下，买方可能在一个没有省税的省份，并且您 可能也想使用加元的形式对其价格进行格式化，因此，您可以按照下列方式这样做：


``` js
	var sale = new Sale(100);       // 该价格为 100 美元
	sale = sale.decorate('fedtax'); // 增加联邦税
	sale = sale.decorate('cdn'); 	// 格式化为CDN形式
	sale.getPrice();				// "$112.88"

```

正如您所看到的，这是一种非常灵活的方法，可用于增加功能以及调整运行时对象。让我们来看看如何处理该模式的实现。


### 实现

实现装饰者模式的其中一种方法是使得每个装饰者成为一个对象，并且该对象包含了应该被重载的方法。每个装饰者实际上继承了目前已经被前一个装饰者进行增强后的对象。每个装饰方法uber（继承的对象）上调用了同样的方法并获取其值，此外它还继续执行了一些操作。

最终的效果是，当您在第一个用法示例中执行sale.getPrice()时，调用了money装饰者的方法。但每个装饰方法首先调用父对象的方法，meoney的getPrice()将会首先调用quebec的getPrice(), 这又需要依次调用fedtax的getPrice()等。该调用链一路攀升到由Sale()构造函数所实现的原始未经装饰的getPrice()。

```js
    function Sale(price) {
        this.price = price || 100;
    }

    Sale.prototype.getPrice = function() {
        return this.price;
    }

    Sale.decorators = {};

    /* 
    让我们看一个装饰者示例。它是一个实现了算定义getPrice()方法的对象。
    该方法首先会从父对象的方法中获取值，然后再修改该值：
    */
    Sale.decorators.fedtax = {
        getPrice: function() {
            var price = this.uber.getPrice();
            price += price * 5 / 100;
            return price;
        }
    }

    /*
    同样地，我们可以实现其他装饰者，其数量由需求来决定。它们可以是核心Sale()功能的扩展
    它们甚至可以“驻留”在其他文件中，并且可被第三方开发人员所开发和共享
    */
    Sale.decorators.quebec = {
        getPrice: function() {
            var price = this.uber.getPrice();
            price += price * 7.5 / 100;
            return price;
        }
    }

    Sale.decorators.money = {
        getPrice: function() {
            return "$" + this.uber.getPrice().toFixed(2);
        }
    }

    Sale.decorators.cdn = {
        getPrice: function() {
            return "CDN$" + this.uber.getPrice().toFixed(2);
        }
    }

    Sale.prototype.decorate = function(decorator) {
        var F = function() {},
            overrides = this.constructor.decorators[decorator],
            i, newobj;

        F.prototype = this;
        newobj = new F();
        newobj.uber = F.prototype;

        for (i in overrides) {
            if (overrides.hasOwnProperty(i)) {
                newobj[i] = overrides[i];
            }
        }

        return newobj;
    }

    var sale = new Sale(100);       // 该价格为 100 美元
    sale = sale.decorate('fedtax'); // 增加联邦税
    sale = sale.decorate('quebec'); // 增加省级税
    sale = sale.decorate('money');  // 格式化为美元货币形式
    sale.getPrice();                // $112.88


    var sale = new Sale(100);       // 该价格为 100 美元
    sale = sale.decorate('fedtax'); // 增加联邦税
    sale = sale.decorate('cdn');    // 格式化为CDN形式
    sale.getPrice();                // "CND$105.00"
	
```

### 使用列表实现

现在我们探讨一下稍微不同的实现方法，它利用了Javascript语言的动态性质，并且根本不需要使用继承。此外，并不是每个装饰方法调用链中前面的方法，我们可以简单将前面方法结果作为参数传递到下一个方法。

这种实现方法还可以很容易的支持反装饰或撤销装饰，这意味着可以简单地从装饰者列表中删除一个项目。

下面的用法示例将略微简单一点，这是由于我们没有将从decorate()返回的值赋给对象。在这个实现中，decorate()并没有对该对象执行任何操作，它只是将返回的值追加到列表中：

``` js
	var sale = new Sale();    // 该价格为 100 美元
	sale.decorate('fedtax');  // 增加联邦税
	sale.decorate('quebec');  // 增加省级税
	sale.decorate('money');   // 格式化为美元货币形式
	sale.getPrice();          // "$112.88"

```

现在,Sale()构造函数中有一个装饰者列表并以此作为自身的属性：


``` js
	// 现在,Sale()构造函数中有一个装饰者列表并以此作为自身的属性：
	function Sale(price) {
	    this.price = (price > 0) || 100;
	    this.decorators_list = [];
	}
	
	/* 
	可用装饰者将再次以Sale.decorators属性的方式实现。
	请注意，现在getPrice()方法变得更来简单了，这是因为它们并没有调用父对象的getPrice()以获得中间结果，
	而这个结果将作为参传递给它们：
	*/
	Sale.decorators = {};
	
	Sale.decorators.fedtax = {
	    getPrice: function(price) {
	        return price + price * 5 / 100;
	    }
	}
	
	Sale.decorators.quebec = {
	    getPrice: function(price) {
	        return price + price * 7.5 / 100;
	    }
	}
	
	Sale.decorators.money = {
	    getPrice: function(price) {
	        return "$" + price.toFixed(2);
	    }
	}
	
	/*在下面的代码中，有趣的部分发生在父对象的decorate()和getPrice()方法中。
	在以前的实现中，decorate()具有一定的复杂性，而getPrice()却是相当简单。
	然而，在本实现中却采用了恰好相反的方式：decorate()仅用于追加列表，而getPrice()却完成所有工作。
	这些工作包括遍历当前添加的装饰者以及调用每个装饰者的getPrice()方法、传递从前一个方法中获得的结果。
	*/
	Sale.prototype.decorate = function(decorator) {
	    this.decorators_list.push(decorator);
	}
	
	Sale.prototype.getPrice = function() {
	    var price = this.price,
	        i,
	        max = this.decorators_list.length,
	        name;
	
	    for(i = 0; i < max; i += 1) {
	        name = this.decorators_list[i];
	        price = this.constructor.decorators[name].getPrice(price);
	    }
	
	    return price;
	}
	
	var sale = new Sale();    // 该价格为 100 美元
	sale.decorate('fedtax');  // 增加联邦税
	sale.decorate('quebec');  // 增加省级税
	sale.decorate('money');   // 格式化为美元货币形式
	sale.getPrice();          // "$112.88"

```

装饰者模式的第二种实现方法更为简单，并且也不涉及继承。此外，装饰方法也是非常简单的。所有这些工作都是通过 “同意” 被装饰的那个方法来完成。在这个实现示例中，getPrice()是唯一允许装饰的方法。如果想拥有更多 可以被装饰的方法，那么每个额外的装饰方法都需要重复遍历装饰者列表这一部分的代码。然而，这很容易抽象成一个辅助方法，通过它来接受方法并使其成为 “可装饰” 的方法。在这样的实现中，sale中的decorators_list属性变成了一个对象，且该对象中的每个属性都是以装饰对象数组中的方法和值命名。

\*_以上内容摘自《Javascript 模式》_