/**
 * Represents a background object that extends the MovableObject class.
 * @class
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    /**
     * Creates a new BackgroundObject.
     * @constructor
     * @param {string} path - The path to the image file for the background object.
     * @param {number} [x=0] - The initial x-coordinate of the background object.
     * @param {number} [y=0] - The initial y-coordinate of the background object.
     * @param {number} [width=720] - The width of the background object.
     * @param {number} [height=480] - The height of the background object.
     * @param {number} [yBaseline=0] - The baseline y-coordinate of the background object.
     */
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