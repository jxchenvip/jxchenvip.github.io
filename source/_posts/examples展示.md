---
title: example 展示
tags: examples
categories: examples

date: 2017-07-16 12:35:25
---

###  example

每次项目立项时，总会有那么几个没有写过的效果，这时就想提前研究一番。随着项目越来越多，例子越来越多，为了便于管理这些小例子，专门建立了一个[git仓库](https://github.com/jxchenvip/examples)去管理它，同时也是记录自己在前端之路的一个成长过程。

### 数据来源

想方便肯定还是需要有存储数据的地方，之前都是加一个例子加一条数据，然后配制一下链接，时间久了发现越来越麻烦，毕竟是手工管理，难免有些笨拙，而且出错的机率也是常有的。后来就想自动去生成这些数据（因用不到数据库，还是存储在一个json文件里吧）。使用vue-cli去搭建一个小网站，只是在npm run dev的时候生成数据，启动server的同时数据也已准备好。所有的例子展示结构如下：

<!-- more -->

``` markdown

├─examples
│  ├─Canvas
│  │  └─2017
│  │      └─雷达(3)
│  ├─Css3
│  │  └─2017
│  │      └─radar
│  ├─Html5
│  │  └─2017
│  │      └─radar
│  ├─Javascript
│  │  └─2017
│  │      └─瀑布流
│  ├─Pano2vr
│  │  └─室内全景
│  ├─React
│  │  └─react_demo
│  └─Vue
│      └─html5api
└─static
    ├─css
    └─js
```

以examples为根目录，下面的文件夹Canvas、Css3、Html5、Javascript...为分类目录，分类目录下面一个年份分类（防止文件夹过多），再往下就是例子的名称文件夹（雷达（3）），再住下一级目录为此例子的各种资源，css、js、img...但例子入口为index.html，保证一个文件夹下只有一个index.html文件。然后以.html为分类文件查找， 找到的.html文件会记录它的地址、名称、属于什么分类、时间等等。然后记录于json文件中。

如果分类目录是以"_"下划线开始的此目录不会被写入json,入口文件是_index.html，同样也此文件也不会被写入json文件。

数据json

```json
{
    "list": [
        {
            "link": "Canvas\\2017\\图形全集\\index.html",
            "basename": "图形全集",
            "birthtime": 1499950635000,
            "updateTime": 1499946389000,
            "visitTime": 1499950635000,
            "changeTime": 1499950635000,
            "category": "Canvas"
        },
        {
            "link": "Canvas\\2017\\圆环进度条\\index.html",
            "basename": "圆环进度条",
            "birthtime": 1499950635000,
            "updateTime": 1499946389000,
            "visitTime": 1499950635000,
            "changeTime": 1499950635000,
            "category": "Canvas"
        }
    ],
    "total": 26,
    "category": {
        "Canvas": "/Canvas",
        "Css3": "/Css3",
        "Html5": "/Html5",
        "Javascript": "/Javascript",
        "Pano2vr": "/Pano2vr",
        "React": "/React"
    },
    "path": "dev"
}
```

查找并记录文件信息

```js
const findfiles = function(ipath, deep = false, json = {}) {
    fs.readdirSync(ipath).forEach(function(sPath) {
        var fileName = path.join(ipath, sPath);

        if (fs.statSync(fileName).isDirectory() && sPath != '') {
            if (deep && sPath !== 'node_modules') findfiles(fileName, deep, json);
        } else {
            var fileInfo = fs.statSync(fileName),
                basename = path.basename(path.dirname(fileName)),
                extname = path.extname(fileName).replace(/^\./, ''),
                relName = path.relative(dev, fileName),
                category = relName.split(path.sep)[0];

            /**
             * [if 以文件名后缀分类]
             */
            if (!json[extname]) {
                json[extname] = {};
            }

            /**
             * [if demo列表]
             */
            if (!json[extname]['list']) {
                json[extname]['list'] = [];
            }

            if (!/^_/.test(basename) && !/^_/.test(category)) {
                json[extname]['list'].push({
                    link: relName,
                    basename: basename,
                    birthtime: Date.parse(fileInfo.birthtime),
                    updateTime: Date.parse(fileInfo.mtime),
                    visitTime: Date.parse(fileInfo.atime),
                    changeTime: Date.parse(fileInfo.atime),
                    category: category
                })
            }

            /**
             * 数据长度
             */
            json[extname]['total'] = json[extname]['list'].length;

            /**
             * [if demo分类]
             */
            if (!json[extname]['category']) {
                json[extname]['category'] = {};
            }

            if (!/^_/.test(category)) {
                json[extname][`category`][category] = `/${category}`;
            }
        }
    })
    return json;
};
```

这样我们就得到了所有例子信息的一个*.json文件，我们的数据就准备好了。接下来是我们的vue-cli脚手架

### vue-cli

我们只需要对vue-cli做了一点小改动（config文件夹下），让原本生成的dist目录改为了docs目录，然后利用git pages的 brahches/docs目录可访问（这原本是用来放api的）这么做目的*使examples目录只有一份，而且减小了仓库的大小，同时也免去了切换分支的操作*。[关于vue-cli](https://github.com/vuejs/vue-cli)

```markdown
├─build 
├─config
├─docs // 利用的git pages 里面的docs文件可预览（本来是用来放aip）
│  ├─examples // 例子
│  │  ├─Canvas
│  │  │  └─2017
│  │  │      └─雷达(3)
│  │  ├─Css3
│  │  │  └─2017
│  │  │      └─radar
│  │  ├─Html5
│  │  │  └─2017
│  │  │      └─radar
│  │  ├─Javascript
│  │  │  └─2017
│  │  │      └─瀑布流
│  │  ├─Pano2vr
│  │  │  └─室内全景
│  │  ├─React
│  └─static // js、css、images
├─src
│  ├─assets 
│  ├─components
│  ├─datas
│  ├─filters
│  ├─router
│  └─store
└─static
```

如果想要添加demo只需要在docs/examples下面添加就好，然后执行npm run dev可以看到效果。

### git pages

关于[git pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/)详情还是移步官网查看


### examples

*效果预览地址：[examples](/examples)*
*git项目地址 [examples](https://github.com/jxchenvip/examples)*
