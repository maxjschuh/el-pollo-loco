class BackgroundObject extends MovableObject {

    
    /**
     * Constructs a background object once the height and twice the width of the canvas. The game uses several background objects with times n multiplied x-positions. Thus a horizontally scrollable level is created
     * @param {string} imagePath path to the image file
     * @param {number} multiplier integer that is used for multiplying the x-position of the background object
     */
    constructor(imagePath, multiplier) {
        super().loadImage(imagePath);
        this.x = multiplier * 1439;
        this.y = 0;
        this.height = 480;
        this.width = 1440;
    }
}