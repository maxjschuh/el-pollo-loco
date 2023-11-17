class Endboss extends MovableObject {

    height = 520;
    width = 608;
    hurt_sound = new Audio('./audio/boss_hurt.mp3');
    attack_sound = new Audio('./audio/boss_attack.mp3');
    death_sound = new Audio('./audio/fire.m4a');

    IMAGES_WALK = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_IDLE = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png'
    ];

    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    /**
     * Loads the images for endboss animation. Calls functions for running its attack behavior and applying gravity to it.
     */
    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ALERT);

        this.setVariables();
        this.run();
        this.applyGravity();
    }


    /**
     * Is only executed once. Sets basic variables of the endboss object.
     */
    setVariables() {

        this.x = 5000;
        this.y = -50;
        this.offset = {
            left: 90,
            right: 25,
            top: 120,
            bottom: 30
        };
        this.groundLevel = -50;
        this.hurt_sound.volume = 0.3;
    }


    /**
     * Initializes the animation of the endboss and its attack timer.
     */
    run() {
        let timer = 0;

        this.animate();

        addInterval(() => {

            if (world.level_complete) return;

            else if (timer >= 6 && world.character.x > 4500) {
                this.attack();
                timer = 0;

            } else timer++;

        }, 1000);
    }


    /**
     * Animates the endboss based on its current behavior.
     */
    animate() {

        addInterval(() => {

            if (this.isDead()) return;

            if (!this.isVulnerable(this.lastHit)) this.playAnimation(this.IMAGES_HURT, 'hurt');

            else if (this.currentAnimation == 'attack') this.playAnimation(this.IMAGES_ATTACK);

            else if (this.currentAnimation == 'walk') this.playAnimation(this.IMAGES_WALK);

            else if (this.currentAnimation == 'alert') this.playAnimation(this.IMAGES_ALERT);

            else this.playAnimation(this.IMAGES_IDLE);

        }, 200);
    }


    /**
     * Runs a pre-attack phase in which the endboss has a "alert" animation. Then randomly chooses one of two attack types to execute.
     */
    attack() {

        this.currentAnimation = 'alert';

        setTimeout(() => {
            if (world.level_complete) return;

            this.currentAnimation = 'attack';
            this.attack_sound.play();
        }, 1600);

        setTimeout(() => {
            if (this.isDead()) return;

            else if (Math.random() > 0.5) this.attackJump();
            else this.attackRun();
        }, 2200);
    }


    /**
     * Attack in which the endboss runs very fast to the player for a short time. Then a retreat to its default position follows.
     */
    attackRun() {

        this.speedX = 30;
        let attackInterval = addInterval(() => this.moveLeft(this.speedX), 1000 / 60);

        this.queueRetreat(300, attackInterval);
    }


    /**
     * Attack in which the endboss jumps towards the player and then retreats to its default position.
     */
    attackJump() {

        this.speedX = 20;
        this.jump();
        let attackInterval = addInterval(() => this.moveLeft(this.speedX), 1000 / 60);

        this.queueRetreat(500, attackInterval);
    }


    /**
     * Executes a retreat of the endboss after the passed time span.
     * @param {number} timeout Time after which the endboss should retreat
     * @param {number} intervalToClear id of the attack interval that should be aborted so that retreating is possible
     */
    queueRetreat(timeout, intervalToClear) {

        setTimeout(() => {
            clearInterval(intervalToClear);
            this.retreat();
        }, timeout);
    }


    /**
     * Lets the endboss walk to the right until it reaches its default position.
     */
    retreat() {

        this.speedX = 5;
        this.currentAnimation = 'walk';

        let walkInterval = addInterval(() => {
            if (this.isDead()) return;
            else if (this.x < 5000) this.moveRight(this.speedX);
        }, 1000 / 60);

        setTimeout(() => {
            clearInterval(walkInterval);
            this.currentAnimation = undefined;
        }, 2000);
    }


    /**
     * Plays a looped death animation of the endboss.
     */
    playDeathAnimation() {

        addInterval(() => this.playAnimation(this.IMAGES_DEAD), 200);
    }


    /**
     * Plays the death sound for the endboss, lets it fall out of the screen and renders the victory screen.
     */
    handleDeathSpecificForTarget() {

        this.death_sound.play();

        setTimeout(() => {

            this.groundLevel = 2000;
            world.game_won_sound.play();
        }, 2000);

        setTimeout(renderVictoryScreen, 3000);
    }
}