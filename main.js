// The model: A Matrixcontaining cell objects :Each cell: 
var MINE = '&#128163'
var gBoard


// This is an object by which the board size is set
var gLevel = {
    SIZE: 4,
    MINES: 2
}

// This is an object in which you can keep and update the current game state:
// isOn: Boolean, when true we let the user play
// shownCount: How many cells are shown
// markedCount: How many cells are marked (with a flag)
// secsPassed: How many seconds passed

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function initGame() {
    // TODO This is called when page loads
    gBoard = buildBoard(gLevel.SIZE)
    renderBoard(gBoard)
    setMines(gLevel.MINES)
}

function buildBoard(size) {
    // TODO Builds the board Set mines at random locations Call setMinesNegsCount() 
    // Return the created board

    var board = [];
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: true,
                isMine: false,
                isMarked: false
            }
        }
    }
    return board
}
// console.log(board);

function setMines(minesNum) {
    var count = 0
    while (count < minesNum) {
        var randomCell = gBoard[Math.floor(Math.random() * minesNum)][Math.floor(Math.random() * minesNum)]
        console.log(randomCell);
        if (randomCell.isMine === false) {
            randomCell.isMine = true
            console.log(randomCell);
            count++
        }
    }
}

function setMinesNegsCount() {
    // TODO Count mines around each cell and set the cell's minesAroundCount.

}

function renderBoard(board) {
    // Render the board as a <table> to the page
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
         

            strHTML += `\t<td class="cell" onclick ="cellClicked(this,${i},${j})" oncontextmenu="cellMarked(this,${i},${j})">  \n`


            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }
    console.log('strHTML is:');
    console.log(strHTML);
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function cellClicked(elCell, i, j) {
    // TODO Called when a cell (td) is clicked
    console.log(gBoard[i][j]);
    gBoard[i][j].isShown = true
    console.log(elCell);
    console.log();
    alert('kiki')

}

function cellMarked(elCell) {
    // TODO Called on right click to mark a cell (suspected to be a mine) Search the web (and
    // implement) how to hide the context menu on right click

    event.preventDefault()
    console.log(elCell);
alert('tuti')


}

function expandShown(board, elCell, i, j) {
    // TODO When user clicks a cell with no mines around, we need to open
    // not only that cell, but also its neighbors.
}


