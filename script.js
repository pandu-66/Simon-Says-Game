let gameSeq = [];
let userSeq = [];

let btns = ["one", "two", "three", "four"];

let highScore = document.querySelector("#highScore");

let started = false;
let level = 0;
let hS = 0;
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function() {
    if(started == false) {
        started = true;
        setTimeout(levelUp,250);
    }
});

function btnFlash(btn) {
    btn.classList.add("white");
    setTimeout(function() {
        btn.classList.remove("white");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randClass = btns[randIdx];
    gameSeq.push(randClass);
    let randBtn = document.querySelector(`.${randClass}`);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]){
       if( userSeq.length == gameSeq.length ){
        setTimeout(levelUp,1000);
       }
    }else{

        if(hS<level) {
            hS = level;
            highScore.innerText = `High Score : ${level}`;
        }

        h3.innerHTML = `Game Over!! Your Score was ${level} <br> Press Any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        resetGame();
    }
}


function btnPress() {
    btnFlash(this);
    userSeq.push(this.id);
    
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function resetGame() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}