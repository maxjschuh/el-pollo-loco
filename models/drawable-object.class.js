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
}