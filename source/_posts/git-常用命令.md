---
title: git常用命令
tags: git
categories: 前端
---


#### 把这个目录变成Git可以管理的仓库

``` bash
$ git init 
```
####  提交代码
 
``` bash
$ git commit -m 
```

<!--more-->


#### 查看工作区的状态

``` bash
$ git status 
```
#### 查看修改内容

``` bash
$ git diff 
```
#### 查看日志

``` bash
$ git log 
```
#### 查看美化的日志

``` bash
$ git log --pretty=oneline 
$ git log --color 
$ git log --stat 详情信息
```

#### 恢复上一版本 HEAD^^， HEAD~100

``` bash
$ git reset --hard HEAD^ 
```
#### 查看文件内容

``` bash
$ cat xxx.js 
```
#### 查看命令历史，以便确定要回到未来的哪个版本。

``` bash
$ git reflog  
```
#### 与上一版本比较

``` bash
$ git diff HEAD~1 
```
#### 当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令

``` bash
$ git checkout -- file  
```
#### 恢复文件

``` bash
$ git checkout -- xxx.js 
```
#### 删除文件 	

``` bash
$ git rm xxx.js 
```
#### 查看分支

``` bash
$ git branch 
```
#### 创建分支

```
$ git branch <name> 
```
#### 切换分支

``` bash
$ git checkout <name> 
```
#### 创建+切换分支

``` bash
$ git checkout -b <name> 
```
#### 合并到某分支到当前分支	

``` bash
$ git merge <name> 
```
#### 删除分支

``` bash
$ git branch -d <name>  
```

#### 看到分支合并图
``` bash
$ git log --graph
```

#### 当手头工作没有完成时，先把工作现场git stash一下，然后去修复bug，修复后，再git stash pop，回到工作现场。
``` bash
$ git stash
$ git stash pop
```

#### 强行删除

``` bash
$ git branch -D <name>
```