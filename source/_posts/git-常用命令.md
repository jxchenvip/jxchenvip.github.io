---
title: git常用命令
tags: git
categories: 前端

date: 2017-04-19 11:38:47
---

####  初始化git项目

``` bash
$ git init 
```

####  添加文件

``` bash
$ git add . 
```

####  提交代码
 
``` bash
$ git commit -m  "描述信息"
```

####  添加并提交
 
``` bash
$ git commit -am "描述信息"
```

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

#### 恢复至远程分支

``` bash
$ git reset --hard origin <branch>
```

#### 丢弃所有修改文件

``` bash
$ git checkout .
```

#### 查看命令历史，以便确定要回到未来的哪个版本。

``` bash
$ git reflog  
```

#### 与上一版本比较

``` bash
$ git diff HEAD~1 
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

#### 查看远程仓库地址

``` bash
$ git remote -V 
```

#### 合并到某分支到当前分支    

``` bash
$ git merge <name> 
```

#### 删除分支

``` bash
$ git branch -d <name>  
$ git push origin <name>: 
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
