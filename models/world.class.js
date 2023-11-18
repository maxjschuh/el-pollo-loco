class World {

    level;
    canvas;
    ctx;
    character = new Character();
    healthBar = new HealthBar();
    coinsBar = new CoinsBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar();
    throwableObjects = [];
    level_complete;
    currentTrack;
    keyboard;
    camera_x = 0;
    game_over_sound = new Audio('./audio/game_over_sound.m4a');
    game_won_sound = new Audio('./audio/game_won_sound.wav');
    bossfight_sound = new Audio('./audio/bossfight.mp3');
    desert_sound = new Audio('./audio/desert.mp3');


    /**
     * Adds an interval for moving all clouds background images to the left every 50 milliseconds.
     */
    addAnimationIntervals(animatedObjects, interval) {

        addInterval(() => {

            animatedObjects.forEach(object => object.animate());
        }, interval);
    }

    applyGravity() {

        addInterval(() => {

            world.throwableObjects.forEach(bottle => bottle.applyGravity());
            world.level.enemies.forEach(enemy => enemy.applyGravity());
            world.level.endboss.applyGravity();
            world.character.applyGravity();
        }, 1000 / 60);
    }


    /**
     * Initializes the world and calls the draw() function which renders the world on the canvas.
     * @param {object} canvas the canvas element on which the game should be rendered
     * @param {object} keyboard a virtual copy of the current state of the control keys or buttons (being pressed or not)
     */
    constructor(canvas, keyboard) {

        this.setVariables(canvas, keyboard);
        this.draw();
        if (!music_muted) this.desert_sound.play();

        addInterval(this.run, 1000 / 60);
        this.addAnimationIntervals(this.level.clouds, 50);
        this.addAnimationIntervals(this.level.enemies, 200);
        this.addAnimationIntervals(this.level.coins, 100);
        this.addAnimationIntervals(this.throwableObjects, 80);
        this.applyGravity();
    }


    /**
     * Executed on world initalization. Configures various variables.
     * @param {object} canvas the canvas element on which the game should be rendered
     * @param {object} keyboard a virtual copy of the current state of the control keys or buttons (being pressed or not)
     */
    setVariables(canvas, keyboard) {

        this.level = level1;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.bossfight_sound.volume = 0.4;
        this.desert_sound.loop = true;
        this.bossfight_sound.loop = true;
    }


    /**
     * Executed repeatedly for handling game progression. Checks every enemy (including the endboss) for collision with the character. Checks the character for collision with collectable items.  
     * @returns if the level is complete, i. e. character or endboss have died
     */
    run() {

        if (world.level_complete) return;

        if (!world.currentTrack && world.character.x > 4500) world.playBossfightMusic();

        world.level.enemies.forEach((enemy) => {

            world.character.checkCollision(enemy);
            world.checkBottleHits(enemy);
            enemy.saveCharacterAbove();
        });

        world.character.checkCollision(world.level.endboss);
        world.checkBottleHits(world.level.endboss);

        world.checkCollectables();
        world.character.checkForBottleThrow();
    }


    /**
     * Switches the background music to the bossfight track.
     * @returns if the music is currently muted
     */
    playBossfightMusic() {

        world.currentTrack = 'bossfight';

        if (music_muted) return;
        world.desert_sound.pause();
        world.bossfight_sound.play()
    }


    /**
     * Mutes the background music.
     */
    muteMusic() {
        world.bossfight_sound.pause();
        world.desert_sound.pause();
    }


    /**
     * Stops all intervals by iterating through the intervalIds array.
     */
    stopAllIntervals() {
        intervalIds.forEach(clearInterval);
    }


    /**
     * Checks for every collectable item whether the player character is colling with it. If so, collect() for collecting the item is called.
     */
    checkCollectables() {

        this.level.bottles.forEach(bottle => {

            if (this.character.isColliding(bottle)) this.character.collect(bottle, this.level.bottles, this.bottleBar);
        });

        this.level.coins.forEach(coin => {

            if (this.character.isColliding(coin)) this.character.collect(coin, this.level.coins, this.coinsBar);
        });
    }


    /**
     * Checks for a passed enemy if any of the currently thrown bottles collides with it. If so, the enemy is attacked by the bottle.
     * @param {object} enemy enemy that should be checked for bottle hits
     */
    checkBottleHits(enemy) {

        this.throwableObjects.forEach(bottle => {

            if (bottle.enemy_hit) return;

            if (enemy.isColliding(bottle)) bottle.attack(enemy);
        });
    }


    /**
     * Draws all objects on the canvas as often as the hardware allows.
     */
    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addMovableObjects();
        this.ctx.translate(-this.camera_x, 0);

        this.addStatusBars();

        requestAnimationFrame(() => this.draw());
    }


    /**
     * Draws all movable objects on the canvas.
     */
    addMovableObjects() {

        const groups = [
            this.level.backgroundObjects,
            this.level.clouds,
            this.level.enemies,
            this.level.bottles,
            this.level.coins,
        ];

        const individuals = [this.level.endboss, this.character];

        groups.forEach(group => this.addObjectsToMap(group));
        individuals.forEach(individual => this.addToMap(individual));
        this.addObjectsToMap(this.throwableObjects);
    }


    /**
     * Draws the static status bars on the canvas.
     */
    addStatusBars() {

        const statusBars = [
            this.healthBar,
            this.coinsBar,
            this.bottleBar,
            this.endbossBar
        ];

        statusBars.forEach(statusBar => this.addToMap(statusBar));
    }


    /**
     * Adds a array of objects to the canvas.
     * @param {Array} objects array of objects to be drawn
     */
    addObjectsToMap(objects) {
        objects.forEach(object => this.addToMap(object));
    }


    /**
     * Adds a single object that is passed as parameter to the map. Accounts for the left-/right-orientation of the object.
     * @param {object} mo movable object to be drawn
     */
    addToMap(mo) {
        if (mo.mirrored) this.flipImage(mo);

        mo.draw(this.ctx);

        if (mo.mirrored) this.flipImageBack(mo);
    }


    /**
     * Saves the canvas context and afterwards flips its horizontal orientation, so that objects can be drawn mirrored.
     * @param {object} mo object that should be drawn mirrored on the canvas
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Restores the canvas context to its default orientation.
     * @param {object} mo object that should be drawn mirrored on the canvas
     */
    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }
}