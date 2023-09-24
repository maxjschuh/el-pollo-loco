class ThrowableObject extends MovableObject {

    speedX;

    constructor(x, y) {
        super();
        this.y = 100;
        this.x = 100;
        this.height = 80;
        this.width = 80;


        this.loadImage('../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.animate();
        this.throw(x, y);
    }

    animate() {
        setInterval(() => {
            this.moveRight();
        }, 1000 / 240);
    }

    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 10;
        this.applyGravity();
    }
}