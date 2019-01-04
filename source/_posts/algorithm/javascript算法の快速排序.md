---
title: javascript算法の快速排序
tags: [前端,javascript,算法,排序]
categories: 前端
date: 2017-10-12 11:38:47
---

快速排序（英语：Quicksort），又称划分交换排序（partition-exchange sort），简称快排，一种排序算法，最早由东尼·霍尔提出。

## 算法

> 快速排序采用“分而治之、各个击破”的观念，此为原地（In-place）分割版本。
> 快速排序使用分治法（Divide and conquer）策略来把一个序列（list）分为两个子序列（sub-lists）。

<!--more-->

  __步骤为：__

  1. 从数列中挑出一个元素，称为“基准”（pivot）。
  2. 重新排序数列，所有比基准值小的元素摆放在基准前面，所有比基准值大的元素摆在基准后面（相同的数可以到任何一边）。在这个分割结束之后，该基准就处于数列的中间位置。这个称为分割（partition）操作。
  3. 递归地（recursively）把小于基准值元素的子数列和大于基准值元素的子数列排序。
    递归到最底部时，数列的大小是零或一，也就是已经排序好了。

这个算法一定会结束，因为在每次的迭代（iteration）中，它至少会把一个元素摆到它最后的位置去。

说明：n: __未排序__;   []: __基准__;    (): __排好的__

|  原数组  |  5  |  1  |  2  |  4  |  6  |  7  |  8  |  9  |  3  |
|  -- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
|  基准6  |  5  |  1  |  2  |  4  |  [6] |  7  |  8  |  9  |  3  |
|  基准2and8  |  5  |  1  |  *[2]*  |  4  |  3  |  (6)  |  7  |  *[8]*  |  9  |
|  基准4  |  1  |  (2)  |  5  |  [4]  |  3  |  (6)  |  (7)  |  (8)  |  (7)  |
|  完成  |  (1)  |  (2)  |  (3)  |  (4)  |  (5)  |  (6)  |  (7)  |  (8)  |  (9)  |


``` js

function quickSort(arr) {
  var length = arr.length;
  if (length < 2) return arr;
  var pivot = Math.floor(length / 2), left = [], right = [];
  // 1. 从数列中挑出一个元素，称为“基准”（pivot）。
  var pivotItem = arr[pivot];
  for (var i = 0; i < length; i++) {
    if (i === pivot) continue;
    // 大于基准排在右侧
    if (arr[i] > pivotItem) {
      right.push(arr[i]);
    } else {
      // 小于等于基准排序在左侧
      left.push(arr[i]);
    }
  }
  // 递归
  return quickSort(left).concat([pivotItem], quickSort(right));
}

```

## 测试

```js
var arr = [];
for (var i = 0; i < 10; i++) {
  arr.push(Math.floor(Math.random() * 100));
}
console.log('排序前：', arr);
console.log('排序后：', quickSort(arr));
```


*_每天进步一点点_