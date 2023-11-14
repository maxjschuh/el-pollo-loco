class MovableObject extends DrawableObject {

    speedX = 10;
    mirrored = false;
    speedY = 0;
    acceleration = 1.3;
    energy = 100;
    lastHit;
    hurt = false;
    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };
    groundLevel;
    currentAnimation;
    previousAnimation;



    moveRight(speedX) {
        this.x += speedX;
    }



    moveLeft(speedX) {
        this.x -= speedX;
    }



    applyGravity() {

        addInterval(() => {

            if (this.isAboveGround() || this.speedY > 0) {

                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }



    isAboveGround() {

        if (this instanceof ThrowableObject) return true;

        else return this.y <= this.groundLevel;
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

        if (world.level_complete) return;            

        this.hurt_sound.play();
        this.energy -= 20;

        if (this.energy > 0) return;

        this.energy = 0;

        if (this instanceof Character || this instanceof Endboss) this.handleDeath();
    }



    isVulnerable(hitTime) {

        if (!hitTime) return true;

        let timePassed = new Date().getTime() - hitTime; // Difference in ms
        timePassed = timePassed / 1000;

        return timePassed > 0.8;
    }



    jump() {
        this.speedY = 25;
    }



    playAnimation(animation_images) {

        if (this.previousAnimation != this.currentAnimation) this.currentImage = 0;

        let i = this.currentImage % animation_images.length;
        let path = animation_images[i];
        this.img = this.imageCache[path];
        this.currentImage++;

        this.previousAnimation = this.currentAnimation;
    }



    handleDeath() {

        world.level_complete = true;
        resetButtons();
        world.muteMusic();
        this.currentAnimation = 'dead';
        this.playDeathAnimation();
        this.handleDeathSpecificForTarget();

        setTimeout(activateRestartButton, 3000);        
    }
}