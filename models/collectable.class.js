class Collectable extends MovableObject {

    random = Math.random();

    getRandomValueX(level_end_x) {

        let x = this.random * (level_end_x - 200);
        if (x < 400) x += 400;
        
        return x;
    }
}