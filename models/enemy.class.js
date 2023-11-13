class Enemy extends MovableObject {

    characterIsAbove = false;
    dead = false;

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

        let self = this;

        addInterval(() => {

            if (self.dead) {
                self.playAnimation(self.IMAGES_DEAD);

            } else {
                self.playAnimation(self.IMAGES_WALK);
                self.moveLeft(self.speedX);
            }
        }, 200);
    }

    saveCharacterAbove() {
        this.characterIsAbove = this.y + this.offset.top > (world.character.y + world.character.height - world.character.offset.bottom);
    }
}