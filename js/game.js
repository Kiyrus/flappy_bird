class Game {
    constructor(canvas) {
        const canvas = document.getElementById("canvas");
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

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

    draw() {}

    run() {}

    gameOver() {}
}

class Background {
    constructor(x, y, width, height, image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
    }

    draw() {}
}

class Foreground {
    constructor(x, y, width, height, speed, image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.image = image;
    }

    draw() {}

    update() {}
}

class Bird {
    constructor() {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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

    play() {
    }

    stop() {
    }
}
