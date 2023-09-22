class PoisonBar extends StatusBar {

    IMAGES = [
        '../img/4. Marcadores/orange/poison-bar_0.png',
        '../img/4. Marcadores/orange/poison-bar_20.png',
        '../img/4. Marcadores/orange/poison-bar_40.png',
        '../img/4. Marcadores/orange/poison-bar_60.png',
        '../img/4. Marcadores/orange/poison-bar_80.png',
        '../img/4. Marcadores/orange/poison-bar_100.png'
    ];

    constructor() {
        super();
        this.loadImage('../img/4. Marcadores/orange/poison-bar_0.png');
        this.loadImages(this.IMAGES);
        this.setFilling(100, this.IMAGES);
        this.y = 80;
    }
}