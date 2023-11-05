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


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function openGame(game) {
    document.getElementById('loadpage').classList.toggle('hide');
    if (game >= 1) {
        resetKeyboard();
        firstFrame = true;
        setTimeout(() => {
            GameIsRunning = true;
        }, 1300);
    } else {
        GameIsRunning = false;
    }
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
    // keyboard.Enter = false;
    // keyboard.Up = false;
    // keyboard.Down = false;
    // keyboard.Left = false;
    // keyboard.Right = false;
    // keyboard.Space = false;
    // keyboard.Num0 = false;
    // keyboard.D = false;

    // keyboard.Key0 = false;
    // keyboard.Key1 = false;
    // keyboard.Key2 = false;
}
