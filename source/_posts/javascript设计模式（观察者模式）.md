---
title: javascript设计模式（观察者模式）
tags: [前端,javascript,javascript设计模式]
categories: 前端
date: 2017-05-03 12:10:47
---

## 观察者模式

观察者（observer）模式广泛应用于客户端Javascript编程中。所有的浏览器事件（鼠标悬停，按键等事件）是该模式的例子。它的另一个名字也称为自定义事件（custom events），与那些由浏览器触发的事件相比，自定义事件表示是由您编程实现的事件。此外，该模式的另外一个别名是订阅/发布（subscriber/publisher）模式。

设计这种模式背后的主要动机是促进形成松散耦合。在这种模式中，并不是一个对角调用另一个对象的方法，而是一个对象订阅另一个对象的特定活动并在状态改变后获得通知。订阅者也称之为观察者，而被观察者的对象称发布者或者主题。当发生了一个重要的事件时，发布者将会通知（调用）所有订阅者并且可能经常以事件对象的形式传递消息。

<!-- more -->

### 示例1：杂志订阅

为了理解如何实现这种框，让我们看一个具体的例子。假设有一个发布者paper,它每天出版报纸以月刊杂志。订阅者joe将被通知任何时候所发生的新闻。

该paper对象需要有一个subscribers属性，该属性是一个存储所有订阅者的数组。订阅行为只是将其加入到这个数组中。当一个事件发生时，paper将会循环遍历订阅者列表并通知他们。通知意味着调用订阅者对象的某个方法。因此，当用户订阅信息的时候，该订阅者需向paper的subscribe()提供它的其中一个方法。

paper也提供了unsubscribe()方法，该方法表示从订阅者数组（即subscribers属性）中删除订阅者。Paper最后一个重要的方法是publish(),它会调用这此订阅者的方法。总而言之，发布对象paper需要具有以下这些成员：

```js 
	subscribes // 一个数组
	
	subscribe() // 将订阅者添加到subscribers数组

	unsubscribe() // 从订阅者数组subscribers中删除订阅者

	publish() // 循环遍历subscribers中的每个元素，并且调用他们注册时所提供的方法。
```

所有这三种方法都需要一个type参数，因为发布者可能触发多个事件（比如同时发布一本杂志和一份报纸）而用户可能仅选择订阅其中一种，而不是另外一种。

由于这些成员对于任何发布者对象都是通用的，将它们作为独立对象的一个部分来实现是很有意义的。那样我们可以将其复制到任何对象中，并且任意给定的对象变成一个发布者。

下面是该通用发布者功能的一个实现示例，它定义了前面列举出的所有需要的成员，还加上了一个帮助方法visitSubscribers():

```js
	var publisher = {
	    subscribers: {
	        any: [] // 事件类型：订阅者（subscribers）
	    },
	    subscribe: function(fn, type) {
	        type = type || 'any';
	        if (typeof this.subscribers[type] === "undefined") {
	            this.subscribers[type] = [];
	        }
	        this.subscribers[type].push(fn);
	    },
	    unsubscribe: function(fn, type) {
	        this.visitSubscribers('unsubscribe', fn, type);
	    },
	    publish: function(publication, type) {
	        this.visitSubscribers('publish', publication, type);
	    },
	    visitSubscribers: function(action, arg, type) {
	        var pubtype = type || 'any',
	            subscribers = this.subscribers[pubtype],
	            i,
	            max = subscribers.length;
	        for (i = 0; i < max; i += 1) {
	            if (action === "publish") {
	                subscribers[i](arg);
	            } else {
	                if (subscribers[i] === arg) {
	                    subscribers.splice(i, 1);
	                }
	            }
	        }
	    }
	};

```

而这里有一个函数makePublisher(), 它接受一个对象作为参数，通过把上述通用发布者的方法复制到该对象中，从而将其转换为一个发布者：

```js
	function makerPublisher(o) {
	    var i;
	    for (i in publisher) {
	        if (publisher.hasOwnProperty(i) && typeof publisher[i] === "function") {
	            o[i] = publisher[i];
	        }
	    }
	    o.subscribers = {
	        any: []
	    };
	}

```

现在，让我们来实现paper对象。它所能做的就是发布日报和月刊：

```js
	var paper = {
	    daily: function() {
	        this.publish("big news today");
	    },
	    monthly: function() {
	        this.publish("interesting analysis", "monthly");
	    }
	};

```

