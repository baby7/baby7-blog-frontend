<template>
    <canvas id="myCanvas" class="background-particles">

    </canvas>
</template>

<script>
export default {
    name: "BackgroundParticles",
    data() {
        return {
            canvas: null,
            ctx: null,
            balls: [],
            n: 150
        }
    },
    methods: {
        Ball(ball) {
            ball.x = this.randomNum(3, this.canvas.width - 3);
            ball.y = this.randomNum(3, this.canvas.height - 3);
            ball.r = this.randomNum(1, 3);
            ball.color = "rgb(64,158,255)";
            //小球速度
            ball.speedX = this.randomNum(-3, 3) * 0.6;
            ball.speedY = this.randomNum(-3, 3) * 0.6;
        },
        draw(ball) {
            this.ctx.beginPath();
            this.ctx.globalAlpha = 0.4;
            this.ctx.fillStyle = ball.color;
            this.ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
            this.ctx.fill();
        },
        move(ball) {
            ball.x += ball.speedX;
            ball.y += ball.speedY;
            //为了合理性,设置极限值
            if (ball.x <= 3 || ball.x > this.canvas.width - 3) {
                ball.speedX *= -1;
            }
            if (ball.y <= 3 || ball.y >= this.canvas.height - 3) {
                ball.speedY *= -1;
            }
        },
        drawLine() {
            let distance;
            for (let i = 0; i < this.balls.length; i++) {
                this.draw(this.balls[i]);
                this.move(this.balls[i]);
                for (let j = 0; j < this.balls.length; j++) {
                    if (i !== j) {
                        distance = Math.sqrt(Math.pow((this.balls[i].x - this.balls[j].x), 2)
                            + Math.pow((this.balls[i].y - this.balls[j].y), 2));
                        if (distance < 130) {
                            this.ctx.beginPath();
                            this.ctx.moveTo(this.balls[i].x, this.balls[i].y);
                            this.ctx.lineTo(this.balls[j].x, this.balls[j].y);
                            this.ctx.strokeStyle = "rgba(64,158,255," + (1 - distance / 130) + ")";
                            this.ctx.stroke();
                        }
                    }
                }
            }
        },
        main() {
            let step = (timestamp, elapsed) => {
                //一秒30帧
                if (elapsed > 1000 / 30) {
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    //小球与小球之间自动画线
                    this.drawLine();
                    elapsed = 0
                }

                window.requestAnimationFrame(
                    _timestamp => step(_timestamp, elapsed + _timestamp - timestamp)
                )
            };
            window.requestAnimationFrame(timestamp => step(timestamp, 0))
        },
        randomNum(m, n) {
            return Math.floor(Math.random() * (n - m + 1) + m);
        }
    },
    mounted() {
        //初始化
        this.canvas = document.getElementById("myCanvas")
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        this.ctx = this.canvas.getContext("2d");
        //创建小球
        for (let i = 0; i < this.n; i++) {
            let ball = {};
            this.Ball(ball);
            this.balls.push(ball);
        }
        this.main()
    },
}
</script>

<style scoped>
    .background-particles {
        opacity: 0.7;
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 1;
        pointer-events: none;
    }
</style>
