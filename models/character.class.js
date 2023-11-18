class Character extends MovableObject {

    lastEvent;
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


    /**
     * Loads the images for character animation. Calls functions for animating the character.
     */
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
        this.wakeUp();
    }


    /**
     * Is only executed once. Sets basic variables of the character object.
     */
    setVariables() {

        this.walking_sound.volume = 0.5;
        this.stomp_sound.volume = 0.2;
        this.offset = {
            left: 20,
            right: 20,
            top: 60,
            bottom: 10
        };
        this.x = 100;
        this.currentAnimation = 'idle';
    }


    /**
     * Adds intervals for handling player input on the controls and animating the character.
     */
    animate() {

        addInterval(() => this.handleMovement(), 1000 / 60);

        addInterval(() => this.animateGraphics(), 100);
    }


    /**
     * Moves the character according to player input on controls.
     * @returns if the character is dead
     */
    handleMovement() {

        if (this.isDead()) return;

        this.walk();

        if (world.keyboard.SPACE && this.y > 270) {
            this.jump_sound.play();
            this.jump();
        }
        world.camera_x = -this.x + 180;
    }


    /**
     * Moves the character to the left or right and plays a walking sound.
     * @returns if there is no input to the left / right controls and thus the walking sound should not be played
     */
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


    /**
     * Animates the character based on its current behavior.
     * @returns if the character is dead, if the character is sleeping or if the character is idling
     */
    animateGraphics() {

        if (this.isDead()) return;

        if (!this.isVulnerable(this.lastHit)) this.playAnimation(this.IMAGES_HURT, 'hurt');

        else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMP, 'jump');

        else if (world.keyboard.RIGHT || world.keyboard.LEFT) this.playAnimation(this.IMAGES_WALK, 'walk');

        else if (this.isSleeping()) return this.playAnimation(this.IMAGES_SLEEP, 'sleep');
        
        else return this.playAnimation(this.IMAGES_IDLE, 'idle');

        this.wakeUp();
    }


    /**
     * Checks if the character has been active in the last four seconds.
     * @returns {boolean} true for when the character has not been active in the last four seconds
     */
    isSleeping() {
        let timePassed = new Date().getTime() - this.lastEvent;
        timePassed = timePassed / 1000;
        return timePassed > 4;
    }


    /**
     * Is called when the character is not idling.
     */
    wakeUp() {
        this.lastEvent = new Date().getTime();
    }


    /**
     * Increases the collected amount of the passed collectable group. Removes the collected item from the game so that it can not be collected twice.
     * @param {object} collectedItem object that has been colliding with the player and thus is now collected
     * @param {Array} collectableGroup array which contains all collectable items of the specific group
     * @param {object} statusbar of the collectable group
     */
    collect(collectedItem, collectableGroup, statusbar) {

        statusbar.amount_collected++;
        statusbar.collect_sound.play();

        const index = collectableGroup.indexOf(collectedItem);
        collectableGroup.splice(index, 1);

        statusbar.updateStatusBar();
    }


    /**
     * Handles the throwing of a bottle if the player presses the according input.
     */
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


    /**
     * Checks for a collision of the character with the passed enemy and if so handles the process of hitting the enemy (in case it is the endboss) or killing it (for normal enemies).
     * @param {object} enemy that should be checked for a collision with the character
     * @returns if the enemy is already dead, the game is over or there is no collision
     */
    checkCollision(enemy) {

        if (enemy.isDead() || world.game_over) return;
        if (!this.isColliding(enemy)) return;

        if (enemy.characterIsAbove) enemy.stompKill();

        else if (this.isVulnerable(this.lastHit)) {

            this.hit();
            this.lastHit = new Date().getTime();
            world.healthBar.setFilling(this.energy, world.healthBar.IMAGES);
        }
    }


    /**
     * Plays the non-looped death animation of the character.
     */
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


    /**
     * Plays the death sound for the character, lets it fall out of the screen and renders the game over screen.
     */
    handleDeathSpecificForTarget() {

        setTimeout(() => this.death_sound.play(), 400);

        setTimeout(() => this.groundLevel = 2000, 2000);

        setTimeout(() => {
            world.game_over_sound.play();
            renderGameOverScreen();
        }, 3000);
    }
}