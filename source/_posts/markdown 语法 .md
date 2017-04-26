---
title: markdown 语法 
categories: 前端
tags: markdown
---

###  标题

Markdown支持两种样式的头文件，Setext和atx。
Setext样式标题使用等号（对于第一级标题）和破折号（对于第二级标题）使用“下划线”。例如：

<!-- # This is an H1
## This is an H2
 -->
```
    This is an H1
    =============
    This is an H2
    -------------
```

<!--more-->


Atx风格的标题在行的开头使用1-6个散列字符，对应于标题级别1-6。例如：

<!-- # This is an H1
## This is an H2
###  This is an H3 -->
```
    # This is an H1
    ## This is an H2
    ###  This is an H3
```

或者，您可以“关闭”atx样式的标题。这是纯粹的装饰品 - 你可以使用这，如果你认为它看起来更好。关闭哈希甚至不需要匹配用于打开头的哈希数。（打开散列的数量决定标题级别。）

<!-- # This is an H1 #
## This is an H2 ##
###  This is an H3 ### -->

```
    # This is an H1 #
    ## This is an H2 ##
    ###  This is an H3 ###
```

###  块引用

Markdown使用电子邮件样式>字符进行块引用。如果您熟悉在电子邮件中引用文本段落，那么您知道如何在Markdown中创建块引用。它看起来最好，如果你硬包装文本，并加>在每一行之前：

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
> 
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.
    
```
    > This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
    > consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
    > Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
    > 
    > Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
    > id sem consectetuer libero luctus adipiscing.
```

Markdown允许你懒惰，只把>一个硬包装的段落的第一行：

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
id sem consectetuer libero luctus adipiscing.

```
    > This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
    consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
    Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    > Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
    id sem consectetuer libero luctus adipiscing.
```

块引用可以通过添加以下级别来嵌套（即blockquote-in-a-blockquote）>：

> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.

```
    > This is the first level of quoting.
    >
    > > This is nested blockquote.
    >
    > Back to the first level.
```

块引用可以包含其他Markdown元素，包括头，列表和代码块：

> This is a header.
> 
> 1.   This is the first list item.
> 2.   This is the second list item.
> 
> Here's some example code:
> 
>    return shell_exec("echo $input | $markdown_script");

```
    > ## This is a header.
    > 
    > 1.   This is the first list item.
    > 2.   This is the second list item.
    > 
    > Here's some example code:
    > 
    >     return shell_exec("echo $input | $markdown_script");
```

任何体面的文本编辑器应该使电子邮件风格的报价很容易。例如，使用BBEdit，您可以进行选择，并从文本菜单中选择增加报价级别。

###  列表

Markdown支持有序（编号）和无序（项目符号）列表。

无序列表使用星号，加号和连字符（可互换）作为列表标记：

*   Red
*   Green
*   Blue

```
        *   Red
        *   Green
        *   Blue
    等效于：
        +   Red
        +   Green
        +   Blue
    和：
        -   Red
        -   Green
        -   Blue
```
有序列表使用数字后跟句点：
```
    1.  Bird
    2.  McHale
    3.  Parish
```
请务必注意，用于标记列表的实际数字对Markdown生成的HTML输出没有影响。从上面的列表生成的HTML Markdown是：
```
    <ol>
        <li>Bird</li>
        <li>McHale</li>
        <li>Parish</li>
    </ol>
```
如果你改为写在Markdown中的列表，像这样：
```
    1.  Bird
    1.  McHale
    1.  Parish
```
甚至：
```
    3. Bird
    1. McHale
    8. Parish
```
您将获得完全相同的HTML输出。关键是，如果你想，你可以使用顺序号在您的有序Markdown列表，以便源中的数字匹配您发布的HTML中的数字。但如果你想懒惰，你不必。

但是，如果您使用惰性列表编号，您仍然应该使用编号1开始列表。在将来的某个时候，Markdown可以支持以任意数字开始排序列表。

