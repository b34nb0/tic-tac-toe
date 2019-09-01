//jshint esversion:6

// Array of board boxes
const boxes = document.querySelectorAll(".box");
// Winning combinations
const combos = [
  [0,1,2],[3,4,5],[6,7,8], // Horizontals
  [0,3,6],[1,4,7],[2,5,8], // Verticals
  [0,4,8],[2,4,6]          // Diagonals
];
// Player turn
let turn = 1; // 1: Player X; -1: Player O
// Players scores
let score1 = 0;
let score2 = 0;

let winner = false;


// Add event listeners to all boxes
boxes.forEach(function(box){
  box.addEventListener("click", function(){
    markBox(box);
    checkWinners();
    if(winner === false){
      checkDraw();
    }
  });
});

// Add event listener to Restart button
document.getElementById("restart").addEventListener("click", restartGame);

// Check boxes and switch turns
function markBox(box){
  if(!box.classList.contains("checked")){
    if(turn === 1){
      box.innerText = "X";
    } else {
      box.innerText = "O";
    }
    box.classList.add("checked");
    turn *= -1;
  }
}

// Check winners
function checkWinners(){
  // Loops through each winning combo
  combos.forEach(function(combo){
    // Takes each box of the winning combo
    const box1 = boxes[combo[0]];
    const box2 = boxes[combo[1]];
    const box3 = boxes[combo[2]];
    const line = box1.innerText + box2.innerText + box3.innerText;

    if(line === "XXX") {
      document.getElementById("heading").innerText = "PLAYER 1 wins!";
      document.getElementById("heading").classList.add("winner");
      box1.classList.add("red");
      box2.classList.add("red");
      box3.classList.add("red");
      score1++;
      endGame();

    } else if(line === "OOO") {
      document.getElementById("heading").innerText = "PLAYER 2 wins!";
      document.getElementById("heading").classList.add("winner");
      box1.classList.add("red");
      box2.classList.add("red");
      box3.classList.add("red");
      score2++;
      endGame();
    }
  });
}

function checkDraw(){
  // Map the whole grid to check for DRAW
  let gridFull = true;
  boxes.forEach(function(box){
    if(box.innerText === ""){
      gridFull = false;
    }
  });
  if(gridFull === true){
    console.log("DRAW");
    document.getElementById("heading").innerText = "DRAW";
    document.getElementById("heading").classList.add("winner");
    setTimeout(clearBoardAndHead, 500);
  }
}

function clearBoardAndHead(){
  document.getElementById("heading").innerText = "Tic-Tac-Toe";
  document.getElementById("heading").classList.remove("winner");
  boxes.forEach(function(box){
    box.innerText = "";
    box.classList.remove("checked");
    box.classList.remove("red");
  });
  winner = false;
}

function endGame(){
  // Disable click for all boxes
  boxes.forEach(function(box){
    box.classList.add("checked");
  });
  // Display score on scoreboards
  document.querySelector(".score-1 p").innerText = score1;
  document.querySelector(".score-2 p").innerText = score2;
  // Set delay and clear heading and board
  setTimeout(clearBoardAndHead, 500);
  winner = true;
}

function restartGame(){
  turn = 1;
  score1 = 0;
  score2 = 0;
  document.getElementById("heading").innerText = "Tic-Tac-Toe";
  document.getElementById("heading").classList.remove("winner");
  document.querySelector(".score-1 p").innerText = score1;
  document.querySelector(".score-2 p").innerText = score2;
  boxes.forEach(function(box){
    box.innerText = "";
    box.classList.remove("checked");
    box.classList.remove("red");
  });
}
