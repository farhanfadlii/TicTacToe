const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartButton = document.querySelector("#restartButton");
const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
let options= ['','','','','','','','',''];
let currentPlayer = "X";
let running = false;


initalizeGame();

function initalizeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellCliked));
    restartButton.addEventListener("click", restartGame);
    statusText.textContent = `Giliran ${currentPlayer}`;
    running = true;
}
function cellCliked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] !='' || !running){
        return;
    }
    updateCell(this,cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent= `Giliran ${currentPlayer}`;
}
function checkWinner(){
    let roundWon = false;

    for (let i = 0; i < winCondition.length; i++) {
        const condition = winCondition[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        
        if(cellA =='' || cellB == '' || cellC == ''){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent= `${currentPlayer} Menang!`;
        running= false;
    }
    else if(!options.includes('')){
        statusText.textContent= `SERI !`;
        running = false;
    }
   else{
    changePlayer();
   }
}
function restartGame(){
    location.reload();
}
