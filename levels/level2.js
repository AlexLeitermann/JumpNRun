// let level2;

function loadLevel2() {
    return new Level(
        [
            new Character(),
        ],
        [
            new BossChicken,
            new Chicken, // new Chicken, new Chicken, new Chicken, new Chicken,
            // new Chicken, new Chicken, new Chicken, new Chicken, new Chicken,
            // new Chicken, new Chicken, new Chicken, new Chicken, new Chicken,
            // new Chicken, new Chicken, new Chicken, new Chicken, new Chicken,
            new SmallChicken, // new SmallChicken, new SmallChicken, new SmallChicken, new SmallChicken,
            // new SmallChicken, new SmallChicken, new SmallChicken, new SmallChicken, new SmallChicken,
            // new SmallChicken, new SmallChicken, new SmallChicken, new SmallChicken, new SmallChicken,
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
            new BackgroundObject('/img/set1/5_background/layers/3_third_layer/2.png', 720, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/3_third_layer/1.png', 720*2, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/3_third_layer/2.png', 720*3, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/3_third_layer/1.png', 720*4, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/3_third_layer/2.png', 719*5, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/3_third_layer/1.png', 719*6, 0, 720),
    
            new BackgroundObject('/img/set1/5_background/layers/2_second_layer/2.png', -720, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/2_second_layer/1.png', 0, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/2_second_layer/2.png', 720, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/2_second_layer/1.png', 720*2, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/2_second_layer/2.png', 720*3, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/2_second_layer/1.png', 720*4, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/2_second_layer/2.png', 719*5, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/2_second_layer/1.png', 719*6, 0, 720),
    
            new BackgroundObject('/img/set1/5_background/layers/1_first_layer/2.png', -720, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/1_first_layer/1.png', 0, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/1_first_layer/2.png', 720, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/1_first_layer/1.png', 720*2, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/1_first_layer/2.png', 720*3, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/1_first_layer/1.png', 720*4, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/1_first_layer/2.png', 719*5, 0, 720),
            new BackgroundObject('/img/set1/5_background/layers/1_first_layer/1.png', 719*6, 0, 720),
    
            
            // new BackgroundObject('/img/set1/box_small_left.png', 350, 335, 100, 77, 0),
            // new BackgroundObject('/img/set1/box_small_left.png', 350, 277, 100, 77, 0),
            // new BackgroundObject('/img/set1/box_small_middle.png', 450, 335, 100, 77, 0),
            // new BackgroundObject('/img/set1/box_small_middle.png', 450, 277, 100, 77, 0),
            // new BackgroundObject('/img/set1/box_small_right.png', 550, 335, 100, 77, 0),
            // new BackgroundObject('/img/set1/box_small_right.png', 550, 277, 100, 77, 0),
            
            // new BackgroundObject('/img/set1/box_small_left.png', 1450, 335, 100, 77, 0),
            // new BackgroundObject('/img/set1/box_small_left.png', 1450, 277, 100, 77, 0),
            // new BackgroundObject('/img/set1/box_small_right.png', 1550, 335, 100, 77, 0),
            // new BackgroundObject('/img/set1/box_small_right.png', 1550, 277, 100, 77, 0),
            
            // new BackgroundObject('/img/set1/box_small_left.png', 2000, 335, 100, 77, 0),
            // new BackgroundObject('/img/set1/box_small_left.png', 2000, 277, 100, 77, 0),
            // new BackgroundObject('/img/set1/box_small_middle.png', 2100, 335, 100, 77, 0),
            // new BackgroundObject('/img/set1/box_small_middle.png', 2100, 277, 100, 77, 0),
            // new BackgroundObject('/img/set1/box_small_right.png', 2200, 335, 100, 77, 0),
            // new BackgroundObject('/img/set1/box_small_right.png', 2200, 277, 100, 77, 0),
            // new BackgroundObject('/img/set1/box_small_right.png', 2300, 335, 100, 77, 0),
            
            // new BackgroundObject('/img/set1/box_small.png', 3250, 335, 100, 77, 0),
            
            new BackgroundObject('/img/set1/box_small.png', 4220, 335, 100, 77, 0),
            new BackgroundObject('/img/set1/box_small.png', 4220, 277, 100, 77, 0),
            
            // new BackgroundObject('/img/set1/5_background/exit_sign.png', 719*0.4, 406, 55, 100, 100),
            // new BackgroundObject('/img/set1/5_background/exit_sign.png', 719*1.1, 406, 55, 100, 100),
            // new BackgroundObject('/img/set1/5_background/exit_sign.png', 719*2.55, 406, 55, 100, 100),
            // new BackgroundObject('/img/set1/5_background/exit_sign.png', 719*3.35, 406, 55, 100, 100),
            // new BackgroundObject('/img/set1/5_background/exit_sign.png', 719*5.7, 406, 55, 100, 100),
            new BackgroundObject('/img/set1/5_background/exit_sign3.png', 719*5.89, 406, 77, 150, 150),
        ],
        [4320],
        [
            // new Platforms(350,  300, 300),
            // new Platforms(1450, 300, 200),
            // new Platforms(2000, 300, 300),
            // new Platforms(2300, 358, 100),
            // new Platforms(3250, 358, 100),
            new Platforms(4220, 300, 100),
        ],
        [
            new Bottle(330, 420, 1),
            new Bottle(620, 420, 0),
            new Bottle(1270, 420, 0),
            new Bottle(1570, 420, 0),
            new Bottle(2030, 420, 1),
            // new Bottle(2280, 358, -1),
    
            // new Bottle(-500, 0, -1),
            // new Bottle(-500, 0, -1),
            // new Bottle(-500, 0, -1),
            
            // new Coin(150, 150),
            // new Coin(200, 150),
            // new Coin(380, 250),
            // new Coin(440, 380),
            // new Coin(480, 250),
            // new Coin(530, 380),
            // new Coin(580, 250),
            // new Coin(770, 150),
            // new Coin(820, 150),
            
            // new Coin(1350, 400),
            // new Coin(1250, 150),
            // new Coin(1300, 150),
            // new Coin(1400, 320),
            // new Coin(1450, 250),
            // new Coin(1535, 250),
            // new Coin(1620, 250),
    
            // new Coin(1900, 400),
            // new Coin(1750, 150),
            // new Coin(1800, 150),
            // new Coin(1950, 320),
            // new Coin(2000, 250),
            // new Coin(2130, 250),
            // new Coin(2270, 250),
    
            // new Coin(2520, 150),
    
            // new Coin(2800, 300),
            // new Coin(2850, 220),
            // new Coin(2900, 220),
            // new Coin(2950, 300),
    
            // new Coin(3150, 300),
            // new Coin(3350, 300),
    
        ]
    );
}