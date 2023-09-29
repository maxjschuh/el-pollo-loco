class Bottle extends Collectable {

    IMAGES = [
        '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    level_end = 2000;

    constructor() {
        super();

        let random = Math.random();
        if (random > 0.5) {
            this.loadImage(this.IMAGES[0]);

        } else {
            this.loadImage(this.IMAGES[1]);
        }       
        this.y = 275;
        this.setX(random);
    }

    setX(random) {
        this.x = random * this.level_end;
    }
}