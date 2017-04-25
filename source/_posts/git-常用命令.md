---
title: git常用命令
---


#### 把这个目录变成Git可以管理的仓库

```
$ git init 
```
####  提交代码

```
$ git commit -m 
```

<!--more-->


#### 查看工作区的状态

```
$ git status 
```
#### 查看修改内容

```
$ git diff 
```
#### 查看日志

```
$ git log 
```
#### 查看美化的日志

```
$ git log --pretty=oneline 
$ git log --color 
$ git log --stat 详情信息
```

#### 恢复上一版本 HEAD^^， HEAD~100

```
$ git reset --hard HEAD^ 
```
#### 查看文件内容

```
$ cat xxx.js 
```
#### 查看命令历史，以便确定要回到未来的哪个版本。

```
$ git reflog  
```
#### 与上一版本比较

```
$ git diff HEAD~1 
```
#### 当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令

```
$ git checkout -- file  
```
#### 恢复文件

```
$ git checkout -- xxx.js 
```
#### 删除文件 	

```
$ git rm xxx.js 
```
#### 查看分支

```
$ git branch 
```
#### 创建分支

```
$ git branch <name> 
```
#### 切换分支

```
$ git checkout <name> 
```
#### 创建+切换分支

```
$ git checkout -b <name> 
```
#### 合并到某分支到当前分支	

```
$ git merge <name> 
```
#### 删除分支

```
$ git branch -d <name>  
```

#### 看到分支合并图
```
$ git log --graph
```

#### 当手头工作没有完成时，先把工作现场git stash一下，然后去修复bug，修复后，再git stash pop，回到工作现场。
```
$ git stash
$ git stash pop
```

#### 强行删除

```
$ git branch -D <name>
```