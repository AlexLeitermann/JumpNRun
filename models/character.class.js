/**
 * Represents a character that extends a movable object.
 * @extends MovableObject
 */
class Character extends MovableObject {
    /**
     * Default values for the character's properties.
     * @type {Object}
     */
    defaultValues = {
        x: 0,
        y: 420,
        width: 92,
        height: 180,
        yBaseline: 180,
        speed: 1.6,
        energy: 100,
        attack: 10,
        isFalling: false,
        hitbox_x: 16,
        hitbox_y: 70,
        hitbox_height: 100
    }

    /**
     * Arrays of paths to some animation images.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        '/img/set1/2_character_pepe/2_walk/W-21.png',
        '/img/set1/2_character_pepe/2_walk/W-22.png',
        '/img/set1/2_character_pepe/2_walk/W-23.png',
        '/img/set1/2_character_pepe/2_walk/W-24.png',
        '/img/set1/2_character_pepe/2_walk/W-25.png',
        '/img/set1/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_IDLE = [
        '/img/set1/2_character_pepe/1_idle/idle/I-1.png',
        '/img/set1/2_character_pepe/1_idle/idle/I-2.png',
        '/img/set1/2_character_pepe/1_idle/idle/I-3.png',
        '/img/set1/2_character_pepe/1_idle/idle/I-4.png',
        '/img/set1/2_character_pepe/1_idle/idle/I-5.png',
        '/img/set1/2_character_pepe/1_idle/idle/I-6.png',
        '/img/set1/2_character_pepe/1_idle/idle/I-7.png',
        '/img/set1/2_character_pepe/1_idle/idle/I-8.png',
        '/img/set1/2_character_pepe/1_idle/idle/I-9.png',
        '/img/set1/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_JUMP_START = [
        '/img/set1/2_character_pepe/3_jump/J-31.png',
        '/img/set1/2_character_pepe/3_jump/J-32.png',
        '/img/set1/2_character_pepe/3_jump/J-33.png',
        '/img/set1/2_character_pepe/3_jump/J-34.png'
    ];
    IMAGES_JUMP = [
        '/img/set1/2_character_pepe/3_jump/J-34.png',
        '/img/set1/2_character_pepe/3_jump/J-34.png',
        '/img/set1/2_character_pepe/3_jump/J-34.png',
        '/img/set1/2_character_pepe/3_jump/J-35.png',
        '/img/set1/2_character_pepe/3_jump/J-35.png',
        '/img/set1/2_character_pepe/3_jump/J-35.png',
        '/img/set1/2_character_pepe/3_jump/J-35.png',
        '/img/set1/2_character_pepe/3_jump/J-36.png',
        '/img/set1/2_character_pepe/3_jump/J-36.png',
        '/img/set1/2_character_pepe/3_jump/J-36.png',
        '/img/set1/2_character_pepe/3_jump/J-36.png',
        '/img/set1/2_character_pepe/3_jump/J-37.png',
        '/img/set1/2_character_pepe/3_jump/J-38.png',
        '/img/set1/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_FALL = [
        '/img/set1/2_character_pepe/3_jump/J-35.png',
        '/img/set1/2_character_pepe/3_jump/J-35.png',
        '/img/set1/2_character_pepe/3_jump/J-35.png',
        '/img/set1/2_character_pepe/3_jump/J-36.png',
        '/img/set1/2_character_pepe/3_jump/J-36.png'
    ];
    IMAGES_HURT = [
        '/img/set1/2_character_pepe/4_hurt/H-41.png',
        '/img/set1/2_character_pepe/4_hurt/H-42.png',
        '/img/set1/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        '/img/set1/2_character_pepe/5_dead/D-51.png',
        '/img/set1/2_character_pepe/5_dead/D-52.png',
        '/img/set1/2_character_pepe/5_dead/D-53.png',
        '/img/set1/2_character_pepe/5_dead/D-54.png',
        '/img/set1/2_character_pepe/5_dead/D-55.png',
        '/img/set1/2_character_pepe/5_dead/D-56.png',
        '/img/set1/2_character_pepe/5_dead/D-57.png'
    ];
    cworld;
    imageCache_Jump_Start;
    imageCache_Fall;
    imageCache_Hurt;
    currentImage_Jump_Start = 0;
    currentImage_Fall = 0;
    currentImage_Hurt = 0;
    jumpCount = -1;
    isDead = false;
    isThrowing = false;
    coins = 0;
    bottles = 0;
    backpack = [];
    findReserve = false;


    /**
     * Constructor for the Character class.
     */
    constructor() {
        super();
        this.loadAnimations();
        this.loadValues();
        this.run();
        this.applyGravitation();
    }


