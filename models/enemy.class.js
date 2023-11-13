class Enemy extends MovableObject {

    characterIsAbove = false;

    constructor() {
        super().offset = {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        };
        this.applyGravity();
    }

    animate() {

        addInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);

            } else {
                this.playAnimation(this.IMAGES_WALK);
                this.moveLeft(this.speedX);
            }
        }, 200);
    }

    saveCharacterAbove() {
        this.characterIsAbove = this.y + this.offset.top > (world.character.y + world.character.height - world.character.offset.bottom);
    }

    kill() {
        this.energy = 0;
        setTimeout(() => {
            this.groundLevel = 1000;
        }, 500);
    }

    stompKill() {

        this.kill();
        world.character.stomp_sound.play();
        world.character.jump();
    }
}