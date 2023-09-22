class HealthBar extends StatusBar {

    IMAGES = [
        '../img/4. Marcadores/orange/0_  copia.png',
        '../img/4. Marcadores/orange/20_ copia 2.png',
        '../img/4. Marcadores/orange/40_  copia.png',
        '../img/4. Marcadores/orange/60_  copia.png',
        '../img/4. Marcadores/orange/80_  copia.png',
        '../img/4. Marcadores/orange/100_  copia.png'
    ];

    constructor() {
        super();
        this.loadImage('../img/4. Marcadores/orange/0_  copia.png');
        this.loadImages(this.IMAGES);
        this.setFilling(100, this.IMAGES);
        this.y = 0;
    }
}