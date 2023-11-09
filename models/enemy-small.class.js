class EnemySmall extends Enemy {

    IMAGES_WALK = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALK[0]);

        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEAD);

        this.height = 80;
        this.width = 80;
        this.x = Math.random() * 4800 + 400;
        this.y = 345;
        this.groundLevel = 345;
        this.speedX = 8 + Math.random() * 8;
        this.animate();
    }
}