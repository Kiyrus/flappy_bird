const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = context;

        this.background = new Background();
        this.foreground = new Foreground();
        this.bird = new Bird();
        this.pipes = [];
        this.score = new Score();
        this.sound = new Sound();

        this.init();
    }

    init() {}

    update() {}

    draw() {
        this.background.draw();
        this.foreground.draw();
        this.bird.draw();
        this.pipes.forEach((pipe) => pipe.draw());
        this.score.draw();
    }

    run() {}

    gameOver() {}
}

class Background {
    constructor(sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight, image) {
        this.sX = sX;
        this.sY = sY;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
        this.dX = dX;
        this.dY = dY;
        this.dWidth = dWidth;
        this.dHeight = dHeight;
        this.image = image;
    }

    draw() {
        context.drawImage(
            this.image,
            this.sX,
            this.sY,
            this.sWidth,
            this.sHeight,
            this.dX,
            this.dY,
            this.dWidth,
            this.dHeight,
        );
        context.drawImage(
            this.image,
            this.sX,
            this.sY,
            this.sWidth,
            this.sHeight,
            this.dX + this.dWidth,
            this.dY,
            this.dWidth,
            this.dHeight,
        );
    }
}

class Foreground {
    constructor(sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight, speed, image) {
        this.sX = sX;
        this.sY = sY;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
        this.dX = dX;
        this.dY = dY;
        this.dWidth = dWidth;
        this.dHeight = dHeight;
        this.speed = speed;
        this.image = image;
    }

    draw() {}

    update() {}
}

class Bird {
    constructor(sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight) {
        this.sX = sX;
        this.sY = sY;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
        this.dX = dX;
        this.dY = dY;
        this.dWidth = dWidth;
        this.dHeight = dHeight;
        this.velocity = 0;
        this.gravity = 0;
        this.lift = 0;
    }

    draw() {}

    update() {}

    flap() {}
}

class Pipes {
    constructor(
        x,
        y,
        width,
        height,
        gap,
        speed,
        pipeImage,
        pipeNorthImage,
        pipeSouthImage
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.gap = gap;
        this.speed = speed;
        this.pipeImage = pipeImage;
        this.pipeNorthImage = pipeNorthImage;
        this.pipeSouthImage = pipeSouthImage;
        this.pipes = [];
        this.generatePipes();
    }

    generatePipes() {}

    draw() {}

    update() {}
}

class Score {
    constructor(x, y) {
        this.score = 0;
        this.x = x;
        this.y = y;
    }

    draw() {}

    update() {}
}

class Sound {
    constructor(src) {
        this.audio = new Audio(src);
        this.src = src;
    }

    play() {}

    stop() {}
}
