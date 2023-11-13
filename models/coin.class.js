class Coin extends Collectable {

    IMAGES = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    constructor(level_end_x) {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);

        this.y = this.getRandomValueY();
        this.height = 80;
        this.width = 80;
        this.x = this.getRandomValueX(level_end_x);
        this.offset = {
            left: 25,
            right: 25,
            top: 25,
            bottom: 25
        };
        this.animate();
    }

    getRandomValueY() {

        return this.random * 200 + 50;
    }

    animate() {

        addInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 100);
    }
}