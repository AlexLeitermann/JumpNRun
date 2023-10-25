class BossChicken extends MovableObject {
    IMAGES_WALKING = [
        '/img/set1/4_enemie_boss_chicken/1_walk/G1.png',
        '/img/set1/4_enemie_boss_chicken/1_walk/G2.png',
        '/img/set1/4_enemie_boss_chicken/1_walk/G3.png',
        '/img/set1/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_DEAD = [
        '/img/set1/4_enemie_boss_chicken/5_dead/G24.png',
        '/img/set1/4_enemie_boss_chicken/5_dead/G25.png',
        '/img/set1/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    IMAGES_ALERT = [
        '/img/set1/4_enemie_boss_chicken/2_alert/G5.png',
        '/img/set1/4_enemie_boss_chicken/2_alert/G6.png',
        '/img/set1/4_enemie_boss_chicken/2_alert/G7.png',
        '/img/set1/4_enemie_boss_chicken/2_alert/G8.png',
        '/img/set1/4_enemie_boss_chicken/2_alert/G9.png',
        '/img/set1/4_enemie_boss_chicken/2_alert/G10.png',
        '/img/set1/4_enemie_boss_chicken/2_alert/G11.png',
        '/img/set1/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        '/img/set1/4_enemie_boss_chicken/3_attack/G13.png',
        '/img/set1/4_enemie_boss_chicken/3_attack/G14.png',
        '/img/set1/4_enemie_boss_chicken/3_attack/G15.png',
        '/img/set1/4_enemie_boss_chicken/3_attack/G16.png',
        '/img/set1/4_enemie_boss_chicken/3_attack/G17.png',
        '/img/set1/4_enemie_boss_chicken/3_attack/G18.png',
        '/img/set1/4_enemie_boss_chicken/3_attack/G19.png',
        '/img/set1/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        '/img/set1/4_enemie_boss_chicken/4_hurt/G21.png',
        '/img/set1/4_enemie_boss_chicken/4_hurt/G22.png',
        '/img/set1/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    currentImage_Dead = 0;
    currentImage_Walk = 0;
    currentImage_Alert = 0;
    currentImage_Attack = 0;
    currentImage_Hurt = 0;
    imageCache_Dead;
    imageCache_Walk;
    imageCache_Alert;
    imageCache_Attack;
    imageCache_Hurt;

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
        this.width = 261;
        this.height = 304;
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

    revive() {
        this.x = 720 * 7.2;
        this.speed = this.initSpeed();
        this.energy = 1;
    }
}
    