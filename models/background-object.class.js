class BackgroundObject extends MovableObject {

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x * 1440;
        this.y = 0;
        this.height = 480;
        this.width = 1440;
    }
}