class Enemy extends MovableObject {

    IMAGES_IDLE = [
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];

    constructor() {
        super().loadImage('../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_IDLE);

        this.x = Math.random() * 500 + 200;
        this.y = Math.random() * 300 + 50;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }
    
    eat() {

    }

    animate() {
        this.moveLeft();

        setInterval(() => {

            this.playAnimation(this.IMAGES_IDLE);
            this.x = this.x - 5;
        }, 200);
    }
}