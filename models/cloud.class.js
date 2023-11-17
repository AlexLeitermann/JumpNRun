/**
 * Represents a cloud object that extends a movable object.
 * @class
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    /**
     * Creates a new Cloud instance.
     * @constructor
     * @param {string} path - The path to the image of the cloud.
     * @param {number} x - The initial x-coordinate of the cloud.
     */
    constructor(path, x = 0) {
        super();
        this.loadImage(path);
        this.x = x;
        this.y = 0;
        this.width = 720;
        this.height = 405;
        this.yBaseline = 0;
        this.animate();
    };


    /**
     * Animates the movement of the cloud.
     */
    animate() {
        tempInterval = setInterval(() => {
            if (GameIsRunning) {
                this.x -= 0.5;
                if(this.x < -720) {
                    this.x = 720*7;
                }
            }
        }, 25);
        regInterval(tempInterval);
    }
}