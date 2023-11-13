class World {

    ctx;
    level;
    character = new Character();
    healthBar = new HealthBar();
    coinsBar = new CoinsBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar();
    throwableObjects = [];
    game_over;
    game_won;
    musicEnabled = true;
    currentTrack;
    deathAnimationFrameCount = 0;
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
        addInterval(() => {

            if (this.game_over) return;

            if (world.character.energy == 0) {

                this.game_over = true;

                world.playDeathAnimation();



                setTimeout(() => {

                    this.game_over_sound.play();


                    hideElements([
                        'help-overlay',
                        'button-hide-help',
                        'imprint-overlay',
                        'button-hide-imprint'
                    ]);

                    showElements([
                        'button-show-help',
                        'button-show-imprint'
                    ]);


                    document.getElementById('game-over-img').classList.remove('d-none');
                    activateRestartButton();


                }, 3000);
            }

        }, 1000 / 60);
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

        if (world.character.energy == 0 || world.level.endboss.energy == 0) {
            world.muteMusic();
            return;
        }

        world.playMusic();

        world.level.enemies.forEach((enemy) => {

            world.checkCollision(enemy);
            world.checkBottleHits(enemy);
            enemy.saveCharacterAbove();

        });

        world.checkCollision(world.level.endboss);
        world.checkBottleHits(world.level.endboss);


        world.checkCollectables();
        world.checkThrowableObjects();
    }

    muteMusic() {
        world.bossfight_sound.pause();
        world.desert_sound.pause();
    }

    playMusic() {

        if (!world.musicEnabled) world.muteMusic();

        else if (world.currentTrack == 'bossfight') world.bossfight_sound.play();

        else if (world.character.x > 4500) {
            world.currentTrack = 'bossfight';
            world.desert_sound.pause();
            world.bossfight_sound.play()
            
        } else world.desert_sound.play();

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

    checkCollision(enemy) {

        if (enemy.dead || enemy.energy <= 0) {
            return;
        }

        if (enemy.characterIsAbove && this.character.isColliding(enemy)) {

            enemy.stompKill();

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
                this.coinsBar.coin_collect_sound.volume = 0.5;
                this.coinsBar.coin_collect_sound.play();
            }
        });
    }



    checkBottleHits(enemy) {

        this.throwableObjects.forEach(bottle => {

            if (enemy.isColliding(bottle) && !bottle.enemy_hit) {

                bottle.enemy_hit = true;
                bottle.hit_sound.play();
                bottle.acceleration = 0;
                bottle.speedY = 0;
                bottle.speedX = 0;


                setTimeout(() => {
                    const index = this.throwableObjects.indexOf(bottle);
                    this.throwableObjects.splice(index, 1);
                }, 1000);

                if (enemy instanceof Endboss) {
                    
                    if (enemy.isHurt(enemy.lastHit) || !enemy.lastHi) {
                        enemy.hit();
                        enemy.lastHit = new Date().getTime();
                        this.endbossBar.setFilling(enemy.energy, this.endbossBar.IMAGES);
                    }

                } else  {
                    
                    enemy.kill();
                }

            }
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.endboss);
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

    playDeathAnimation() {

        world.muteMusic();
        this.stopAllIntervals();

        addInterval(() => {

            if (this.deathAnimationFrameCount < 6) {

                this.character.playAnimation(world.character.IMAGES_DEAD, 'dead');
                this.deathAnimationFrameCount++;
            }
            this.character.previousAnimation = 'dead';

        }, 500);
    }
}