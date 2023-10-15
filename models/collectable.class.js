class Collectable extends MovableObject {

    random = Math.random();
    level_end = 2200;

    getRandomValueX() {

        let x = this.random * this.level_end;

        if (x < 400) {
            x += 400;
        }

        return x;
    }
}