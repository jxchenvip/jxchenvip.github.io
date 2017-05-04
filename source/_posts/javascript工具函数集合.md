---
title: javascript工具函数集合 
categories: 前端
tags: javascript
date: 2017/5/4 10:30:20 
---

## typeOf（类型检测）

``` js
    function typeOf(obj) {
        const toString = Object.prototype.toString;
        const map = {
            '[object Boolean]'  : 'boolean',
            '[object Number]'   : 'number',
            '[object String]'   : 'string',
            '[object Function]' : 'function',
            '[object Array]'    : 'array',
            '[object Date]'     : 'date',
            '[object RegExp]'   : 'regExp',
            '[object Undefined]': 'undefined',
            '[object Null]'     : 'null',
            '[object Object]'   : 'object'
        };
        return map[toString.call(obj)];
    }

```

<!--more-->

## 角度转弧度

``` js
    function d2a(n) {
        return n * Math.PI / 180;
    }

```

## 弧度转角度

``` js
    function a2d(n) {
        return n * 180 / Math.PI;
    }

```


持续更新……