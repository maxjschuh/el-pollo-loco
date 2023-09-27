class Enemy extends MovableObject {

    characterIsAbove;
    world;
    dead;

    constructor() {
        super();
        this.characterIsAbove = false;
        this.dead = false;
    }

    animate() {

        setInterval(() => {

            if (this.dead) {
                this.playAnimation(this.IMAGES_DEAD);

            } else {
                this.playAnimation(this.IMAGES_WALK);
                this.moveLeft();
            }

        }, 200);
    }

    saveCharacterAbove() {
        this.characterIsAbove = this.y > (this.world.character.y + this.world.character.height);
    }
}