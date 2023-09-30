class EnemyBig extends Enemy {

    IMAGES_WALK = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        '../img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEAD);

        this.x = Math.random() * 500 + 200;
        this.y = 285;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }
}