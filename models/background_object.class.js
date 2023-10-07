class BackgroundObject extends MovableObject {

    constructor(path, x = 0, y = 0, width = 720, height = 480, yBaseline = 0) {
        super();
        this.loadImage(path);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.yBaseline = yBaseline;
    }
}