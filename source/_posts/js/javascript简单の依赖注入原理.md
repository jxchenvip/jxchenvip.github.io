---
title: javascript简单の依赖注入原理
tags: javascript
categories: 前端

date: 2019/4/20 22:10:20
---

在进行文本编辑的时候我们为了美观在适合的时候会进行换行 ↩

html 中我们可以使用&lt;br /&gt; 可以实现 ↩，但是`TextArea`元素的 placeholder 无法使用&lt;br /&gt;

<!--more-->

## unicode 字符

`&#13;` // 回车
`&#10;` // 换行

## 在 placeholder 中换行使用`&#10;`

```html
<textarea placeholder="请输入&#10;您要搜索的内容"></textarea>
```

<textarea style="width: 99%;border-color: #ddd;" placeholder="请输入&#10;您要搜索的内容" ></textarea>

## 在&lt;textarea&gt;中换行使用`&#13;`

```html
<textarea>请输入&#13;您要搜索的内容</textarea>
```

<textarea style="width: 99%;border-color: #ddd;" placeholder="请输入&#10;您要搜索的内容" >请输入&#13;您要搜索的内容</textarea>

## js 动态赋值 placeholder

```html
<textarea id="textarea">请输入&#13;您要搜索的内容</textarea>
```

```js
var textarea = document.getElementById("textarea");
var placeholders = ["请输入第一行", "请输入第二行", "请输入第三行"];
textarea.setAttribute("placeholder", placeholders.join("\n"));
```

<textarea id="textarea" rows="5" style="width: 99%;border-color: #ddd;"></textarea>


<script>
  ;(function() {
    var textarea = document.getElementById("textarea");
    var placeholders = ["请输入第一行", "请输入第二行", "请输入第三行"];
    textarea.setAttribute("placeholder", placeholders.join("\n"));
  })();
</script>
