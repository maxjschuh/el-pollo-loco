class World {

    ctx;
    character = new Character();
    level;
    healthBar = new HealthBar();
    coinsBar = new CoinsBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar();
    throwableObjects = [];
    game_over;
    game_won;
    deathAnimationFrameCount = 0;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.level = level1;

        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        addInterval(this.run, 1000 / 60);
        addInterval(() => {

            // if (this.deathAnimationFrameCount > 5) {
            //     this.stopAllIntervals();
            // }
    
            if (this.game_over) return;
    
            if (world.character.energy == 0) {
    
                this.game_over = true;
    
                world.playDeathAnimation();            
    
                // setTimeout(() => (document.getElementById('endscreen-game-over').classList.remove('d-none')), 700);
            }
            
        }, 1000 / 60);
        // this.addInterval(this.checkForGameOver, 1000 / 60);
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
        world.checkCollisions();
        world.checkThrowableObjects();
    }

    stopAllIntervals() {
        intervalIds.forEach(clearInterval);
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

            if (enemy.dead) {
                return;
            }

            if (enemy.characterIsAbove && this.character.isColliding(enemy)) {
                this.character.stomp_sound.play();
                enemy.dead = true;
                this.character.jump();

            } else if (this.character.isColliding(enemy)) {

                if (!this.character.lastHit) {
                    this.character.hit();
                    this.character.hurt = true;
                    this.character.lastHit = new Date().getTime();
                    this.healthBar.setFilling(this.character.energy, this.healthBar.IMAGES);
                }

                if (this.character.isHurt(this.character.lastHit)) {

                    this.character.hit();
                    this.character.hurt = true;
                    this.character.lastHit = new Date().getTime();
                    this.healthBar.setFilling(this.character.energy, this.healthBar.IMAGES);
                }
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

                this.coinsBar.setFilling(collectedCoinsPercent, this.coinsBar.IMAGES);
                this.coinsBar.coin_collect_sound.play();
            }
        });
    }

    checkBottleHits(enemy) {

        this.throwableObjects.forEach(bottle => {

            if (enemy.isColliding(bottle)) {

                if (!enemy.lastHit) {
                    enemy.hit();
                    enemy.lastHit = new Date().getTime();
                    this.endbossBar.setFilling(enemy.energy, this.endbossBar.IMAGES);
                }

                if (enemy.isHurt(enemy.lastHit)) {

                    enemy.hit();
                    enemy.lastHit = new Date().getTime();
                    this.endbossBar.setFilling(enemy.energy, this.endbossBar.IMAGES);
                }

                addInterval(() => {
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
        this.addToMap(this.endbossBar);

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

    // checkForGameOver() {


    // }

    playDeathAnimation() {

        this.stopAllIntervals();

        addInterval( () => {


            console.log(this.deathAnimationFrameCount);
            if (this.deathAnimationFrameCount < 6) {
                
                this.character.playAnimation(world.character.IMAGES_DEAD, 'dead');
                this.deathAnimationFrameCount++;
            }
            this.character.previousAnimation = 'dead';


        }, 500);
    }
}