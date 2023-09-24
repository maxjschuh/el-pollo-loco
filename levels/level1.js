const level1 = new Level(
    [
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Endboss()
    ],
    [
        new Clouds()
    ],
    [
        new BackgroundObject('../img/5_background/layers/air.png', -1),
        new BackgroundObject('../img/5_background/layers/3_third_layer/full.png', -1),
        new BackgroundObject('../img/5_background/layers/2_second_layer/full.png', -1),
        new BackgroundObject('../img/5_background/layers/1_first_layer/full.png', -1),

        new BackgroundObject('../img/5_background/layers/air.png', 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/full.png', 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/full.png', 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/full.png', 0),

        new BackgroundObject('../img/5_background/layers/air.png', 1),
        new BackgroundObject('../img/5_background/layers/3_third_layer/full.png', 1),
        new BackgroundObject('../img/5_background/layers/2_second_layer/full.png', 1),
        new BackgroundObject('../img/5_background/layers/1_first_layer/full.png', 1),

        new BackgroundObject('../img/5_background/layers/air.png', 2),
        new BackgroundObject('../img/5_background/layers/3_third_layer/full.png', 2),
        new BackgroundObject('../img/5_background/layers/2_second_layer/full.png', 2),
        new BackgroundObject('../img/5_background/layers/1_first_layer/full.png', 2)
    ]
);