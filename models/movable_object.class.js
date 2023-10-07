class MovableObject {
    x;
    y;
    width;
    height;
    yBaseline;
    imageCache = {};
    currentImage = 0;
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