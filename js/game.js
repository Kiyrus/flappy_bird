const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const image = new Image(606, 428);

image.src = "img/sprite.png";

let birdFrames = [
    { sX: 276, sY: 112 },
    { sX: 276, sY: 139 },
    { sX: 276, sY: 164 },
    { sX: 276, sY: 139 },
];
let frameIndex = 0;
let frameRate = 10;

let birdX = 50;
let birdY = 150;
let pipeUpX = 200;
let pipeUpY = -250;
let pipeDownX = 200;
let pipeDownY = 250;

let foregroundY = 340;

let birdVelocity = 0;

let gameOver = false;

document.addEventListener("keydown", function (event) {
    if (event.key === " " && !gameOver) {
        birdVelocity = -10;
    }
});

function drawStartScrean(sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight) {
    context.drawImage(image, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);
}

function drawBackground(sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight) {
    context.fillStyle = "#70c5ce";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);
    context.drawImage(image, sX, sY, sWidth, sHeight, dX + dWidth, dY, dWidth, dHeight);
}

function drawForeground(sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight) {
    context.drawImage(image, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);
    context.drawImage(image, sX, sY, sWidth, sHeight, dX + dWidth, dY, dWidth, dHeight);
}

function drawBird(sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight) {
    context.drawImage(image, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);
}

function drawPipeUp(sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight) {
    context.drawImage(image, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);
}

function drawPipeDown(sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight) {
    context.drawImage(image, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);
}

function drawGameOverScreen(sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight) {
    context.drawImage(image, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);
}

image.onload = function () {
    drawBackground(0, 0, 276, 228, 0, 252, 276, 228);

    drawPipeUp(554, 0, 51, 410, pipeUpX, pipeUpY, 53, 400);
    drawPipeDown(502, 0, 51, 410, pipeDownX, pipeDownY, 53, 400);

    drawForeground(277, 0, 222, 112, 0, 368, 320, 112);
    drawBird(276, 113, 34, 26, birdX, birdY, 34, 26);

    animationBird();
};

function animationBird() {
    setTimeout(function () {
        if (frameIndex >= birdFrames.length) {
            frameIndex = 0;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground(0, 0, 276, 228, 0, 252, 276, 228);

        birdY += birdVelocity;
        birdVelocity += 1;
        pipeUpX -= 2;
        pipeDownX -= 2;

        if (
            birdY >= foregroundY ||
            (birdX + 34 >= pipeUpX &&
                birdX <= pipeUpX + 53 &&
                (birdY <= pipeUpY + 400 || birdY + 26 >= pipeDownY))
        ) {
            gameOver = true;
        }

        drawPipeUp(554, 0, 51, 410, pipeUpX, pipeUpY, 53, 400);
        drawPipeDown(502, 0, 51, 410, pipeDownX, pipeDownY, 53, 400);
        drawForeground(277, 0, 222, 112, 0, 368, 320, 112);
        drawBird(
            birdFrames[frameIndex].sX,
            birdFrames[frameIndex].sY,
            34,
            26,
            birdX,
            birdY,
            34,
            26
        );

        if (gameOver) {
            drawGameOverScreen(789, 116, 191, 55, 50, 150, 191, 55);
        } else {
            frameIndex++;
            requestAnimationFrame(animationBird);
        }
    }, 1000 / frameRate);
}
