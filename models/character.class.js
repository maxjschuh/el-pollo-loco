class Character extends MovableObject {

    y = 80;

    IMAGES_IDLE = [
        '../img/1.Sharkie/1.IDLE/1.png',
        '../img/1.Sharkie/1.IDLE/2.png',
        '../img/1.Sharkie/1.IDLE/3.png',
        '../img/1.Sharkie/1.IDLE/4.png',
        '../img/1.Sharkie/1.IDLE/5.png',
        '../img/1.Sharkie/1.IDLE/6.png',
        '../img/1.Sharkie/1.IDLE/7.png',
        '../img/1.Sharkie/1.IDLE/8.png',
        '../img/1.Sharkie/1.IDLE/9.png',
        '../img/1.Sharkie/1.IDLE/10.png',
        '../img/1.Sharkie/1.IDLE/11.png',
        '../img/1.Sharkie/1.IDLE/12.png',
        '../img/1.Sharkie/1.IDLE/13.png',
        '../img/1.Sharkie/1.IDLE/14.png',
        '../img/1.Sharkie/1.IDLE/15.png',
        '../img/1.Sharkie/1.IDLE/16.png',
        '../img/1.Sharkie/1.IDLE/17.png',
        '../img/1.Sharkie/1.IDLE/18.png'
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
    IMAGES_POISONED = [
        '../img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        '../img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        '../img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        '../img/1.Sharkie/5.Hurt/1.Poisoned/5.png',
    ];
    world;

    walking_sound = new Audio('../audio/swim.mp3');

    constructor() {
        super().loadImage('../img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SWIM);

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

            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {

                this.playAnimation(this.IMAGES_SWIM);
            } else {

                this.playAnimation(this.IMAGES_IDLE);
            }

        }, 200);


    }
}