---
title: JS判断一个对象是否为空
permalink: /post/2019053101.html
sidebar: auto
tags:
 - JavaScript
---

在JS开发中经常会需要判断一个对象是否为空，下面记录了几种简单的方法
<!-- more -->

## 用for..in循环
用for in循环对象，如果进入循环返回false没进入循环就返回true
```javascript
function isEmpty(obj) {
  for (const key in obj) {
      // 判断自身的属性
      if (obj.hasOwnProperty(key)) {
        return false
      }
    }
    return true;
  }
```

## 用ES6的Object.keys()
用ES6的Object.keys()会返回对象的所有key组成的数组，再通过判断keys是否为空来判断对象是否为空
```javascript
function isEmpty(obj) {
  const keys = Object.keys(obj)
  // 判断数组是否为空
  return keys == false
}
```

## 转换成JSON判断
用JSON.stringify转成json字符串来判断
```javascript
function isEmpty(obj) {
  return JSON.stringify(obj) === '{}'
}
```