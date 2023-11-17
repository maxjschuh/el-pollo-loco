class MovableObject extends DrawableObject {

    speedX = 10;
    mirrored = false;
    speedY = 0;
    acceleration = 1.3;
    energy = 100;
    lastHit;
    offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };
    groundLevel;
    currentAnimation;
    previousAnimation;


    /**
     * Moves the object to the right by the passed length.
     * @param {number} speedX amount of pixels that the object should be moved
     */
    moveRight(speedX) {
        this.x += speedX;
    }


    /**
     * Moves the object to the left by the passed length.
     * @param {number} speedX amount of pixels that the object should be moved
     */
    moveLeft(speedX) {
        this.x -= speedX;
    }


    /**
     * Applies gravity, i. e. lets the object fall down with increasing speed if it is above its ground level.
     */
    applyGravity() {

        addInterval(() => {

            if (this.isAboveGround() || this.speedY > 0) {

                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }


    /**
     * Checks if the object is above its individual ground level. Flying bottles will always fall.
     * @returns {boolean} true if it is above its ground level
     */
    isAboveGround() {

        if (this instanceof ThrowableObject) return true;

        else return this.y <= this.groundLevel;
    }


    /**
     * Checks if the passed object is colliding with the object on which this function is executed.
     * @param {object} mo movable object that is checked for collision
     * @returns {boolean} true if there is a collision, false if not
     */
    isColliding(mo) {

        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    /**
     * Tells whether the object on which this function is executed is dead, i. e. has depleted energy.
     * @returns {boolean} true if the object is dead, false if not
     */
    isDead() {
        return this.energy <= 0;
    }


    /**
     * Hits the object on which this function is executed, i. e. decreases its energy by 20. If the object is dead and it is the character or the endboss, the function for handling its death (and by that ending the game) is called.
     * @returns if the game has already ended or if the object is not dead
     */
    hit() {

        if (world.level_complete) return;

        this.hurt_sound.play();
        this.energy -= 20;

        if (!this.isDead()) return;

        this.energy = 0;

        if (this instanceof Character || this instanceof Endboss) this.handleDeath();
    }


    /**
     * Tells whether the object on which this function is executed is vulnerable, i. e. it has not been hit in the last 0.8 seconds or has never been hit before.
     * @param {number} hitTime time of the current hit on the object
     * @returns {boolean} true if the object is vulnerable, false if not
     */
    isVulnerable(hitTime) {

        if (!hitTime) return true;

        let timePassed = new Date().getTime() - hitTime; // Difference in ms
        timePassed = timePassed / 1000;

        return timePassed > 0.8;
    }


    /**
     * Increases the vertical speed of the object.
     */
    jump() {
        this.speedY = 25;
    }


    /**
     * Shows the next picture in the passed array of animation images. Starts at the first picture if the animation has changed.
     * @param {Array} animation_images Array of images for the current animation
     */
    playAnimation(animation_images, currentAnimation) {

        if (currentAnimation) this.currentAnimation = currentAnimation;

        if (this.previousAnimation != this.currentAnimation) this.currentImage = 0;

        let i = this.currentImage % animation_images.length;
        let path = animation_images[i];
        this.img = this.imageCache[path];
        this.currentImage++;

        this.previousAnimation = this.currentAnimation;
    }


    /**
     * Starts all processes that are needed at the end of the game, independent from whether its a win or loose.
     */
    handleDeath() {

        world.level_complete = true;
        setTimeout(resetButtons, 3000);
        world.muteMusic();
        this.currentAnimation = 'dead';
        this.playDeathAnimation();
        this.handleDeathSpecificForTarget();

        setTimeout(activateRestartButton, 3000);
    }
}