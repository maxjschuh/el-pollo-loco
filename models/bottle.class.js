class Bottle extends Collectable {

    IMAGES = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super();
        this.getRandomImage();
        this.y = 350; 
        this.height = 80;
        this.width = 80;
        this.x = this.getRandomValueX();
        this.offset = {
            left: 25,
            right: 25,
            top: 10,
            bottom: 10
        };
    }

    getRandomImage() {

        if (this.random > 0.5) {
            this.loadImage(this.IMAGES[0]);

        } else {
            this.loadImage(this.IMAGES[1]);
        }
    }
}