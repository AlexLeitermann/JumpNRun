/**
 * Class representing a movable object with various properties and behaviors.
 */
class MovableObject {
    x;
    y;
    width;
    height;
    yBaseline;
    hitbox_x;
    hitbox_y;
    hitbox_width;
    hitbox_height;
    speed = 0;
    speedY = 0;
    acceleration = 1;
    attack = 0;
    energy = 100;
    energy_return = 0;
    initStatus = true;
    flipH = false;
    isFalling = false;
    fly = false;
    isJump = false;
    isHurt = false;
    platforms_toJump = [];
    img = new Image();
    imageCache = [];
    imageCache_Walk = [];
    imageCache_Idle = [];
    imageCache_Jump = [];
    imageCache_Dead = [];
    currentImage = 0;
    currentImage_Walk = 0;
    currentImage_Idle = 0;
    currentImage_Jump = 0;
    currentImage_Dead = 0;
    index = -99;
    memX;
    memY;
    memEnergy;
    memReserve;
    


    /**
     * Loads an image for the object.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img.src = mainPath + path;
    }


    /**
     * Loads an array of images into the image cache.
     * @param {string[]} arr - An array of image paths.
     */
    loadImages(arr) {
        this.imageCache = [];
        arr.forEach((path) => {
            let img = new Image();
            let fullPath = mainPath + path;
            img.src = fullPath;
            this.imageCache[fullPath] = img;
        });
    }


    /**
     * Applies gravitational movement to the object.
     */
    applyGravitation() {
        tempInterval = setInterval(() => {
            if(GameIsRunning) {
                let middle = this.x + (this.width / 2);
                this.gravitationMove();
                if (this instanceof Character) {
                    if(this.isRangeOfPlatforms(middle)[0] && (this.speedY) < 0) {
                        this.jumpOnPlatforms(this.isRangeOfPlatforms(middle)[1]);
                    } 
                }
                this.landedOnGround(420);
                this.speedY < -1 ? this.isFalling = true : this.isFalling = false;
            }
        }, 1000 / 30);
        regInterval(tempInterval);
    }


    /**
     * Moves the object based on gravitational forces.
     */
    gravitationMove() {
        if (!(this instanceof Bottle && !this.fly) && this.energy >= 0) {
            if(this.y < 420) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } 
        }
    }
    
    
    /**
     * Handles jumping onto platforms.
     * @param {number} y - The Y-coordinate of the platform.
     */
    jumpOnPlatforms(y) {
        if(this.y > y && this.y < (y+30) && !keyboard.Down) {
            this.noJump(y);
        }
    }


    /**
     * Checks if the object has landed on the ground.
     * @param {number} y - The Y-coordinate of the ground.
     */
    landedOnGround(y) {
        if(this.y >= y) {
            this.noJump(y, false);
        }
    }


    /**
     * Resets the jumping state of the object.
     * @param {number} y - The Y-coordinate to reset to.
     * @param {boolean} splash - Flag indicating if a splash effect should occur.
     */
    noJump(y = -100, splash = false) {
        this.speedY = 0;
        if(this instanceof Bottle) {
            this.noJumpBottle(splash);
            setTimeout(() => {
                this.y = y;
            }, splash ? 600 : 0);
        } else {
            this.y = y;
        }
        this.isJump = false;
        this.currentImage_Jump = 0;
    }


    /**
     * Handles the no-jump state for a Bottle object.
     * @param {boolean} splash - Flag indicating if a splash effect should occur.
     */
    noJumpBottle(splash) {
        this.speed = 0;
        this.fly = false;
        this.acceleration = 0;
        this.energy = -1;
        this.currentImage_Fly = 0;
        this.splash = splash;
    }


    /**
     * Checks if the object is within the range of platforms for jumping.
     * @param {number} middle - The middle X-coordinate of the object.
     * @returns {Array} - An array with a boolean indicating if the object is within range and the Y-coordinate of the platform.
     */
    isRangeOfPlatforms(middle) {
        let answer = false;
        let y = 0;
        if(this.platforms_toJump) {
            this.platforms_toJump.forEach( p => {
                if(middle >= p.x && middle <= (p.x + p.width)) {
                    answer = true;
                    y = p.y;
                }
            });
        }
        return [answer, y];
    }


    /**
     * Checks if the hitbox of the object is colliding with another object's hitbox.
     * @param {Object} obj - The other object.
     * @returns {boolean} - True if collision occurs, false otherwise.
     */
    isCollidingHitbox(obj) {
        return (this.x + this.hitbox_x + this.hitbox_width) >= (obj.x + obj.hitbox_x) &&
        (this.x + this.hitbox_x) <= (obj.x + obj.hitbox_x + obj.hitbox_width) &&
        (this.y - this.yBaseline + this.hitbox_y) <= (obj.y - obj.yBaseline + obj.hitbox_y + obj.hitbox_height) &&
        (this.y - this.yBaseline + this.hitbox_y + this.hitbox_height) >= (obj.y - obj.yBaseline + obj.hitbox_y);
    }
}