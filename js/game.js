window.addEventListener('keydown', Taste);
window.addEventListener('keyup', TasteLoslassen);
let canvas;
let world;
let keyboard = new Keyboard();
// let elembody = document.querySelector('body');
// elembody.addEventListener('keydown', Taste);



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
        case 49: // 1
            keyboard.Key1 = true;
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
        case 49: // 1
            keyboard.Key1 = false;
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
}