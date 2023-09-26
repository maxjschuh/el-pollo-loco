class DrawableObject {

    x = 0;
    y = 200;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;


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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    playAnimation(animation_images) {

        let i = this.currentImage % animation_images.length;
        let path = animation_images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    drawFrame(ctx) {

        if (this instanceof Character || this instanceof Enemy) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}