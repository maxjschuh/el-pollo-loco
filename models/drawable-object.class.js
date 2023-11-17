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


    /**
     * Loads the image from the passed path.
     * @param {string} path file path from where the image should be loaded
     */
    loadImage(path) {

        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Loads all images from the passed array of paths.
     * @param {Array} arr array of file paths from where the images should be loaded
     */
    loadImages(arr) {

        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Draws the object, on which this function is executed, on the canvas.
     * @param {object} ctx canvas rendering context 2D
     */
    draw(ctx) {

        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}