将paper构造成一个发行者：

```js
	makerPublisher(paper);

```

由于已经有了一个发布者，让我们来看看订阅者对象joe,该对象有两个方法：

```js
	var joe = {
	    drinkCoffee: function(paper) {
	        console.log("Just red " + paper);
	    },
	    sundayPreNap: function(monthly) {
	        console.log("About to fall asleep reading this " + monthly);
	    }
	};

```

现在，paper注册joe(也就是说，joe向paper订阅)：

```js
	paper.subscribe(joe.drinkCoffee);	
	paper.subscribe(joe.sundayPreNap, "monthly");

```

正如您所看到的，joe为默认“任意”事件提供了一个可被用调用的方法，而另一个可被调用的方法则用于当“monthly”类型的事件发生时的情况。现在，让我们触发一些事件：

``` js
	paper.daily();
	paper.daily();
	paper.daily();
	paper.monthly();

```

该代码好的部分在于，paper对象中并没有硬编码joe,而joe中也并没有硬编码paper。此外，本代码中还没有那些知道所有一切的中介者对象。由于参与对象是松耦合的，我们可以向paper添加更多的订阅者而根本不需要修改这些对象。

让我们将这个例子更进一步扩展并且让joe成为发布者。因此，joe变成了一个发布者并且可以分发状态更新：




```js
	makePublisher(joe);
	joe.tweet = function(msg) {
		this.publish(msg);
	}

```

现在想象一下，paper的公关部门决定读取读者的tweet，并且订阅joe的信息，那么需要提供方法readTweets():


```js
	paper.readTweents = function() {
		alert("Call big meeting! Someone " + tweet)
	};

	joe.subscribe(paper.readTweets);

```

现在，只要joe发出tweet消息，paper都会得到提醒：

joe.tweet("hated the paper today");

结果是一个提醒信息：“Call big meeting! Someone hated the paper today.”


完整例子：

``` js
	var publisher = {
        subscribers: {
            any: [] // event type: subscribers
        },
        subscribe: function(fn, type) {
            type = type || 'any';
            if (typeof this.subscribers[type] === "undefined") {
                this.subscribers[type] = [];
            }
            this.subscribers[type].push(fn);
        },
        unsubscribe: function(fn, type) {
            this.visitSubscribers('unsubscribe', fn, type);
        },
        publish: function(publication, type) {
            this.visitSubscribers('publish', publication, type);
        },
        visitSubscribers: function(action, arg, type) {
            var pubtype = type || 'any',
                subscribers = this.subscribers[pubtype],
                i,
                max = subscribers.length;

            for (i = 0; i < max; i += 1) {
                if (action === 'publish') {
                    subscribers[i](arg);
                } else {
                    if (subscribers[i] === arg) {
                        subscribers.splice(i, 1);
                    }
                }
            }
        }
    };

    /*
    var s1 = {log: console.log},
        s2 = {err: console.error},
        s3 = {warn: console.warn};


    publisher.subscribe(s1.log);
    publisher.subscribe(s2.err);
    publisher.subscribe(s3.warn);

    publisher.publish({hello: "World"});

    publisher.unsubscribe(s2.err);
    publisher.publish("hello");


    publisher.subscribe(s1.log, "log");
    publisher.publish({obj: "log this object"}, "log");
    */

    function makePublisher(o) {
        var i;
        for (i in publisher) {
            if (publisher.hasOwnProperty(i) && typeof publisher[i] === "function") {
                o[i] = publisher[i];
            }
        }
        o.subscribers = {
            any: []
        };
    }

    var paper = {
        daily: function() {
            this.publish("big news today");
        },
        monthly: function() {
            this.publish("interesting analysis", "monthly");
        }
    };

    makePublisher(paper);

    var joe = {
        drinkCoffee: function(paper) {
            console.log('Just read ' + paper);
        },
        sundayPreNap: function(monthly) {
            console.log('About to fall asleep reading this ' + monthly);
        }
    };

    paper.subscribe(joe.drinkCoffee);
    paper.subscribe(joe.sundayPreNap, 'monthly');

    paper.daily();
    paper.daily();
    paper.daily();
    paper.monthly();


    makePublisher(joe);

    joe.tweet = function(msg) {
        this.publish(msg);
    };

    paper.readTweets = function(tweet) {
        alert('Call big meeting! Someone ' + tweet);
    };

    joe.subscribe(paper.readTweets);

    joe.tweet("hated the paper today");

```


