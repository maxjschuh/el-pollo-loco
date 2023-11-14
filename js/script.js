let intervalIds = [];
let canvas;
let world;
let keyboard = new Keyboard();



window.addEventListener('keyup', (e) => {

    e = e || window.event;
    if (e.keyCode == 37) keyboard.LEFT = false;
    if (e.keyCode == 39) keyboard.RIGHT = false;
    if (e.keyCode == 32) keyboard.SPACE = false;
    if (e.keyCode == 68) keyboard.D = false;
});

window.addEventListener('keydown', (e) => {

    e = e || window.event;
    if (e.keyCode == 37) keyboard.LEFT = true;
    if (e.keyCode == 39) keyboard.RIGHT = true;
    if (e.keyCode == 32) keyboard.SPACE = true;
    if (e.keyCode == 68) keyboard.D = true;
});

function startGame() {

    if (world) world.stopAllIntervals();

    canvas = document.getElementById('canvas');
    initLevel();

    world = new World(canvas, keyboard);

    createEventListeners();

    hideElements([
        'button-start',
        'startscreen',
        'endscreen-game-won',
        'endscreen-game-over',
        'confetti'
    ]);
}

function hideElements(elements) {

    elements.forEach(element => document.getElementById(element).classList.add('d-none'));
}

function showElements(elements) {

    elements.forEach(element => document.getElementById(element).classList.remove('d-none'));
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
    You collected ${world.bottleBar.amount_collected} out of ${world.bottleBar.amount_max} coins!`;
    showElements(['confetti', 'endscreen-game-won']);
}

function renderGameOverScreen() {

    document.getElementById('endscreen-game-over').classList.remove('d-none');
}

function activateRestartButton() {

    document.getElementById('button-start-label').innerHTML = 'RESTART';
    document.getElementById('button-start').classList.remove('d-none');
}

function addInterval(fn, delay) {

    let id = setInterval(fn, delay);
    intervalIds.push(id);
    return id;
}

function muteMusic(muted) {

    if (muted) {
        world.desert_sound.pause();
        world.bossfight_sound.pause();
        
    } else if (world.currentTrack) world.bossfight_sound.play();

    else world.desert_sound.play();

    document.getElementById('button-mute-music').classList.toggle('d-none');
    document.getElementById('button-unmute-music').classList.toggle('d-none');
}


function resetButtons() {

    hideElements([
        'help-overlay',
        'button-hide-help',
        'imprint-overlay',
        'button-hide-imprint'
    ]);

    showElements([
        'button-show-help',
        'button-show-imprint',
    ]);
}