列表标记通常从左边距开始，但可以缩进最多三个空格。列表标记后必须跟有一个或多个空格或制表符。

要使列表看起来不错，您可以使用悬挂缩排包装项目：
```
    *   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
        Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
        viverra nec, fringilla in, laoreet vitae, risus.
    *   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
        Suspendisse id sem consectetuer libero luctus adipiscing.
```
但如果你想懒惰，你不必：
```
    *   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
    viverra nec, fringilla in, laoreet vitae, risus.
    *   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
    Suspendisse id sem consectetuer libero luctus adipiscing.
```
如果列表项由空行分隔，Markdown将<p>在HTML输出中的标签中包装项。例如，此输入：
```
    *   Bird
    *   Magic
```
将变成：
```
    <ul>
        <li>Bird</li>
        <li>Magic</li>
    </ul>
```
但是这个：
```
    *   Bird

    *   Magic
```
将变成：
```
    <ul>
        <li><p>Bird</p></li>
        <li><p>Magic</p></li>
    </ul>
```
列表项可以由多个段落组成。列表项中的每个后续段落必须缩进为4个空格或一个制表符：

1.  This is a list item with two paragraphs. Lorem ipsum dolor
    sit amet, consectetuer adipiscing elit. Aliquam hendrerit
    mi posuere lectus.

    Vestibulum enim wisi, viverra nec, fringilla in, laoreet
    vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
    sit amet velit.

2.  Suspendisse id sem consectetuer libero luctus adipiscing.
```

    1.  This is a list item with two paragraphs. Lorem ipsum dolor
        sit amet, consectetuer adipiscing elit. Aliquam hendrerit
        mi posuere lectus.

        Vestibulum enim wisi, viverra nec, fringilla in, laoreet
        vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
        sit amet velit.

    2.  Suspendisse id sem consectetuer libero luctus adipiscing.
```
它看起来不错，如果你缩进后面的段落的每一行，但在这里，Markdown将允许你是懒惰：

*   This is a list item with two paragraphs.

    This is the second paragraph in the list item. You're
only required to indent the first line. Lorem ipsum dolor
sit amet, consectetuer adipiscing elit.

*   Another item in the same list.

```
    *   This is a list item with two paragraphs.

        This is the second paragraph in the list item. You're
    only required to indent the first line. Lorem ipsum dolor
    sit amet, consectetuer adipiscing elit.

    *   Another item in the same list.
```
要在列表项中放置blockquote，blockquote的> 分隔符需要缩进：

*   A list item with a blockquote:

    > This is a blockquote
    > inside a list item.

```
    *   A list item with a blockquote:

        > This is a blockquote
        > inside a list item.
```
要将代码块放在列表项中，代码块需要缩进两次 - 8个空格或两个制表符：

*   A list item with a code block:

        <code goes here>


```
    *   A list item with a code block:

            <code goes here>;
```


值得注意的是，有可能偶然触发一个有序列表，通过这样写：
```
    1986. What a great season.
```
换句话说，一个数字周期空间序列在一行的开始。为了避免这种情况，可以反斜杠转义期间：
```
    1986\. What a great season.
```

###  代码块

预格式化代码块用于编写或标记源代码。不是形成正常的段落，代码块的行被逐字地解释。Markdown在两个&lt;pre&gt; 和&lt;code&gt;标签中包装一个代码块。

要在Markdown中生成代码块，只需将该块的每一行缩进至少4个空格或1个制表符。例如，给定此输入

This is a normal paragraph:
```
    This is a code block.
```
Markdown将生成：
```
    <p>This is a normal paragraph:</p>

    <pre><code>This is a code block.
    </code></pre>
```
从代码块的每一行中删除一个缩进级别（4个空格或1个制表符）。例如，这：
```
    Here is an example of AppleScript:

        tell application "Foo"
            beep
        end tell
```

