class MovableObject {
    x = 0;
    y = 200;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 10;
    mirrored = false;
    speedY = 0;
    acceleration = 0.25;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        this.x++;
        draw();
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    playAnimation(animation_images) {

        let i = this.currentImage % animation_images.length;
        let path = animation_images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    applyGravity() {

        setInterval(() => {

            if (this.isAboveGround() || this.speedY > 0) {

                this.y -= this.speedY;
                this.speedY -= this.acceleration;

            }

        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 300;
    }

}