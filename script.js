const timeInput = document.getElementById("timeInput");
const startBtn = document.getElementById("startBtn");
const timeLeft = document.getElementById("timeLeft");
const gameField = document.getElementById("gameField");
const scoreText = document.getElementById("score");

let timer = null;
let time = 0;
let score = 0;
let playing = false;

const colors = [
    "#ff3333",
    "#3399ff",
    "#ffff33",
    "#33ff66",
    "#ff33cc",
    "#a855f7",
    "#ff9933",
    "#ffffff",
    "#00ffff"
];

function createShape() {
    if (!playing) return;

   
    const oldShape = gameField.querySelector(".shape");

    if (oldShape) {
        oldShape.remove();
    }

  
    const size = Math.floor(Math.random() * 81) + 20;


    const color = colors[
        Math.floor(Math.random() * colors.length)
    ];

    
    const forms = ["circle", "square", "triangle"];

    const form = forms[
        Math.floor(Math.random() * forms.length)
    ];

    const shape = document.createElement("div");

    shape.classList.add("shape");

    shape.style.width = size + "px";
    shape.style.height = size + "px";

    if (form === "circle") {
        shape.style.backgroundColor = color;
        shape.style.borderRadius = "50%";
    }

    if (form === "square") {
        shape.style.backgroundColor = color;
        shape.style.borderRadius = "0";
    }

    if (form === "triangle") {
        shape.style.width = "0";
        shape.style.height = "0";
        shape.style.backgroundColor = "transparent";

        shape.style.borderLeft = size / 2 + "px solid transparent";
        shape.style.borderRight = size / 2 + "px solid transparent";
        shape.style.borderBottom = size + "px solid " + color;
    }

    const shapeWidth = form === "triangle" ? size : size;
    const shapeHeight = size;

    const maxX = gameField.clientWidth - shapeWidth;
    const maxY = gameField.clientHeight - shapeHeight;

    shape.style.left = Math.random() * Math.max(0, maxX) + "px";
    shape.style.top = Math.random() * Math.max(0, maxY) + "px";

    shape.addEventListener("click", function () {
        if (!playing) return;

        score++;
        scoreText.textContent = "ВЫ НАБРАЛИ " + score;

        createShape();
    });

    gameField.appendChild(shape);
}

function endGame() {
    playing = false;

    clearInterval(timer);
    timer = null;

    const shape = gameField.querySelector(".shape");

    if (shape) {
        shape.remove();
    }

    timeLeft.textContent = "00";
    startBtn.disabled = false;
    startBtn.textContent = "START";
}

startBtn.addEventListener("click", function () {
    const enteredTime = Number(timeInput.value);

    if (
        !Number.isInteger(enteredTime) ||
        enteredTime < 1 ||
        enteredTime > 300
    ) {
        alert("Укажите время от 1 до 300 секунд!");
        return;
    }

   
    clearInterval(timer);

    playing = true;
    time = enteredTime;
    score = 0;

    timeLeft.textContent = time;
    scoreText.textContent = "ВЫ НАБРАЛИ 0";

    startBtn.disabled = true;
    startBtn.textContent = "ИГРА ИДЁТ";

    createShape();

    timer = setInterval(function () {
        time--;

        timeLeft.textContent = time;

        if (time <= 0) {
            endGame();
        }
    }, 1000);
});