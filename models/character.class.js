class Character extends MovableObject {

    lastEvent;
    collectedBottles = 0;
    bottlesToCollect = 5;
    collectedCoins = 0;
    coinsToCollect = 5;
    y = 275;
    groundLevel = 270;

    walking_sound = new Audio('./audio/walk.mp3');
    hurt_sound = new Audio('./audio/player_hurt.mp3');
    stomp_sound = new Audio('./audio/stomped.mp3');
    jump_sound = new Audio('./audio/jump.mp3');

    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_WALK = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_SLEEP = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png'
    ];

    IMAGES_JUMP = [
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_JUMP);

        this.setVariables();
        this.animate();
        this.applyGravity();
    }

    setVariables() {

        this.walking_sound.volume = 0.7;
        this.stomp_sound.volume = 0.3;
        this.offset = {
            left: 20,
            right: 20,
            top: 60,
            bottom: 10
        };
    }

    handleMovement() {

        if (world.keyboard.RIGHT && this.x < world.level.level_end_x) {
            this.moveRight(this.speedX);
            this.mirrored = false;

            if (this.y > 270) { // play walking sound only when character is not currently in the air (jumping)
                this.walking_sound.play();
            }
        }

        if (world.keyboard.LEFT && this.x > 0) {
            this.moveLeft(this.speedX);
            this.mirrored = true;

            if (this.y > 270) { // play walking sound only when character is not currently in the air (jumping)
                this.walking_sound.play();
            }
        }

        if (world.keyboard.SPACE && this.y > 270) {
            this.jump_sound.play();
            this.jump();
        }

        world.camera_x = -this.x + 100;

    }

    animateGraphics() {

        if (this.isDead()) {
            return;

        } else if (!this.isHurt(this.lastHit) && this.lastHit) {
            this.playAnimation(this.IMAGES_HURT, 'hurt');
            this.lastEvent = new Date().getTime();
            this.previousAnimation = 'hurt';

        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMP, 'jump');
            this.lastEvent = new Date().getTime();
            this.previousAnimation = 'jump';

        } else if (world.keyboard.RIGHT || world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALK, 'walk');
            this.lastEvent = new Date().getTime();
            this.previousAnimation = 'walk';

        } else if (this.isSleeping()) {
            this.playAnimation(this.IMAGES_SLEEP, 'sleep');
            this.previousAnimation = 'sleep';

        } else {
            this.playAnimation(this.IMAGES_IDLE, 'idle');
            this.previousAnimation = 'idle';
        }
    }

    animate() {

        addInterval(() => {

            this.handleMovement();
        }, 1000 / 60);

        addInterval(() => {

            this.animateGraphics();
        }, 100);
    }

    isSleeping() {
        let timePassed = new Date().getTime() - this.lastEvent; // Difference in ms
        timePassed = timePassed / 1000;
        return timePassed > 4;
    }

    collectBottle() {

        this.collectedBottles++;

        if (this.collectedBottles > this.bottlesToCollect) {
            this.collectedBottles = this.bottlesToCollect;
        }
    }

    collectCoin() {
        this.collectedCoins++;

        if (this.collectedCoins > this.coinsToCollect) {
            this.collectedCoins = this.coinsToCollect
        }
    }

    playDeathAnimation() {

        world.muteMusic();
        world.stopAllIntervals();

        let frameCount = 0;

        addInterval(() => {

            if (frameCount < this.IMAGES_DEAD.length) {

                this.hurt_sound.play();
                this.playAnimation(this.IMAGES_DEAD, 'dead');
                frameCount++;
                this.previousAnimation = 'dead';
            } else {
                world.muteMusic();
            }

        }, 250);
    }


    checkForBottleThrow() {

        if (world.keyboard.D && this.collectedBottles > 0) {
            this.collectedBottles--;
            const collectedBottlesPercent = (this.collectedBottles / this.bottlesToCollect) * 100;
            world.bottleBar.setFilling(collectedBottlesPercent, world.bottleBar.IMAGES);
            let bottle = new ThrowableObject(this.x, this.y);
            world.throwableObjects.push(bottle);
        }
        world.keyboard.D = false;
    }

    checkCollision(enemy) {

        if (enemy.isDead()) return;
        if (!this.isColliding(enemy)) return;

        if (enemy.characterIsAbove) enemy.stompKill();

        else if (this.isHurt(this.lastHit)) {

            this.hit();
            this.hurt = true;
            this.lastHit = new Date().getTime();
            world.healthBar.setFilling(this.energy, world.healthBar.IMAGES);
        }
    }
}