将变成：
```
    <p>Here is an example of AppleScript:</p>

    <pre><code>tell application "Foo"
        beep
    end tell
    </code></pre>
```


代码块继续，直到它到达没有缩进的行（或文章的结尾）。

在代码块中，ampersands（&）和尖括号（<和>）将自动转换为HTML实体。这使得很容易包含使用Markdown的示例HTML源代码 - 只需粘贴和缩进它，Markdown将处理和号和尖括号的编码的麻烦。例如，这：
```
    <div class="footer">
        &copy; 2004 Foo Corporation
    </div>
```

将变成：
```
    <pre><code>&lt;div class="footer"&gt;
        &amp;copy; 2004 Foo Corporation
    &lt;/div&gt;
    </code></pre>
```

规则Markdown语法不在代码块中处理。例如，星号只是代码块中的字面星号。这意味着它也很容易使用Markdown来描述Markdown自己的语法。

### 水平线

您可以<hr />通过自己在一行上放置三个或更多连字符，星号或下划线来生成水平规则标记（）。如果您愿意，可以在连字符或星号之间使用空格。以下每行都将生成一个水平线：

* * *

***

*****

- - -

---------------------------------------
```
    * * *

    ***

    *****

    - - -

    ---------------------------------------
```

###  链接

Markdown支持两种类型的链接：内联和引用。

在两种样式中，链接文本由[方括号]分隔。

要创建内联链接，请在链接文本的结束方括号后立即使用一组常规括号。在括号内，将您希望链接指向的URL，以及链接的可选 标题（用引号括起来）。例如：
```
    This is [an example](http://example.com/ "Title") inline link.

    [This link](http://example.net/) has no title attribute.
```
会产生：
```
    <p>This is <a href="http://example.com/" title="Title">
    an example</a> inline link.</p>

    <p><a href="http://example.net/">This link</a> has no
    title attribute.</p>
```

如果您指的是同一台服务器上的本地资源，则可以使用相对路径：
```
    See my [About](/about/) page for details.   
```
参考样式链接使用第二组方括号，在其中放置您选择的标签以标识链接：
```
    This is [an example][id] reference-style link.
```
您可以选择使用空格分隔括号集：
```
    This is [an example] [id] reference-style link.
```
然后，在文档中的任何位置，您都可以这样定义您的链接标签：
```
    [id]: http://example.com/  "Optional Title Here"
```
* 包含链接标识符的方括号（可选地使用最多三个空格从左边距缩进）;
* 其次是分号;
* 后跟一个或多个空格（或制表符）;
* 后面是链接的URL;
* 可选地后跟链接的标题属性，用双引号或单引号括起来，或括在括号中。

以下三个链接定义是等效的：
```
    [foo]: http://example.com/  "Optional Title Here"
    [foo]: http://example.com/  'Optional Title Here'
    [foo]: http://example.com/  (Optional Title Here)
```
注意： Markdown.pl 1.0.1中有一个已知的错误，它阻止单引号用于定界链接标题。

链接URL可以可选地由尖括号包围：
```
    [id]: <http://example.com/>  "Optional Title Here"
```
您可以将title属性放在下一行，并使用额外的空格或制表符进行填充，这对于较长的网址往往看起来更好：
```
    [id]: http://example.com/longish/path/to/resource/here
    "Optional Title Here"
```
链接定义仅用于在Markdown处理期间创建链接，并在HTML输出中从您的文档中删除。

链接定义名称可以由字母，数字，空格和标点符号组成 - 但它们不区分大小写。例如这两个链接：
```
    [link text][a]
    [link text][A]
```
是等价的。

