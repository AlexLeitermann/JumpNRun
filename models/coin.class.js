/**
 * Represents a coin object that extends a movable object.
 * @class
 * @extends MovableObject
 */
class Coin extends MovableObject {
    /**
     * Default values for the coin object.
     * @type {Object}
     */
    defaultValues = {
        speed: 0,
        width: 30,
        height: 30,
        yBaseline: 30,
        hitbox_x: 0,
        hitbox_y: 0,
        hitbox_width: 30,
        hitbox_height: 30,
        energy: 1
    }

    /**
     * Creates a new Coin instance.
     * @constructor
     * @param {number} x - The initial x-coordinate of the coin.
     * @param {number} y - The initial y-coordinate of the coin.
     */
    constructor(x = 0, y = 0) {
        super();
        if (!this.snd_coin) {
            this.snd_coin = new Audio(mainPath + '/audio/coin.mp3');
        }
        this.loadImage('/img/set1/8_coin/coin_1c.png'); 
        this.loadValues(x, y);
        this.move();
    }


    /**
     * Loads default values and sets the initial coordinates of the coin.
     * @param {number} x - The initial x-coordinate of the coin.
     * @param {number} y - The initial y-coordinate of the coin.
     */
    loadValues(x, y) {
        Object.assign(this, this.defaultValues);
        this.x = x;
        this.y = y;
    }


    /**
     * Initiates the movement of the coin.
     */
    move() {
        tempInterval = setInterval( () => {
            if(this.energy == 0) {
                setTimeout(() => {
                    this.y = -1;
                }, 100);
            }
        }, 25);
        regInterval(tempInterval);
    }
}
    