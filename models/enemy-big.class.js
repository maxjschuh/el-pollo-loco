class EnemyBig extends Enemy {

    IMAGES_WALK = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    /**
     * Loads the images for a big enemy and animates it.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEAD);

        this.setVariables();
        this.animate();
    }


    /**
     * Is only executed once. Sets basic variables of the enemyBig object.
     */
    setVariables() {

        this.x = Math.random() * 4800 + 400;
        this.y = 280;
        this.groundLevel = 280;
        this.speedX = 8 + Math.random() * 8;
        this.offset = {
            left: 10,
            right: 10,
            top: 30,
            bottom: 10
        };
    }
}