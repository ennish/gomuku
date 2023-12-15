const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");


const singleEmInPixels = 16;

const board_columns = 15;

const cellSize = 3 * singleEmInPixels;
const boardSize = cellSize * board_columns;
const pieceSize = cellSize * 0.4;

canvas.width = boardSize;
canvas.height = boardSize;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, boardSize, boardSize);

for (let i = 0; i < 15; i++) {
    ctx.beginPath();
    ctx.moveTo(cellSize / 2 + i * cellSize, cellSize / 2);
    ctx.lineTo(cellSize / 2 + i * cellSize, boardSize - cellSize / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cellSize / 2, cellSize / 2 + i * cellSize);
    ctx.lineTo(boardSize - cellSize / 2, cellSize / 2 + i * cellSize);
    ctx.stroke();
}

canvas.addEventListener("click", (event) => {
    const x = Math.floor((event.offsetX - cellSize / 2) / cellSize);
    const y = Math.floor((event.offsetY - cellSize / 2) / cellSize);

    // TODO: Handle player move

});

const EMPTY = 0;
const BLACK = 1;
const WHITE = 2;

let moveStack = new Array();

//0 local, 1 remote
let play_mode = 0;

//Black first
let currentPlayer = 1;

const board = new Array(15).fill(null).map(() => new Array(15).fill(EMPTY));

function drawPiece(x, y, currentPlayer) {
    if (board[y][x] !== EMPTY) {
        return false;
    }
    board[y][x] = currentPlayer;

    const circle = new Path2D();

    circle.arc(cellSize / 2 + x * cellSize, cellSize / 2 + y * cellSize, pieceSize, 0, 2 * Math.PI);

    if (currentPlayer === 1) {
        ctx.fillStyle = "black";
        ctx.fill(circle);
    } else {
        ctx.fillStyle = "white";
        ctx.stroke(circle);
    }
    ctx.fill(circle);
}

// drawPiece(1, 1, 1);
// drawPiece(2, 1, 2);
function onGameStart() {
    moveStack = new Array();
}

function makeLocalMove(x, y) {
    drawPiece(x, y, currentPlayer);
    // console.log(x + ":" + y)
    currentPlayer = currentPlayer == 1 ? 2 : 1;
    let result = localJudge(x, y);
    console.log(result);
    return result;
}

/**
    return -1 if next play
    return 0 if no piece on the position
    else return currentPlayer
*/
function localJudge(x, y) {
    if (board[y][x] == EMPTY) {
        return 0;
    }

    for (idx = -4; idx <= 0; idx++) {
        //row 5
        if (x + idx >= 0 && x + idx + 4 < board_columns
            && board[y][x] == board[y][x + idx]
            && board[y][x] == board[y][x + idx + 1]
            && board[y][x] == board[y][x + idx + 2]
            && board[y][x] == board[y][x + idx + 3]
            && board[y][x] == board[y][x + idx + 4]) {
            return board[y][x];
        }
        //column 5
        if (y + idx >= 0 && y + idx + 4 < board_columns
            && board[y][x] == board[y + idx][x]
            && board[y][x] == board[y + idx + 1][x]
            && board[y][x] == board[y + idx + 2][x]
            && board[y][x] == board[y + idx + 3][x]
            && board[y][x] == board[y + idx + 4][x]) {
            return board[y][x];
        }
        //cross 5 \
        if (x + idx >= 0 && x + idx + 4 < board_columns && y + idx >= 0 && y + idx + 4 < board_columns
            && board[y][x] == board[y + idx][x + idx]
            && board[y][x] == board[y + idx + 1][x + idx + 1]
            && board[y][x] == board[y + idx + 2][x + idx + 2]
            && board[y][x] == board[y + idx + 3][x + idx + 3]
            && board[y][x] == board[y + idx + 4][x + idx + 4]) {
            return board[y][x];
        }
        //cross 5 /
        if (x + idx >= 0 && x + idx + 4 < board_columns && y - idx - 4 >= 0 && y - idx < board_columns
            && board[y][x] == board[y - idx][x + idx]
            && board[y][x] == board[y - idx - 1][x + idx + 1]
            && board[y][x] == board[y - idx - 2][x + idx + 2]
            && board[y][x] == board[y - idx - 3][x + idx + 3]
            && board[y][x] == board[y - idx - 4][x + idx + 4]) {
            return board[y][x];
        }
    }
    return -1;
}


function start() {

    function localMoveHandler(e) {
        x = Math.round((e.offsetX - cellSize * 0.5) / cellSize);
        y = Math.round((e.offsetY - cellSize * 0.5) / cellSize);

        result = makeLocalMove(x, y);

        if (result == 1 || result == 2) {
            alert("Winner is " + (result == 1) ? "BLACK" : "WHITE");
            onGameEnd();
        }
        moveStack.push({ y, x, currentPlayer });

        if (moveStack.length == board_columns * board_columns) {
            alert("Draw game");
        }
    }

    function onGameEnd() {
        canvas.removeEventListener("click", localMoveHandler);
    }

    if (play_mode == 0) {
        canvas.addEventListener("click", localMoveHandler);
    }
    if (play_mode == 1) {
        //todo
    }
}

const stompConfig = {
    // Typically, login, passcode and vhost
    // Adjust these for your broker
    // connectHeaders: {
    //   login: "guest",
    //   passcode: "guest"
    // },

    // Broker URL, should start with ws:// or wss:// - adjust for your broker setup
    brokerURL: "ws://localhost:8080/gomoku",

    // Keep it off for production, it can be quit verbose
    // Skip this key to disable
    debug: function (str) {
        console.log('STOMP: ' + str);
    },

    // If disconnected, it will retry after 200ms
    reconnectDelay: 200,

    // Subscriptions should be done inside onConnect as those need to reinstated when the broker reconnects
    onConnect: function (frame) {
        // The return object has a method called `unsubscribe`
        const subscription = stompClient.subscribe('/topic/chat', function (message) {
            const payload = JSON.parse(message.body);
            displayIncomingMessage(payload.user, payload.usrMsg);
        });
    }
};

// Create an instance
stompClient = new StompJs.Client(stompConfig);

// You can set additional configuration options here

// Attempt to connect
stompClient.activate();

stompClient.onConnect = (frame) => {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/greetings', (message) => {
        showGreeting(message);
    });
    disconnect();
    sendName();
};



function sendName() {
    stompClient.publish({
        destination: "/app/hello",
        body: JSON.stringify({ "name": "tw" })
    })
}


function connect() {
    stompClient.activate();
}


function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}
function setConnected(flag){
    
}
function showGreeting(message) {
    console.log(message);
}