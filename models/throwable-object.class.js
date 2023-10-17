class ThrowableObject extends MovableObject {

    speedX;

    IMAGES = [
        '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    throw_sound = new Audio('../audio/throw.mp3');

    constructor(x, y) {
        super();
        this.y = 100;
        this.x = 100;
        this.height = 80;
        this.width = 80;
        this.offset = {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        };

        this.throw_sound.play();
        this.loadImage('../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGES_SPLASH);
        this.animate();
        this.throw(x, y);
    }

    animate() {

        if (world.character.mirrored) {
            setInterval(() => {
                this.moveLeft();
            }, 20);

        } else {
            setInterval(() => {
                this.moveRight();
            }, 20);
        }


        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 80);
    }

    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 10;
        this.applyGravity();
    }
}