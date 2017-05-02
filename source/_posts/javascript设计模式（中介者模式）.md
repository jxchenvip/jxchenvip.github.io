---
title: javascript设计模式（中介者模式）
tags: [前端,javascript,javascript设计模式]
categories: 前端
date: 2017-05-01 15:10:47
---

## 中介者模式

应用程序，无论其大小，都是由一些单个的对象所组成。所有这些对象需要一种方式来实现相互通信，而这种通信方式在一定程度上不降低可维护性，也不损害那种安全的改变部分应用程序而不会破坏其余部分的能力 。随着应用程序的增长，将添加越来越多的对象。然后在代码重构期间，对象被删除或重新整理。当对象互相知道太多信息并且直接通信（调用对方的方法并改变属性）时，这将会导致产生不良的紧耦合（tight coupling）问题。当对象间紧密耦合时，很难在改变单个对象的同时不影响其他多个对象。因而，即使对应用程序进行最简单的修改也变得不再容易，而且无法估计修改可能花费的时候。

中介者模式缓解了该问题并促进形成松耦合（loose cupling）,而且还有助于提高可维护性。在这种模式中，独立的对象之间并不直接通信，而是通过mediator对象。当其中一个colleague对象改变状态以后，它将会通知该mediator，而meiator将会把该变化传达到任意其他应该知道此变化的colleague对象。

<!-- more -->

### 中介者示例

该应用程序是一个游戏程序，其中两名玩家分别给予半分钟的时候以竞争决胜出谁会比另一个按更多次数的按钮。在比赛中玩家1按2，而玩家2按0。计分板依据当前得分进行更新

本例是参与的对象如下所示：

* 玩家1.
* 玩家2. 

缓存代理

* 计分板（Scoreboard）
* 中介者

中介者知道所有其他对象的信息。它与输入设备键盘进行通信并处理键盘按钮事件，并且还要决定是哪个玩家前进了一个回合，随后还将该消息通知给玩家。玩家玩游戏的同时，还要通知中介者他所做的事情。中介者将更新后的分类传达给计分板，计分板随后更新显示的分值。

除了中介者以外，没有对象知道任何其他对象。这种模式使得更新游戏变得非常简便，以如，通过该中介者可以很容易添加一个新的玩家或者另一个显示剩余时间的显示窗口。

player对象是由Player()构造函数所创建的，具有points和name属性。原型中的play()方法每次以1递增分数，然后通知中介者。

```js

	function Player(name) {
		this.points = 0;
		this.name = name;
	}

	Player.prototype.play = function() {
		this.points += 1;
		mediator.played();
	}

```

scoreboard对象中有一个update()方法，在轮到每个玩家游戏结束之后mediator对象将调用该方法。scoreboard并不知道任何玩家的接口并且也没有保存分值，它仅根据mediator给定的值显示当前分数：

```js

	// the scoreboard object
	var scoreboard = {
	    
	    // HTML element to be updated
	    element: document.getElementById('results'),
	    
	    // update the score display
	    update: function (score) {
	        
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

```

现在，让我们来查看一下mediator对象。它首先初始化游戏，在它的setup()方法中创建player对象，然后这些player对象记录到自己的players属性中。其中，played()方法将在每轮游戏后由player所调用。该方法更新score哈希表并将其发送到scoreboard中以用于显示分值。最后一个方法为keypress(),它用于处理键盘事件，确定那个玩家进行了一个回合并通知该玩家：

<!--
* 中介者
	* 玩家1
	* 玩家2
	* 计分板（0：0）
	* 按钮
-->

``` markdown
		├── mediator                    - 中介者
		│       ├── player home       	- 玩家1
		│       ├── player guest        - 玩家2
		│       ├── keypress            - 按钮
		│       ├── scoreboard          - 计分板（0:0）

```


```js

	var mediator = {
		
		// 所有玩家对象
		players: {},
		
		// 初始化
		setup: function(){
			var players = this.players;
			players.home = new Player('Home');
			players.guest = new Player('Guest');
		},

		// 如果有人玩，则更新分分值
		played: function(){
			var players = this.players,
				score = {
					Home: players.home.points,
					Guest: players.guest.points
				};
			scoreboard.update(score);
		},

		// 处理用户交互
		keypress: function(e) {
			e = e || window.event;// IE浏览器
			if(e.which === 49) { // 按按键 “1”
				mediator.players.home.play();
			}

			if(e.which === 48) { // 按键 “0”
				mediator.players.guest.play();
			}
		}
	};

```

而最后的事情就是要建立以及拆除该游戏：

```js

	// 运行
	mediator.setup();
	window.onkeypress = mediator.keypress;

	// 游戏在30秒内结束
	setTimeout(function(){
		window.onkeypress = null;
		alert("Game over!");
	}, 3000)

```

完整游戏代码：

```html

<!doctype html>
<html>

<head>
    <title>Mediator pattern</title>
    <style>
    #results {
        text-align: center;
        font-size: 100px;
    }
    
    strong {
        color: blue;
    }
    </style>
</head>

<body>
    <p>Player one press "1", player two press "0". Go! (you have half a minute...)</p>
    <div id="results"></div>
    <script>
    // player constructor
    function Player(name) {
        this.points = 0;
        this.name = name;
    }
    // play method
    Player.prototype.play = function() {
        this.points += 1;
        mediator.played();
    };

    // the scoreboard object
    var scoreboard = {

        // HTML element to be updated
        element: document.getElementById('results'),

        // update the score display
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


    var mediator = {

        // all the players
        players: {},

        // 
        setup: function() {
            var players = this.players;
            players.home = new Player('Home');
            players.guest = new Player('Guest');

        },

        // someone plays, update the score
        played: function() {
            var players = this.players,
                score = {
                    Home: players.home.points,
                    Guest: players.guest.points
                };

            scoreboard.update(score);
        },

        // handle user interactions
        keypress: function(e) {
            e = e || window.event; // IE
            if (e.which === 49) { // key "1"
                mediator.players.home.play();
                return;
            }
            if (e.which === 48) { // key "0"
                mediator.players.guest.play();
                return;
            }
        }
    };


    // go!
    mediator.setup();
    window.onkeypress = mediator.keypress;

    // game over in 30 seconds
    setTimeout(function() {
        window.onkeypress = null;
        alert('Game over!');
    }, 30000);
    </script>
</body>

</html>


```

总结：通过使您的对象之间相互并不直接“通话”，而是通过一个中介者对象进行通信，从而促进形成松散耦合。

\*_以上内容摘自《Javascript 模式》_