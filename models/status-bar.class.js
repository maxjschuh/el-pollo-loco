class StatusBar extends DrawableObject {

    filledPortion = 100;
    amount_collected = 0;
    amount_max = 5;


    /**
     * Sets the variables that are the same for all status bars.
     */
    constructor() {
        super().height = 50;
        this.width = 150;
        this.x = 10;
    }


    /**
     * Sets the filling of the status bar according to the inputted parameters.
     * @param {number} filledPortion integer that represents the filled portion in percent
     * @param {Array} images array of the images of the status bar
     */
    setFilling(filledPortion, images) {
        this.filledPortion = filledPortion;
        let imagePath = images[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }


    /**
     * Resolves the filledPortion variable into a image index.
     * @returns {number} image index
     */
    resolveImageIndex() {
        if (this.filledPortion > 80) return 5;
        if (this.filledPortion > 60) return 4;
        if (this.filledPortion > 40) return 3;
        if (this.filledPortion > 20) return 2;
        if (this.filledPortion > 0) return 1;
        return 0;
    }


    /**
     * Only usable for statusbars that count collectables. Updates the statusbar according to the collected amount of a collectable.
     */
    updateStatusBar() {

        const amount_percent = (this.amount_collected / this.amount_max) * 100;
        this.setFilling(amount_percent, this.IMAGES);
    }
}