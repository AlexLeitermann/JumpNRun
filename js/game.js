/**
 * Event listener for the 'keydown' event.
 * @param {Event} event - The keyboard 'keydown' event.
 */
window.addEventListener('keydown', keyIsDown);

/**
 * Event listener for the 'keyup' event.
 * @param {Event} event - The keyboard 'keyup' event.
 */
window.addEventListener('keyup', keyIsUp);

/**
 * Event listener for the 'touchstart' event that prevents the default behavior and stops propagation.
 * @param {Event} e - The touchstart event.
 */
window.addEventListener('touchstart', function (e) {
    e.preventDefault();
    e.stopPropagation();
});

/**
 * Event listener for the right-click context menu that prevents the default behavior, resets the keyboard, and returns false.
 * @param {Event} e - The contextmenu event.
 * @returns {boolean} Returns false to prevent the default context menu behavior.
 */
window.oncontextmenu = function(e) { 
    e.preventDefault();
    resetKeyboard();
    return false; 
}

/**
 * Mapping of key codes to corresponding key names.
 * @type {Object.<number, string>}
 */
const keyMap = {
    37: 'Left',
    39: 'Right',
    38: 'Up',
    32: 'Space',
    96: 'Num0',
    68: 'D',
    40: 'Down',
    13: 'Enter',
};

let canvas;
let world;
let keyboard = new Keyboard();
let firstFrame = false;
let isfullscreen = false;
let optionBouncing = false;
let optionFPS = false;
let optionSound = true;


/**
 * Initializes the game by getting the canvas element and creating a new world.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


/**
 * Opens the specified game based on the given game code.
 * @param {number} game - The game code to determine which game to open.
 */
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


/**
 * Open or close the 'About the Game'-Screen
 */
function aboutTheGame() {
    document.getElementById('about').classList.toggle('d-none');
    document.getElementById('about').scrollTop = 0;
}


/**
 * Calls the appropriate function for the option
 * @param {number} n - A number that defines the option 
 */
function setOption(n) {
    if(n == 0) {
        toggleFPS();
    } else if(n == 1) {
        toggleBounce();
    } else if(n == 2) {
        toggleSounds();
    }
}


/**
 * Toggles the option for displaying FPS
 */
function toggleFPS() {
    optionFPS = !optionFPS;
    if(optionFPS) {
        document.getElementById('fps').src = './img/toggle-on.png';
    } else {
        document.getElementById('fps').src = './img/toggle-off.png';
    }
}


/**
 * Toggles the bounce effect option
 */
function toggleBounce() {
    optionBouncing = !optionBouncing;
    if(optionBouncing) {
        document.getElementById('bounce').src = './img/toggle-on.png';
    } else {
        document.getElementById('bounce').src = './img/toggle-off.png';
    }
}


/**
 * Toggles the sound option
 */
function toggleSounds() {
    optionSound = !optionSound;
    if(optionSound) {
        document.getElementById('sound').src = './img/toggle-on.png';
        document.getElementById('btnsoundimg').src = './img/btn-sndon.png';
    } else {
        document.getElementById('sound').src = './img/toggle-off.png';
        document.getElementById('btnsoundimg').src = './img/btn-sndoff.png';
    }
}


/**
 * Starts the specified game, hides certain UI elements, loads the game, and sets up initial conditions.
 * @param {number} game - The game code to determine which game to start.
 */
function gameStart(game) {
    setIngameButtons();
    gameloader(game);
    resetKeyboard();
    document.getElementById('loadpage').classList.add('hide');
    firstFrame = true;
    if(optionSound) {
        world.audio.snd_init.play();
    }
    setTimeout(() => {
        GameIsRunning = true;
    }, 1300);
}


/**
 * Configuration of Play/Pause, Sound and Fullscreen-Button to Start the Game.
 */
