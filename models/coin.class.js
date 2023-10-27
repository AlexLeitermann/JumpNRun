class Coin extends MovableObject {
    IMAGES_WALKING = [
        '/img/set1/8_coin/coin_1c.png'
    ];
    snd_coin = new Audio(mainPath + '/audio/coin.mp3');

    constructor(x = 0, y = 0) {
        super();
        this.loadImage('/img/set1/8_coin/coin_1c.png'); 
        this.loadImages(this.IMAGES_WALKING);
        this.imageCache_Walk = this.imageCache;
        
        this.x = x;
        this.y = y;
        this.speed = 0;
        this.width = 30;
        this.height = 30;
        this.yBaseline = this.height;
        this.hitbox_x = 0;
        this.hitbox_y = 0;
        this.hitbox_width = this.width;
        this.hitbox_height = this.height;
        this.energy = 1;

        this.animation();
    }

    animation() {
        tempInterval = setInterval( () => {
            if(this.energy == 0) {
                setTimeout(() => {
                    this.y = -1;
                }, 100);
            }
        }, 25);
        regInterval(tempInterval);
    }

}
    