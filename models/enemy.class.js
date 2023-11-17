class Enemy extends MovableObject {

    characterIsAbove = false;


    /**
     * Sets the offsets for a new enemy and applies gravity to it.
     */
    constructor() {
        super().offset = {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        };
        this.applyGravity();
    }


    /**
     * Animtes the enemy as walking or dead.
     */
    animate() {

        addInterval(() => {

            if (this.isDead()) this.playAnimation(this.IMAGES_DEAD);

            else {
                this.playAnimation(this.IMAGES_WALK);
                this.moveLeft(this.speedX);
            }
        }, 200);
    }


    /**
     * Saves whether the character is currently above the enemy.
     */
    saveCharacterAbove() {
        this.characterIsAbove = this.y + this.offset.top > (world.character.y + world.character.height - world.character.offset.bottom);
    }


    /**
     * Kills the enemy by letting it fall out of the screen.
     */
    kill() {

        this.energy = 0;
        setTimeout(() => this.groundLevel = 1000, 500);
    }


    /**
     * Kills the enemy by letting it fall out of the screen. Lets the character bounce off.
     */
    stompKill() {

        this.kill();
        world.character.stomp_sound.play();
        world.character.jump();
    }
}