function setIngameButtons() {
    document.getElementById('gameover').classList.add('d-none');
    document.getElementById('gamelose').classList.add('d-none');
    document.getElementById('btnplay').classList.add('d-none');
    document.getElementById('btnpause').classList.remove('d-none');
    document.getElementById('btnsound').classList.remove('d-none');
    document.getElementById('btnfullscreen').classList.remove('d-none');
}


/**
 * Loads the specified game based on the given game code.
 * @param {number} game - The game code to determine which game to load.
 */
function gameloader(game) {
    if(game >= 1 && game <= 2) {
        world.loadGame(game);
    }
}


/**
 * Displays the game start screen, setting the GameIsRunning flag to false.
 */
function gameStartscreen() {
    GameIsRunning = false;
    document.getElementById('loadpage').classList.remove('hide');
}


/**
 * Pauses the game, hides the pause button, and shows the play button.
 */
function gamePause() {
    GameIsRunning = false;
    document.getElementById('btnpause').classList.add('d-none');
    document.getElementById('btnplay').classList.remove('d-none');
}


/**
 * Resumes the game, hides the play button, and shows the pause button.
 */
function gamePlay() {
    GameIsRunning = true;
    document.getElementById('btnplay').classList.add('d-none');
    document.getElementById('btnpause').classList.remove('d-none');
}


/**
 * Ends the game, displays the game over message, and hides buttons.
 */
function gameOver() {
    GameIsRunning = false;
    document.getElementById('gameover').classList.remove('d-none');
    hideButtons();
}


/**
 * Ends the game, displays the game lose message, and hides buttons.
 */
function gameLose() {
    GameIsRunning = false;
    document.getElementById('gamelose').classList.remove('d-none');
    hideButtons();
}


/**
 * Toggle Fullscreen-Mode (is not possible in iOS)
 */
function fullscreen() {
    isfullscreen = !isfullscreen;
    let elem = document.getElementById('fullscreen');
    if(isfullscreen) {
        fullscreenOn(elem);
    } else {
        fullscreenOff(elem);
    }
}


/**
 * Activate Fullscreen
 */
function fullscreenOn(elem) {
    if(elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if(elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if(elem.msRequestFullscreen()) {
        elem.msRequestFullscreen();
    }
}


/**
 * Deactivate Fullscreen
 */
function fullscreenOff(elem) {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.webkitExitFullScreen) {
        document.webkitExitFullScreen();
    } else if(document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}


/**
 * Hides buttons when the game is over.
 */
function hideButtons() {
    document.getElementById('btnpause').classList.add('d-none');
    document.getElementById('btnplay').classList.add('d-none');
    document.getElementById('btnsound').classList.add('d-none');
    document.getElementById('btnfullscreen').classList.add('d-none');
}


/**
 * Checks the key and passes the value.
 * @param {*} keyCode - The key code associated with the touched key.
 * @param {*} value - The value to pass.
 */
function touchAndKey(keyCode, value) {
    const keyName = keyMap[keyCode];
    if (keyName) {
        keyboard[keyName] = value;
    }
}


/**
 * Updates the keyboard state for a key being pressed down.
 * @param {Event} event - The 'keydown' event.
 */
function keyIsDown(event) {
    touchAndKey(event.keyCode, true);
}


/**
 * Updates the keyboard state for a key being released.
 * @param {Event} event - The 'keyup' event.
 */
function keyIsUp(event) {
    touchAndKey(event.keyCode, false);
}


/**
 * Updates the keyboard state for a touch event on a key.
 * @param {number} keyCode - The key code associated with the touched key.
 */
function touchOn(keyCode) {
    touchAndKey(keyCode, true);
}


function /**
* Updates the keyboard state for a touch event off a key.
* @param {number} keyCode - The key code associated with the released key.
*/
touchOff(keyCode) {
    touchAndKey(keyCode, false);
}


/**
 * Resets the state of all keys in the keyboard to false.
 */
function resetKeyboard() {
    for(let i = 0; i <=255; i++) {
        const keyName = keyMap[i];
        if(keyName) {
            keyboard[keyName] = false;
        }
    }
}
