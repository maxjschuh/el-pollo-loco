class World {

    ctx;
    character = new Character();
    level = level1;
    healthBar = new HealthBar();
    coinsBar = new CoinsBar();
    bottleBar = new BottleBar();
    throwableObjects = [];

    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
    }

    setWorld() {
        this.character.world = this;

        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });

        this.level.bottles.forEach(bottle => {
            bottle.world = this;
        });
    }

    run() {

        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjects();
        }, 200);
    }

    checkThrowableObjects() { // noch in den Character Klasse umziehen
        if (this.keyboard.D && this.character.collectedBottles > 0) {
            this.character.collectedBottles--;
            let collectedBottlesPercent = (this.character.collectedBottles / this.character.bottlesToCollect) * 100;
            this.bottleBar.setFilling(collectedBottlesPercent, this.bottleBar.IMAGES);
            let bottle = new ThrowableObject(this.character.x, this.character.y);
            this.throwableObjects.push(bottle);
        }
        this.keyboard.D = false;
    }

    checkCollisions() {

        this.level.enemies.forEach((enemy) => {

            if (enemy.characterIsAbove && this.character.isColliding(enemy)) {
                console.log('jump kill');
                enemy.dead = true;

            } else if (this.character.isColliding(enemy) && !enemy.dead) {

                this.character.lastHit = new Date().getTime();

                if (this.character.isHurt()) {

                    this.character.hit();
                    this.healthBar.setFilling(this.character.energy, this.healthBar.IMAGES);
                }

                // console.log('Collision!', this.character.energy);
            }


            if (enemy instanceof Enemy) {
                enemy.saveCharacterAbove();
            }

            if (enemy instanceof Endboss) {
                this.checkBottleHits(enemy);
            }

            this.checkCollectables();
        });

    }

    checkCollectables() {

        let index;

        this.level.bottles.forEach(bottle => {

            if (this.character.isColliding(bottle)) {

                index = this.level.bottles.indexOf(bottle);
                this.level.bottles.splice(index, 1);

                this.character.collectBottle();

                let collectedBottlesPercent = (this.character.collectedBottles / this.character.bottlesToCollect) * 100;

                console.log(collectedBottlesPercent);

                this.bottleBar.setFilling(collectedBottlesPercent, this.bottleBar.IMAGES);
                this.bottleBar.bottle_collect_sound.play();
            }
        });

        this.level.coins.forEach(coin => {

            if (this.character.isColliding(coin)) {

                index = this.level.coins.indexOf(coin);
                this.level.coins.splice(index, 1);

                this.character.collectCoin();

                let collectedCoinsPercent = (this.character.collectedCoins / this.character.coinsToCollect) * 100;

                console.log(collectedCoinsPercent);

                this.coinsBar.setFilling(collectedCoinsPercent, this.coinsBar.IMAGES);
                this.coinsBar.coin_collect_sound.play();
            }
        });
    }

    checkBottleHits(enemy) {

        this.throwableObjects.forEach(bottle => {

            if (enemy.isColliding(bottle)) {

                // enemy.die(enemy);

                // bottle.playAnimation(bottle.IMAGES_SPLASH);

                console.log('treffer');

                enemy.hurt_sound.play();

                setInterval(() => {
                    bottle.playAnimation(bottle.IMAGES_SPLASH);
                }, 80);

            }
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);

        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.healthBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.bottleBar);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
        if (mo.mirrored) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.mirrored) {
            this.flipImageBack(mo);
        }
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