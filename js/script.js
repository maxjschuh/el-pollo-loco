let canvas;
let world;
let keyboard = new Keyboard();
let ui;


function init() {

    canvas = document.getElementById('canvas');
    ui = document.getElementById('user-interface');
    world = new World(canvas, keyboard);
    createTouchListeners();
    createClickListeners();
}

function enterFullscreen() {
    
    ui.requestFullscreen();
}

function createTouchListeners() {

    document.getElementById('button-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    
    document.getElementById('button-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('button-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('button-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('button-jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('button-jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('button-throw').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('button-throw').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}

function createClickListeners() {

    document.getElementById('button-left').addEventListener('mousedown', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    
    document.getElementById('button-left').addEventListener('mouseup', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('button-right').addEventListener('mousedown', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('button-right').addEventListener('mouseup', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('button-jump').addEventListener('mousedown', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('button-jump').addEventListener('mouseup', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('button-throw').addEventListener('mousedown', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('button-throw').addEventListener('mouseup', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}




window.addEventListener('keyup', (e) => {

    e = e || window.event;

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
});


window.addEventListener('keydown', (e) => {

    e = e || window.event;

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});






