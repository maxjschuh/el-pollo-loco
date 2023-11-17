class Collectable extends MovableObject {

    random = Math.random();

    
    /**
     * Computes a random x value between 0 and the level end.
     * @param {number} level_end_x farthest x-position that the character can reach
     * @returns {number} random x value
     */
    getRandomValueX(level_end_x) {

        let x = this.random * (level_end_x - 200);
        if (x < 400) x += 400;
        
        return x;
    }
}