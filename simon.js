let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "purple", "green"]

let stared = false;
let level = 0;
let highestScore = 0;

let h1 = document.querySelector('h1');
let h3 = document.createElement('h3');
h3.textContent = '';
document.body.appendChild(h3);
h3.classList.add("h3");
h1.insertAdjacentElement('afterend', h3);

let h2 =  document.querySelector('h2');

document.addEventListener('keypress', function () {
    if (stared == false) {
        levelUp();
        stared = true;
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // random btn flash
    let randIDX = Math.floor(Math.random() * 4);
    let randColor = btns[randIDX];

    // randColor holds a random class - btn-1,2,3,4 which will assign as class here

    let randBtn = document.querySelector(`.${randColor}`)

    // random game color store to gameSeq

    gameSeq.push(randColor);
    console.log(gameSeq);

    btnFlash(randBtn);

}

function checkColor(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press any key to start again!`;
        
        // Flash red with a linear gradient
        document.body.style.background = "linear-gradient(to bottom right, #ff4b5c, #ff6f61, #ff3b3f)";
        setTimeout(() => {
            document.body.style.background = "linear-gradient(to bottom right, #f3e6e8, #d5f3fc)";
        }, 300);

        if (level >= highestScore) {
            highestScore = level;
            h3.innerHTML = `<b> Highest Score = ${highestScore} </b>`;
            h3.style.display = "block";
        }
        reset();
    }
}



function btnPress() {
    let btn = this;

    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkColor(userSeq.length - 1);
}

let allBtns = document.querySelectorAll('.btn');
for (let btn of allBtns) {
    btn.addEventListener('click',  btnPress);
}

function reset() {
    stared = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}