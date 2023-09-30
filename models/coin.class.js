class Coin extends Collectable {

    IMAGES = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png'
    ];

    
    constructor() {
        super();  
        this.getRandomImage();
        this.y = 350; 
        this.height = 80;
        this.width = 80;
        this.x = this.random * this.level_end;
    }
}