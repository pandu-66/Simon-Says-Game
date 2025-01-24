let gameSeq = [];
let userSeq = [];
let btns;
let allBtns = document.querySelectorAll(".btn");
let difficulty = document.querySelector("#difficulty");
if(difficulty.options.selectedIndex == 0) {
    btns = ["one", "two", "three", "four"];
}


difficulty.addEventListener("change",(event)=>{
    if(event.target.value == "Easy") {
        window.location.reload();
    }


    if(event.target.value == "Medium") {
        btns = ["one", "two", "three", "four", "five", "six"];
        let allBoxes = document.querySelector(".btn-container");
        let lines = document.querySelectorAll(".line");
        for(line of lines) {line.remove();}

        let divArr = [];
        for(let i = 0; i<btns.length; i++) {
            let div = document.createElement("div");
            div.className = `btn ${btns[i]}`;
            div.id = `${btns[i]}`;
            div.setAttribute("type", "button");
            divArr.push(div);
        }
        // console.log(divArr)
        for(let i=0; i<2; i++) {
            let newLine = document.createElement("div");
            newLine.className = "line";
            newLine.appendChild(divArr.pop());
            newLine.appendChild(divArr.pop());
            newLine.appendChild(divArr.pop());
            allBoxes.append(newLine);
        }

        allBtns = document.querySelectorAll(".btn");
        for(btn of allBtns){
            btn.style.height = "150px";
            btn.style.width = "150px";
            btn.addEventListener("click",btnPress);
        }
    }

    if(event.target.value == "Hard") {
        btns = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
        let allBoxes = document.querySelector(".btn-container");
        let lines = document.querySelectorAll(".line");
        for(line of lines) {line.remove();}

        let divArr = [];
        for(let i=0; i<btns.length; i++) {
            let div = document.createElement("div");
            div.className = `btn ${btns[i]}`;
            div.id = `${btns[i]}`;
            div.setAttribute("type", "button");
            divArr.push(div);
        }
        for(let i=0; i<=2; i++) {
            let newLine = document.createElement("div");
            newLine.className = "line";
            newLine.appendChild(divArr.pop());
            newLine.appendChild(divArr.pop());
            newLine.appendChild(divArr.pop());
            allBoxes.append(newLine);
        }

        allBtns = document.querySelectorAll(".btn");
        for(btn of allBtns){
            btn.style.height = "125px";
            btn.style.width = "125px";
            btn.addEventListener("click",btnPress);
        }
    }
});


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
    if (difficulty.options.selectedIndex == 1) {
        randIdx = Math.floor(Math.random()* 6);
    }
    if (difficulty.options.selectedIndex == 2) {
        randIdx = Math.floor(Math.random()*9);
    }
    console.log(randIdx);
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

for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function resetGame() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}