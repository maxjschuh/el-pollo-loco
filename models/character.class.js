class Character extends MovableObject {

    lastEvent;
    collectedBottles = 0;
    bottlesToCollect = 5;
    collectedCoins = 0;
    coinsToCollect = 5;
    y = 275;
    groundLevel = 270;
    ready_to_throw = true;
    walking_sound = new Audio('./audio/walk.mp3');
    hurt_sound = new Audio('./audio/player_hurt.mp3');
    stomp_sound = new Audio('./audio/stomped.mp3');
    jump_sound = new Audio('./audio/jump.mp3');
    death_sound = new Audio('./audio/wilhelm_scream.wav');

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



    animate() {

        addInterval(() => this.handleMovement(), 1000 / 60);

        addInterval(() => this.animateGraphics(), 100);
    }



    handleMovement() {

        if (this.isDead()) return;

        this.walk();

        if (world.keyboard.SPACE && this.y > 270) {
            this.jump_sound.play();
            this.jump();
        }

        world.camera_x = -this.x + 100;
    }



    walk() {

        if (world.keyboard.RIGHT && this.x < world.level.level_end_x) {

            this.moveRight(this.speedX);
            this.mirrored = false;

        } else if (world.keyboard.LEFT && this.x > 0) {

            this.moveLeft(this.speedX);
            this.mirrored = true;

        } else return;

        if (this.y > 270) this.walking_sound.play();
    }



    animateGraphics() {

        if (this.isDead()) return;

        if (!this.isVulnerable(this.lastHit)) this.playAnimation(this.IMAGES_HURT);

        else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMP);

        else if (world.keyboard.RIGHT || world.keyboard.LEFT) this.playAnimation(this.IMAGES_WALK);

        else if (this.isSleeping()) this.playAnimation(this.IMAGES_SLEEP);

        else {
            this.playAnimation(this.IMAGES_IDLE);
            return;
        }

        this.wakeUp();
    }



    isSleeping() {
        let timePassed = new Date().getTime() - this.lastEvent;
        timePassed = timePassed / 1000;
        return timePassed > 4;
    }



    wakeUp() {
        this.lastEvent = new Date().getTime();
    }



    collect(collectedItem, collectableGroup, statusbar) {

        statusbar.amount_collected++;
        statusbar.collect_sound.play();

        const index = collectableGroup.indexOf(collectedItem);
        collectableGroup.splice(index, 1);

        statusbar.updateStatusBar();
    }



    checkForBottleThrow() {

        if (!world.keyboard.D) this.ready_to_throw = true;

        else if (world.keyboard.D && world.bottleBar.amount_collected && this.ready_to_throw) {

            this.wakeUp();
            world.bottleBar.amount_collected--;
            world.bottleBar.updateStatusBar();

            let bottle = new ThrowableObject(this.x, this.y);
            world.throwableObjects.push(bottle);
            this.ready_to_throw = false;
        }
    }



    checkCollision(enemy) {

        if (enemy.isDead() || world.game_over) return;
        if (!this.isColliding(enemy)) return;

        if (enemy.characterIsAbove) enemy.stompKill();

        else if (this.isVulnerable(this.lastHit)) {

            this.hit();
            this.hurt = true;
            this.lastHit = new Date().getTime();
            world.healthBar.setFilling(this.energy, world.healthBar.IMAGES);
        }
    }


    playDeathAnimation() {

        let frameCount = 0;
        const interval = 1100 / this.IMAGES_DEAD.length;        

        addInterval(() => {

            if (frameCount < this.IMAGES_DEAD.length) {

                this.playAnimation(this.IMAGES_DEAD);
                frameCount++;
            }

        }, interval);
    }


    handleDeathSpecificForTarget() {

        setTimeout(() => this.death_sound.play(), 400);

        setTimeout(() => this.groundLevel = 2000, 2000);

        setTimeout(() => {
            world.game_over_sound.play();
            renderGameOverScreen();
        }, 3000);
    }
}