该隐含链接名称的快捷方式，您可以省略的链接，在这种情况下，链接文本本身被用作名称的名称。只需使用一组空的方括号 - 例如，将单词“Google”链接到google.com网站，您可以简单地写：
```
    [Google][]
```
然后定义链接：
```
    [Google]: http://google.com/
```
因为链接名称可能包含空格，所以此快捷方式甚至适用于链接文本中的多个单词：
```
    Visit [Daring Fireball][] for more information.
```
然后定义链接：
```
    [Daring Fireball]: http://daringfireball.net/
```
链接定义可以放置在Markdown文档中的任何位置。我倾向于把它们放在使用它们的每个段落之后，但如果你想要的话，你可以把它们都放在文档的末尾，就像脚注一样。

以下是实际引用链接的示例：
```
    I get 10 times more traffic from [Google] [1] than from
    [Yahoo] [2] or [MSN] [3].

     [1]: http://google.com/        "Google"
     [2]: http://search.yahoo.com/  "Yahoo Search"
     [3]: http://search.msn.com/    "MSN Search"
```
使用隐式链接名称快捷方式，您可以改为写：
```
    I get 10 times more traffic from [Google][] than from
    [Yahoo][] or [MSN][].

      [google]: http://google.com/        "Google"
      [yahoo]:  http://search.yahoo.com/  "Yahoo Search"
      [msn]:    http://search.msn.com/    "MSN Search"
```
上述两个示例都将生成以下HTML输出：
```
    <p>I get 10 times more traffic from <a href="http://google.com/"
    title="Google">Google</a> than from
    <a href="http://search.yahoo.com/" title="Yahoo Search">Yahoo</a>
    or <a href="http://search.msn.com/" title="MSN Search">MSN</a>.</p>
```
为了比较，这里是使用Markdown的内联链接风格编写的同一段：
```
    I get 10 times more traffic from [Google](http://google.com/ "Google")
    than from [Yahoo](http://search.yahoo.com/ "Yahoo Search") or
    [MSN](http://search.msn.com/ "MSN Search").
```
参考样式链接的点不是它们更容易写。重点是，使用引用样式链接，您的文档源具有更大的可读性。比较上面的例子：使用引用式链接，段落本身只有81个字符长; 带有内联样式链接，它有176个字符; 作为原始HTML，它是234个字符。在原始HTML中，有更多的标记比文本。

使用Markdown的引用样式链接，源文档更像是在浏览器中呈现的最终输出。通过允许您将与标记相关的元数据移出段落，您可以添加链接，而不会中断散文的叙述流程。

###  重点

*single asterisks*

_single underscores_

**double asterisks**

__double underscores__
```
    *single asterisks*

    _single underscores_

    **double asterisks**

    __double underscores__
```
将产生：
```
    <em>single asterisks</em>

    <em>single underscores</em>

    <strong>double asterisks</strong>

    <strong>double underscores</strong>
```
你可以使用任何你喜欢的风格; 唯一的限制是，必须使用相同的字符来打开和关闭强调跨度。

强调可以在单词的中间使用：

un*frigging*believable
```
    un*frigging*believable
```
但是如果你围绕一个*或者_包含空格，它将被视为一个字母星号或下划线。

要在将用作强调分隔符的位置生成文字星号或下划线，可以反斜杠转义：
```
    \*this text is surrounded by literal asterisks\*
```
###  代码

要指示一段代码，用反引号引号（`）括起来。与预格式化代码块不同，代码跨度表示正常段落内的代码。例如：
```
    Use the `printf()` function.
```
将产生：
```
    <p>Use the <code>printf()</code> function.</p>
```
要在代码范围内包含文字反引号字符，可以使用多个反引号作为开始和结束分隔符：
```
    ``There is a literal backtick (`) here.``
```
这将产生：
```
    <p><code>There is a literal backtick (`) here.</code></p>
```
围绕代码跨度的反引号分隔符可以包括空格 - 一个在开头之后，一个在结束之前。这允许您在代码跨度的开始或结束处放置文字反引号字符：
```
    A single backtick in a code span: `` ` ``

    A backtick-delimited string in a code span: `` `foo` ``
```
将产生：
```
    <p>A single backtick in a code span: <code>`</code></p>

    <p>A backtick-delimited string in a code span: <code>`foo`</code></p>
