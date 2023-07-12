const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const image = new Image(606, 428);
image.src = "img/sprite.png";
image.onload = function () {
    const startGame = new Game(canvas, context, image);
    startGame.draw();
};

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = context;
        this.image = image;

        this.background = new Background(0, 0, 276, 228, 0, 252, 276, 228);
        this.foreground = new Foreground(277, 0, 222, 112, 0, 368, 320, 112);
        this.bird = new Bird();
        this.pipes = [];
        this.score = new Score();
        this.sound = new Sound();

        // this.init();
    }

    draw() {
        this.background.draw(this.image);
        this.foreground.draw(this.image);
    }

    run() {}

    loop() {}

    gameOver() {}
}

class Background {
    constructor(sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight) {
        this.sX = sX;
        this.sY = sY;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
        this.dX = dX;
        this.dY = dY;
        this.dWidth = dWidth;
        this.dHeight = dHeight;
    }

    draw(image) {
        context.fillStyle = "#70c5ce";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
            image,
            this.sX,
            this.sY,
            this.sWidth,
            this.sHeight,
            this.dX,
            this.dY,
            this.dWidth,
            this.dHeight
        );
        context.drawImage(
            image,
            this.sX,
            this.sY,
            this.sWidth,
            this.sHeight,
            this.dX + this.dWidth,
            this.dY,
            this.dWidth,
            this.dHeight
        );
    }
}

class Foreground {
    constructor(sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight, /* speed, */ image) {
        this.sX = sX;
        this.sY = sY;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
        this.dX = dX;
        this.dY = dY;
        this.dWidth = dWidth;
        this.dHeight = dHeight;
        // this.speed = speed;
        this.image = image;
    }

    draw(image) {
        context.drawImage(
            image,
            this.sX,
            this.sY,
            this.sWidth,
            this.sHeight,
            this.dX,
            this.dY,
            this.dWidth,
            this.dHeight
        );
        context.drawImage(
            image,
            this.sX,
            this.sY,
            this.sWidth,
            this.sHeight,
            this.dX + this.dWidth,
            this.dY,
            this.dWidth,
            this.dHeight
        );
    }

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

const startGame = new Game();
startGame.draw();
