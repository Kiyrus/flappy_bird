const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const sprite = new Image();
sprite.src = "img/sprite.png";

let volumeInput = document.getElementById("jcp-volume");

const SCORE_S = new Audio();
SCORE_S.src = "sfx/sfx_point.wav";
SCORE_S.volume = volumeInput.value;

const FLAP = new Audio();
FLAP.src = "sfx/sfx_flap.wav";
FLAP.volume = volumeInput.value;

const HIT = new Audio();
HIT.src = "sfx/sfx_hit.wav";
HIT.volume = volumeInput.value;

const SWOOSHING = new Audio();
SWOOSHING.src = "sfx/sfx_swooshing.wav";
SWOOSHING.volume = volumeInput.value;

const CRASH = new Audio();
CRASH.src = "sfx/sfx_crash.wav";
CRASH.volume = volumeInput.value;

volumeInput.addEventListener("change", function () {
    SCORE_S.volume = volumeInput.value;
    FLAP.volume = volumeInput.value;
    HIT.volume = volumeInput.value;
    SWOOSHING.volume = volumeInput.value;
    CRASH.volume = volumeInput.value;
});

canvas.addEventListener("click", function (evt) {
    switch (gameCore.state.current) {
        case gameCore.state.getReady:
            gameCore.state.current = gameCore.state.game;
            SWOOSHING.play();
            break;
        case gameCore.state.game:
            if (bird.y - bird.radius <= 0) return;
            bird.flap();
            FLAP.play();
            break;
        case gameCore.state.over:
            let rect = canvas.getBoundingClientRect();
            let clickX = evt.clientX - rect.left;
            let clickY = evt.clientY - rect.top;

            if (
                clickX >= gameCore.startButton.x &&
                clickX <= gameCore.startButton.x + gameCore.startButton.w &&
                clickY >= gameCore.startButton.y &&
                clickY <= gameCore.startButton.y + gameCore.startButton.h
            ) {
                pipes.reset();
                bird.speedReset();
                score.reset();
                gameCore.state.current = gameCore.state.getReady;
            }
            break;
    }
});

class BackGround {
    constructor() {
        this.sX = 0;
        this.sY = 0;
        this.w = 275;
        this.h = 226;
        this.x = 0;
        this.y = canvas.height - 226;
    }

    draw() {
        context.drawImage(
            sprite,
            this.sX,
            this.sY,
            this.w,
            this.h,
            this.x,
            this.y,
            this.w,
            this.h
        );

        context.drawImage(
            sprite,
            this.sX,
            this.sY,
            this.w,
            this.h,
            this.x + this.w,
            this.y,
            this.w,
            this.h
        );
    }
}

class ForeGround {
    constructor() {
        this.sX = 276;
        this.sY = 0;
        this.w = 224;
        this.h = 112;
        this.x = 0;
        this.y = canvas.height - 112;
        this.dx = 2;
    }

    draw() {
        context.drawImage(
            sprite,
            this.sX,
            this.sY,
            this.w,
            this.h,
            this.x,
            this.y,
            this.w,
            this.h
        );

        context.drawImage(
            sprite,
            this.sX,
            this.sY,
            this.w,
            this.h,
            this.x + this.w,
            this.y,
            this.w,
            this.h
        );
    }

    update() {
        if (gameCore.state.current == gameCore.state.game) {
            this.x = (this.x - this.dx) % (this.w / 2);
        }
    }
}

class Bird {
    constructor() {
        this.animation = [
            { sX: 276, sY: 112 },
            { sX: 276, sY: 139 },
            { sX: 276, sY: 164 },
            { sX: 276, sY: 139 },
        ];
        this.x = 50;
        this.y = 150;
        this.w = 34;
        this.h = 26;

        this.radius = 12;

        this.frame = 0;

        this.gravity = 0.25;
        this.jump = 4.6;
        this.speed = 0;
        this.rotation = 0;
    }

    draw() {
        let bird = this.animation[this.frame];

        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation);
        context.drawImage(
            sprite,
            bird.sX,
            bird.sY,
            this.w,
            this.h,
            -this.w / 2,
            -this.h / 2,
            this.w,
            this.h
        );

        context.restore();
    }

    flap() {
        this.speed = -this.jump;
    }

    update() {
        this.period = gameCore.state.current == gameCore.state.getReady ? 10 : 5;
        this.frame += gameCore.frames % this.period == 0 ? 1 : 0;
        this.frame = this.frame % this.animation.length;

        if (gameCore.state.current == gameCore.state.getReady) {
            this.y = 150;
            this.rotation = 0 * gameCore.DEGREE;
        } else {
            this.speed += this.gravity;
            this.y += this.speed;

            if (this.y + this.h / 2 >= canvas.height - foreGround.h) {
                this.y = canvas.height - foreGround.h - this.h / 2;
                if (gameCore.state.current == gameCore.state.game) {
                    gameCore.state.current = gameCore.state.over;
                    CRASH.play();
                }
            }

            if (this.speed >= this.jump) {
                this.rotation = 90 * gameCore.DEGREE;
                this.frame = 1;
            } else {
                this.rotation = -25 * gameCore.DEGREE;
            }
        }
    }
    speedReset() {
        this.speed = 0;
    }
}

