let level1;
const level_end_x = 5100;

function initLevel() {

    level1 = new Level(
        level_end_x,
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
            new Clouds(4),
            new Clouds(5),
            new Clouds(6)
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
            new Bottle(level_end_x),
            new Bottle(level_end_x),
            new Bottle(level_end_x),
            new Bottle(level_end_x),
            new Bottle(level_end_x)
        ],
        [
            new Coin(level_end_x),
            new Coin(level_end_x),
            new Coin(level_end_x),
            new Coin(level_end_x),
            new Coin(level_end_x)
        ]
    );
}