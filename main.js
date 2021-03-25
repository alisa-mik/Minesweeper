// The model: A Matrixcontaining cell objects :Each cell: 
var MINE = '&#128163'
var gBoard
var MARK = '&#128681'
var emojiPlay = '&#128515'
var emojiWon = '&#128526'
var emojiLost = '&#128553'

var isFirstClick = true
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

function chooseLevel(size, mines) {
    gLevel.SIZE = size
    gLevel.MINES = mines
    initGame()
}
function initGame() {
    totalSeconds = 0
    // TODO This is called when page loads
    gGame.isOn = true
    isFirstClick = true
    gBoard = buildBoard(gLevel.SIZE)
    renderBoard()

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
                isShown: false,
                isMine: false,
                isMarked: false,
                place: `${i},${j}`,
                i: i,
                j: j

            }
        }
    }
    return board
}
// console.log(board);

function setMines(minesNum, skipI, skipJ) {


    var count = 0


    while (count < minesNum) {
        var randI = Math.floor(Math.random() * gLevel.SIZE)
        var randJ = Math.floor(Math.random() * gLevel.SIZE)
        var randomCell = gBoard[randI][randJ]
        if (skipI === randI && skipJ === randJ) continue;
        // console.log(randomCell);

        if (randomCell.isMine === false) {
            randomCell.isMine = true
            console.log(randomCell);
            count++
        }
    }
}

function setMinesNegsCount() {
    // TODO Count mines around each cell and set the cell's minesAroundCount.
    for (var i = 0; i < gLevel.SIZE; i++) {

        for (var j = 0; j < gLevel.SIZE; j++) {
            if (gBoard[i][j].isMine) continue;
            //the cell is not mine- calculate number of mines around
            gBoard[i][j].minesAroundCount = countNeighbors(i, j)


        }
    }

}

function countNeighbors(cellI, cellJ) {
    var neighborsCount = 0; 8
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= gBoard[i].length) continue;
            if (gBoard[i][j].isMine) neighborsCount++;
        }
    }
    if (neighborsCount === 0) { return ' ' }
    else { return neighborsCount; }
}


function renderBoard(showAll) {
    // Render the board as a <table> to the page
    var strHTML = '';
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < gBoard[0].length; j++) {



            if (showAll && !gBoard[i][j].isMine) {
                if (!(gBoard[i][j].minesAroundCount === 0)) {
                    strHTML += `\t<td ID= "${i},${j}" class="cell number" onclick ="cellClicked(this,${i},${j})" oncontextmenu="cellMarked(this,${i},${j})"> ${gBoard[i][j].minesAroundCount} \n`
                } else {
                    strHTML += `\t<td ID= "${i},${j}" class="cell number" onclick ="cellClicked(this,${i},${j})" oncontextmenu="cellMarked(this,${i},${j})">   \n`
                }

            } else if (showAll && gBoard[i][j].isMine) {
                strHTML += `\t<td ID= "${i},${j}" class="cell mine" onclick ="cellClicked(this,${i},${j})" oncontextmenu="cellMarked(this,${i},${j})"> ${MINE}\n`
            } else {
                strHTML += `\t<td ID= "${i},${j}" class="cell" onclick ="cellClicked(this,${i},${j})" oncontextmenu="cellMarked(this,${i},${j})">  \n`
            }
            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }
    // console.log('strHTML is:');
    // console.log(strHTML);
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function cellClicked(elCell, i, j) {
    // TODO Called when a cell (td) is clicked
    if (isFirstClick) {
        console.log('firstclick');
        isFirstClick = false
        setMines(gLevel.MINES, i, j)
        setMinesNegsCount()

    }

    if (gGame.isOn) {


        if (gBoard[i][j].isMine) {
            elCell.className = "mine"
            elCell.innerHTML = MINE
            gBoard[i][j].isShown = true
            gGame.shownCount++
            console.log(gBoard[i][j]);
            GameOver('lose')

        }

        if (!gBoard[i][j].isMine) {
            gBoard[i][j].isShown = true
            gGame.shownCount++

            if (gBoard[i][j].minesAroundCount === ' ') {
                elCell.className = "cell number"
                revealNeg(elCell, i, j)

            } else {

                elCell.innerHTML = gBoard[i][j].minesAroundCount
                elCell.className = "number"

                console.log(elCell);
            }

            var state = checkGameOver()
            if (state) GameOver('win')
        }
    }
}
function revealNeg(elCell, cellI, cellJ) {

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= gBoard[i].length) continue;
            if (!gBoard[i][j].isMine && !gBoard[i][j].isShown) {
                var elCell = document.getElementById(`${i},${j}`)

                elCell.innerHTML = gBoard[i][j].minesAroundCount
                elCell.className = "cell number"
                gBoard[i][j].isShown = true
                gGame.shownCount++

            }
        }
    }
}

function cellMarked(elCell, i, j) {
    // TODO Called on right click to mark a cell (suspected to be a mine) Search the web (and
    // implement) how to hide the context menu on right click
    event.preventDefault()

    if (gGame.isOn) {

        if (gBoard[i][j].isMarked) {
            elCell.innerHTML = ''
            gBoard[i][j].isMarked = false

        } else {
            elCell.innerHTML = '&#128681'
            gBoard[i][j].isMarked = true

        }




    }
}

function expandShown(board, elCell, i, j) {
    // TODO When user clicks a cell with no mines around, we need to open
    // not only that cell, but also its neighbors.
}


function checkGameOver() {
    //TODO Check if all mines are marked and all the other cells shown.
    // or if a mine was clicked


    for (var i = 0; i < gBoard.length; i++) {

        for (var j = 0; j < gBoard[0].length; j++) {



            if (!gBoard[i][j].isShown && !gBoard[i][j].isMarked && gBoard[i][j].isMine) {
                console.log('===');
                console.log(gBoard[i][j]);
                return false
            }

            if (!gBoard[i][j].isMine && !gBoard[i][j].isShown) {
                console.log('+++');
                console.log(gBoard[i][j]);
                return false

            }
        }

        // if (gGame.shownCount === (gLevel.SIZE ** 2) - gLevel.MINES) {
        //     GameOver('win')
        // }
    }
    console.log('p');
    return true
}
function GameOver(state) {



    if (state === 'win') {
        renderBoard(true)
        alert('winner')
    }

    renderBoard(true)
    if (state === 'lose') {

        renderBoard(true)
        alert('loser')
    }

    gGame.isOn = false
    //Change emoji
    //Stop timer
}
// function setTimer() {
// if (gGame.isOn) {


var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
    if (gGame.isOn && !isFirstClick)
        ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}
