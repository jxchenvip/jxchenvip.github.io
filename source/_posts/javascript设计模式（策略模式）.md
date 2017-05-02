---
title: javascript设计模式（策略模式）
tags: [前端,javascript,javascript设计模式]
categories: 前端
date: 2017-04-29 15:10:47
---

## 策略模式

策略模式支持您在运行时选择算法。代码的客户端可以使用同一个接口来工作，但是它却根据客户正在试图执行任务的上下文，从多个算法中选择用于处理特定任务的算法。

使用策模式的其中一个例子是解决表单验证的问题。可以创建一个具有validate()方法的验证器（validator)对象。无论表单的具体类型是什么，该方法都将会被调用，并且总是返回相同的结果，一个未经验证的数据列表以及任意的错误消息。

但是根据具体的表单形式以及待验证的数据，验证器的客户端可能选择不同类型检查方法。验证器将选择最佳的策略（strategy)以处理任务，并且将具体的数据验证委托给适当的算法。

### 数据验证示例

假设有以下数据块，它可能来自于网页上的一个表单，而您需要验证它是否有效：

``` js
	var data = {
		first_name: "Super",
		last_name: "Man",
		age: "unknow",
		username: "O_O"
	};

```
<!-- more -->

在这个具体的例子中，为了使验证器知道什么是最好的策略，首先需要配置该验证器，并且设置认为是有效的且可接受的规则。

比如说在表单验证中，您对姓氏不做要求且接受任意字作为名字，但是要求年龄必须为数字，并且用户名中仅出现字母和数字且无特殊符号。该配置如下所示：

``` js
	validator.config = {
		first_name: "isNonEmpty",
		age: "isNumber",
		username: "isAlphaNum"
	};

```

现在，validator对象已经配置完毕并可用于数据处理，您可以调用validator对象的validate()方法并将任意验证错误信息打印到控制台中：

``` js
	validator.validate(data);
	if(validator.hasError()) {
		console.log(validator.messages.join("\n"));
	}
	
```
现在，让我们看看验证程序是如何实现该validator的。用于检查的可用算法也是对象，它们具有一个预定义的接口，提供了一个validate()方法和一个可用于提示错误消息的一行帮助信息。

``` js
	var data = {
	    first_name: "Super",
	    last_name: "Man",
	    age: "unknow",
	    username: "0_O"
	};
	
	var validator = {
	    // 所有可有的检查
	    types: {},
	
	    // 在当前验证会话中的
	    // 错误消息
	    message: [],
	
	    // 当前验证配置
	    // 名称：验证类型
	    config: {},
	
	    // 接口方法
	    // `data`为键-值对
	    validate: function(data) {
	        var i, msg, type, checker, result_ok;
	
	        // 重置所有消息
	        this.message = [];
	
	        for (var i in data) {
	
	            if (data.hasOwnProperty(i)) {
	                type = this.config[i];
	                checker = this.types[type];
	
	                if (!type) {
	                    continue; // 不需要验证
	                }
	
	                if (!checker) { // uh-oh
	                    throw {
	                        name: "ValidationError",
	                        message: "No handler to validate type " + type
	                    }
	                }
	
	                result_ok = checker.validate(data[i]);
	
	                if (!result_ok) {
	                    msg = "Invalid value for *" + i + "*," + checker.instructions;
	                    this.message.push(msg);
	                }
	            }
	
	        }
	        return this.hasErrors();
	    },
	
	    // 帮助程序
	    hasErrors: function() {
	        return this.message.length !== 0;
	    }
	};
	
	// 非空值的检查
	validator.types.isNonEmpty = {
	    validate: function(value) {
	        return value !== "";
	    },
	    instructions: "the value cannot be empty"
	};
	
	// 检查值是否是一个数字
	validator.types.isNumber = {
	    validate: function(value) {
	        return !isNaN(value);
	    },
	    instructions: "the value can only be a valid Number, e.g. 1, 3.14 or 2017"
	};
	
	// 检查该值是否只包含字母和数字
	validator.types.isAlphaNum = {
	    validate: function(value) {
	        return !/[^a-z0-9]/i.test(value);
	    },
	    instructions: "the value can only contaion characters and numbers, nospeciall symbols"
	};
	
	validator.config = {
	    last_name: "isNonEmpty",
	    age: "isNumber",
	    username: "isAlphaNum"
	};
	
	validator.validate(data);
	
	if (validator.hasErrors()) {
	    console.log(validator.message.join("\n"));
	}

```

正如您所看到的，validator对象是通用的，可以像这样将其保存下来以用于验证用例。增强validator对象的方法是添加更多的类型检查。如果在多个页面中使用它，很快就会有一个优良的特定检查集合。以后，针对每个新的用例，所需要做的就是配置该验证器并运行validate()方法。

总结：在选择最值策略以处理特定任务（上下文）的时候仍然保持相同的接口。

\*_以上内容摘自《Javascript 模式》_