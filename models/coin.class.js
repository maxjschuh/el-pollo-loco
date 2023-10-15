class Coin extends Collectable {

    IMAGES = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png'
    ];

    
    constructor() {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        
        this.y = this.getRandomValueY(); 
        this.height = 80;
        this.width = 80;
        this.x = this.getRandomValueX();
        this.animate();
    }

    getRandomValueY() {

        return this.random ** 2 * 200 + 50;
    }

    animate() {

        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 100);
    }
}