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
 * Sets basic properties and calls functions that create the event listeners for the touch and click functionality of all buttons.
 */
function init() {

    document.getElementById('main').oncontextmenu = () => { 
        return false; 
    };

    getElements();
    addKeyboardEvents();
    addTouchForButtons();
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

    ['keydown', 'keyup'].forEach((event) => {
        let pressedDown = event === 'keydown';        

        window.addEventListener(event, (e) => {
            e = e || window.event;
            if (e.keyCode == 37) handleKeyPress('button-left', pressedDown, 'LEFT');
            if (e.keyCode == 39) handleKeyPress('button-right', pressedDown, 'RIGHT');
            if (e.keyCode == 32) {
                e.preventDefault();
                handleKeyPress('button-space', pressedDown, 'SPACE');
            } 
            if (e.keyCode == 68) handleKeyPress('button-d', pressedDown, 'D');
        });
    });
}


/**
 * Handles the operations for when a key for controlling the player character is pressed or released: (Un-)Setting the "active" state of the corresponding button on the screen and the setting the corresponding variable in the keyboard object to "true" or "false".
 * @param {string} id html id of the corresponding button to the keyboard key
 * @param {boolean} pressedDown true for keydown event, false for keyup event
 * @param {string} key name of the key in upper case, which is the name of its corresponding property in the keyboard object
 */
function handleKeyPress(id, pressedDown, key) {

    document.getElementById(id).classList.toggle('keydown-active', pressedDown)
    keyboard[key] = pressedDown;
}


/**
 * Adds touch functionality for all buttons that are not part of the controller.
 */
function addTouchForButtons() {

    const events = ['touchstart', 'touchend', 'touchcancel'];

    touchButtons.forEach((button) => {

        events.forEach(e => addTouchListener(button, e));
    });
}


/**
 * Adds a single touch event listener that toggles the "active" state of the html element that functions as button. If the event is a "touchend" event, the associated function of the button is called.
 * @param {object} button contains the following information for the button: the id of its html element, the html element itself, the function of the button
 * @param {string} eventType one of three touch events: "touchstart", "touchend" or "touchcancel"
 */
function addTouchListener(button, eventType) {

    button.element.addEventListener(eventType, (e) => {

        e.preventDefault();
        button.element.classList.toggle('active');

        if (eventType === 'touchend') button.function();

    }, { passive: false });
}


/**
 * Adds the event listeners for the controller (arrow-buttons and bottle throw) which can be used to control the player character.
 */
function addEventListenersForController() {

    const controlKeys = ['left', 'right', 'space', 'd'];
    controlKeys.forEach(controlKey => addEventListeners(controlKey));

    window.addEventListener('mouseup', (e) => {

        e.preventDefault();
        for (let i in keyboard) keyboard[i] = false;
    });

}


/**
 * Adds touch and click event listeners for a specific controller key.
 * @param {string} key one of these keys: 'left', 'right', 'space', 'd'
 */
function addEventListeners(key) {

    const button = document.getElementById('button-' + key);
    const events = ['touchstart', 'touchend', 'touchcancel', 'mousedown'];

    events.forEach(e => button.addEventListener(e, handleEvent, { passive: false }));

    /**
     * Handles the operations for when a controller button experiences a touch or click event: Toggling the "active" state of the corresponding button on the screen and inverting the value of the corresponding variable in the keyboard object.
     * @param {object} e a touch or click event
     */
    function handleEvent(e) {

        e.preventDefault();
        keyboard[key.toUpperCase()] = !keyboard[key.toUpperCase()];

        button.classList.toggle('active');
    }
}


/**
 * Handles operations when the user (re-)starts the game.
 */
function startGame() {

    if (world) terminateGame();

    canvas = document.getElementById('canvas');
    initLevel();

    world = new World(canvas, keyboard);

    toggleElements([
        'start',
        'startscreen',
        'endscreen-game-won',
        'endscreen-game-over',
        'confetti'
    ], true);
}


/**
 * Terminates a running game by stopping all intervals and pausing the background music.
 */
function terminateGame() {

    world.stopAllIntervals();
    world.game_over_sound.pause();
    world.game_won_sound.pause();
}


/**
 * Shows or hides the elements that are passed as parameter.
 * @param {Array} elements contains html ids as strings
 * @param {boolean} direction_of_operation true for when the elements should only be hidden, false for when they should only be shown, undefined for inverting the current state
 */
function toggleElements(elements, direction_of_operation) {

    elements.forEach(element => document.getElementById(element).classList.toggle('d-none', direction_of_operation));

}


/**
 * Toggles the visibility of the help overlay.
 */
function toggleHelpOverlay() {

    toggleElements(['help-overlay', 'button-show-help', 'button-hide-help']);
    toggleElements(['imprint-overlay', 'button-hide-info'], true);
    toggleElements(['button-show-info'], false);
}


/**
 * Toggles the visibility of the info (imprint and data protection) overlay.
 */
function toggleImprintOverlay() {

    toggleElements(['help-overlay', 'button-hide-help'], true);
    toggleElements(['button-show-help'], false);
    toggleElements(['imprint-overlay', 'button-show-info', 'button-hide-info']);
}


/**
 * Renders the end screen for when the player has won the game.
 */
function renderVictoryScreen() {

    document.getElementById('game-won-statistics-coins').innerHTML = /*html*/ `
    You collected ${world.coinsBar.amount_collected} out of ${world.coinsBar.amount_max} coins!`;
    toggleElements(['confetti', 'endscreen-game-won'], false);
}


/**
 * Renders the end screen for when the player has lost the game;
 */
function renderGameOverScreen() {

    document.getElementById('endscreen-game-over').classList.remove('d-none');
}


/**
 * Shows the button that (re-)starts the game and changes its inner text to "Restart".
 */
function activateRestartButton() {

    document.getElementById('start-button-label').innerHTML = 'RESTART';
    document.getElementById('start').classList.remove('d-none');
}


/**
 * Sets a interval with the passed parameters and pushes its id to the intervalIds array.
 * @param {function} fn - The function to be called at each interval.
 * @param {number} delay - The delay, in milliseconds, between each function call.
 * @returns {number} - The ID of the interval. This can be used to clear the interval later.
 */
function addInterval(fn, delay) {

    let id = setInterval(fn, delay);
    intervalIds.push(id);
    return id;
}


/**
 * Toggles the background music on or off and sets the visibility of the associated buttons accordingly.
 */
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


/**
 * Resets buttons and overlays to their default state.
 */
function resetButtons() {

    toggleElements([
        'help-overlay',
        'button-hide-help',
        'imprint-overlay',
        'button-hide-info'
    ], true);

    toggleElements([
        'button-show-help',
        'button-show-info',
    ], false);
}


/**
 * Redirects to the href attribute of the element on which this function is executed.
 */
function redirect() {
    window.location.href = this.element.href;
}