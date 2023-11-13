class CoinsBar extends StatusBar {

    IMAGES = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    coin_collect_sound = new Audio('./audio/coin_collect.mp3');

    constructor() {
        super().loadImages(this.IMAGES);
        this.setFilling(0, this.IMAGES);
        this.y = 40;
    }
}