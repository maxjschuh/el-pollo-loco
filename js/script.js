let intervalIds = [];
let canvas;
let world;
let keyboard = new Keyboard();

function init() {

    canvas = document.getElementById('canvas');
}

function startGame() {

    initLevel();

    world = new World(canvas, keyboard);
    createTouchListeners();
    createClickListeners();
    console.log('loading finished')
    document.getElementById('button-start').classList.add('d-none');
    document.getElementById('startscreen').classList.add('d-none');
}

function toggleHelpOverlay() {

    document.getElementById('help-overlay').classList.toggle('d-none');
    document.getElementById('button-show-help').classList.toggle('d-none');
    document.getElementById('button-hide-help').classList.toggle('d-none');
    document.getElementById('imprint-overlay').classList.add('d-none');
    document.getElementById('button-show-imprint').classList.remove('d-none');
    document.getElementById('button-hide-imprint').classList.add('d-none');
}

function toggleImprintOverlay() {

    document.getElementById('imprint-overlay').classList.toggle('d-none');
    document.getElementById('button-show-imprint').classList.toggle('d-none');
    document.getElementById('button-hide-imprint').classList.toggle('d-none');
    document.getElementById('button-hide-help').classList.add('d-none');
    document.getElementById('button-show-help').classList.remove('d-none');
    document.getElementById('help-overlay').classList.add('d-none');
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

    document.getElementById('button-right').addEventListener('mousedown', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('button-jump').addEventListener('mousedown', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('button-throw').addEventListener('mousedown', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    window.addEventListener('mouseup', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
        keyboard.RIGHT = false;
        keyboard.SPACE = false;
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

function terminate() {

    world = undefined;
}

function renderVictoryScreen() {

    document.getElementById('game-won-statistics-coins').innerHTML = /*html*/ `
    Collected coins: ${world.character.collectedCoins} out of ${world.character.coinsToCollect}
    `;
}

function addInterval(fn, delay) {

    let id = setInterval(fn, delay);
    intervalIds.push(id);
    return id;
}






