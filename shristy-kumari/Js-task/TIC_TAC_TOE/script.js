let turn = "X";
let isGameover = false;
let timer;
const turnTimeLimit = 15; 
let line = document.querySelector(".line");
let info = document.getElementById("info");
let resetbtn = document.querySelector("#reset-button");
let boxes = document.getElementsByClassName("box");
let selectedMarker = ""; 

// Function to choose X or O
function chooseMarker(marker) {
    selectedMarker = marker;
    turn = marker;
    startTimer();
    document.getElementById("start-game").disabled = false;
}

// Function to start the game
function startGame() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("game-container").style.display = "flex";
    startTimer();
}

function turnChange() {
    return turn === "X" ? "O" : "X";
}

// Timer function
function startTimer() {
    let timeLeft = turnTimeLimit;
    updateTimerDisplay(timeLeft);

    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft);

        if (timeLeft === 0) {
            clearInterval(timer);
            info.innerText = `Time Over! ${turnChange()} Wins 🎉`;
            isGameover = true;
        }
    }, 1000);
}

function updateTimerDisplay(time) {
    info.innerText = `Turn for ${turn} | Time left: ${time}s`;
}

// Check winner function
const checkWinner = () => {
    let boxtext = document.getElementsByClassName("box-text");
    let wins = [
        [0, 1, 2, 0, 3, 0],
        [3, 4, 5, 0, 9, 0],
        [6, 7, 8, 0, 15, 0],
        [0, 3, 6, -6, 9, 90],
        [1, 4, 7, 0, 9, 90],
        [2, 5, 8, 6, 9, 90],
        [0, 4, 8, 0, 9 , 45],
        [2, 4, 6, 0, 9, 135],
    ];
    wins.forEach((e) => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && 
            (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && 
            boxtext[e[0]].innerText !== "") {
            info.innerText = boxtext[e[0]].innerText + " Winner! 🎉";
            isGameover = true;
            line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            line.style.width = "18vw";
            line.style.display = "block";
            clearInterval(timer);
        }
    });
}

// Handle box click event
Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".box-text");
    element.addEventListener("click", () => {
        if (boxtext.innerText === "" && !isGameover) {
            boxtext.innerText = turn;
            checkWinner();
            if (!isGameover) {
                turn = turnChange();
                info.innerText = "Turn for " + turn;
                startTimer();
            }
        }
    });
});

// Reset the game
resetbtn.addEventListener("click", () => {
    let boxtexts = document.querySelectorAll(".box-text");
    Array.from(boxtexts).forEach((element) => {
        element.innerText = "";
    });
    document.getElementById("overlay").style.display = "flex";
    selectedMarker = "";
    turn = "";
    isGameover = false;
    document.getElementById("start-game").disabled = true;
    line.style.display = "none";
    clearInterval(timer);
});