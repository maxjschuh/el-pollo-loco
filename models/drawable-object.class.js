class DrawableObject {

    x = 0;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

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



    drawFrame(ctx) {

        // if (this instanceof Character || 
        //     this instanceof Enemy || 
        //     this instanceof Endboss ||
        //     this instanceof ThrowableObject ||
        //     this instanceof Collectable) {
        //     ctx.beginPath();
        //     ctx.lineWidth = '1';
        //     ctx.strokeStyle = 'blue';
        //     ctx.rect(
        //         this.x,
        //         this.y,
        //         this.width,
        //         this.height);
        //     ctx.stroke();

        //     ctx.beginPath();
        //     ctx.lineWidth = '1';
        //     ctx.strokeStyle = 'red';
        //     ctx.rect(
        //         this.x + this.offset.left,
        //         this.y + this.offset.top,
        //         this.width - this.offset.left - this.offset.right,
        //         this.height - this.offset.top - this.offset.bottom);
        //     ctx.stroke();
        // }
    }
}