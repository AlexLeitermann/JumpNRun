/**
 * Class representing a small chicken that extends MovableObject.
 */
class SmallChicken extends MovableObject {
    /**
     * Default values for the small chicken object.
     * @type {Object}
     */
    defaultValues = {
        y: 420,
        width: 34,
        height: 30,
        yBaseline: 30,
        hitbox_x: 0,
        hitbox_y: 0,
        hitbox_width: 34,
        hitbox_height: 30,
        energy: 1,
        energy_return: 1,
        attack: 3
    }

    /**
     * Array of file paths for walking animation images.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        '/img/set1/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '/img/set1/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '/img/set1/3_enemies_chicken/chicken_small/1_walk/3_w.png',
        '/img/set1/3_enemies_chicken/chicken_small/1_walk/2_w.png'
    ];

    /**
     * Array of file paths for dead animation images.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        '/img/set1/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Reference to the game world.
     * @type {Object}
     */
    cworld;


    /**
     * Constructor for the SmallChicken class.
     */
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


    /**
     * Loads the sound for chicken death if not already loaded.
     */
    loadSounds() {
        if(!this.snd_chicken_dead) {
            this.snd_chicken_dead = new Audio(mainPath + '/audio/birds_1_beep.mp3');
        }
    }


    /**
     * Loads default values and sets the chicken to a random X position.
     */
    loadValues() {
        Object.assign(this, this.defaultValues);
        this.setChickenToRandomX(500, 3500);
        this.speed = this.initSpeed();
    }


    /**
     * Moves the chicken horizontally at a regular interval.
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
     * Makes the chicken jump at a regular interval if conditions are met.
     */
    jump() {
        tempInterval = setInterval( () => {
            if(this.energy > 0 && this.y == 420 && GameIsRunning) {
                this.speedY = 12;
                this.y -= 0.5;
            }
        }, (1500 + (this.initSpeed() * 1000)));
        regInterval(tempInterval);
    }


    /**
     * Handles the animation of the chicken based on its energy and game status.
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
     * Sets the chicken to a random X position within a given range.
     * @param {number} startX - The starting X position.
     * @param {number} rangeX - The range within which the X position can vary.
     */
    setChickenToRandomX(startX, rangeX) {
        this.x = startX + Math.floor(Math.random() * rangeX);
    }


    /**
     * Initializes and returns a random speed value for the chicken.
     * @returns {number} - The randomly generated speed value.
     */
    initSpeed() {
        return  ((Math.random() * .5) + 0.3);
    }


    /**
     * Revives the chicken after a certain time period.
     */
    revive() {
        setTimeout(() => {
            this.x = 720 * 7.2;
            this.speed = this.initSpeed();
            this.energy = 1;
        }, 2000);
    }


    /**
     * Generates a random animation start index within a given range.
     * @param {number} range - The range within which the animation start index can vary.
     * @returns {number} - The randomly generated animation start index.
     */
    randomAnimationStart(range = 0) {
        return (Math.floor(Math.random() * range));
    }
}
    