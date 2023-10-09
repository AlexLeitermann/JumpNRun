class World {
    level = level1;
    level_end_x = this.level.level_end_x

    character = this.level.character;
    camera_x = 0;
    fpsStart = 0;
    fpsValue = 0;
    fpsText = 0;
    ctx;
    canvas;
    keyboard;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        // this.level = [new Level];
        this.draw();
    }


    setWorld() {
        // this.character.world = this;
        // this.character.cworld = this;
        this.level.character.cworld = this;
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



        // Canvas leeren
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // ################################################################################
        // in Canvas-Context zeichnen
        this.ctx.translate(this.camera_x + 50, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character, this.character.flipH,true);
        this.addObjectsToMap(this.level.enemies);
        this.addFpsToMap('0', 10, 452);
        this.addFpsToMap('1', 10 + 720, 452);
        this.addFpsToMap('2', 10 + 720 * 2, 452);
        this.addFpsToMap('3', 10 + 720 * 3, 452);
        this.addFpsToMap('4', 10 + 720 * 4, 452);
        this.addFpsToMap('5', 10 + 720 * 5, 452);
        this.addFpsToMap('6', 10 + 720 * 6, 452);

        this.ctx.translate(-this.camera_x - 50, 0);

        this.addFpsToMap('FPS: ' + this.fpsText, 10, 32);


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
            this.addToMap(o, false);
        });
    }

    addToMap(mo, flip = false, box = false) {
        if(flip) {
            this.ctx.save();
            this.ctx.scale(flip ? -1 : 1, 1);
        }
        this.ctx.drawImage(mo.img, flip ? (mo.x + mo.width) * -1 : mo.x, mo.y - mo.yBaseline, mo.width, mo.height);
        if(box) {
            this.ctx.strokeStyle = "#ff0000";
            this.ctx.beginPath();
            this.ctx.rect(flip ? (mo.x + mo.width) * -1 : mo.x, mo.y - mo.yBaseline, mo.width, mo.height);
            this.ctx.stroke();
            this.ctx.strokeStyle = "#000000";
        }

        if(flip) {
            this.ctx.restore();
        }
    }

    addFpsToMap(text, x, y) {
        this.ctx.font = '24px sans-serif';
        this.ctx.color = '#000000';
        this.ctx.fillText(text, x, y);
    }
}