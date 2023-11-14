class Endboss extends MovableObject {

    height = 520;
    width = 608;
    currentAnimation;
    game_won_sound = new Audio('./audio/game_won_sound.wav');
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
        this.hurt_sound.volume = 0.5;
    }



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



    handleEndbossDeath() {

        setTimeout(() => {
            this.groundLevel = 2000;
            this.game_won_sound.play();
        }, 2000);

        setTimeout(() => {
            world.stopAllIntervals();
            this.showVictoryScreen();
        }, 3000);
    }



    animate() {

        addInterval(() => {

            if (this.isDead()) return;

            if (!this.isVulnerable(this.lastHit)) this.playAnimation(this.IMAGES_HURT);

            else if (this.currentAnimation == 'attack') this.playAnimation(this.IMAGES_ATTACK);

            else if (this.currentAnimation == 'walk') this.playAnimation(this.IMAGES_WALK);

            else if (this.currentAnimation == 'alert') this.playAnimation(this.IMAGES_ALERT);

            else this.playAnimation(this.IMAGES_IDLE);

        }, 200);
    }



    attack() {

        this.currentAnimation = 'alert';

        setTimeout(() => {
            if (world.level_complete) return;

            this.currentAnimation = 'attack';
            this.attack_sound.play();
        }, 1600);

        setTimeout(() => {
            if (world.level_complete) return;

            else if (Math.random() > 0.5) this.attackJump();
            else this.attackRun();
        }, 2200);
    }



    attackRun() {

        this.speedX = 30;
        let walkInterval = addInterval(() => this.moveLeft(this.speedX), 1000 / 60);

        this.queueRetreat(300, walkInterval);
    }



    attackJump() {

        this.speedX = 20;
        this.jump();
        let walkInterval = addInterval(() => this.moveLeft(this.speedX), 1000 / 60);

        this.queueRetreat(500, walkInterval);
    }



    queueRetreat(timeout, intervalToClear) {

        setTimeout(() => {
            clearInterval(intervalToClear);
            this.retreat();
        }, timeout);
    }



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



    playDeathAnimation() {

        addInterval(() => this.playAnimation(this.IMAGES_DEAD), 200);      
    }


    
    handleDeathSpecificForTarget() {

        this.death_sound.play();

        setTimeout(() => {

            this.groundLevel = 2000;
            this.game_won_sound.play();
        }, 2000);

        setTimeout(renderVictoryScreen, 3000);
    }
}