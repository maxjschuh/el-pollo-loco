class Chicken extends MovableObject {

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
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }
    
    eat() {

    }

    animate() {
        this.moveLeft();

        setInterval(() => {
            let i = this.currentImage % this.IMAGES_IDLE.length;
            let path = this.IMAGES_IDLE[i];
            this.img = this.imageCache[path];
            this.currentImage++;

            this.x = this.x - 5;
        }, 200);
    }
}