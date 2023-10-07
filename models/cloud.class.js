class Cloud extends MovableObject {

    constructor() {
        super();
        this.loadImage('../img/set1/5_background/layers/4_clouds/1.png');
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 405;
        this.yBaseline = 0;

        this.animate();
    };


    animate() {
        setInterval(() => {
            this.x -= 0.5;
            if(this.x < -720) {
                this.x = 720;
            }
        }, 25);
}
}