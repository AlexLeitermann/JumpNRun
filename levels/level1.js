const level1 = new Level(
    new Character(),
    [
        new Chicken,
        new Chicken,
        new Chicken,
    ],    
    [
        new Cloud('../img/set1/5_background/layers/4_clouds/2.png', -720),
        new Cloud('../img/set1/5_background/layers/4_clouds/1.png', 0),
        new Cloud('../img/set1/5_background/layers/4_clouds/2.png', 720),
        new Cloud('../img/set1/5_background/layers/4_clouds/1.png', 720*2),
        new Cloud('../img/set1/5_background/layers/4_clouds/2.png', 720*3),
        new Cloud('../img/set1/5_background/layers/4_clouds/1.png', 720*4),
        new Cloud('../img/set1/5_background/layers/4_clouds/2.png', 720*5),
        new Cloud('../img/set1/5_background/layers/4_clouds/1.png', 720*6)
    ],
    [
        new BackgroundObject('../img/set1/5_background/layers/air.png', -720, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/3_third_layer/2.png', -720, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/2_second_layer/2.png', -720, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/1_first_layer/2.png', -720, 0, 721),

        new BackgroundObject('../img/set1/5_background/layers/air.png', 0, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/3_third_layer/1.png', 0, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/2_second_layer/1.png', 0, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/1_first_layer/1.png', 0, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/air.png', 720, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/3_third_layer/2.png', 720, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/2_second_layer/2.png', 720, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/1_first_layer/2.png', 720, 0, 721),

        new BackgroundObject('../img/set1/5_background/layers/air.png', 720*2, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/3_third_layer/1.png', 720*2, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/2_second_layer/1.png', 720*2, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/1_first_layer/1.png', 720*2, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/air.png', 720*3, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/3_third_layer/2.png', 720*3, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/2_second_layer/2.png', 720*3, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/1_first_layer/2.png', 720*3, 0, 721),

        new BackgroundObject('../img/set1/5_background/layers/air.png', 720*4, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/3_third_layer/1.png', 720*4, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/2_second_layer/1.png', 720*4, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/1_first_layer/1.png', 720*4, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/air.png', 720*5, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/3_third_layer/2.png', 720*5, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/2_second_layer/2.png', 720*5, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/1_first_layer/2.png', 720*5, 0, 721),

        new BackgroundObject('../img/set1/5_background/layers/air.png', 720*6, 0, 721, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/3_third_layer/1.png', 720*6, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/2_second_layer/1.png', 720*6, 0, 721),
        new BackgroundObject('../img/set1/5_background/layers/1_first_layer/1.png', 720*6, 0, 721),
    ],
    [4320]
);
