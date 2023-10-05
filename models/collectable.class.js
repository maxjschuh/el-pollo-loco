class Collectable extends MovableObject {

    random = Math.random();
    level_end = 2200;

    getRandomImage() {

        if (this.random > 0.5) {
            this.loadImage(this.IMAGES[0]);

        } else {
            this.loadImage(this.IMAGES[1]);
        }
    }

    getRandomValue() {

        let x = this.random * this.level_end;

        if (x < 400) {
            x += 400;
        }

        return x;
    }

}