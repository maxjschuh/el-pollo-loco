class Enemy extends MovableObject {

    characterIsAbove;
    world;
    dead;

    constructor() {
        super();
        this.characterIsAbove = false;
        this.dead = false;
        this.offset = {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        };
    }

    animate() {

        setInterval(() => {

            if (this.dead) {
                this.playAnimation(this.IMAGES_DEAD);

            } else {
                this.playAnimation(this.IMAGES_WALK);
                this.moveLeft(this.speedX);
            }

        }, 200);
    }

    saveCharacterAbove() {
        this.characterIsAbove = this.y + this.offset.top > (this.world.character.y + this.world.character.height - this.world.character.offset.bottom);
    }
}