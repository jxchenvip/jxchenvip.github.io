---
title: javascript工具函数集合 
tags: javascript
categories: 前端

date: 2017/5/4 10:30:20 
---

## 图片加载

```js
function ImgLoader(property) {
    var onloadedcompleted, // 加载完成回调
        onloading, // 加载进度回调
        NUM_ELEMENTS, // 资源总数
        NUM_LOADED = 0, // 已加载数量
        NUM_ERROR = 0, // 加载错误数量
        TempProperty = {}, // 资源列表
        LOADED_THEMES = {}, // 加载成功的资源
        loadList = [] // 加载队列

    //初始化参数
    if (typeof(property) == 'string') {
        NUM_ELEMENTS = 1;
        loadList[0] = property;
    } else {
        NUM_ELEMENTS = property.length;
        loadList = property;
    }
    //资源存储位置
    this.assets = TempProperty; //对象引用
    this.asset = LOADED_THEMES;
    //初始化回调函数
    this.completed = function(callback) {
        onloadedcompleted = callback;
    };
    this.progress = function(callback) {
        onloading = callback;
    };
    this.start = function() {
        for (var i = 0; i < NUM_ELEMENTS; i++) {
            load(loadList[i], imageLoaded, imageLoadError);
        }
        return TempProperty;
    };

    function load(img, loaded, error) {
        //存储资源引用
        var image = new Image();
        image.onload = loaded;
        image.onerror = error;
        image.src = img;
        TempProperty[img] = image;
    };

    function imageLoaded() {
        var imgsrc = this.getAttribute("src");
        TempProperty[imgsrc].loaded = true;
        NUM_LOADED++;

        if (NUM_LOADED + NUM_ERROR == NUM_ELEMENTS) {
            //加载完毕 则调用completed
            typeof(onloadedcompleted) == 'function' && onloadedcompleted(NUM_ELEMENTS, NUM_LOADED, NUM_ERROR);
        } else {
            //加载进行中...调用 onloading
            typeof(onloading) == 'function' && onloading(NUM_ELEMENTS, NUM_LOADED, NUM_ERROR);
        }
    };

    function imageLoadError() {
        var imgsrc = this.getAttribute("src");
        TempProperty[imgsrc].loaded = false;
        NUM_ERROR++;
        //加载错误后需要继续处理...
        if (NUM_LOADED + NUM_ERROR == NUM_ELEMENTS) {
            //加载完毕 则调用completed
            typeof(onloadedcompleted) == 'function' && onloadedcompleted(NUM_ELEMENTS, NUM_LOADED, NUM_ERROR);
        } else {
            //加载进行中...调用 onloading
            typeof(onloading) == 'function' && onloading(NUM_ELEMENTS, NUM_LOADED, NUM_ERROR);
        }
    };
};

// 使用方式
// var imgArray=[......];//图片资源数组
// var imgLoader=new ImgLoader(imgArray); //初始化加载器
// //定义加载过程中的处理方法
// imgLoader.progress(function(a,b,c){
//  //a:加载总数
//  //b:加载成功数
//  //c:加载失败数
// });
// //定义加载完成时的处理方法
// imgLoader.completed(function(a,b,c){
//  //a:加载总数
//  //b:加载成功数
//  //c:加载失败数
// });
// //定义完后开始执行加载
// imgLoader.start();

```
<!--more-->

## 获取元素样式

```js
/**
 * [getSytle 获取元素样式]
 * @param  {[Object]} 	e 	[DOM]
 * @param  {[String]} 	n 	[css属性]
 * @return {[String]}   	[css属性值]
 */
function getSytle(e, n) {
    if (e.style[n]) {
        return e.style[n];
    } else if (e.currentStyle) {
        return e.currentStyle[n];
    } else if (document.defaultView && document.defaultView.getComputedStyle) {
        n = n.replace(/([A-Z])/g, '-$1');
        n = n.toLowerCase();
        var s = document.defaultView.getComputedStyle(e, null);
        if (s) {
            return s.getPropertyValue(n);
        }
    } else {
        return null;
    }
}
```



## 定时器分解任务

```js
/**
 * [processArray description]
 * @param  {[Array]}   		items    [[1, 2, 3, 4]]
 * @param  {[Function]}   	process  [func1]
 * @param  {Function} 		callback [回调]
 */
function processArray(items, process, callback) {
    var todo = items.concat();
    setTimeout(function() {
        process(todo.shift());
        if (todo.length > 0) {
            setTimeout(arguments.callee, 25);
        } else {
            callback(items);
        }
    }, 25)
}

/**
 * [multistep description]
 * @param  {[Array]}   steps    [func1, func2, func3]
 * @param  {[Array]}   args     [[1, 2, 3 4]]
 * @param  {Function} callback  [回调]
 */
function multistep(steps, args, callback) {
    var tasks = steps.concat();
    setTimeout(function() {
        var task = tasks.shift();
        task.apply(null, args || []);
        if (tasks.length > 0) {
            setTimeout(arguments.callee, 25);
        } else {
            callback();
        }
    }, 25);
}

/**
 * [timeProcessArray description]
 * @param  {[Array]}   		items    [[1, 2, 3, 4]]
 * @param  {[Function]}   	process  [func1]
 * @param  {Function} 		callback [回调]
 */
function timeProcessArray(items, process, callback) {
    var todo = items.concat();
    setTimeout(functoin() {
        var start = +new Date();
        do {
            process(todo.shift());
        } while (todo.length > 0 && (+new Date() - start < 50))
        
        if (todo.length > 0) {
            setTimeout(arguments.callee, 25);
        } else {
            callback(items);
        }

    }, 25)
}
```



## extend（类继承）

```js
/**
 * [extend 类继承]
 * @param  {[Object]} Sub [子类]
 * @param  {[Object]} Sup [超类]
 */
function extend(Sub, Sup) {
    var F = function() {};
    F.prototype = Sup.prototype;
    Sub.prototype = new F();
    Sub.prototype.constructor = Sub;
    Sub.sup = Sup.prototype;
    if (Sub.prototype.constructor == Object.prototype.constructor) {
        Sub.prototype.constructor = Sup;
    }
}
```


## isNumber（是否一个数字）


``` js
	/**
	 * [isNumber 是否一个数字]
	 * @return {[Boolean]}
	 */
	function isNumber(value) {
	    return typeof value === "number" && isFinite(value);
	}

```




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