    /**
     * Loads animation images into their respective image caches.
     */
    loadAnimations() {
        this.loadImages(this.IMAGES_WALKING);
        this.imageCache_Walk = this.imageCache;
        this.loadImages(this.IMAGES_IDLE);
        this.imageCache_Idle = this.imageCache;
        this.loadImages(this.IMAGES_JUMP);
        this.imageCache_Jump = this.imageCache;
        this.loadImages(this.IMAGES_JUMP_START);
        this.imageCache_Jump_Start = this.imageCache;
        this.loadImages(this.IMAGES_FALL);
        this.imageCache_Fall = this.imageCache;
        this.loadImages(this.IMAGES_HURT);
        this.imageCache_Hurt = this.imageCache;
        this.loadImages(this.IMAGES_DEAD);
        this.imageCache_Dead = this.imageCache;
    }


    /**
     * Initializes default values and calculates hitbox width.
     */
    loadValues() {
        Object.assign(this, this.defaultValues);
        this.hitbox_width = this.width - (this.hitbox_x * 2);
    }


    /**
     * Initiates character movement, animation, and gravity application.
     */
    run() {
        this.animateWalking();
        this.animateIdleHurtDead();
        this.animateJumping();
        this.checkKeyboard();
    }


    /**
     * Animates the character's walking.
     */
    animateWalking(){
        tempInterval = setInterval( () => {
            if( (keyboard.Left || keyboard.Right) && this.isJump == false && this.isFalling == false && this.jumpCount < 0 && this.energy > 0 && GameIsRunning) {
                let path = mainPath + this.IMAGES_WALKING[this.currentImage_Walk];
                this.img = this.imageCache_Walk[path];
                this.currentImage_Walk == (this.IMAGES_WALKING.length - 1) ? this.currentImage_Walk = 0 : this.currentImage_Walk++;
                this.walkingSoundPlay();
            } else {
                this.walkingSoundPause();
            }
        }, 1000/12);
        regInterval(tempInterval);
    }


    /**
     * Plays walking sound if character is moving.
     */
    walkingSoundPlay() {
        if(world.audio.snd_walk.paused || world.audio.snd_walk.ended) {
            world.audio.snd_walk.play();
        }
    }


    /**
     * Pauses walking sounds when the character is standing.
     */
    walkingSoundPause() {
        if(GameIsRunning) {
            if(!world.audio.snd_walk.paused) {
                world.audio.snd_walk.pause();
            }
        }
    }


    /**
     * Animates the character based on its status.
     */
    animateIdleHurtDead() {
        tempInterval = setInterval( () => {
            if((keyboard.Left || keyboard.Right) == false && this.isJump == false && this.isFalling == false && this.jumpCount < 0 && this.energy > 0 && GameIsRunning) {
                this.isHurt ? this.animateHurt() : this.animateIdle();
            } else if(this.energy <= 0 && GameIsRunning) {
                let path = mainPath + this.IMAGES_DEAD[this.currentImage_Dead];
                this.img = this.imageCache_Dead[path];
                this.currentImage_Dead == (this.IMAGES_DEAD.length - 1) ? this.currentImage_Dead = (this.IMAGES_DEAD.length - 1) : this.currentImage_Dead++;
            }
        }, 1000/6);
        regInterval(tempInterval);
    }


    /**
     * Animates the character in hurt status.
     */
    animateHurt() {
        let path = mainPath + this.IMAGES_HURT[this.currentImage_Hurt];
        this.img = this.imageCache_Hurt[path];
        this.currentImage_Hurt == (this.IMAGES_HURT.length - 1) ? this.currentImage_Hurt = (this.IMAGES_HURT.length - 1) : this.currentImage_Hurt++;
    }


    /**
     * Animates the character in idle status.
     */
    animateIdle() {
        this.currentImage_Hurt = 0;
        let path = mainPath + this.IMAGES_IDLE[this.currentImage_Idle];
        this.img = this.imageCache_Idle[path];
        this.currentImage_Idle == (this.IMAGES_IDLE.length - 1) ? this.currentImage_Idle = 0 : this.currentImage_Idle++;
    }


    /**
     * Animates the character in jump status.
     */
    animateJumping(){
        tempInterval = setInterval( () => {
            this.animateJump();
            this.animateJumpStart();
            this.checkJumpCount();
            this.animateFall();
        }, 1000 / 11);
        regInterval(tempInterval);
    }


    /**
     * Animates the character before jumping.
     */
    checkJumpCount() {
        if(this.jumpCount == 0) {
            this.jumpCount = -1;
            if (!this.isFalling) {
                this.acceleration = 1;
                this.speedY = 16;
                this.y -= .5;
                this.isJump = true;
            }
        } else if(this.jumpCount > 0) {
                this.jumpCount--;
        }
    }


    /**
     * Animates the character at the start of the jump.
     */
    animateJumpStart() {
        if(this.jumpCount > 0 ) {
            let path = mainPath + this.IMAGES_JUMP_START[this.currentImage_Jump_Start];
            this.img = this.imageCache_Jump_Start[path];
            this.currentImage_Jump_Start == (this.IMAGES_JUMP_START.length - 1) ? this.currentImage_Jump_Start = (this.IMAGES_JUMP_START.length - 1) : this.currentImage_Jump_Start++;
        } else {
            this.currentImage_Jump_Start = 0;
        }
    }


