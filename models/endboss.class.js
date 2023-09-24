class Endboss extends MovableObject {

    height = 520;
    width = 608;

    IMAGES_IDLE = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png'
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