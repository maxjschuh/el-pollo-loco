class ThrowableObject extends MovableObject {

    enemy_hit = false;
    throw_sound = new Audio('./audio/throw.mp3');
    hit_sound = new Audio('./audio/bottle_hit.mp3');
    frameCount = 0;

    IMAGES = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    /**
     * Loads images for a thrown bottle, sets basic variables and animates it.
     * @param {number} x character x-position when the bottle is spawned 
     * @param {number} y character y-position when the bottle is spawned 
     */
    constructor(x, y) {
        super().throw_sound.play();
        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGES_SPLASH);
        this.setVariables();
        this.handleMovement();
        this.throw(x, y);
    }


    /**
     * Is only executed once for every bottle. Sets basic variables.
     */
    setVariables() {
        this.y = 100;
        this.x = 100;
        this.height = 80;
        this.width = 80;
        this.speedX = 8;
        this.offset = {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        };
        this.hit_sound.volume = 0.3;
    }


    /**
     * Animates the movement of the bottle.
     * @returns when the bottle has hit an enemy
     */
    handleMovement() {

        if (this.enemy_hit) return;

        if (world.keyboard.LEFT || world.keyboard.RIGHT) this.speedX += world.character.speedX;

        if (world.character.mirrored) addInterval(() => this.moveLeft(this.speedX), 1000 / 60);

        else addInterval(() => this.moveRight(this.speedX), 1000 / 60);
    }


    /**
     * Shows either a splashing or rotating animation depending on whether the bottle has hit an enemy.
     */
    animate() {

        if (this.frameCount == this.IMAGES_SPLASH.length) return;

        if (this.enemy_hit) {
            this.currentAnimation = 'splash';
            this.playAnimation(this.IMAGES_SPLASH);
            this.frameCount++;

        } else this.playAnimation(this.IMAGES);
    }


    /**
     * Spawns the bottle at the current position of the character.
     * @param {number} x character x-position
     * @param {number} y character y-position
     */
    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 10;
    }


    /**
     *  Freezes the bottle in its current position, plays a glass shattering sound and removes the bottle from the game after a timeout for the splash animation.
     */
    splashAndVanish() {

        this.enemy_hit = true;
        this.hit_sound.play();
        this.acceleration = 0;
        this.speedY = 0;
        this.speedX = 0;

        setTimeout(() => {
            const index = world.throwableObjects.indexOf(this);
            world.throwableObjects.splice(index, 1);
        }, 900);
    }


    /**
     * Is executed when the bottle hits an enemy. Normal enemies are killed directly, while the endboss gets hit.
     * @param {object} enemy enemy that is being hit with the bottle
     */
    attack(enemy) {

        this.splashAndVanish();

        if (enemy instanceof EnemySmall || enemy instanceof EnemyBig) enemy.kill();

        else if (enemy.isVulnerable(enemy.lastHit)) {

            enemy.hit();
            enemy.lastHit = new Date().getTime();
            world.endbossBar.setFilling(enemy.energy, world.endbossBar.IMAGES);
        }
    }
}