class GetReady {
    constructor() {
        this.sX = 0;
        this.sY = 228;
        this.w = 173;
        this.h = 152;
        this.x = canvas.width / 2 - 173 / 2;
        this.y = 80;
    }

    draw() {
        if (gameCore.state.current == gameCore.state.getReady) {
            context.drawImage(
                sprite,
                this.sX,
                this.sY,
                this.w,
                this.h,
                this.x,
                this.y,
                this.w,
                this.h
            );
        }
    }
}

class GameOver {
    constructor() {
        this.sX = 175;
        this.sY = 228;
        this.w = 225;
        this.h = 202;
        this.x = canvas.width / 2 - 225 / 2;
        this.y = 90;
    }

    draw() {
        if (gameCore.state.current == gameCore.state.over) {
            context.drawImage(
                sprite,
                this.sX,
                this.sY,
                this.w,
                this.h,
                this.x,
                this.y,
                this.w,
                this.h
            );
        }
    }
}

class Pipes {
    constructor() {
        this.position = [];

        this.top = {
            sX: 553,
            sY: 0,
        };
        this.bottom = {
            sX: 502,
            sY: 0,
        };

        this.w = 53;
        this.h = 400;
        this.gap = 85;
        this.maxYPos = -150;
        this.dx = 2;
    }

    draw() {
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];

            let topYPos = p.y;
            let bottomYPos = p.y + this.h + this.gap;

            context.drawImage(
                sprite,
                this.top.sX,
                this.top.sY,
                this.w,
                this.h,
                p.x,
                topYPos,
                this.w,
                this.h
            );

            context.drawImage(
                sprite,
                this.bottom.sX,
                this.bottom.sY,
                this.w,
                this.h,
                p.x,
                bottomYPos,
                this.w,
                this.h
            );
        }
    }

    update() {
        if (gameCore.state.current !== gameCore.state.game) return;

        if (gameCore.frames % 100 == 0) {
            this.position.push({
                x: canvas.width,
                y: this.maxYPos * (Math.random() + 1),
            });
        }
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];

            let bottomPipeYPos = p.y + this.h + this.gap;

            if (
                bird.x + bird.radius > p.x &&
                bird.x - bird.radius < p.x + this.w &&
                bird.y + bird.radius > p.y &&
                bird.y - bird.radius < p.y + this.h
            ) {
                gameCore.state.current = gameCore.state.over;
                HIT.play();
            }

            if (
                bird.x + bird.radius > p.x &&
                bird.x - bird.radius < p.x + this.w &&
                bird.y + bird.radius > bottomPipeYPos &&
                bird.y - bird.radius < bottomPipeYPos + this.h
            ) {
                gameCore.state.current = gameCore.state.over;
                HIT.play();
            }

            p.x -= this.dx;

            if (p.x + this.w <= 0) {
                this.position.shift();
                score.value += 1;
                SCORE_S.play();
                score.best = Math.max(score.value, score.best);
                localStorage.setItem("best", score.best);
            }
        }
    }

    reset() {
        this.position = [];
    }
}

class Score {
    constructor() {
        this.best = parseInt(localStorage.getItem("best")) || 0;
        this.value = 0;
    }

    draw() {
        context.fillStyle = "#FFF";
        context.strokeStyle = "#000";

        if (gameCore.state.current == gameCore.state.game) {
            context.lineWidth = 2;
            context.font = "35px Teko";
            context.fillText(this.value, canvas.width / 2, 50);
            context.strokeText(this.value, canvas.width / 2, 50);
        } else if (gameCore.state.current == gameCore.state.over) {
            context.font = "25px Teko";
            context.fillText(this.value, 225, 186);
            context.strokeText(this.value, 225, 186);

            context.fillText(this.best, 225, 228);
            context.strokeText(this.best, 225, 228);
        }
    }

    reset() {
        this.value = 0;
    }
}

class Game {
    constructor() {
        this.state = {
            current: 0,
            getReady: 0,
            game: 1,
            over: 2,
        };
        this.startButton = {
            x: 120,
            y: 263,
            w: 83,
            h: 29,
        };
        this.frames = 0;
        this.DEGREE = Math.PI / 180;
    }

    draw() {
        context.fillStyle = "#70c5ce";
        context.fillRect(0, 0, canvas.width, canvas.height);

        backGround.draw();
        pipes.draw();
        foreGround.draw();
        bird.draw();
        getReady.draw();
        gameOver.draw();
        score.draw();
    }

    update() {
        bird.update();
        foreGround.update();
        pipes.update();
    }

    loop = () => {
        this.update();
        this.draw();
        this.frames++;
        requestAnimationFrame(this.loop);
    }
}

const score = new Score();
const pipes = new Pipes();
const gameOver = new GameOver();
const getReady = new GetReady();
const bird = new Bird();
const foreGround = new ForeGround();
const backGround = new BackGround();
const gameCore = new Game();
gameCore.loop();
