class Endboss extends MovableObject {

    height = 520;
    width = 608;

    IMAGES_IDLE = [
        '../img/2.Enemy/3 Final Enemy/2.floating/1.png',
        '../img/2.Enemy/3 Final Enemy/2.floating/2.png',
        '../img/2.Enemy/3 Final Enemy/2.floating/3.png',
        '../img/2.Enemy/3 Final Enemy/2.floating/4.png',
        '../img/2.Enemy/3 Final Enemy/2.floating/5.png',
        '../img/2.Enemy/3 Final Enemy/2.floating/6.png',
        '../img/2.Enemy/3 Final Enemy/2.floating/7.png',
        '../img/2.Enemy/3 Final Enemy/2.floating/8.png',
        '../img/2.Enemy/3 Final Enemy/2.floating/9.png',
        '../img/2.Enemy/3 Final Enemy/2.floating/10.png',
        '../img/2.Enemy/3 Final Enemy/2.floating/11.png',
        '../img/2.Enemy/3 Final Enemy/2.floating/12.png',
        '../img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_IDLE);

        this.x = 1800;
        this.y = -50;
        this.animate();
    }

    animate() {

        setInterval(() => {

            this.playAnimation(this.IMAGES_IDLE);

        }, 200);
    }
}