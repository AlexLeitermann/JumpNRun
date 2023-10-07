class Character extends MovableObject {
    IMAGES_WALKING = [
        '../img/set1/2_character_pepe/2_walk/W-21.png',
        '../img/set1/2_character_pepe/2_walk/W-22.png',
        '../img/set1/2_character_pepe/2_walk/W-23.png',
        '../img/set1/2_character_pepe/2_walk/W-24.png',
        '../img/set1/2_character_pepe/2_walk/W-25.png',
        '../img/set1/2_character_pepe/2_walk/W-26.png'
    ];

    constructor() {
        super();
        this.loadImage('../img/set1/2_character_pepe/2_walk/W-21.png'); 
        this.loadImages(this.IMAGES_WALKING);
        this.x = 0;
        this.y = 420;
        this.width = 92;
        this.height = 180;
        this.yBaseline = this.height;

        this.animate();
    }

    animate() {
        setInterval( () => {
            let path = this.IMAGES_WALKING[this.currentImage];
            this.img.src = this.imageCache[path];
            this.currentImage == (this.IMAGES_WALKING.length - 1) ? this.currentImage = 0 : this.currentImage++;
        }, 120);
    }

    jump(){

    }
}