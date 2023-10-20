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
    hitbox_offset_x;
    hitbox_offset_y;

    speed;
    speedY = 0;
    acceleration = 1;
    isFalling = false;

    energy = 100;
    lastHit = 0;

    isJump = false;
    platforms_toJump;


    flipH = false;

    img = new Image();
    imageCache = [];
    imageCache_Walk = [];
    imageCache_Idle = [];
    imageCache_Jump = [];
    currentImage = 0;
    currentImage_Walk = 0;
    currentImage_Idle = 0;
    currentImage_Jump = 0;

    loadImage(path) {
        this.img.src = mainPath + path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            let fullPath = mainPath + path;
            img.src = fullPath;
            this.imageCache[fullPath] = img;
        });
    }

    applyGravitation() {
        setInterval(() => {
            let middle = this.x + (this.width / 2);
            if(this.y < 420) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } 
            if(this.isRangeOfPlatforms(middle)[0] && (this.speedY) < 0) {
                this.jumpOnPlatforms(this.isRangeOfPlatforms(middle)[2]);
            } 
            this.landedOnGround(420);
            if(this.speedY < -1)  {
                this.isFalling = true;
            } else if(this.speedY >= 0) {
                this.isFalling = false;
            }
            
        }, 1000 / 30);
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

    noJump(y) {
        this.y = y;
        this.speedY = 0;
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
        return [answer, x, y, width];
    }

    isColliding(obj) {
        return  (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
                (this.y - this.yBaseline) >= (obj.y - obj.yBaseline) &&
                (this.y) <= (obj.y)// && 
                //obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    moveRight() {

    }

    moveLeft() {

    }
}