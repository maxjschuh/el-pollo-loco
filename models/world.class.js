class World {

    ctx;

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
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

        this.waters.forEach(water => {
            this.ctx.drawImage(water.img, water.x, water.y, water.width, water.height);
        });

        this.backgrounds.forEach(background => {
            this.ctx.drawImage(background.img, background.x, background.y, background.width, background.height);
        });

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.height, this.character.width);

        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });

        this.floors.forEach(floor => {
            this.ctx.drawImage(floor.img, floor.x, floor.y, floor.width, floor.height);
        });

        this.lights.forEach(light => {
            this.ctx.drawImage(light.img, light.x, light.y, light.width, light.height);
        });

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }
}