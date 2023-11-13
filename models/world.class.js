class World {

    ctx;
    level;
    character = new Character();
    healthBar = new HealthBar();
    coinsBar = new CoinsBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar();
    throwableObjects = [];
    level_complete;
    musicEnabled = true;
    currentTrack;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    game_over_sound = new Audio('./audio/game_over_sound.m4a');
    bossfight_sound = new Audio('./audio/bossfight.wav');
    desert_sound = new Audio('./audio/desert_ambient.wav');



    constructor(canvas, keyboard) {

        this.setVariables(canvas, keyboard);
        this.draw();
        this.desert_sound.play();
        addInterval(this.run, 1000 / 60);
    }



    setVariables(canvas, keyboard) {

        this.level = level1;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.bossfight_sound.volume = 0.5;
        this.desert_sound.loop = true;
        this.bossfight_sound.loop = true;
    }

    run() {

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

    playBossfightMusic() {

        world.currentTrack = 'bossfight';
        world.desert_sound.pause();
        world.bossfight_sound.play()
    }



    muteMusic() {
        world.bossfight_sound.pause();
        world.desert_sound.pause();
    }



    stopAllIntervals() {
        intervalIds.forEach(clearInterval);
    }



    checkCollectables() {

        this.level.bottles.forEach(bottle => {

            if (this.character.isColliding(bottle)) this.character.collect(bottle, this.level.bottles, this.bottleBar);
        });

        this.level.coins.forEach(coin => {

            if (this.character.isColliding(coin)) this.character.collect(coin, this.level.coins, this.coinsBar);
        });
    }



    checkBottleHits(enemy) {

        this.throwableObjects.forEach(bottle => {

            if (bottle.enemy_hit) return;

            if (enemy.isColliding(bottle)) bottle.attack(enemy);
        });
    }



    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addMovableObjects();
        this.ctx.translate(-this.camera_x, 0);

        this.addStatusBars();

        requestAnimationFrame(() => this.draw());
    }



    addMovableObjects() {

        const groups = [
            this.level.backgroundObjects,
            this.level.clouds,
            this.level.enemies,
            this.level.bottles,
            this.level.coins,
        ];

        const individuals = [
            this.character,
            this.level.endboss
        ];

        groups.forEach(group => this.addObjectsToMap(group));
        individuals.forEach(individual => this.addToMap(individual));
        this.addObjectsToMap(this.throwableObjects);
    }



    addStatusBars() {

        const statusBars = [
            this.healthBar,
            this.coinsBar,
            this.bottleBar,
            this.endbossBar
        ];

        statusBars.forEach(statusBar => this.addToMap(statusBar));
    }



    addObjectsToMap(objects) {
        objects.forEach(object => this.addToMap(object));
    }



    addToMap(mo) {
        if (mo.mirrored) this.flipImage(mo);

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.mirrored) this.flipImageBack(mo);
    }



    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }



    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }
}