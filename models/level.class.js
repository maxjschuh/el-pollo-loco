class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    level_end_x;
    bottles;
    coins;


    
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