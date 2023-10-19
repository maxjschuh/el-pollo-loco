class Clouds extends MovableObject {

    y = 0;
    width = 250;
    height = 200;

    constructor(multiplierX) {
        super().loadImage('./img/5_background/layers/4_clouds/full.png');
        this.height = 480;
        this.width = 1440;
        this.x = 1440 * multiplierX;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x--;
        }, 50);
    }
}