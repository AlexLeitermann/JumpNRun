class Cloud extends MovableObject {

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