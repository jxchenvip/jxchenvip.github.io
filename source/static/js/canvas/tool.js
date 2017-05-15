;
(function() {
    window.__ = {
        canvas: document.createElement('canvas').getContext,
        /**
         * [$ 获取id]
         * @param  {[String]} id
         * @return {[object]} dom节点
         */
        $: function(id) {
            return document.getElementById(id);
        },
        /**
         * [d2a 角度转弧度]
         * @param  {[number]} n [角度]
         * @return {[number]}   [弧度]
         */
        d2a: function(n) {
            return n * Math.PI / 180;
        },
        /**
         * [clear 清除画布]
         * @param  {[object]} context
         * @return {[void]}       
         */
        clear: function(context) {
            var c = context.canvas;
            context.clearRect(0, 0, c.width, c.height);
        },
        /**
         * [createCanvas 创建canvas元素]
         * @return {[object]}
         */
        createCanvas: function(W, H) {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            canvas.width = W || 200;
            canvas.height = H || 200;
            return context;
        },
        /**
         * [createCanvasImage description]
         * @param  {[object]} ele     [dom节点]
         * @param  {[object]} context [画布]
         * @return {[void]}
         */
        createCanvasImage: function(ele, context) {
            var img = ele.getElementsByTagName('img')[0],
                src = context.canvas.toDataURL();
            if (img) {
                var a = ele.getElementsByTagName('a')[0];
                a && (a.href = src);
                img.src = src;
            } else {
                ele.innerHTML = "<img src=" + src + " />";
            }
        },

        /**
         * [createText 添加文字]
         * @param  {[type]} context [description]
         * @param  {[number]} font    [字体]
         * @param  {[number]} x       [x坐标]
         * @param  {[number]} y       [y坐标]
         */
        createText: function(context, font, x, y) {
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.font = '14px Arial';
            context.fillText(font, x, y);
        },
        /**
         * [drawRadiusRect 画圆角矩形]
         * @param  {[Number]} x [x坐标]
         * @param  {[Number]} y [y坐标]
         * @param  {[Number]} w [宽度]
         * @param  {[Number]} h [高度]
         * @param  {[Number]} r [弧度半径]
         */
        drawRoundRect: function(ctx, x, y, w, h, r) {
            if (r > Math.abs(w / 2)) r = Math.abs(w / 2);
            var points = this.getRectPoints(x, y, w, h),
                sx = x + (w > 0 ? r : -r),
                sy = y;
            ctx.beginPath();
            points.forEach(function(item, index) {
                ctx.arcTo(sx, sy, item.x, item.y, r);
                sx = item.x;
                sy = item.y;
            })
            ctx.stroke();
            ctx.closePath();
        },
        /**
         * [drawRadiusRect 复杂版二次贝塞尔方式实现圆角矩形]
         * @param  {[object]} context [context]
         * @param  {[Number]} x [x坐标]
         * @param  {[Number]} y [y坐标]
         * @param  {[Number]} w [宽度]
         * @param  {[Number]} h [高度]
         * @param  {[Number]} r [弧度半径]
         */
        drawRoundRect2: function(context, x, y, w, h, r) {
            if (r > Math.abs(w / 2)) {
                r = Math.abs(w / 2)
            }

            var points = this.getRectPoints(x, y, w, h);
            context.beginPath();
            points.forEach(function(item, index) {
                var d1 = this.d2a(index * 90),
                    x1 = Math.cos(d1) * r,
                    y1 = Math.sin(d1) * r,
                    d2 = this.d2a((index - 1) * 90),
                    x2 = Math.cos(d2) * r,
                    y2 = Math.sin(d2) * r;

                if (w > 0) {
                    x1 *= -1;
                    x2 *= -1;
                }
                if (h > 0) {
                    y1 *= -1;
                    y2 *= -1;
                }

                context.lineTo(item.x + x1, item.y + y1);
                context.quadraticCurveTo(item.x, item.y, item.x + x2, item.y + y2);
            }.bind(this))
            context.stroke();
            context.closePath();
        },
        /**
         * [getPoints 获取矩形顶点]
         * @param  {[Number]} x [x坐标]
         * @param  {[Number]} y [y坐标]
         * @param  {[Number]} w [宽度]
         * @param  {[Number]} h [高度]
         * @return {[Array]}   [数组]
         */
        getRectPoints: function(x, y, w, h) {
            var points = [],
                cx = x,
                cy = y;
            var i = 0;

            while (i != 5) {
                var de = this.d2a(i * 90),
                    x1 = cx + Math.cos(de) * w,
                    y1 = cy + Math.sin(de) * h;
                cx = x1;
                cy = y1;
                points.push({ x: x1, y: y1 });
                i++;
            }

            return points;
        }
    };
})();

(function() {
    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}());
