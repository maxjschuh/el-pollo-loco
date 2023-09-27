class Bottle extends Collectable {

    IMAGES = [
        '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super();

        let random = Math.random();
        if (random > 0.5) {
            this.loadImage(this.IMAGES[0]);

        } else {
            this.loadImage(this.IMAGES[0]);

        }        
    }
}