class ThrowableObject extends MovableObject {

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

    throw_sound = new Audio('./audio/throw.mp3');
    hit_sound = new Audio('./audio/bottle_hit.mp3');
    enemy_hit = false;

    constructor(x, y) {
        super();
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

        this.throw_sound.play();
        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGES_SPLASH);
        this.animate();
        this.throw(x, y);
    }

    animate() {

        if (world.keyboard.LEFT || world.keyboard.RIGHT) {
            this.speedX += world.character.speedX;
        }

        if (world.character.mirrored) {
            addInterval(() => {
                this.moveLeft(this.speedX);
            }, 1000 / 60);

        } else {
            addInterval(() => {
                this.moveRight(this.speedX);
            }, 1000 / 60);
        }


        addInterval(() => {
            if (this.enemy_hit) {

                this.playAnimation(this.IMAGES_SPLASH, 'splash');
                this.previousAnimation = 'splash';

            } else this.playAnimation(this.IMAGES);

        }, 80);
    }

    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 10;
        this.applyGravity();
    }
}