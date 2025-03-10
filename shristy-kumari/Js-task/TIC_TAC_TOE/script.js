let turn = "X";
let isGameover = false;
let timer;
let selectedMarker = ""; 
const turnTimeLimit = 15; 

let strikeThrough = document.querySelector(".strike-through");
let info = document.querySelector("#info");
let resetbtn = document.querySelector("#restart-btn");
let startGameBtn = document.querySelector("#start-game-btn");
let overlay=document.querySelector("#overlay")
let boxes = document.getElementsByClassName("box");

function createBoard() {
    const container = document.querySelector(".container");
    for (let i = 0; i < 9; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        if (i < 3) box.classList.add("bt-0");
        if (i % 3 === 0) box.classList.add("bl-0");
        if ((i + 1) % 3 === 0) box.classList.add("br-0");
        if (i >= 6) box.classList.add("bb-0");
        const span = document.createElement("span");
        span.classList.add("box-text");
        box.appendChild(span);
        container.appendChild(box);
    }
    handleBoxClickEvent();
}

function chooseMarker(marker) {
    selectedMarker = marker;
    turn = marker;
    startTimer();
    startGameBtn.disabled = false;
}

function startGame() {
    overlay.style.display = "none";
    startTimer();
}

function handleTurnChange() {
    return turn === "X" ? "O" : "X";
}

function startTimer() {
    let timeLeft = turnTimeLimit;
    updateTimerDisplay(timeLeft);

    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft);

        if (timeLeft === 0) {
            clearInterval(timer);
            info.innerText = `Time Over! ${handleTurnChange()} Wins 🎉`;
            isGameover = true;
        }
    }, 1000);
}

function updateTimerDisplay(time) {
    info.innerText = `Turn for ${turn} | Time left: ${time}s`;
}

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
    wins.forEach((boxMarker) => {
        if ((boxtext[boxMarker[0]].innerText === boxtext[boxMarker[1]].innerText) && 
            (boxtext[boxMarker[2]].innerText === boxtext[boxMarker[1]].innerText) && 
            boxtext[boxMarker[0]].innerText !== "") {
            info.innerText = `${boxtext[boxMarker[0]].innerText} Winner! 🎉`;
            isGameover = true;
            strikeThrough.style.transform = `translate(${boxMarker[3]}vw, ${boxMarker[4]}vw) rotate(${boxMarker[5]}deg)`;
            strikeThrough.style.width = "18vw";
            strikeThrough.style.display = "block";
            clearInterval(timer);
        }
    });
}

function handleBoxClickEvent() {
    Array.from(boxes).forEach((element) => {
        let eachBoxtext = element.querySelector(".box-text");
        element.addEventListener("click", () => {
            if (eachBoxtext.innerText === "" && !isGameover) {
                eachBoxtext.innerText = turn;
                checkWinner();
                if (!isGameover) {
                    turn = handleTurnChange();
                    info.innerText = `Turn for ${turn}`;
                    startTimer();
                }
            }
        });
    });  
}
handleBoxClickEvent();

resetbtn.addEventListener("click", () => {
    let allBoxtexts = document.querySelectorAll(".box-text");
    Array.from(allBoxtexts).forEach((element) => {
        element.innerText = "";
    });
    overlay.style.display = "flex";
    selectedMarker = "";
    turn = "";
    isGameover = false;
    startGameBtn.disabled = true;
    strikeThrough.style.display = "none";
    clearInterval(timer);
});

createBoard();