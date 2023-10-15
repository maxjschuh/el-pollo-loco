class EndbossBar extends StatusBar {

    IMAGES = [
        '../img/7_statusbars/2_statusbar_endboss/endboss_health_0.png',
        '../img/7_statusbars/2_statusbar_endboss/endboss_health_20.png',
        '../img/7_statusbars/2_statusbar_endboss/endboss_health_40.png',
        '../img/7_statusbars/2_statusbar_endboss/endboss_health_60.png',
        '../img/7_statusbars/2_statusbar_endboss/endboss_health_80.png',
        '../img/7_statusbars/2_statusbar_endboss/endboss_health_100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setFilling(100, this.IMAGES);
        this.y = 4;
        this.x = 470;
    }
}