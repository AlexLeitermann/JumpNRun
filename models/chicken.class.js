class Chicken extends MovableObject {
    IMAGES_WALKING = [
        '../img/set1/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/set1/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/set1/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super();
        this.loadImage('../img/set1/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); 
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.floor(Math.random() * 500);
        this.y = 420;
        this.speed = initSpeed();
        this.width = 50;
        this.height = 50;
        this.yBaseline = this.height;

        this.animation();
        this.walkAnimation();
    }


    animation() {
        setInterval( () => {
            this.x < ( -200 ) ? this.x += (720 * 7.2) : this.x -= this.speed;
        }, 25);
    }
    
    walkAnimation() {
        setInterval( () => {
            let path = this.IMAGES_WALKING[this.currentImage];
            this.img.src = this.imageCache[path];
            this.currentImage == (this.IMAGES_WALKING.length - 1) ? this.currentImage = 0 : this.currentImage++;
        }, 1000/6);
    }

}
    
function initSpeed() {
    return  ((Math.random() * .75) + 0.50);
}
    
    