---
title: javascript工具函数集合 
categories: 前端
tags: javascript
date: 2017/5/4 10:30:20 
---

## typeOf（类型检测）

``` js
	/**
	 * [typeOf 数据类型检测]
	 * @param  {*} obj
	 * @return {[String]}
	 */
	function typeOf(obj) {
	    const toString = Object.prototype.toString;
	    const map = {
	        '[object Boolean]': 'boolean',
	        '[object Number]': 'number',
	        '[object String]': 'string',
	        '[object Function]': 'function',
	        '[object Array]': 'array',
	        '[object Date]': 'date',
	        '[object RegExp]': 'regExp',
	        '[object Undefined]': 'undefined',
	        '[object Null]': 'null',
	        '[object Object]': 'object'
	    };
	    return map[toString.call(obj)];
	}

```

<!--more-->

## 角度转弧度

``` js
	/**
	 * [d2a 角度转弧度]
	 * @param  {[Number]} n
	 * @return {[Number]}  
	 */
	function d2a(n) {
	    return n * Math.PI / 180;
	}

```

## 弧度转角度

``` js
	/**
	 * [a2d 弧度转角度]
	 * @param  {[Number]} n
	 * @return {[Number]}  
	 */
	function a2d(n) {
	    return n * 180 / Math.PI;
	}

```

## 柯里化公式
```js
	/**
	 * @param {Function} func
	 * @return {Function}
	 */
	function curry(func) {
	    var args = nativeSlice.call(arguments, 1);
	    return function () {
	        return func.apply(this, args.concat(nativeSlice.call(arguments)));
	    };
	}
```

## 构造类继承关系

```js
	/**
	 * 构造类继承关系
	 * @param {Function} clazz 源类
	 * @param {Function} baseClazz 基类
	 */
	function inherits(clazz, baseClazz) {
	    var clazzPrototype = clazz.prototype;
	    function F() {}
	    F.prototype = baseClazz.prototype;
	    clazz.prototype = new F();
	
	    for (var prop in clazzPrototype) {
	        clazz.prototype[prop] = clazzPrototype[prop];
	    }
	    clazz.prototype.constructor = clazz;
	    clazz.superClass = baseClazz;
	}
```

## 浏览器检测

```js

	var firefox = ua.match(/Firefox\/([\d.]+)/);
	var ie = ua.match(/MSIE\s([\d.]+)/)
            // IE 11 Trident/7.0; rv:11.0
            || ua.match(/Trident\/.+?rv:(([\d.]+))/);
	var edge = ua.match(/Edge\/([\d.]+)/); // IE 12 and 12+
	var weChat = (/micromessenger/i).test(ua);
```

持续更新……