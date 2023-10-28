window.addEventListener('keydown', Taste);
window.addEventListener('keyup', TasteLoslassen);
document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});
let canvas;
let world;
let GameIsRunning = false;
let keyboard = new Keyboard();




function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function openGame() {
    document.getElementById('loadpage').classList.toggle('hide');
}


function Taste(event) {
    // console.clear();
    // resetKeyboard();
    switch (event.keyCode) {
        case 38: // up
            keyboard.Up = true;
        break;
        case 40: // down
            keyboard.Down = true;
        break;
        case 39: // right
            keyboard.Right = true;
        break;
        case 37: // left
            keyboard.Left = true;
        break;
        case 32: // space
            keyboard.Space = true;
        break;
        case 48: // 0
            keyboard.Key0 = true;
        break;
        case 96: // 0
            keyboard.Num0 = true;
        break;
        case 49: // 1
            keyboard.Key1 = true;
        break;
        case 50: // 2
            keyboard.Key2 = true;
        break;
        case 68: // D
            keyboard.D = true;
        break;
    }

}

function TasteLoslassen(event) {
    // console.clear();
    // resetKeyboard();
    switch (event.keyCode) {
        case 38: // up
            keyboard.Up = false;
        break;
        case 40: // down
            keyboard.Down = false;
        break;
        case 39: // right
            keyboard.Right = false;
        break;
        case 37: // left
            keyboard.Left = false;
        break;
        case 32: // space
            keyboard.Space = false;
        break;
        case 48: // 0
            keyboard.Key0 = false;
        break;
        case 96: // 0
            keyboard.Num0 = false;
        break;
        case 49: // 1
            keyboard.Key1 = false;
        break;
        case 50: // 2
            keyboard.Key2 = false;
        break;
        case 68: // D
            keyboard.D = false;
        break;
    }

}

function resetKeyboard() {
    keyboard.Down = false;
    keyboard.Left = false;
    keyboard.Right = false;
    keyboard.Space = false;
    keyboard.Up = false;
    keyboard.D = false;
    keyboard.Key1 = false;
    keyboard.Key2 = false;
}


function touchOn(keyCode) {
    // console.clear();
    // resetKeyboard();
    switch (keyCode) {
        case 38: // up
            keyboard.Up = true;
        break;
        case 40: // down
            keyboard.Down = true;
        break;
        case 39: // right
            keyboard.Right = true;
        break;
        case 37: // left
            keyboard.Left = true;
        break;
        case 32: // space
            keyboard.Space = true;
        break;
        case 48: // 0
            keyboard.Key0 = true;
        break;
        case 96: // 0
            keyboard.Num0 = true;
        break;
        case 49: // 1
            keyboard.Key1 = true;
        break;
        case 50: // 2
            keyboard.Key2 = true;
        break;
        case 68: // D
            keyboard.D = true;
        break;
    }

}


function touchOff(keyCode) {
    // console.clear();
    // resetKeyboard();
    switch (keyCode) {
        case 38: // up
            keyboard.Up = false;
        break;
        case 40: // down
            keyboard.Down = false;
        break;
        case 39: // right
            keyboard.Right = false;
        break;
        case 37: // left
            keyboard.Left = false;
        break;
        case 32: // space
            keyboard.Space = false;
        break;
        case 48: // 0
            keyboard.Key0 = false;
        break;
        case 96: // 0
            keyboard.Num0 = false;
        break;
        case 49: // 1
            keyboard.Key1 = false;
        break;
        case 50: // 2
            keyboard.Key2 = false;
        break;
        case 68: // D
            keyboard.D = false;
        break;
    }

}

