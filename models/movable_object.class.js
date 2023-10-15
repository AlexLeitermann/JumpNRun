class MovableObject {
    x;
    y;
    hitbox_x;
    hitbox_y;
    hitbox_width;
    hitbox_height;
    hitbox_offset_x;
    hitbox_offset_y;
    speed;
    speedY = 0;
    acceleration = 1;
    isJump = false;
    width;
    height;

    platforms_toJump;

    yBaseline;
    flipH = false;
    imageCache = {};
    imageCache_Walk = {};
    imageCache_Idle = {};
    imageCache_Jump = {};
    currentImage = 0;
    currentImage_Walk = 0;
    currentImage_Idle = 0;
    currentImage_Jump = 0;
    img = new Image();

    loadImage(path) {
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = path;
        });
    }

    applyGravitation() {
        setInterval(() => {
            let middle = this.x + (this.width / 2);
            if(this.y < 420) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } 
            if(this.isRangeOfPlatforms(middle) && (this.speedY) <= 0) {
                this.jumpOnPlatforms();
            } 
            if(this.y >= 420) {
                this.y = 420;
                this.speedY = 0;
                this.isJump = false;
                this.currentImage_Jump = 0;
            }

        }, 1000 / 30);
    }


    jumpOnPlatforms() {
        if(this.y > 300 && this.y < 330) {
            this.y = 300;
            this.speedY = 0;
            this.isJump = false;
            this.currentImage_Jump = 0;
        }
    }


    isRangeOfPlatforms(middle) {
        let answer = false;
        if(this.platforms_toJump) {
            this.platforms_toJump.forEach( p => {
                if(middle >= p.x && middle <= (p.x + p.width)) {
                    answer = true;
                }
            });
        }
        return answer;
    }


    isColliding(obj) {
        return  (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
                (this.y - this.yBaseline) >= (obj.y - obj.yBaseline) &&
                (this.y) <= (obj.y)// && 
                //obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    moveRight() {

    }

    moveLeft() {

    }
}