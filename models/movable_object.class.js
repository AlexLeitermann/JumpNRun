class MovableObject {
    x;
    y;
    speed;
    speedY = 0;
    acceleration = 1;
    isJump = false;
    width;
    height;
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
            if(this.y < 420) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } 
            if(this.y >420) {
                this.y = 420;
                this.isJump = false;
                this.currentImage_Jump = 0;
            }
        }, 1000 / 30);
    }

    moveRight() {

    }

    moveLeft() {

    }
}