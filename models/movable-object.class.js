class MovableObject extends DrawableObject {

    speed = 10;
    mirrored = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;



    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }



    applyGravity() {

        setInterval(() => {

            if (this.isAboveGround() || this.speedY > 0) {

                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // Trowable objects should always fall
            return true;
        } else {
            return this.y < 275;
        }
    }

    // isColliding(obj) {
    //     return (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) &&
    //         (this.Y + this.offsetY + this.height) >= obj.Y &&
    //         (this.Y + this.offsetY) <= (obj.Y + obj.height);
    // }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

    isDead() {
        return this.energy == 0;
    }

    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
        timePassed = timePassed / 1000;

        return timePassed < 2;
    }

    die(mo) {
        mo.img = mo.IMAGES_DEAD;
    }

    jump() {
        this.speedY = 20;
    }

}