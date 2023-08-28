class Light extends MovableObject {

    y = 0;
    width = 250;
    height = 200;

    constructor() {
        super().loadImage('../img/3. Background/Layers/1. Light/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}