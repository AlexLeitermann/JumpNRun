/**
 * Represents a Bottle object that extends MovableObject.
 * @extends MovableObject
 */
class Bottle extends MovableObject {
    /**
     * Default values for the Bottle object.
     * @type {Object}
     */
    defaultValues = {
        width: 50,
        height: 50,
        yBaseline: 50,
        hitbox_x: 0,
        hitbox_y: 0,
        hitbox_width: 50,
        hitbox_height: 50,
        speed: 0,
        speedY: 0,
        acceleration: 0,
        energy: -1,
        attack: 10
    }

    /**
     * Array of image paths for flying animation.
     * @type {string[]}
     */
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

    /**
     * Array of image paths for splash animation.
     * @type {string[]}
     */
    IMAGES_SPLASH = [
        '/img/set1/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '/img/set1/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '/img/set1/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '/img/set1/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '/img/set1/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '/img/set1/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /**
     * Other individual default Values.
     */
    imageCache_Fly;
    imageCache_Splash;
    currentImage_Fly = 0;
    currentImage_Splash = 0;
    reserve = false;
    speedX = 0;
    splash = false;


    /**
     * Constructor for the Bottle class.
     * @param {number} x - The x-coordinate of the bottle.
     * @param {number} y - The y-coordinate of the bottle.
     * @param {number} right - The direction of the bottle (1 for right, 0 for left, -1 for neutral).
     * @param {boolean} reserve - Flag indicating if the bottle is in reserve.
     */
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


    /**
     * Sets the memory values for the bottle.
     * @param {number} x - The x-coordinate to set in memory.
     * @param {number} y - The y-coordinate to set in memory.
     * @param {number} right - The direction to set in memory.
     * @param {boolean} reserve - Flag indicating if the bottle is in reserve.
     */
    setMemory(x, y, right, reserve) {
        this.memX = x;
        this.memY = y;
        this.right = right;
        this.reserve = reserve;
    }


    /**
     * Loads the initial image based on the direction.
     * @param {number} right - The direction of the bottle (1 for right, 0 for left, -1 for neutral).
     */
    loadStartImage(right) {
        if (right == 1) {
            this.loadImage('/img/set1/6_salsa_bottle/2_salsa_bottle_on_ground.png'); 
        } else if(right == 0){
            this.loadImage('/img/set1/6_salsa_bottle/1_salsa_bottle_on_ground.png'); 
        } else if(right == -1){
            this.loadImage('/img/set1/6_salsa_bottle/salsa_bottle.png'); 
        }
    }


    /**
     * Loads flying and splash animations along with their respective image caches.
     */
    loadAnimations() {
        this.loadImages(this.IMAGES_FLY);
        this.imageCache_Fly = this.imageCache;
        this.loadImages(this.IMAGES_SPLASH);
        this.imageCache_Splash = this.imageCache;
    }


    /**
     * Loads sounds for the bottle if not already loaded.
     */
    loadSounds() {
        if (!this.snd_bottle) {
            this.snd_bottle = new Audio(mainPath + '/audio/bottle_open.mp3');
        }
        if (!this.snd_bottlebroken) {
            this.snd_bottlebroken = new Audio(mainPath + '/audio/glass_broken.mp3');
        }
    }


    /**
     * Loads default values and sets the initial position of the bottle.
     * @param {number} x - The initial x-coordinate of the bottle.
     * @param {number} y - The initial y-coordinate of the bottle.
     */
    loadValues(x, y) {
        Object.assign(this, this.defaultValues);
        this.x = x;
        this.y = y;
    }


    /**
     * Initiates animation loop for flying, splashing, or stopping animation based on the bottle's state.
     */
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


    /**
     * Handles flying animation logic.
     */
    animationFly() {
        this.currentImage_Splash = 0;
        let path = mainPath + this.IMAGES_FLY[this.currentImage_Fly];
        this.img = this.imageCache_Fly[path];
        this.currentImage_Fly == (this.IMAGES_FLY.length - 1) ? this.currentImage_Fly = 0 : this.currentImage_Fly++;
    }


    /**
     * Handles stopping the flying animation.
     */
    animationFlyStop() {
        this.currentImage_Fly = 0;
        let path = mainPath + this.IMAGES_FLY[this.currentImage_Fly];
        this.img = this.imageCache_Fly[path];
    }


    /**
     * Handles splash animation logic.
     */
    animationSplash() {
        let path = mainPath + this.IMAGES_SPLASH[this.currentImage_Splash];
        this.img = this.imageCache_Splash[path];
        this.currentImage_Splash == (this.IMAGES_SPLASH.length - 1) ? this.currentImage_Splash = (this.IMAGES_SPLASH.length - 1) : this.currentImage_Splash++;
    }


    /**
     * Handles the movement logic of the bottle.
     */
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
    