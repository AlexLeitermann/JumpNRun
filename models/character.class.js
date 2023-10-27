class Character extends MovableObject {
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
    imageCache_Hurt;
    currentImage_Jump_Start = 0;
    currentImage_Hurt = 0;
    jumpCount = -1;
    coins = 0;
    bottles = 0;

    snd_walk = new Audio(mainPath + '/audio/walking.mp3');
    snd_jump = new Audio(mainPath + '/audio/jump_1.mp3');
    snd_hurt = new Audio(mainPath + '/audio/hurt_1.mp3');

    constructor() {
        super();
        this.snd_walk.loop = true;
        this.snd_walk.playbackRate = 2.5;
        this.initImages();
        this.initValues();
        this.animate();
        this.applyGravitation(); //from movable_object.class
    }

    initImages() {
        this.loadImages(this.IMAGES_WALKING);
        this.imageCache_Walk = this.imageCache;
        // this.imageCache = {};
        this.loadImages(this.IMAGES_IDLE);
        this.imageCache_Idle = this.imageCache;
        // this.imageCache = {};
        this.loadImages(this.IMAGES_JUMP);
        this.imageCache_Jump = this.imageCache;
        // this.imageCache = {};
        this.loadImages(this.IMAGES_JUMP_START);
        this.imageCache_Jump_Start = this.imageCache;
        // this.imageCache = {};
        this.loadImages(this.IMAGES_HURT);
        this.imageCache_Hurt = this.imageCache;
        // this.imageCache = {};
        this.loadImages(this.IMAGES_DEAD);
        this.imageCache_Dead = this.imageCache;
        // this.imageCache = {};
    }

    initValues() {
        this.x = 0;
        this.y = 420;
        this.width = 92;
        this.height = 180;
        this.yBaseline = this.height;
        this.speed = 1.6;
        this.energy = 100;
        this.attack = 10;
        this.isFalling = false;
        this.hitbox_x = 16;
        this.hitbox_y = 70;
        this.hitbox_width = this.width - (this.hitbox_x * 2);
        this.hitbox_height = 100;
    }

    animate() {
        this.animate_walking();
        this.animate_idle_hurt_dead();
        this.animate_jump();
        this.animate_move();
    }


    animate_walking(){
        tempInterval = setInterval( () => {
            if( (keyboard.Left || keyboard.Right) && this.isJump == false && this.jumpCount < 0 && this.energy > 0) {
                let path = mainPath + this.IMAGES_WALKING[this.currentImage_Walk];
                this.img = this.imageCache_Walk[path];
                this.currentImage_Walk == (this.IMAGES_WALKING.length - 1) ? this.currentImage_Walk = 0 : this.currentImage_Walk++;
                this.snd_walk.play();
            } else {
                this.snd_walk.pause();
            }
        }, 1000/12);
        regInterval(tempInterval);
    }

    animate_idle_hurt_dead() {
        tempInterval = setInterval( () => {
            if((keyboard.Left || keyboard.Right) == false && this.isJump == false && this.jumpCount < 0 && this.energy > 0) {
                if (this.isHurt) {
                    let path = mainPath + this.IMAGES_HURT[this.currentImage_Hurt];
                    this.img = this.imageCache_Hurt[path];
                    this.currentImage_Hurt == (this.IMAGES_HURT.length - 1) ? this.currentImage_Hurt = (this.IMAGES_HURT.length - 1) : this.currentImage_Hurt++;
                } else {
                    this.currentImage_Hurt = 0;
                    let path = mainPath + this.IMAGES_IDLE[this.currentImage_Idle];
                    this.img = this.imageCache_Idle[path];
                    this.currentImage_Idle == (this.IMAGES_IDLE.length - 1) ? this.currentImage_Idle = 0 : this.currentImage_Idle++;
                }
            } else if(this.energy <= 0) {
                let path = mainPath + this.IMAGES_DEAD[this.currentImage_Dead];
                this.img = this.imageCache_Dead[path];
                this.currentImage_Dead == (this.IMAGES_DEAD.length - 1) ? this.currentImage_Dead = (this.IMAGES_DEAD.length - 1) : this.currentImage_Dead++;
            }
        }, 1000/6);
        regInterval(tempInterval);
    }

    animate_jump(){
        tempInterval = setInterval( () => {
            if(this.isJump == true) {
                let path = mainPath + this.IMAGES_JUMP[this.currentImage_Jump];
                this.img = this.imageCache_Jump[path];
                this.currentImage_Jump == (this.IMAGES_JUMP.length - 1) ? this.currentImage_Jump = (this.IMAGES_JUMP.length - 1) : this.currentImage_Jump++;
            } else {
                this.currentImage_Jump = 0;
            }

            if(this.jumpCount > 0 ) {
                let path = mainPath + this.IMAGES_JUMP_START[this.currentImage_Jump_Start];
                this.img = this.imageCache_Jump_Start[path];
                this.currentImage_Jump_Start == (this.IMAGES_JUMP_START.length - 1) ? this.currentImage_Jump_Start = (this.IMAGES_JUMP_START.length - 1) : this.currentImage_Jump_Start++;
            } else {
                this.currentImage_Jump_Start = 0;
            }

            if(this.jumpCount == 0) {
                this.jumpCount = -1;
                if (!this.isFalling) {
                    this.acceleration = 1;
                    this.speedY = 16;
                    this.y -= .5;
                    this.isJump = true;
                }
            }
            
            if(this.jumpCount > 0)
                this.jumpCount--;

            
            if(keyboard.Up && !this.isJump && this.speedY == 0 && this.jumpCount < 0 && !this.isHurt && this.energy > 0) {
                this.jumpCount = 4;
                this.snd_jump.play();
            }
        }, 1000 / 11);
        regInterval(tempInterval);
    }

    animate_move() {
        tempInterval = setInterval( () => {
            if(keyboard.Right && this.x < this.cworld.level_end_x && this.jumpCount == -1 && this.energy > 0) {
                this.flipH = false;
                this.x > ((720*6) ) ? this.x = (0 ) : this.x += this.speed;
            }
            if(keyboard.Left && this.x > 0 && this.jumpCount == -1 && this.energy > 0) {
                this.flipH = true;
                this.x < (0 ) ? this.x = Math.floor((720*6) ) : this.x -= this.speed;
            }
            // Cheats
            if (keyboard.Key0) {
                this.energy = 100;
                this.currentImage_Dead = 0;
            }
        }, 1000/120);
        regInterval(tempInterval);

    }

    getEnergy(en) {
        this.energy += en;
        if (this.energy > 100) {
            this.energy = 100;
        }
    }
    

}