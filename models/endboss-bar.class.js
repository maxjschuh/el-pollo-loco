class EndbossBar extends StatusBar {

    IMAGES = [
        './img/7_statusbars/2_statusbar_endboss/endboss_health_0.png',
        './img/7_statusbars/2_statusbar_endboss/endboss_health_20.png',
        './img/7_statusbars/2_statusbar_endboss/endboss_health_40.png',
        './img/7_statusbars/2_statusbar_endboss/endboss_health_60.png',
        './img/7_statusbars/2_statusbar_endboss/endboss_health_80.png',
        './img/7_statusbars/2_statusbar_endboss/endboss_health_100.png'
    ];


    /**
     * Loads the images for the endboss health bar and sets its filling to 100%.
     */
    constructor() {
        super().loadImages(this.IMAGES);
        this.setFilling(100, this.IMAGES);
        this.y = 2;
        this.x = 400;
    }
}