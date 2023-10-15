class Character extends MovableObject {
    IMAGES_WALKING = [
        '../img/set1/2_character_pepe/2_walk/W-21.png',
        '../img/set1/2_character_pepe/2_walk/W-22.png',
        '../img/set1/2_character_pepe/2_walk/W-23.png',
        '../img/set1/2_character_pepe/2_walk/W-24.png',
        '../img/set1/2_character_pepe/2_walk/W-25.png',
        '../img/set1/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_IDLE = [
        '../img/set1/2_character_pepe/1_idle/idle/I-1.png',
        '../img/set1/2_character_pepe/1_idle/idle/I-2.png',
        '../img/set1/2_character_pepe/1_idle/idle/I-3.png',
        '../img/set1/2_character_pepe/1_idle/idle/I-4.png',
        '../img/set1/2_character_pepe/1_idle/idle/I-5.png',
        '../img/set1/2_character_pepe/1_idle/idle/I-6.png',
        '../img/set1/2_character_pepe/1_idle/idle/I-7.png',
        '../img/set1/2_character_pepe/1_idle/idle/I-8.png',
        '../img/set1/2_character_pepe/1_idle/idle/I-9.png',
        '../img/set1/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_JUMP = [
        // '../img/set1/2_character_pepe/3_jump/J-31.png',
        // '../img/set1/2_character_pepe/3_jump/J-32.png',
        // '../img/set1/2_character_pepe/3_jump/J-33.png',
        // '../img/set1/2_character_pepe/3_jump/J-34.png',
        '../img/set1/2_character_pepe/3_jump/J-34.png',
        '../img/set1/2_character_pepe/3_jump/J-34.png',
        '../img/set1/2_character_pepe/3_jump/J-34.png',
        '../img/set1/2_character_pepe/3_jump/J-35.png',
        '../img/set1/2_character_pepe/3_jump/J-35.png',
        '../img/set1/2_character_pepe/3_jump/J-35.png',
        '../img/set1/2_character_pepe/3_jump/J-35.png',
        '../img/set1/2_character_pepe/3_jump/J-36.png',
        '../img/set1/2_character_pepe/3_jump/J-36.png',
        '../img/set1/2_character_pepe/3_jump/J-36.png',
        '../img/set1/2_character_pepe/3_jump/J-36.png',
        '../img/set1/2_character_pepe/3_jump/J-37.png',
        '../img/set1/2_character_pepe/3_jump/J-38.png',
        '../img/set1/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_JUMP_START = [
        '../img/set1/2_character_pepe/3_jump/J-31.png',
        '../img/set1/2_character_pepe/3_jump/J-32.png',
        '../img/set1/2_character_pepe/3_jump/J-33.png',
        '../img/set1/2_character_pepe/3_jump/J-34.png',
    ];
    IMAGES_JUMP_FLY = [
        '../img/set1/2_character_pepe/3_jump/J-35.png',
        '../img/set1/2_character_pepe/3_jump/J-35.png',
        '../img/set1/2_character_pepe/3_jump/J-35.png',
        '../img/set1/2_character_pepe/3_jump/J-35.png',
        '../img/set1/2_character_pepe/3_jump/J-36.png',
    ];
    IMAGES_JUMP_END = [
        '../img/set1/2_character_pepe/3_jump/J-37.png',
        '../img/set1/2_character_pepe/3_jump/J-38.png',
        '../img/set1/2_character_pepe/3_jump/J-39.png'
    ];
    cworld;
    imageCache_Jump_Start;
    imageCache_Jump_Fly;
    imageCache_Jump_End;
    currentImage_Jump_Start = 0;
    currentImage_Jump_Fly = 0;
    currentImage_Jump_End = 0;
    jumpCount = -1;


    constructor() {
        super();
        this.loadImage('../img/set1/2_character_pepe/1_idle/idle/I-1.png'); 
        this.loadImages(this.IMAGES_WALKING);
        this.imageCache_Walk = this.imageCache;
        this.imageCache = {};
        this.loadImages(this.IMAGES_IDLE);
        this.imageCache_Idle = this.imageCache;
        this.imageCache = {};
        this.loadImages(this.IMAGES_JUMP);
        this.imageCache_Jump = this.imageCache;
        this.imageCache = {};
        this.loadImages(this.IMAGES_JUMP_START);
        this.imageCache_Jump_Start = this.imageCache;
        this.imageCache = {};
        this.loadImages(this.IMAGES_JUMP_FLY);
        this.imageCache_Jump_Fly = this.imageCache;
        this.imageCache = {};
        this.loadImages(this.IMAGES_JUMP_END);
        this.imageCache_Jump_End = this.imageCache;
        this.x = 0;
        this.y = 420;
        this.speed = 1.1;
        this.width = 92;
        this.height = 180;
        this.yBaseline = this.height;

        
        this.animate();
        this.move();
        this.applyGravitation();
        this.jump();
    }

    animate() {
        setInterval( () => {
            if( (keyboard.Left || keyboard.Right) && this.isJump == false ) {
                let path = this.IMAGES_WALKING[this.currentImage_Walk];
                this.img.src = this.imageCache_Walk[path];
                this.currentImage_Walk == (this.IMAGES_WALKING.length - 1) ? this.currentImage_Walk = 0 : this.currentImage_Walk++;
            } else if(this.isJump == false) {
                let path = this.IMAGES_IDLE[this.currentImage_Idle];
                this.img.src = this.imageCache_Idle[path];
                this.currentImage_Idle == (this.IMAGES_IDLE.length - 1) ? this.currentImage_Idle = 0 : this.currentImage_Idle++;
            }
        }, 1000/12);

        setInterval( () => {
            if(this.isJump == true) {
                // console.log(this.currentImage_Jump);
                let path = this.IMAGES_JUMP[this.currentImage_Jump];
                this.img.src = this.imageCache_Jump[path];
                // this.currentImage_Jump == (this.IMAGES_JUMP.length - 1) ? this.currentImage_Jump = 0 : this.currentImage_Jump++;
                this.currentImage_Jump == (this.IMAGES_JUMP.length - 1) ? this.currentImage_Jump = (this.IMAGES_JUMP.length - 1) : this.currentImage_Jump++;
            } else {
                this.currentImage_Jump = 0;
            }

            if(this.jumpCount > 0 ) {
                // console.log(this.currentImage_Jump);
                let path = this.IMAGES_JUMP_START[this.currentImage_Jump_Start];
                this.img.src = this.imageCache_Jump_Start[path];
                this.currentImage_Jump_Start == (this.IMAGES_JUMP_START.length - 1) ? this.currentImage_Jump_Start = (this.IMAGES_JUMP_START.length - 1) : this.currentImage_Jump_Start++;
            } else {
                this.currentImage_Jump_Start = 0;
            }

        }, 1000 / 11);
    }


    move() {
        setInterval( () => {
            if(keyboard.Right && this.x < this.cworld.level_end_x) {
                this.flipH = false;
                this.x > ((720*6) ) ? this.x = (0 ) : this.x += this.speed;
            }
            if(keyboard.Left && this.x > 0) {
                this.flipH = true;
                this.x < (0 ) ? this.x = ((720*6) ) : this.x -= this.speed;
            }
            if(this.cworld) {
                this.cworld.camera_x = -this.x;
            }
            // world.camera_x = -this.x;
            
        }, 1000/120);
    }

    jump(){
        setInterval( () => {
            if(this.jumpCount > 0) {
                this.jumpCount--;
            }

            if(keyboard.Space && !this.isJump && this.speedY == 0 && this.jumpCount < 0) {
                this.jumpCount = 4;
            }

            if(this.jumpCount == 0) {
                this.jumpCount = -1;
                this.acceleration = 1;
                this.speedY = 16;
                this.y -= .5;
                this.isJump = true;
            }


        }, 1000 / 30);

    }
}