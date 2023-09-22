class StatusBar extends DrawableObject {

    filledPortion = 100;

    constructor() {
        super();
        this.height = 50;
        this.width = 150;
        this.x = 10;
    }

    setFilling(filledPortion, images) {
        this.filledPortion = filledPortion;
        let imagePath = images[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    resolveImageIndex() {
        if (this.filledPortion > 80) {
            return 5;
        } else if (this.filledPortion > 60) {
            return 4;
        } else if (this.filledPortion > 40) {
            return 3;
        } else if (this.filledPortion > 20) {
            return 2;
        } else if (this.filledPortion > 0) {
            return 1;
        } else {
            return 0;
        }
    }

}