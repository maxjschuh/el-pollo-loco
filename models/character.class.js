class Character extends MovableObject {

    y = 80;

    IMAGES_IDLE = [
        '../img/2_character_pepe/1_idle/idle/I-1.png',
    ];

    IMAGES_SWIM = [
        '../img/1.Sharkie/3.Swim/1.png',
        '../img/1.Sharkie/3.Swim/2.png',
        '../img/1.Sharkie/3.Swim/3.png',
        '../img/1.Sharkie/3.Swim/4.png',
        '../img/1.Sharkie/3.Swim/5.png',
        '../img/1.Sharkie/3.Swim/6.png'
    ];
    IMAGES_SLEEP = [
        '../img/1.Sharkie/2.Long_IDLE/i1.png',
        '../img/1.Sharkie/2.Long_IDLE/i2.png',
        '../img/1.Sharkie/2.Long_IDLE/i3.png',
        '../img/1.Sharkie/2.Long_IDLE/i4.png',
        '../img/1.Sharkie/2.Long_IDLE/i5.png',
        '../img/1.Sharkie/2.Long_IDLE/i6.png',
        '../img/1.Sharkie/2.Long_IDLE/i7.png',
        '../img/1.Sharkie/2.Long_IDLE/i8.png',
        '../img/1.Sharkie/2.Long_IDLE/i9.png',
        '../img/1.Sharkie/2.Long_IDLE/i10.png',
        '../img/1.Sharkie/2.Long_IDLE/i11.png',
        '../img/1.Sharkie/2.Long_IDLE/i12.png',
        '../img/1.Sharkie/2.Long_IDLE/i13.png',
        '../img/1.Sharkie/2.Long_IDLE/i14.png'
    ];
    IMAGES_HURT_POISONED = [
        '../img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        '../img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        '../img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        '../img/1.Sharkie/5.Hurt/1.Poisoned/5.png',
    ];
    IMAGES_HURT_SHOCKED = [
        '../img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        '../img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        '../img/1.Sharkie/5.Hurt/2.Electric shock/3.png'
    ];
    IMAGES_DEAD_POISONED = [
        '../img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00000.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00001.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00002.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00003.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00004.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00005.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00006.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00007.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00008.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00009.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00010.png',
        '../img/1.Sharkie/6.dead/1.Poisoned/sin subir/DES 2_00011.png'
    ];
    IMAGES_DEAD_SHOCKED = [
        '../img/1.Sharkie/6.dead/2.Electro_shock/1.png',
        '../img/1.Sharkie/6.dead/2.Electro_shock/2.png',
        '../img/1.Sharkie/6.dead/2.Electro_shock/3.png',
        '../img/1.Sharkie/6.dead/2.Electro_shock/4.png',
        '../img/1.Sharkie/6.dead/2.Electro_shock/5.png',
        '../img/1.Sharkie/6.dead/2.Electro_shock/6.png',
        '../img/1.Sharkie/6.dead/2.Electro_shock/7.png',
        '../img/1.Sharkie/6.dead/2.Electro_shock/8.png',
        '../img/1.Sharkie/6.dead/2.Electro_shock/9.png',
        '../img/1.Sharkie/6.dead/2.Electro_shock/10.png'
    ];
    world;

    walking_sound = new Audio('../audio/swim.mp3');

    constructor() {
        super().loadImage('../img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_HURT_POISONED);
        this.loadImages(this.IMAGES_HURT_SHOCKED);
        this.loadImages(this.IMAGES_DEAD_POISONED);
        this.loadImages(this.IMAGES_DEAD_SHOCKED);




        this.animate();
        this.applyGravity();
    }

    animate() {

        setInterval(() => {

            // this.walking_sound.pause();

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.mirrored = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.mirrored = true;
                this.walking_sound.play();
            }

            // console.log(this.speedY, this.y);

            if (this.world.keyboard.UP && this.y > 0) {
                this.speedY = 15;
            }

            this.world.camera_x = -this.x + 100;

        }, 1000 / 60);


        setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD_POISONED);

            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT_POISONED);

            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {

                this.playAnimation(this.IMAGES_SWIM);

            } else {

                this.playAnimation(this.IMAGES_IDLE);
            }

        }, 200);
    }
}