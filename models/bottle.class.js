class Bottle extends MovableObject {
    IMAGES_FLY = [
        '/img/set1/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '/img/set1/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '/img/set1/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '/img/set1/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '/img/set1/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '/img/set1/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '/img/set1/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
        '/img/set1/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    IMAGES_SPLASH = [
        '/img/set1/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '/img/set1/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '/img/set1/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '/img/set1/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '/img/set1/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '/img/set1/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    imageCache_Fly;
    imageCache_Splash;
    currentImage_Fly = 0;
    currentImage_Splash = 0;
    reserve = false;
    speedX = 0;
    splash = false;


    constructor(x = 0, y = 420, right = 0, reserve = false) {
        super();
        this.setMemory(x, y, right, reserve);
        this.loadStartImage(right);
        this.reserve = reserve;
        this.loadAnimations();
        this.loadSounds();
        this.loadValues(x, y);
        this.animation();
        this.move();
        this.applyGravitation();
    }


    setMemory(x, y, right, reserve) {
        this.memX = x;
        this.memY = y;
        this.right = right;
        this.reserve = reserve;
    }


    loadStartImage(right) {
        if (right == 1) {
            this.loadImage('/img/set1/6_salsa_bottle/2_salsa_bottle_on_ground.png'); 
        } else if(right == 0){
            this.loadImage('/img/set1/6_salsa_bottle/1_salsa_bottle_on_ground.png'); 
        } else if(right == -1){
            this.loadImage('/img/set1/6_salsa_bottle/salsa_bottle.png'); 
        }
    }


    loadAnimations() {
        this.loadImages(this.IMAGES_FLY);
        this.imageCache_Fly = this.imageCache;
        this.loadImages(this.IMAGES_SPLASH);
        this.imageCache_Splash = this.imageCache;
    }


    loadSounds() {
        if (!this.snd_bottle) {
            this.snd_bottle = new Audio(mainPath + '/audio/bottle_open.mp3');
        }
        if (!this.snd_bottlebroken) {
            this.snd_bottlebroken = new Audio(mainPath + '/audio/glass_broken.mp3');
        }
    }


    loadValues(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.yBaseline = this.height;
        this.hitbox_x = 0;
        this.hitbox_y = 0;
        this.hitbox_width = this.width;
        this.hitbox_height = this.height;
        this.speed = 0;
        this.speedY = 0;
        this.acceleration = 0;
        this.energy = -1;
        this.attack = 10;
    }


    animation() {
        tempInterval = setInterval( () => {
            if(this.fly) {
                this.animationFly();
            } else if(this.splash) {
                this.animationSplash();
            } else if(!this.fly && !this.initStatus) {
                this.animationFlyStop();
            }
        }, 1000 / 16);
        regInterval(tempInterval);
    }


    animationFly() {
        this.currentImage_Splash = 0;
        let path = mainPath + this.IMAGES_FLY[this.currentImage_Fly];
        this.img = this.imageCache_Fly[path];
        this.currentImage_Fly == (this.IMAGES_FLY.length - 1) ? this.currentImage_Fly = 0 : this.currentImage_Fly++;
    }


    animationFlyStop() {
        this.currentImage_Fly = 0;
        let path = mainPath + this.IMAGES_FLY[this.currentImage_Fly];
        this.img = this.imageCache_Fly[path];
    }


    animationSplash() {
        let path = mainPath + this.IMAGES_SPLASH[this.currentImage_Splash];
        this.img = this.imageCache_Splash[path];
        this.currentImage_Splash == (this.IMAGES_SPLASH.length - 1) ? this.currentImage_Splash = (this.IMAGES_SPLASH.length - 1) : this.currentImage_Splash++;
    }


    move() {
        tempInterval = setInterval( () => {
            if((this.energy == 0 || this.energy == -2) && (this.y != -100)) {
                this.y = -100;
            }
            if(this.fly && this.energy > 0 && GameIsRunning == true) {
                this.x += this.speed;
            }
            }, 1000 / 60);
        regInterval(tempInterval);
    }
    
}
    