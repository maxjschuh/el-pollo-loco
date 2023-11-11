let intervalIds = [];
let canvas;
let world;
let keyboard = new Keyboard();

window.addEventListener('keyup', (e) => {

    e = e || window.event;

    if (e.keyCode == 37) keyboard.LEFT = false;

    if (e.keyCode == 39) keyboard.RIGHT = false;

    if (e.keyCode == 32) keyboard.SPACE = false;
});

window.addEventListener('keydown', (e) => {

    e = e || window.event;

    if (e.keyCode == 37) keyboard.LEFT = true;

    if (e.keyCode == 39) keyboard.RIGHT = true;

    if (e.keyCode == 32) keyboard.SPACE = true;

    if (e.keyCode == 68) keyboard.D = true;
});

function startGame() {

    canvas = document.getElementById('canvas');
    initLevel();

    world = new World(canvas, keyboard);

    createEventListeners();

    hideElements([
        'button-start',
        'startscreen',
        'endscreen-game-won',
        'button-try-again',
        'game-over-img',
        'button-try-again'
    ]);
}

function hideElements(elements) {

    elements.forEach(element => {
        document.getElementById(element).classList.add('d-none');
    });
}

function showElements(elements) {

    elements.forEach(element => {
        document.getElementById(element).classList.remove('d-none');
    });
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

    document.getElementById('help-overlay').classList.add('d-none');
    document.getElementById('button-show-help').classList.remove('d-none');
    document.getElementById('button-hide-help').classList.add('d-none');
    document.getElementById('imprint-overlay').classList.toggle('d-none');
    document.getElementById('button-show-imprint').classList.toggle('d-none');
    document.getElementById('button-hide-imprint').classList.toggle('d-none');
}

function createEventListeners() {

    const keys = ['left', 'right', 'space', 'd'];
    keys.forEach(key => addEventsOnButton(key));

    addEventsOnWindow();   
}

function addEventsOnButton(key) {

    const events = ['mousedown', 'touchstart'];

    for (let i = 0; i < events.length; i++) {
        const event = events[i];

        document.getElementById('button-' + key).addEventListener(event, (e) => {

            e.preventDefault();
            keyboard[key.toUpperCase()] = true;
        });
    }
}

function addEventsOnWindow() {

    const events = ['mouseup', 'touchend'];

    events.forEach((event) => {

        window.addEventListener(event, (e) => {
            e.preventDefault();
            for (i in keyboard) keyboard[i] = false;
        });
    })
}

function renderVictoryScreen() {

    document.getElementById('game-won-statistics-coins').innerHTML = /*html*/ `
    You collected ${world.character.collectedCoins} out of ${world.character.coinsToCollect} coins!
    `;
}

function addInterval(fn, delay) {

    let id = setInterval(fn, delay);
    intervalIds.push(id);
    return id;
}