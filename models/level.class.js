class Level {
    
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    level_end_x;
    bottles;
    coins;


    /**
     * Constructs a new level with the passed parameters.
     * @param {number} level_end_x farthest x-position that the character can reach
     * @param {Array} enemies contains all small and big enemies
     * @param {object} endboss the single endboss
     * @param {Array} clouds contains all clouds background objects
     * @param {Array} backgroundObjects contains all background objects except clouds
     * @param {Array} bottles contains all collectable bottles
     * @param {Array} coins contains all collectable coins
     */
    constructor(level_end_x, enemies, endboss, clouds, backgroundObjects, bottles, coins) {
        this.level_end_x = level_end_x;
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}