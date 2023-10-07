let canvas;
let world;
let elembody = document.querySelector('body');
elembody.addEventListener('keypress', Taste);



function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);

}


function openGame() {
    document.getElementById('loadpage').classList.toggle('hide');
}


function Taste(event) {
    console.log(event);
}