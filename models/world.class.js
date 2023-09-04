class World {

    ctx;

    character = new Character();
    enemies = [
        new Enemy(),
        new Enemy(),
        new Enemy()
    ];
    lights = [
        new Light(),
    ];
    floors = [
        new Floor(),
    ];
    waters = [
        new Water(),
    ];
    backgrounds = [
        new Background,
    ];
    canvas;
    ctx;
    keyboard;

    backgroundObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


        this.addObjectsToMap(this.waters);
        this.addObjectsToMap(this.backgrounds);
        this.addObjectsToMap(this.floors);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.lights);
        this.addObjectsToMap(this.enemies);

        this.addToMap(this.character);


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}