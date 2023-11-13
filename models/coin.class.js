class Coin extends Collectable {

    IMAGES = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    constructor(level_end_x) {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);

        this.setVariables(level_end_x);
        this.animate();
    }

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

    animate() {

        addInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 100);
    }
}