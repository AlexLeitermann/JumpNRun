class BossChicken extends MovableObject {
    IMAGES_WALKING = [
        '/img/set1/4_enemie_boss_chicken/1_walk/G1.png ',
        '/img/set1/4_enemie_boss_chicken/1_walk/G1.png',
        '/img/set1/4_enemie_boss_chicken/1_walk/G1.png',
        '/img/set1/4_enemie_boss_chicken/1_walk/G1.png',
        '/img/set1/4_enemie_boss_chicken/1_walk/G2.png',
        '/img/set1/4_enemie_boss_chicken/1_walk/G2.png',
        '/img/set1/4_enemie_boss_chicken/1_walk/G2.png',
        '/img/set1/4_enemie_boss_chicken/1_walk/G2.png',
        '/img/set1/4_enemie_boss_chicken/1_walk/G3.png',
        '/img/set1/4_enemie_boss_chicken/1_walk/G3.png',
        '/img/set1/4_enemie_boss_chicken/1_walk/G3.png',
        '/img/set1/4_enemie_boss_chicken/1_walk/G3.png',
        '/img/set1/4_enemie_boss_chicken/1_walk/G4.png',
        '/img/set1/4_enemie_boss_chicken/1_walk/G4.png',
        '/img/set1/4_enemie_boss_chicken/1_walk/G4.png',
        '/img/set1/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_DEAD = [
        '/img/set1/4_enemie_boss_chicken/5_dead/G24.png',
        '/img/set1/4_enemie_boss_chicken/5_dead/G24.png',
        '/img/set1/4_enemie_boss_chicken/5_dead/G25.png',
        '/img/set1/4_enemie_boss_chicken/5_dead/G25.png',
        '/img/set1/4_enemie_boss_chicken/5_dead/G26.png',
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
    cworld;
    currentImage_Alert = 0;
    currentImage_Attack = 0;
    currentImage_Hurt = 0;
    imageCache_Alert;
    imageCache_Attack;
    imageCache_Hurt;
    hasFirstContact = false;



    constructor() {
        super();
        this.loadAllImages();
        this.loadSounds();
        this.loadValues();
        this.animation();
    }


    loadAllImages() {
        this.loadImages(this.IMAGES_WALKING);
        this.imageCache_Walk = this.imageCache;
        this.loadImages(this.IMAGES_DEAD);
        this.imageCache_Dead = this.imageCache;
        this.loadImages(this.IMAGES_ALERT);
        this.imageCache_Alert = this.imageCache;
        this.loadImages(this.IMAGES_ATTACK);
        this.imageCache_Attack = this.imageCache;
        this.loadImages(this.IMAGES_HURT);
        this.imageCache_Hurt = this.imageCache;
    }


    loadSounds() {
        if (!this.snd_boss_death) {
            this.snd_boss_death = new Audio(mainPath + '/audio/win.mp3');
        }
        if (!this.snd_boss_alarm) {
            this.snd_boss_alarm = new Audio(mainPath + '/audio/chicken_boss_alarm.mp3');
        }
        if (!this.snd_boss_hurt) {
            this.snd_boss_hurt = new Audio(mainPath + '/audio/chicken_alarm.mp3');
        }
    }


    loadValues() {
        this.x = 720 * 5.5;
        this.y = 450;
        this.width = 261;
        this.height = 304;
        this.yBaseline = this.height;
        this.hitbox_x = 50;
        this.hitbox_y = 60;
        this.hitbox_width = this.width - (this.hitbox_x * 2);
        this.hitbox_height = this.height - this.hitbox_y -20;
        this.speed = 0.2;
        this.energy = 50;
        this.attack = 15;
    }


    move() {
        tempInterval = setInterval( () => {
            if (GameIsRunning) {
                this.moveDirection();
            }
        }, 25);
        regInterval(tempInterval);
    }


    moveDirection() {
        if(this.energy > 0 && world.character.x > ((this.x + (this.width / 2)) - 800) && world.character.x < ((this.x + (this.width / 2)) + 800)) {
            if(world.character.x < this.x) {
                this.flipH = false;
                (this.x + (this.width / 2)) < ( -200 ) ? this.x += (720 * 7.0) : this.x -= this.speed;
            } else {
                this.flipH = true;
                (this.x + (this.width / 2)) > (720 * 7.0) ? this.x -= (720 * 7.0) + 200 : this.x += this.speed;
            }
            this.moveContact();
        }
    }


    moveContact() {
        if(!this.hasFirstContact) {
            this.hasFirstContact = true;
            this.snd_boss_alarm.play();
        }
    }


    animation() {
        tempInterval = setInterval( () => {
            if(this.energy <= 0 && GameIsRunning) {
                this.animationDead();
            } else if(this.energy > 0 && !this.isHurt && GameIsRunning) {
                this.animationWalking();
            } else if(this.energy > 0 && this.isHurt && GameIsRunning) {
                this.animationHurt();
            }
        }, 1000/4);
        regInterval(tempInterval);
    }


    animationDead() {
        let path = mainPath + this.IMAGES_DEAD[this.currentImage_Dead];
        this.img = this.imageCache_Dead[path];
        if(this.currentImage_Dead == (this.IMAGES_DEAD.length - 1)) {
            setTimeout(() => {
                this.x = (720 * 7.1);
                // Entweder hier GameOver (win) oder nach Zieldurchlauf => character.x > 720 * 5.9
            }, 2000);
        }
        this.currentImage_Dead == (this.IMAGES_DEAD.length - 1) ? this.currentImage_Dead = (this.IMAGES_DEAD.length - 1) : this.currentImage_Dead++;
    }


    animationWalking() {
        let path = mainPath + this.IMAGES_WALKING[this.currentImage_Walk];
        this.img = this.imageCache_Walk[path];
        this.currentImage_Walk == (this.IMAGES_WALKING.length - 1) ? this.currentImage_Walk = 0 : this.currentImage_Walk++;
    }
    

    animationHurt() {
        let path = mainPath + this.IMAGES_HURT[this.currentImage_Hurt];
        this.img = this.imageCache_Hurt[path];
        this.currentImage_Hurt == (this.IMAGES_HURT.length - 1) ? this.currentImage_Hurt = 0 : this.currentImage_Hurt++;
    }
    

    revive() {
        this.x = 720 * 5.4;
        this.speed = this.initSpeed();
        this.energy = 50;
    }
}
    
