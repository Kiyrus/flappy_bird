const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const image = new Image(606, 428);

image.src = "img/sprite.png";

context.fillStyle = "#70c5ce";
context.fillRect(0, 0, canvas.width, canvas.height);

let birdFrames = [
    { sX: 276, sY: 112 },
    { sX: 276, sY: 139 },
    { sX: 276, sY: 164 },
    { sX: 276, sY: 139 },
];
let frameIndex = 0;
let frameRate = 10;

function drawBackground(sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight) {
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

image.onload = function () {
    drawBackground(0, 0, 276, 228, 0, 252, 276, 228);
    drawForeground(277, 0, 222, 112, 0, 368, 320, 112);
    drawBird(276, 113, 34, 26, 50, 150, 34, 26);
    animationBird();
};

function animationBird() {
    setTimeout(function () {
        if (frameIndex >= birdFrames.length) {
            frameIndex = 0;
        }
        context.fillRect(50, 150, 34, 26);
        drawBird(
            birdFrames[frameIndex].sX,
            birdFrames[frameIndex].sY,
            34,
            26,
            50,
            150,
            34,
            26
        );
        frameIndex++;
        requestAnimationFrame(animationBird);
    }, 1000 / frameRate);
}
