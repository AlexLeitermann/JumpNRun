class MovableObject {
    x;
    y;
    speed;
    width;
    height;
    yBaseline;
    flipH = false;
    imageCache = {};
    currentImage = 0;
    imageCache_Walk = {};
    currentImage_Walk = 0;
    imageCache_Idle = {};
    currentImage_Idle = 0;
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

    moveRight() {

    }

    moveLeft() {

    }
}