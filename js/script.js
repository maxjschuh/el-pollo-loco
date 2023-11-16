let intervalIds = [];
let canvas;
let world;
let keyboard = new Keyboard();
let event_listeners_created;
let music_muted = false;
let touchButtons = [
    {
        id: 'start-button',
        function: startGame
    },
    {
        id: 'button-mute-music',
        function: toggleMusic
    },
    {
        id: 'button-unmute-music',
        function: toggleMusic
    },
    {
        id: 'button-show-help',
        function: toggleHelpOverlay
    },
    {
        id: 'button-hide-help',
        function: toggleHelpOverlay
    },
    {
        id: 'button-show-info',
        function: toggleImprintOverlay
    },
    {
        id: 'button-hide-info',
        function: toggleImprintOverlay
    },
    {
        id: 'button-imprint',
        function: redirect
    },
    {
        id: 'button-data-protection',
        function: redirect
    }
];


/**
 * Sets basic properties and calls functions that create the event listeners for the touch and click functionality of the buttons in the head-up display.
 */
function init() {

    document.getElementById('main').oncontextmenu = () => { 
        return false; 
    };

    getElements();
    addKeyboardEvents();
    addTouchForTopButtons();
    addEventListenersForController();
}


/**
 * Sets for every touch button in the touch buttons array its associated html element as element property.
 */
function getElements() {

    touchButtons.forEach(button => button.element = document.getElementById(button.id));
}


/**
 * Adds event listeners for controlling the player character with keyboard keys.
 */
function addKeyboardEvents() {

    const events = ['keydown', 'keyup'];

    events.forEach((event) => {
        let pressedDown = event === 'keydown';        

        window.addEventListener(event, (e) => {
            e = e || window.event;
            if (e.keyCode == 37) handleKeyPress('button-left', pressedDown, 'LEFT');
            if (e.keyCode == 39) handleKeyPress('button-right', pressedDown, 'RIGHT');
            if (e.keyCode == 32) handleKeyPress('button-space', pressedDown, 'SPACE');
            if (e.keyCode == 68) handleKeyPress('button-d', pressedDown, 'D');
        });
    });
}

function handleKeyPress(id, pressedDown, key) {

    document.getElementById(id).classList.toggle('keydown-active', pressedDown)
    keyboard[key] = pressedDown;
}


/**
 * Adds touch functionality for the buttons in the 
 */
function addTouchForTopButtons() {

    const events = ['touchstart', 'touchend', 'touchcancel'];

    touchButtons.forEach((button) => {

        events.forEach(e => addTouchListener(button, e));
    });
}



function addTouchListener(button, eventType) {

    button.element.addEventListener(eventType, (e) => {

        e.preventDefault();
        button.element.classList.toggle('active');

        if (eventType === 'touchend') button.function();
        button.pressed = !button.pressed;

    }, { passive: false });
}



function addEventListenersForController() {

    const controlKeys = ['left', 'right', 'space', 'd'];
    controlKeys.forEach(controlKey => addEventListeners(controlKey));

    window.addEventListener('mouseup', (e) => {

        e.preventDefault();
        for (let i in keyboard) keyboard[i] = false;
    });

}



function addEventListeners(key) {

    const button = document.getElementById('button-' + key);
    const events = ['touchstart', 'touchend', 'touchcancel', 'mousedown'];

    events.forEach(e => button.addEventListener(e, handleEvent, { passive: false }));

    function handleEvent(e) {

        e.preventDefault();
        keyboard[key.toUpperCase()] = !keyboard[key.toUpperCase()];

        button.classList.toggle('active');
    }
}



function startGame() {

    if (world) terminateGame();

    canvas = document.getElementById('canvas');
    initLevel();

    world = new World(canvas, keyboard);

    hideElements([
        'start',
        'startscreen',
        'endscreen-game-won',
        'endscreen-game-over',
        'confetti'
    ]);
}



function terminateGame() {

    world.stopAllIntervals();
    world.game_over_sound.pause();
    world.game_won_sound.pause();
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
    document.getElementById('button-show-info').classList.remove('d-none');
    document.getElementById('button-hide-info').classList.add('d-none');
}



function toggleImprintOverlay() {

    document.getElementById('help-overlay').classList.add('d-none');
    document.getElementById('button-show-help').classList.remove('d-none');
    document.getElementById('button-hide-help').classList.add('d-none');
    document.getElementById('imprint-overlay').classList.toggle('d-none');
    document.getElementById('button-show-info').classList.toggle('d-none');
    document.getElementById('button-hide-info').classList.toggle('d-none');
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

    document.getElementById('start-button-label').innerHTML = 'RESTART';
    document.getElementById('start').classList.remove('d-none');
}



function addInterval(fn, delay) {

    let id = setInterval(fn, delay);
    intervalIds.push(id);
    return id;
}



function toggleMusic() {

    music_muted = !music_muted;

    if (music_muted) {
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
        'button-hide-info'
    ]);

    showElements([
        'button-show-help',
        'button-show-info',
    ]);
}



function redirect() {
    window.location.href = this.element.href;
}