class Endboss extends MovableObject {

    height = 520;
    width = 608;
    animationSequence;
    game_won_sound = new Audio('./audio/game_won_sound.wav');


    IMAGES_WALK = [ //animationSequence = 'walk'
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

    IMAGES_ALERT = [ //animationSequence = 'alert'
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [ //animationSequence = 'attack'
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

    hurt_sound = new Audio('./audio/boss_hurt.mp3');
    attack_sound = new Audio('./audio/boss_attack.mp3');

    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ALERT);

        this.x = 5000;
        this.y = -50;
        this.offset = {
            left: 90,
            right: 25,
            top: 120,
            bottom: 30
        };
        this.groundLevel = -50;
        this.run();
        this.applyGravity();
        this.hurt_sound.volume = 0.5;
    }

    run() {
        let timer = 0;

        this.animate();

        addInterval(() => {

            if (this.isDead()) {
                clearInterval(attackInterval);
                this.speedX = 0;
            }

        }, 1000 / 30);

        let attackInterval = addInterval(() => {

            if (timer >= 6 && world.character.x > 4500) {
                this.attack();
                timer = 0;

            } else {
                timer++;
            }

        }, 1000);
    }

    showVictoryScreen() {

        activateRestartButton();
        renderVictoryScreen();
    }

    animate() {

        addInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD, 'dead');
                this.previousAnimation = 'dead';
                setTimeout(() => {
                    this.groundLevel = 2000;
                    this.game_won_sound.play();

                }, 2000);

                setTimeout(() => {

                    world.stopAllIntervals();
                    this.showVictoryScreen();
                }, 3000);

            } else if (!this.isHurt(this.lastHit) && this.lastHit) {
                this.playAnimation(this.IMAGES_HURT, 'hurt');
                this.previousAnimation = 'hurt';

            } else if (this.animationSequence == 'attack') {
                this.playAnimation(this.IMAGES_ATTACK, this.animationSequence);
                this.previousAnimation = this.animationSequence;

            } else if (this.animationSequence == 'walk') {
                this.playAnimation(this.IMAGES_WALK, this.animationSequence);
                this.previousAnimation = this.animationSequence;

            } else if (this.animationSequence == 'alert') {
                this.playAnimation(this.IMAGES_ALERT, this.animationSequence);
                this.previousAnimation = this.animationSequence;

            } else {
                this.playAnimation(this.IMAGES_IDLE, 'idle');
                this.previousAnimation = 'idle';
            }

        }, 200);
    }

    attack() {

        this.animationSequence = 'alert';

        setTimeout(() => {
            this.animationSequence = 'attack';
            this.attack_sound.play();
        }, 1600);

        setTimeout(() => {

            if (this.isDead()) return;
            else if (Math.random() > 0.5) {
                this.attackJump();

            } else {
                this.attackRun();
            }

        }, 2200);
    }

    attackRun() {

        this.speedX = 30;

        let walkInterval = addInterval(() => {

            this.moveLeft(this.speedX);

        }, 1000 / 60);

        setTimeout(() => {
            clearInterval(walkInterval);
            this.retreat();
        }, 300);
    }

    attackJump() {

        this.speedX = 20;
        this.jump();

        let walkInterval = addInterval(() => {

            this.moveLeft(this.speedX);

        }, 1000 / 60);

        setTimeout(() => {
            clearInterval(walkInterval);
            this.retreat();
        }, 500);
    }

    retreat() {

        this.speedX = 5;
        this.animationSequence = 'walk';

        let walkInterval = addInterval(() => {

            if (this.isDead()) return;
            else if (this.x < 5000) {
                this.moveRight(this.speedX);

            }

        }, 1000 / 60);

        setTimeout(() => {
            clearInterval(walkInterval);
            this.animationSequence = undefined;
        }, 2000);
    }
}