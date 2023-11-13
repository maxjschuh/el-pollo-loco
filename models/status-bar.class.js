class StatusBar extends DrawableObject {

    filledPortion = 100;

    constructor() {
        super().height = 50;
        this.width = 150;
        this.x = 10;
    }

    setFilling(filledPortion, images) {
        this.filledPortion = filledPortion;
        let imagePath = images[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    resolveImageIndex() {
        if (this.filledPortion > 80) return 5;
        if (this.filledPortion > 60) return 4;
        if (this.filledPortion > 40) return 3;
        if (this.filledPortion > 20) return 2;
        if (this.filledPortion > 0) return 1;
        return 0;
    }

}