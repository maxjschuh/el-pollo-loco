class CoinsBar extends StatusBar {

    IMAGES = [
        '../img/4. Marcadores/orange/coins-bar_0.png',
        '../img/4. Marcadores/orange/coins-bar_20.png',
        '../img/4. Marcadores/orange/coins-bar_40.png',
        '../img/4. Marcadores/orange/coins-bar_60.png',
        '../img/4. Marcadores/orange/coins-bar_80.png',
        '../img/4. Marcadores/orange/coins-bar_100.png'
    ];

    constructor() {
        super();
        this.loadImage('../img/4. Marcadores/orange/coins-bar_0.png');
        this.loadImages(this.IMAGES);
        this.setFilling(100, this.IMAGES);
        this.y = 40;
    }

}