let turn="X";
let isGameover=false;

function turnChange(){
    return turn==="X"?"0":"X";
}

// implementation for checking the winner
const checkWinner=()=>{
    let boxtext=document.getElementsByClassName("box-text");
    let wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,7],
        [2,4,6]
    ]
    wins.forEach((e)=>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && boxtext[e[0]].innerText !== ""){
            document.querySelector(".info").innerText=boxtext[e[0]].innerText+" Winner! 🎉";
            isGameover=true;
        }
    })
}

// fill the boxes with X or 0 
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element)=>{
    let boxtext=element.querySelector(".box-text");
    element.addEventListener("click",()=>{
       if(boxtext.innerText === ""){
           boxtext.innerText=turn;
           turn=turnChange();
           checkWinner();
           if(!isGameover){
               document.getElementById("info").innerText="Turn for "+turn;
           }
       }
    })
})

// Reset the boxes
let resetbtn=document.querySelector("reset-button");
resetbtn.addEventListener("click",()=>{
    let boxtexts=document.querySelectorAll(".box-text");
    Array.from(boxtexts).forEach((element)=>{
        element.innerText="";
    })
    turn="X";
    isGameover=false;
    document.getElementById("info").innerText="Turn for "+turn;
})