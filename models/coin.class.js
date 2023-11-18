class Coin extends Collectable {

    IMAGES = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    
    /**
     * Creates a new collectable coin.
     * @param {number} level_end_x farthest x-position that the character can reach
     */
    constructor(level_end_x) {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);

        this.setVariables(level_end_x);
        this.animate();
    }


    /**
     * Sets a random y and x position for the coin and other basic variables.
     * @param {number} level_end_x farthest x-position that the character can reach
     */
    setVariables(level_end_x) {

        this.y = this.random * 200 + 50;
        this.height = 80;
        this.width = 80;
        this.x = this.getRandomValueX(level_end_x);
        this.offset = {
            left: 25,
            right: 25,
            top: 25,
            bottom: 25
        };
    }


    /**
     * Animates the coin by switching through the animation images.
     */
    animate() {

        this.playAnimation(this.IMAGES);
    }
}