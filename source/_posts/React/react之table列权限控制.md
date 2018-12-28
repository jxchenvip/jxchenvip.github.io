---
title: React之table列の权限控制
tags: [前端,javascript,react,antd]
categories: 前端
date: 2017-08-12 11:38:47
---

## 写在前面

现在基于react后台管理系统领域，基本被ant design这个框架所占领，最近也是开始尝试使用。工作中遇到各种代码实现方式，各有千秋。


## 基本要求
> 先从一个最简单的例子说起：下面代码中的· __上海__ 是根据不同的级别来判断是否展示的。



``` js

	import React, { PureComponent } from 'react';
	import { Table } from 'antd';
	
	export default class SimpleTable extends PureComponent {
	  // ...
	  render() {
	    const columns = [
	      { title: '全国', dataIndex: 'all' },
	      { title: '北京', dataIndex: 'bj' },
	      { title: '上海', dataIndex: 'sh' },
	      { title: '深圳', dataIndex: 'sz' },
	      { title: '广东', dataIndex: 'gz' },
	    ];
	    return <Table columns={columns} />;
	  }
	}
	
```
<!--more-->

## 糟糕的写法


``` js

	import React, { PureComponent } from 'react';
	import { Table } from 'antd';
	
	export default class SimpleTable extends PureComponent {
	  // ...
	  render() {
	    const base = [
	      { title: '全国', dataIndex: 'all' },
	      { title: '北京', dataIndex: 'bj' },
	    ];
		
		// 权限控制
	    if(this.props.boss) {
	      base.push({ title: '上海', dataIndex: 'sh' })
	    }
	    
	    const columns = base.concat([
	      { title: '深圳', dataIndex: 'sz' },
	      { title: '广东', dataIndex: 'gz' },
	    ]);
	
	    return <Table columns={columns} />;
	  }
	}
	
```

上面代码将数组分为三部分，一前一后，中间一列用if判断是否显示，表面上没有什么问题并且达到了想要的结果。但是如果列表中有 __N行需要鉴权 这样的做法未免有点糟糕。需要定义多个变量，多个if去判断，最可怕的是哪天产品要求更换一下，列与列之间的顺序__，维护这样的代码恐怕会疯掉。

## 我的建议

``` js

	import React, { PureComponent } from 'react';
	import { Table } from 'antd';
	
	export default class SimpleTable extends PureComponent {
	  // ...
	  render() {
	    const base = [
	      { title: '全国', dataIndex: 'all', show: true },
	      { title: '北京', dataIndex: 'bj', show: true },
	      { title: '上海', dataIndex: 'sh', show: this.props.boss }, // 权限控制
	      { title: '深圳', dataIndex: 'sz', show: true },
	      { title: '广东', dataIndex: 'gz', show: true },
	    ];
	    const columns = base.filter(item => item.show);
	    return <Table columns={columns} />;
	  }
	}
	
```
以上代码给base手动添加了一个属性 __show__ 通过判断show的真假来控制，最后通过对数据列的过滤来生成一个新的数组列，__不仅代码清析而且少了if判断更不用担心产品要求换列了__



\*_每天进步一点点_