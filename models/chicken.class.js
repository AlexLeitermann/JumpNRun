/**
 * Represents a Chicken object that extends MovableObject.
 * @extends {MovableObject}
 */
class Chicken extends MovableObject {
    /**
     * Default values for Chicken properties.
     * @type {Object}
     */
    defaultValues = {
        y: 420,
        width: 50,
        height: 50,
        yBaseline: 50,
        hitbox_x: 0,
        hitbox_y: 0,
        hitbox_width: 50,
        hitbox_height: 50,
        energy: 1,
        energy_return: 3,
        attack: 5
    }

    /**
     * Array of paths to images for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        '/img/set1/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '/img/set1/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '/img/set1/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
        '/img/set1/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    ];

    /**
     * Array of paths to images for the dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        '/img/set1/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    /**
     * Reference to the game world.
     * @type {object}
     */
    cworld;
    
    
    /**
     * Constructor for the Chicken class.
     */
    constructor() {
        super();
        this.loadSounds();
        this.loadImages(this.IMAGES_WALKING);
        this.imageCache_Walk = this.imageCache;
        this.loadImages(this.IMAGES_DEAD);
        this.imageCache_Dead = this.imageCache;
        this.currentImage_Walk = this.randomAnimationStart(this.IMAGES_WALKING.length - 1);
        this.loadValues();
        this.move();
        this.animation();
    }


    /**
     * Loads chicken dead sound if not already loaded.
     */
    loadSounds() {
        if(!this.snd_chicken_dead) {
            this.snd_chicken_dead = new Audio(mainPath + '/audio/chicken_dead.mp3');
        }
    }


    /**
     * Sets default values, loads images, and initializes other properties.
     */
    loadValues() {
        Object.assign(this, this.defaultValues);
        this.setChickenToRandomX(600, 3500);
        this.speed = this.initSpeed();
    }


    /**
     * Moves the chicken horizontally.
     */
    move() {
        tempInterval = setInterval( () => {
            if(this.energy > 0 && GameIsRunning) {
                this.x < ( -200 ) ? this.x += (720 * 7.2) : this.x -= this.speed;
            }
        }, 25);
        regInterval(tempInterval);
    }


    /**
     * Animates the chicken based on its energy level.
     */
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
    

    /**
     * Sets the chicken's x-coordinate to a random value within the specified range.
     * @param {number} startX - The starting x-coordinate.
     * @param {number} rangeX - The range of x-coordinates.
     */
    setChickenToRandomX(startX, rangeX) {
        this.x = startX + Math.floor(Math.random() * rangeX);
    }


    /**
     * Initializes and returns a random speed for the chicken.
     * @returns {number} - The random speed.
     */
    initSpeed() {
        return  ((Math.random() * 0.5) + 0.5);
    }


    /**
     * Revives the chicken after a specified time.
     */
    revive() {
        setTimeout(() => {
            this.x =(this.x % 720) + (720 * 7.2);
            this.speed = this.initSpeed();
            this.energy = 1;
        }, 2000);
    }


    /**
     * Generates a random number within the specified range.
     * @param {number} range - The range of random numbers.
     * @returns {number} - The random number.
     */
    randomAnimationStart(range = 0) {
        return (Math.floor(Math.random() * range));
    }
}
    