### 示例#2：键盘按键游戏

调整publisher对象，使之更接近于浏览器事件：

* 并不采用publish()、subscribe()以及unsubscribe()方法，我们采用以fire()、on()以及remove()命名的方法。
* 事件的type将一直被使用，因此它成为了上述三个函数的第一个参数。
* 除了订阅者的函数以外，还会提供一个额外的context,从而支持回调方法使用this以引用自己的对象。

新的publisher对象变为：

```js
	var publisher = {
        subscribers: {
            any: []
        },
        on: function(type, fn, context) {
            type = type || 'any';
            fn = typeof fn === "function" ? fn : context[fn];

            if (typeof this.subscribers[type] === "undefined") {
                this.subscribers[type] = [];
            }
            this.subscribers[type].push({
                fn: fn,
                context: context || this
            });
        },
        remove: function(type, fn, context) {
            this.visitSubscribers('unsubscribe', type, fn, context);
        },
        fire: function(type, publication) {
            this.visitSubscribers('publish', type, publication);
        },
        visitSubscribers: function(action, type, arg, context) {
            var pubtype = type || 'any',
                subscribers = this.subscribers[pubtype],
                i,
                max = subscribers ? subscribers.length : 0;

            for (i = 0; i < max; i += 1) {
                if (action === 'publish') {
                    subscribers[i].fn.call(subscribers[i].context, arg);
                } else {
                    if (subscribers[i].fn === arg && subscribers[i].context === context) {
                        subscribers.splice(i, 1);
                    }
                }
            }
        }
    };

```

Player()构造函数为：

```js
	function Player(name, key) {
	    this.points = 0;
	    this.name = name;
	    this.key  = key;
	    this.fire('newplayer', this);
	}
	
	Player.prototype.play = function () {
	    this.points += 1;
	    this.fire('play', this);
	};

```

以上新的部分在于该构造函数接受key,即玩家用于得分所按的键。另外，每次当创建新的Player对象时，一个名为“newplayer”的事件将被触发，每次当玩家玩游戏的时候事件“play”将被触发。

scoreboard对象保持不变，它只是当前分值更新其显示值。

新的game对象可以记录所有的player对象，因此它可以产生一个分类并且触发“scorechange”事件。它还将从浏览器中订阅所有的“keypress”事件，并且知道每个键所对应的玩家：

```js
	var game = {
	    
	    keys: {},
	
	    addPlayer: function (player) {
	        var key = player.key.toString().charCodeAt(0);
	        this.keys[key] = player;
	    },
	
	    handleKeypress: function (e) {
	        e = e || window.event; // IE
	        if (game.keys[e.which]) {
	            game.keys[e.which].play();
	        }
	    },
	    
	    handlePlay: function (player) {
	        var i, 
	            players = this.keys,
	            score = {};
	        
	        for (i in players) {
	            if (players.hasOwnProperty(i)) {
	                score[players[i].name] = players[i].points;
	            }
	        }
	        this.fire('scorechange', score);
	    }
	};

```
可以将任何对象转变成发行者的函数makePublisher(),仍然与前面报纸订阅的例子中对应函数是相同的。game对象变成了一个发布者（因此，它能够触发“scorechange”事件），并且Player.prototype也变成了发行者，以便每个player对象能够向任何决定监听的玩家触发“play”和“newplayer”事件：

```js
	makePublisher(Player.prototype);
	makePublisher(game);

```

game对象订阅了“play”和“newplayer”事件（此外，还有浏览器中的“keypress”事件），而scoreboard则订阅了“scorechange”事件。

```js
	Player.prototype.on("newplayer", "addPlayer", game);
	Player.prototype.on("play", "handlePlay", game);
	game.on("scorechange", scoreboard.update, scoreboard);
	window.onkeypress = game.handleKeypress;

```

正如您这里所看到的，on()方法使订阅者可以指定回调函数为函数引用（scoreboard.update）或字符串（“addPlayer”）的方式。只要提供了上下文环境（比如game对象，以字符串方式提供的回调函数就能正常运行）

设置的最后一小部分是动态创建多个player对象（与他们对应的按键一起），用户想创建多少个player对象都可以：

