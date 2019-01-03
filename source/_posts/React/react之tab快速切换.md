---
title: react之tab快速切换
tags: [前端,javascript,react,antd]
categories: 前端
date: 2017-09-10 11:38:47
---

## 写在前面

在做项目tab切换的时候遇到 __tab选中签与当前展示内容不一致__。这个问题不局限于react,所有tab切换的时候都有可能触发这个问题。之所以将此问题题归于react中，是因为这是做react项目时解决的一个问题。

## 问题重现

有这么一堆切签北京、上海、深圳...,点击 __北京__ 发送一个请求对应 __北京__ 的详细信息，点击 __上海__ 的时候与之对应的请求 __上海__ 的详细信息... （正常的tab切换大家都会写，也不会出什么问题，在此就不在说明怎么写的tab切换js）*问题来了，我先点击的 __北京__ 后点击的 __上海__ 、 __但是请求返回的先是上海后是北京的数据__ 是因为接口快慢的问题* 以下为模拟js

<!--more-->

``` js

import React, { PureComponent } from 'react';

export default class Tab extends PureComponent {
  constructor(props) {
    super(props);
    // 切签数据 time是为了模拟请求返回数据时间
    this.tabs = [
      { label: '北京', id: 'bj', time: 1000 },
      { label: '上海', id: 'sh', time: 100 },
      { label: '深圳', id: 'sz', time: 2000 },
    ];
    this.state = {
      tabPanel: '北京',
      current: 'bj',
    };
  }
  // 点击事件
  handleTabClick(item) {
    this.setState({current: item.id});
    setTimeout(() => {
      this.setState({ tabPanel: item.label });
    }, item.time);
  }

  render() {
    const { tabPanel, current } = this.state;
    return (
      <React.Fragment>
        <ul>
          {this.tabs.map(item => {
            return (
              <li
                key={item.id}
                className={current === item.id ? 'current' : ''}
                onClick={() => this.handleTabClick(item)}
              >
                {item.label} {current === item.id ? 'current': ''}
              </li>
            );
          })}
        </ul>
        <div className="tabPanel">{tabPanel}</div>
      </React.Fragment>
    );
  }
}

```

## 解决方案

* 1、后台返回你请求的id，如果返回的id与当前current 的id一致然后渲染tabPanel
* 2、前端记录最后一次点击的id，如果最后点击的id，与current的id一致然后渲染tabPannel
  * 定义一个全局的变量,保存上次current的id
  * 使用闭包,保存上次current的id

第一种就不贴代码实例了，因为后台未必配合你。

### 使用公共属性或全局变量

``` js

import React, { PureComponent } from 'react';

export default class Tab extends PureComponent {
  constructor(props) {
    super(props);
    // 切签数据 time是为了模拟请求返回数据时间
    this.tabs = [
      { label: '北京', id: 'bj', time: 1000 },
      { label: '上海', id: 'sh', time: 100 },
      { label: '深圳', id: 'sz', time: 2000 },
    ];
    this.state = {
      tabPanel: '北京',
      current: 'bj',
    };
    // 记录最后一次点击的key
    this.lastId = '';
  }
  // ====================================
  // 点击事件
  handleTabClick(item) {
    this.lastId = item.id;
    this.setState({current: item.id});
    setTimeout(() => {
      // 如果最后一次点击的id,与当前请求回来的id一致然后渲染tabPanel
      if(this.lastId === item.id) {
        this.setState({ tabPanel: item.label });
      }
    }, item.time);
  }
  // ====================================

  render() {
    const { tabPanel, current } = this.state;
    return (
      <React.Fragment>
        <ul>
          {this.tabs.map(item => {
            return (
              <li
                key={item.id}
                className={current === item.id ? 'current' : ''}
                onClick={() => this.handleTabClick(item)}
              >
                {item.label} {current === item.id ? 'current': ''}
              </li>
            );
          })}
        </ul>
        <div className="tabPanel">{tabPanel}</div>
      </React.Fragment>
    );
  }
}

```

### 使用闭包

``` js

import React, { PureComponent } from 'react';

export default class Tab extends PureComponent {
  constructor(props) {
    super(props);
    // 切签数据 time是为了模拟请求返回数据时间
    this.tabs = [
      { label: '北京', id: 'bj', time: 1000 },
      { label: '上海', id: 'sh', time: 100 },
      { label: '深圳', id: 'sz', time: 2000 },
    ];
    this.state = {
      tabPanel: '北京',
      current: 'bj',
    };
  }
  // ====================================
  // 使用闭包避免全局变量
  wrapperHandle () {
    let lastId = '';
    return (item) => {
      lastId = item.id;
      this.setState({current: item.id});
      setTimeout(() => {
        if(lastId === item.id) {
          this.setState({ tabPanel: item.label });
        }
      }, item.time);
    }
  }
  // 点击事件
  handleTabClick = this.wrapperHandle()
  // ====================================

  render() {
    const { tabPanel, current } = this.state;
    return (
      <React.Fragment>
        <ul>
          {this.tabs.map(item => {
            return (
              <li
                key={item.id}
                className={current === item.id ? 'current' : ''}
                onClick={() => this.handleTabClick(item)}
              >
                {item.label} {current === item.id ? 'current': ''}
              </li>
            );
          })}
        </ul>
        <div className="tabPanel">{tabPanel}</div>
      </React.Fragment>
    );
  }
}

```

使用公共属性或全局变最，或者闭包都可以解决以上问题。至于哪个是最优解决文案，需要自己取舍。

*_每天进步一点点_