class ThrowableObject extends MovableObject {

    speedX;

    IMAGES = [
        '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y) {
        super();
        this.y = 100;
        this.x = 100;
        this.height = 80;
        this.width = 80;

        this.loadImage('../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES);
        this.animate();
        this.throw(x, y);
    }

    animate() {
        setInterval(() => {
            this.moveRight();
        }, 10);

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