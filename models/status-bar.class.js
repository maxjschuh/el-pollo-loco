class StatusBar extends DrawableObject {

    IMAGES = [
        '../img/4. Marcadores/orange/0_  copia.png',
        '../img/4. Marcadores/orange/20_  copia.png',
        '../img/4. Marcadores/orange/40_  copia.png',
        '../img/4. Marcadores/orange/60_  copia.png',
        '../img/4. Marcadores/orange/80_  copia.png',
        '../img/4. Marcadores/orange/100_  copia.png'
    ];

    filledPortion = 100;

    constructor() {
        super().loadImage('../img/4. Marcadores/orange/0_  copia.png');
        this.loadImages(this.IMAGES);
        this.setFilling(100);
        this.x = -80;
        this.y = 0;
        this.height = 50;
        this.width = 150;
    }

    setFilling(filledPortion) {
        this.filledPortion = filledPortion;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
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