    /**
     * Animates the character when jumping.
     */
    animateJump() {
        if(this.isJump == true) {
            let path = mainPath + this.IMAGES_JUMP[this.currentImage_Jump];
            this.img = this.imageCache_Jump[path];
            this.currentImage_Jump == (this.IMAGES_JUMP.length - 1) ? this.currentImage_Jump = (this.IMAGES_JUMP.length - 1) : this.currentImage_Jump++;
        } else {
            this.currentImage_Jump = 0;
        }
    }


    /**
     * Animates the character when falling.
     */
    animateFall() {
        if(this.isFalling == true && this.isJump == false) {
            let path = mainPath + this.IMAGES_FALL[this.currentImage_Fall];
            this.img = this.imageCache_Fall[path];
            this.currentImage_Fall == (this.IMAGES_FALL.length - 1) ? this.currentImage_Fall = (this.IMAGES_FALL.length - 1) : this.currentImage_Fall++;
        } else {
            this.currentImage_Fall = 0;
        }
    }


    /**
     * Checks keyboard input for character movement and actions.
     */
    checkKeyboard() {
        tempInterval = setInterval( () => {
            if(GameIsRunning || firstFrame) {
                this.checkForMoveRight();
                this.checkForMoveLeft();
                this.checkForJump();
                this.checkBottleToThrow();
                this.checkCoinToBottle();
            }
        }, 1000/120);
        regInterval(tempInterval);
    }


    /**
     * Checks movement to the right.
     */
    checkForMoveRight() {
        if(keyboard.Right && this.x < world.level_end_x && this.jumpCount == -1 && this.energy > 0) {
            this.flipH = false;
            this.x > ((720*6) ) ? this.x = (0 ) : this.x += this.speed;
        }
    }

    
    /**
     * Checks movement to the left.
     */
    checkForMoveLeft() {
        if(keyboard.Left && this.x > 0 && this.jumpCount == -1 && this.energy > 0) {
            this.flipH = true;
            this.x < (0 ) ? this.x = Math.floor((720*6) ) : this.x -= this.speed;
        }
    }


    /**
     * Checks the movement for the jump.
     */
    checkForJump() {
        if((keyboard.Up || keyboard.Space) && !this.isJump && this.speedY == 0 && this.jumpCount < 0 && !this.isHurt && this.energy > 0) {
            this.jumpCount = 4;
            if(world.audio.snd_jump.paused) {
                world.audio.snd_jump.play();
            }
        }
    }


    /**
     * Checks the exchange of coins in bottles.
     */
    checkCoinToBottle() {
        if(keyboard.Enter && this.coins >= 10) {
            this.cworld.level.items.forEach( (element, index) => {
                if (element instanceof Bottle && element.reserve && this.findReserve == false) {
                    this.findReserve = true;
                    this.exchangeIntoBottle(element, index);
                    setTimeout(() => {
                        this.findReserve = false;
                    }, 200);
                }
            });
        }
    }


    /**
     * Exchanges coins into bottles if conditions are met.
     * @param {Bottle} element - The bottle element to exchange with.
     * @param {number} index - The index of the bottle element.
     */
    exchangeIntoBottle(element, index) {
        this.backpack.push(index);
        this.bottles += 1;
        this.coins -= 10;
        element.reserve = false;
        element.initStatus = false;
        element.snd_bottle.play();
    }


    /**
     * Checks the throwing of bottles.
     */
    checkBottleToThrow() {
        if((keyboard.D || keyboard.Num0) && !this.isHurt && !this.isThrowing && this.energy > 0 && this.bottles > 0) {
            this.bottles--;
            this.isThrowing = true;
            let backpackitem = this.cworld.level.items[this.backpack[0]];
            this.setValuesForThrowBottle(backpackitem);
            this.backpack.splice(0, 1);
            setTimeout(() => {
                this.isThrowing = false;
            }, 2000);    
        }    
    }    


    /**
     * Sets the properties for the thrown bottle.
     * @param {Bottle} backpackitem - The bottle element that is thrown.
     */
    setValuesForThrowBottle(backpackitem) {
        backpackitem.energy = 10;
        backpackitem.x = this.flipH ? (this.x + this.hitbox_x  ) : (this.x + (this.width / 2));
        backpackitem.y = this.y - 100;
        backpackitem.speedY = 5 + this.ThrowPower();
        backpackitem.speed = this.flipH ? -4 : 4;
        backpackitem.acceleration = 1;
        backpackitem.fly = true;
    }


    /**
     * Throws a bottle with random power.
     * @returns {number} - The random throw power.
     */
    ThrowPower() {
        return Math.floor(Math.random() * 10);
    }


    /**
     * Increases character's energy by the specified amount.
     * @param {number} en - The amount of energy to add.
     */
    getEnergy(en) {
        this.energy += en;
        if (this.energy > 100) {
            this.energy = 100;
        }
    }
}