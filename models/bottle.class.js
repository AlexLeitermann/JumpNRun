class Bottle extends MovableObject {

    constructor(x = 0, right = false) {
        super();
        if (right) {
            this.loadImage('/img/set1/6_salsa_bottle/2_salsa_bottle_on_ground.png'); 
        } else {
            this.loadImage('/img/set1/6_salsa_bottle/1_salsa_bottle_on_ground.png'); 
        }
        this.x = x;
        this.y = 420;
        this.speed = 0;
        this.width = 50;
        this.height = 50;
        this.yBaseline = this.height;
        this.hitbox_x = 0;
        this.hitbox_y = 0;
        this.hitbox_width = this.width;
        this.hitbox_height = this.height;
        this.energy = 1;
        this.attack = 10;

        this.animation();
    }


    animation() {
        tempInterval = setInterval( () => {
            if(this.energy == 0) {
                this.y = 0;
            }
        }, 25);
        regInterval(tempInterval);
    }
    
}
    