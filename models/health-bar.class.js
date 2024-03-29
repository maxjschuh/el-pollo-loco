class HealthBar extends StatusBar {

    IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];


    /**
     * Loads the images for the character health bar and sets its filling to 100%.
     */
    constructor() {
        super().loadImages(this.IMAGES);
        this.setFilling(100, this.IMAGES);
        this.y = 0;
    }
}