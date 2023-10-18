class MovableObject extends DrawableObject {

    speedX = 10;
    mirrored = false;
    speedY = 0;
    acceleration = 1.3;
    energy = 100;
    lastHit;
    currentAnimation;
    hurt = false;
    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

    moveRight(speedX) {
        this.x += speedX;
    }

    moveLeft(speedX) {
        this.x -= speedX;
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
            return this.y <= this.groundLevel;
        }
    }

    isColliding(mo) { 

        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }



    isDead() {
        return this.energy == 0;
    }

    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    isHurt(hitTime) {

        let timePassed = new Date().getTime() - hitTime; // Difference in ms
        timePassed = timePassed / 1000;

        return timePassed > 0.5;
    }

    die(mo) {
        mo.img = mo.IMAGES_DEAD;
    }

    jump() {
        this.speedY = 25;
    }

}