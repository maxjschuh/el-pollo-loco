class BottleBar extends StatusBar {

    collect_sound = new Audio('./audio/bottle_collect.mp3');

    IMAGES = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];
    
    
    /**
     * Loads the images for the bottle bar and sets its filling to 0%.
     */
    constructor() {
        super().loadImages(this.IMAGES);
        this.setFilling(0, this.IMAGES);
        this.y = 80;
    }
}