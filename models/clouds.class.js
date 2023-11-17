class Clouds extends MovableObject {

    y = 0;
    width = 250;
    height = 200;

    
    /**
     * Creates a clouds backround object.
     * @param {number} multiplierX integer that moves the clouds' starting position to a n value of the canvas
     */
    constructor(multiplierX) {
        super().loadImage('./img/5_background/layers/4_clouds/full.png');
        this.height = 480;
        this.width = 1440;
        this.x = 1440 * multiplierX;
        this.animate();
    }


    /**
     * Animates the clouds by moving them 1 pixel to the left every 50 milliseconds.
     */
    animate() {

        addInterval(() => this.x--, 50);
    }
}