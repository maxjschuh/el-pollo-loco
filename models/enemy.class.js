class Enemy extends MovableObject {

    animate() {

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
            this.x = this.x - 5;
        }, 200);
    }
}