window.addEventListener('keydown', keyIsDown);
window.addEventListener('keyup', keyIsUp);
document.addEventListener('touchstart', function (e) {
    e.preventDefault();
});
const keyMap = {
    37: 'Left',
    39: 'Right',
    38: 'Up',
    32: 'Space',
    96: 'Num0',
    68: 'D',
    40: 'Down',
    13: 'Enter',
    48: 'Key0',
    49: 'Key1',
    50: 'Key2',
};

let canvas;
let world;
let keyboard = new Keyboard();
let firstFrame = false;
let optionBouncing = false;
let optionFPS = true;
let activeGame = 0;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function openGame(game) {
    if (game >= 1) {
        gameStart(game);
    } else if(game == -2){
        gamePause();
    } else if(game == -3){
        gamePlay();
    } else if(game == -4){
        gameOver();
    } else if(game == -5){
        gameLose();
    } else if(game == 0) {
        gameStartscreen();
    }
}


function gameStart(game) {
    document.getElementById('gameover').classList.add('d-none');
    document.getElementById('gamelose').classList.add('d-none');
    document.getElementById('btnpause').classList.remove('d-none');
    document.getElementById('btnplay').classList.add('d-none');
    activeGame = game;
    gameloader(game);
    resetKeyboard();
    firstFrame = true;
    document.getElementById('loadpage').classList.add('hide');
    setTimeout(() => {
        GameIsRunning = true;
    }, 1300);
}


function gameloader(game) {
    if(game >= 1 && game <= 2) {
        world.loadGame(game);
    }
}


function gameStartscreen() {
    document.getElementById('loadpage').classList.remove('hide');
    GameIsRunning = false;
}


function gamePause() {
    GameIsRunning = false;
    document.getElementById('btnpause').classList.add('d-none');
    setTimeout(() => {
        document.getElementById('btnplay').classList.remove('d-none');
    }, 200);
}


function gamePlay() {
    GameIsRunning = true;
    document.getElementById('btnplay').classList.add('d-none');
    setTimeout(() => {
        document.getElementById('btnpause').classList.remove('d-none');
    }, 200);
}

function gameOver() {
    GameIsRunning = false;
    document.getElementById('gameover').classList.remove('d-none');
    document.getElementById('btnpause').classList.add('d-none');
    document.getElementById('btnplay').classList.add('d-none');
}

function gameLose() {
    GameIsRunning = false;
    document.getElementById('gamelose').classList.remove('d-none');
    document.getElementById('btnpause').classList.add('d-none');
    document.getElementById('btnplay').classList.add('d-none');
}

function touchAndKey(keyCode, value) {
    const keyName = keyMap[keyCode];
    if (keyName) {
        keyboard[keyName] = value;
    }
}


function keyIsDown(event) {
    touchAndKey(event.keyCode, true);
}


function keyIsUp(event) {
    touchAndKey(event.keyCode, false);
}


function touchOn(keyCode) {
    touchAndKey(keyCode, true);
}


function touchOff(keyCode) {
    touchAndKey(keyCode, false);
}


function resetKeyboard() {
    for(let i = 0; i <=255; i++) {
        const keyName = keyMap[i];
        if(keyName != '') {
            keyboard[keyName] = false;
        }
    }
}
