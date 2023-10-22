class Chicken extends MovableObject {
    IMAGES_WALKING = [
        '/img/set1/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '/img/set1/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '/img/set1/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
        '/img/set1/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    ];
    IMAGES_DEAD = [
        '/img/set1/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    currentImage_Dead = 0;
    imageCache_Dead;

    constructor() {
        super();
        // this.loadImage('/img/set1/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); 
        this.loadImages(this.IMAGES_WALKING);
        this.imageCache_Walk = this.imageCache;
        this.imageCache = {};
        this.loadImages(this.IMAGES_DEAD);
        this.imageCache_Dead = this.imageCache;
        
        this.setChickenToRandomX(500, 3500);
        this.y = 420;
        this.speed = this.initSpeed();
        this.width = 50;
        this.height = 50;
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
            if(this.energy > 0) {
                this.x < ( -200 ) ? this.x += (720 * 7.2) : this.x -= this.speed;
            }
        }, 25);
        regInterval(tempInterval);

        tempInterval = setInterval( () => {
            if(this.energy > 0) {
                let path = mainPath + this.IMAGES_WALKING[this.currentImage];
                this.img = this.imageCache_Walk[path];
                this.currentImage == (this.IMAGES_WALKING.length - 1) ? this.currentImage = 0 : this.currentImage++;
            } else {
                let path = mainPath + this.IMAGES_DEAD[this.currentImage_Dead];
                this.img = this.imageCache_Dead[path];
                this.currentImage_Dead == (this.IMAGES_DEAD.length - 1) ? this.currentImage_Dead = 0 : this.currentImage_Dead++;
            }
        }, 1000/8);
        regInterval(tempInterval);
    }
    
    setChickenToRandomX(startX, rangeX) {
        this.x = startX + Math.floor(Math.random() * rangeX);
    }

    initSpeed() {
        return  ((Math.random() * .75) + 0.75);
    }
}
    