```
使用代码跨度，＆号和尖括号自动编码为HTML实体，这使得容易包括示例HTML标记。Markdown会变成这样：
```
    Please don't use any `<blink>` tags.
    `&#8212;` is the decimal-encoded equivalent of `&mdash;`.
    <p>Please don't use any <code>&lt;blink&gt;</code> tags.</p>
```
生产：
```
    <p><code>&amp;#8212;</code> is the decimal-encoded
    equivalent of <code>&amp;mdash;</code>.</p>
```
###  图片

不可否认，设计一个“自然”语法将图像放入纯文本文档格式是相当困难的。

Markdown使用的图像语法类似于链接的语法，允许两种样式：内联和引用。

内联图像语法如下所示：
```
    ![Alt text](/path/to/img.jpg)
    ![Alt text](/path/to/img.jpg "Optional title")
```
* 感叹号：!;
* 后跟一组方括号，包含alt 图像的属性文本;
* 后跟一组括号，包含图像的URL或路径，以及用title双引号或单引号括起来的可选属性。

参考样式图像语法如下所示：
```
    ![Alt text][id]
```
其中“id”是定义的图像引用的名称。图像引用使用与链接引用相同的语法来定义：
```
    [id]: url/to/image  "Optional title attribute"
```
在撰写本文时，Markdown没有用于指定图像尺寸的语法; 如果这对你很重要，你可以简单地使用常规的HTML <img>标签。

###  自动链接

Markdown支持用于为URL和电子邮件地址创建“自动”链接的快捷方式样式：只需用尖括号括住URL或电子邮件地址。这意味着，如果您想要显示网址或电子邮件地址的实际文字，并将其设为可点击的链接，则可以执行以下操作：
```
    <http://example.com/>
```
Markdown会把这个变成：
```
    <a href="http://example.com/">http://example.com/</a>
```
电子邮件地址的自动链接的工作方式类似，除了Markdown还将执行一点随机十进制和十六进制实体编码，以帮助遮掩从地址收获垃圾邮件的地址。例如，Markdown将会这样：
```
    <address@example.com>
```
成这样的东西：
```
    <a href="&#x6D;&#x61;i&#x6C;&#x74;&#x6F;:&#x61;&#x64;&#x64;&#x72;&#x65;
    &#115;&#115;&#64;&#101;&#120;&#x61;&#109;&#x70;&#x6C;e&#x2E;&#99;&#111;
    &#109;">&#x61;&#x64;&#x64;&#x72;&#x65;&#115;&#115;&#64;&#101;&#120;&#x61;
    &#109;&#x70;&#x6C;e&#x2E;&#99;&#111;&#109;</a>
```
它将在浏览器中显示为“address@example.com”的可点击链接。

（这种实体编码技巧确实会欺骗许多（如果不是大多数）地址捕获机器人，但它绝对不会欺骗所有它们，这比没有什么更好，但是以这种方式发布的地址可能最终开始接收垃圾邮件。）

###  反斜杠转义

Markdown允许您使用反斜杠转义来生成文字字符，否则在Markdown的格式化语法中会有特殊的意义。例如，如果您想用字母星号（而不是HTML &lt;em&gt;标记）围绕一个单词，则可以在星号之前使用反斜杠，如下所示：
```
    \*literal asterisks\*
```
Markdown为以下字符提供反斜杠转义：
```
    \   backslash
    `   backtick
    *   asterisk
    _   underscore
    {}  curly braces
    []  square brackets
    ()  parentheses
    #   hash mark
    +   plus sign
    -   minus sign (hyphen)
    .   dot
    !   exclamation mark

```
*以上内容来自：<http://daringfireball.net/projects/markdown/syntax>*