```js
	var playername, key;
	while (1) {
	    playername = prompt("Add player (name)");
	    if (!playername) {
	        break;
	    }
	    while (1) {
	        key = prompt("Key for " + playername + "?");
	        if (key) {
	            break;
	        }
	    }
	    new Player(playername,  key);    
	}

```

请注意，在中介者模式的实现中，mediator对象必须知道所有其他对象，以便在正确的时间调用正确的方法并且与整个游戏相协调。而在观察者模式中，game对象显得更缺乏智能，它主要依赖于对象观察某些事件并采取行动。比如，scoreboard监听“scorechange”事件。导致了更为松散的耦合（越少的对象知道越好），其代价是在记录监听什么事件时显得更困难一点。在本例游戏中，所有订阅行业都出现在该代码的同一个位置，但是随着应用程序的增长，on()调用可能到处都是（例如，在每个对象的初始化代码中）。这会使得该程序难以调试，因为现在无法仅在单个位置查看代码并理解到底发生了什么事情。在观察者模式中，可以摆脱那种从开始一直跟随到最后的那种程式顺序执行的程序。

完整代码：

```js
	var publisher = {
        subscribers: {
            any: []
        },
        on: function(type, fn, context) {
            type = type || 'any';
            fn = typeof fn === "function" ? fn : context[fn];

            if (typeof this.subscribers[type] === "undefined") {
                this.subscribers[type] = [];
            }
            this.subscribers[type].push({
                fn: fn,
                context: context || this
            });
        },
        remove: function(type, fn, context) {
            this.visitSubscribers('unsubscribe', type, fn, context);
        },
        fire: function(type, publication) {
            this.visitSubscribers('publish', type, publication);
        },
        visitSubscribers: function(action, type, arg, context) {
            var pubtype = type || 'any',
                subscribers = this.subscribers[pubtype],
                i,
                max = subscribers ? subscribers.length : 0;

            for (i = 0; i < max; i += 1) {
                if (action === 'publish') {
                    subscribers[i].fn.call(subscribers[i].context, arg);
                } else {
                    if (subscribers[i].fn === arg && subscribers[i].context === context) {
                        subscribers.splice(i, 1);
                    }
                }
            }
        }
    };


    function makePublisher(o) {
        var i;
        for (i in publisher) {
            if (publisher.hasOwnProperty(i) && typeof publisher[i] === "function") {
                o[i] = publisher[i];
            }
        }
        o.subscribers = {
            any: []
        };
    }

    var game = {

        keys: {},

        addPlayer: function(player) {
            var key = player.key.toString().charCodeAt(0);
            this.keys[key] = player;
        },

        handleKeypress: function(e) {
            e = e || window.event; // IE
            if (game.keys[e.which]) {
                game.keys[e.which].play();
            }
        },

        handlePlay: function(player) {
            var i,
                players = this.keys,
                score = {};

            for (i in players) {
                if (players.hasOwnProperty(i)) {
                    score[players[i].name] = players[i].points;
                }
            }
            this.fire('scorechange', score);
        }
    };

    function Player(name, key) {
        this.points = 0;
        this.name = name;
        this.key = key;
        this.fire('newplayer', this);
    }

    Player.prototype.play = function() {
        this.points += 1;
        this.fire('play', this);
    };

    var scoreboard = {

        element: document.getElementById('results'),

        update: function(score) {

            var i, msg = '';
            for (i in score) {
                if (score.hasOwnProperty(i)) {
                    msg += '<p><strong>' + i + '<\/strong>: ';
                    msg += score[i];
                    msg += '<\/p>';
                }
            }
            this.element.innerHTML = msg;
        }
    };


    makePublisher(Player.prototype);
    makePublisher(game);

    Player.prototype.on("newplayer", "addPlayer", game);
    Player.prototype.on("play", "handlePlay", game);

    game.on("scorechange", scoreboard.update, scoreboard);

    window.onkeypress = game.handleKeypress;


    var playername, key;
    while (1) {
        playername = prompt("Add player (name)");
        if (!playername) {
            break;
        }
        while (1) {
            key = prompt("Key for " + playername + "?");
            if (key) {
                break;
            }
        }
        new Player(playername, key);
    }

```


总结： 通过创建“可观察的”对象，当发生一个感兴趣的事件时可将该事件通告给所有观察者，从而形成松散耦合。

\*_以上内容摘自《Javascript 模式》_