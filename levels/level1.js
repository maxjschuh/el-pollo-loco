let level1;

function initLevel() {

    level1 = new Level(
        [
            new EnemySmall(),
            new EnemyBig(),
            new EnemySmall(),
            new EnemySmall(),
            new EnemyBig(),
            new EnemySmall(),
            new EnemyBig(),
            new EnemyBig()
        ],
            new Endboss(),
        [
            new Clouds(0),
            new Clouds(1),
            new Clouds(2),
            new Clouds(3),
            new Clouds(4)
        ],
        [
            new BackgroundObject('./img/5_background/layers/air.png', -1),
            new BackgroundObject('./img/5_background/layers/3_third_layer/full.png', -1),
            new BackgroundObject('./img/5_background/layers/2_second_layer/full.png', -1),
            new BackgroundObject('./img/5_background/layers/1_first_layer/full.png', -1),

            new BackgroundObject('./img/5_background/layers/air.png', 0),
            new BackgroundObject('./img/5_background/layers/3_third_layer/full.png', 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/full.png', 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/full.png', 0),

            new BackgroundObject('./img/5_background/layers/air.png', 1),
            new BackgroundObject('./img/5_background/layers/3_third_layer/full.png', 1),
            new BackgroundObject('./img/5_background/layers/2_second_layer/full.png', 1),
            new BackgroundObject('./img/5_background/layers/1_first_layer/full.png', 1),

            new BackgroundObject('./img/5_background/layers/air.png', 2),
            new BackgroundObject('./img/5_background/layers/3_third_layer/full.png', 2),
            new BackgroundObject('./img/5_background/layers/2_second_layer/full.png', 2),
            new BackgroundObject('./img/5_background/layers/1_first_layer/full.png', 2),

            new BackgroundObject('./img/5_background/layers/air.png', 3),
            new BackgroundObject('./img/5_background/layers/3_third_layer/full.png', 3),
            new BackgroundObject('./img/5_background/layers/2_second_layer/full.png', 3),
            new BackgroundObject('./img/5_background/layers/1_first_layer/full.png', 3)
        ],
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ]
    );
}