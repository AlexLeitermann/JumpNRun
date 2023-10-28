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
    isFalling;
    fly = false;
    isMarking = false; // Für Abgabe entfernen!!!
    energy = 100;
    energy_return = 0;
    attack = 0;
    lastHit = 0; // Nicht genutzt
    isJump = false;
    platforms_toJump = [];
    isHurt = false;
    flipH = false;
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


    loadImage(path) {
        this.img.src = mainPath + path;
    }


    loadImages(arr) {
        this.imageCache = [];
        arr.forEach((path) => {
            let img = new Image();
            let fullPath = mainPath + path;
            img.src = fullPath;
            this.imageCache[fullPath] = img;
        });
    }


    applyGravitation() {
        tempInterval = setInterval(() => {
            let middle = this.x + (this.width / 2);
            if(this.y < 420 ) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } 
            if(this.isRangeOfPlatforms(middle)[0] && (this.speedY) < 0) {
                this.jumpOnPlatforms(this.isRangeOfPlatforms(middle)[1]);
            } 
            this.landedOnGround(420);
            this.speedY < -1 ? this.isFalling = true : this.isFalling = false;
        }, 1000 / 30);
        regInterval(tempInterval);
    }


    jumpOnPlatforms(y) {
        if(this.y > y && this.y < (y+30)) {
            this.noJump(y);
        }
    }


    landedOnGround(y) {
        if(this.y >= y) {
            this.noJump(y);
        }
    }


    noJump(y = -100) {
        this.y = y;
        this.speedY = 0;
        if(this instanceof Bottle) {
            this.speed = 0;
            this.fly = false;
            this.acceleration = 0;
            this.energy = -1;
            this.currentImage_Fly = 0;
        }
        this.isJump = false;
        this.currentImage_Jump = 0;
    }


    isRangeOfPlatforms(middle) {
        let answer = false;
        let x = 0;
        let y = 0;
        let width = 0;
        if(this.platforms_toJump) {
            this.platforms_toJump.forEach( p => {
                if(middle >= p.x && middle <= (p.x + p.width)) {
                    answer = true;
                    x = p.x;
                    y = p.y;
                    width = p.width;
                }
            });
        }
        return [answer, y];
    }


    isColliding(obj) {
        return  (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
                (this.y - this.yBaseline) >= (obj.y - obj.yBaseline) &&
                (this.y) <= (obj.y); // && 
                //obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }


    isCollidingHitbox(obj) {
        return (this.x + this.hitbox_x + this.hitbox_width) >= (obj.x + obj.hitbox_x) &&
        (this.x + this.hitbox_x) <= (obj.x + obj.hitbox_x + obj.hitbox_width) &&
        (this.y - this.yBaseline + this.hitbox_y) <= (obj.y - obj.yBaseline + obj.hitbox_y + obj.hitbox_height) &&
        (this.y - this.yBaseline + this.hitbox_y + this.hitbox_height) >= (obj.y - obj.yBaseline + obj.hitbox_y);
    }

    
    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

}