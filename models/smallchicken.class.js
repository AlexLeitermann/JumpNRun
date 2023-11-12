class SmallChicken extends MovableObject {
    IMAGES_WALKING = [
        '/img/set1/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '/img/set1/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '/img/set1/3_enemies_chicken/chicken_small/1_walk/3_w.png',
        '/img/set1/3_enemies_chicken/chicken_small/1_walk/2_w.png'
    ];
    IMAGES_DEAD = [
        '/img/set1/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    cworld;


    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.imageCache_Walk = this.imageCache;
        this.loadImages(this.IMAGES_DEAD);
        this.imageCache_Dead = this.imageCache;
        this.loadSounds();
        this.loadValues();
        this.move();
        this.jump();
        this.animation();
        this.applyGravitation();
    }


    loadSounds() {
        if(!this.snd_chicken_dead) {
            this.snd_chicken_dead = new Audio(mainPath + '/audio/birds_1_beep.mp3');
        }
    }


    loadValues() {
        this.setChickenToRandomX(500, 3500);
        this.y = 420;
        this.speed = this.initSpeed();
        this.width = 34;
        this.height = 30;
        this.yBaseline = this.height;
        this.hitbox_x = 0;
        this.hitbox_y = 0;
        this.hitbox_width = this.width;
        this.hitbox_height = this.height;
        this.energy = 1;
        this.energy_return = 1;
        this.attack = 3;
    }


    move() {
        tempInterval = setInterval( () => {
            if(this.energy > 0 && GameIsRunning) {
                this.x < ( -200 ) ? this.x += (720 * 7.2) : this.x -= this.speed;
            }
        }, 25);
        regInterval(tempInterval);
    }


    jump() {
        tempInterval = setInterval( () => {
            if(this.energy > 0 && this.y == 420 && GameIsRunning) {
                this.speedY = 12;
                this.y -= 0.5;
            }
        }, (1500 + (this.initSpeed() * 1000)));
        regInterval(tempInterval);
    }


    animation() {
        tempInterval = setInterval( () => {
            if(this.energy > 0 && GameIsRunning) {
                let path = mainPath + this.IMAGES_WALKING[this.currentImage_Walk];
                this.img = this.imageCache_Walk[path];
                this.currentImage_Walk == (this.IMAGES_WALKING.length - 1) ? this.currentImage_Walk = 0 : this.currentImage_Walk++;
            } else if(this.energy <= 0 && GameIsRunning) {
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
        return  ((Math.random() * .5) + 0.3);
    }


    revive() {
        setTimeout(() => {
            this.x = 720 * 7.2;
            this.speed = this.initSpeed();
            this.energy = 1;
        }, 2000);
    }


    randomAnimationStart(range = 0) {
        return (Math.floor(Math.random() * range));
    }
}
    