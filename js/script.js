const START = document.querySelector('#start');
const SCREENS = document.querySelectorAll('.screen');
const TIME_LIST = document.querySelector('#time-list');
const TIME_EL = document.querySelector('#time');
const BOARD = document.querySelector('#board');

const COLORS = ['#F05454', '#C06014', '#FFC93C', '#206A5D', '#2F89FC', '#7952B3'];

let time = 0;
let score = 0;

START.addEventListener('click', (event) => {
    event.preventDefault();

    SCREENS[0].classList.add('up');
});

TIME_LIST.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        SCREENS[1].classList.add('up');
        startGame();
    }
});

BOARD.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        endGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    TIME_EL.innerHTML = `00:${value}`;
}

function endGame() {
    TIME_EL.parentNode.classList.add('hide');
    BOARD.innerHTML = `<h1>Ваш рахунок: <span class='primary'>${score}</span></h1>`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const { width, height } = BOARD.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    setColor(circle);

    BOARD.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function setColor(element) {
    const color = getRandomColor();
    element.style.background = color;
    element.style.boxShadow = `0 0 4px ${color}, 0 0 5px ${color}`;
}
function getRandomColor() {
    const index = Math.floor(Math.random() * COLORS.length);
    return COLORS[index];
}
