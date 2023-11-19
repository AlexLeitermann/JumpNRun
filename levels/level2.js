/**
 * Loads and returns the configuration for Level 2 of the game.
 * @returns {Level} The configured Level object for Level 2.
 */
function loadLevel2() {
    return new Level(
        [
            new Character(),
        ],
        [
            new BossChicken,
            new Chicken, new Chicken, new Chicken, new Chicken, new Chicken,
            new Chicken, new Chicken, new Chicken, new Chicken, new Chicken,
            new Chicken, new Chicken, new Chicken, new Chicken, new Chicken,
            new Chicken, new Chicken, new Chicken, new Chicken, new Chicken,
            new SmallChicken, new SmallChicken, new SmallChicken, new SmallChicken, new SmallChicken,
            new SmallChicken, new SmallChicken, new SmallChicken, new SmallChicken, new SmallChicken,
            new SmallChicken, new SmallChicken, new SmallChicken, new SmallChicken, new SmallChicken,
        ],    
        [
            new Cloud('/img/set1/5_background/layers/4_clouds/2.png', -720),
            new Cloud('/img/set1/5_background/layers/4_clouds/1.png', 0),
            new Cloud('/img/set1/5_background/layers/4_clouds/2.png', 720),
            new Cloud('/img/set1/5_background/layers/4_clouds/1.png', 720*2),
            new Cloud('/img/set1/5_background/layers/4_clouds/2.png', 720*3),
            new Cloud('/img/set1/5_background/layers/4_clouds/1.png', 720*4),
            new Cloud('/img/set1/5_background/layers/4_clouds/2.png', 720*5),
            new Cloud('/img/set1/5_background/layers/4_clouds/1.png', 720*6)
        ],
        [
            new BackgroundObject('/img/set1/5_background/layers/air2.png', -720, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/air2.png', 0, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/air2.png', 720, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/air2.png', 720*2, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/air2.png', 720*3, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/air2.png', 720*4, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/air2.png', 720*5, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/air2.png', 720*6, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/3_third_layer/2.png', -720, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/3_third_layer/1.png', 0, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/3_third_layer/2.png', 719, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/3_third_layer/1.png', 719*2, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/3_third_layer/2.png', 719*3, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/3_third_layer/1.png', 719*4, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/3_third_layer/2.png', 719*5, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/3_third_layer/1.png', 719*6, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/2_second_layer/2.png', -720, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/2_second_layer/1.png', 0, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/2_second_layer/2.png', 719, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/2_second_layer/1.png', 719*2, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/2_second_layer/2.png', 719*3, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/2_second_layer/1.png', 719*4, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/2_second_layer/2.png', 719*5, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/2_second_layer/1.png', 719*6, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/1_first_layer/2.png', -720, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/1_first_layer/1.png', 0, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/1_first_layer/2.png', 719, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/1_first_layer/1.png', 719*2, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/1_first_layer/2.png', 719*3, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/1_first_layer/1.png', 719*4, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/1_first_layer/2.png', 719*5, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/1_first_layer/1.png', 719*6, 0, 720),
            new BackgroundObject('/img/set1/box_small.png', -100, 335, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small.png', -100, 277, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small.png', -100, 219, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small_left.png', 750, 335, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small_left.png', 750, 277, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small_middle.png', 850, 335, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small_middle.png', 850, 277, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small_right.png', 950, 335, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small_right.png', 950, 277, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small_right.png', 950, 219, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small_left.png', 1700, 335, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small_left.png', 1800, 335, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small_left.png', 1800, 277, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small.png', 1900, 335, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small.png', 1900, 277, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small.png', 1900, 219, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small_right.png', 2000, 335, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small_right.png', 2000, 277, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small_right.png', 2100, 335, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small_left.png', 2700, 335, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small_left.png', 2700, 277, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small_right.png', 2800, 335, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small_right.png', 2800, 277, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small_right.png', 2800, 219, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small.png', 4220, 335, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small.png', 4220, 277, 100, 77, 0),
            new BackgroundObject('/img/set1/5_background/exit_sign.png', 110, 406, 55, 100, 100),
            new BackgroundObject('/img/set1/5_background/exit_sign.png', 1200, 406, 55, 100, 100),
            new BackgroundObject('/img/set1/5_background/exit_sign.png', 2450, 406, 55, 100, 100),
            new BackgroundObject('/img/set1/5_background/exit_sign.png', 3300, 406, 55, 100, 100),
            new BackgroundObject('/img/set1/5_background/exit_sign.png', 3900, 406, 55, 100, 100),
            new BackgroundObject('/img/set1/5_background/exit_sign3.png', 719*5.89, 406, 77, 150, 150)
        ],
        [4320],
        [
            new Platforms(750,  300, 200),
            new Platforms(940,  242, 110),
            new Platforms(1700,  358, 100),
            new Platforms(1800,  300, 100),
            new Platforms(1900,  242, 100),
            new Platforms(2000,  300, 100),
            new Platforms(2100,  358, 100),
            new Platforms(2700, 300, 100),
            new Platforms(2800, 242, 100),
            new Platforms(4220, 300, 100)
        ],
        [
            new Bottle(500, 420, 1),
            new Bottle(900, 420, 0),
            new Bottle(1800, 420, 1),
            new Bottle(2170, 420, 0),
            new Bottle(2700, 420, 1),
            new Bottle(2850, 242, -1),
            new Bottle(-500, 0, -1, true),
            new Bottle(-500, 0, -1, true),
            new Bottle(-500, 0, -1, true),
            new Coin(300, 380),
            new Coin(550, 150),
            new Coin(600, 150),
            new Coin(750, 50),
            new Coin(1200, 50),
            new Coin(650, 380),
            new Coin(700, 320),
            new Coin(750, 250),
            new Coin(830, 250),
            new Coin(920, 250),
            new Coin(1700, 50),
            new Coin(1750, 50),
            new Coin(2170, 50),
            new Coin(2120, 50),
            new Coin(1735, 400),
            new Coin(1935, 400),
            new Coin(2135, 400),
            new Coin(1835, 100),
            new Coin(1935, 50),
            new Coin(2035, 100),
            new Coin(2500, 150),
            new Coin(2550, 150),
            new Coin(2600, 50),
            new Coin(2650, 50),
            new Coin(2970, 50),
            new Coin(2850, 400),
            new Coin(3300, 300),
            new Coin(3350, 220),
            new Coin(3400, 220),
            new Coin(3450, 300),
        ]
    );
}
