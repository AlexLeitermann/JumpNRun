class World {
    character = new Character();
    enemies = [
        new Chicken,
        new Chicken,
        new Chicken,
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject('../img/set1/5_background/layers/air.png'),
        new BackgroundObject('../img/set1/5_background/layers/3_third_layer/1.png'),
        new BackgroundObject('../img/set1/5_background/layers/2_second_layer/1.png'),
        new BackgroundObject('../img/set1/5_background/layers/1_first_layer/1.png'),
    ];
    fpsStart = 0;
    fpsValue = 0;
    fpsText = 0;
    ctx;
    canvas;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }
    
    draw() {
        if(this.fpsStart == 0) {
            this.fpsStart = performance.now();
        } else {
            let fpsStop = performance.now();
            if((fpsStop - this.fpsStart) > 1000 ) {
                this.fpsText = this.fpsValue;
                this.fpsValue = 0;
                this.fpsStart = fpsStop;
            }
        }
        // 
        // this.clouds.forEach(c => {
        //     c.moveLeft();
        // });
        // Canvas leeren
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // ################################################################################
        // in Canvas-Context zeichnen
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.ctx.font = '24px sans-serif';
        this.ctx.color = '#000000';
        this.ctx.fillText('FPS: ' + this.fpsText, 10, 32);

        this.fpsValue++
        // ################################################################################
        // draw() erneut ausführen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        }
        );
    }

    addObjectsToMap(obj){
        obj.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y - mo.yBaseline, mo.width, mo.height);
    }
}