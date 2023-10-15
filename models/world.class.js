class World {
    level = level1;
    level_end_x = this.level.level_end_x

    character = this.level.character;
    worldPlatforms = this.level.platforms;
    collidingStatus = false;

    camera_x = 0;
    fpsStart = 0;
    fpsValue = 0;
    fpsText = 0;
    ctx;
    canvas;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.checkColliding();
        this.draw();
    }


    setWorld() {
        this.level.character.cworld = this;
        this.level.character.platforms_toJump = this.level.platforms;
    }


    checkColliding() {
        setInterval( () => {
            this.collidingStatus = false;
            this.level.enemies.forEach( en => {
                if(en.isColliding(this.character)) {
                    this.collidingStatus = true;
                }
            });
            
        }, 1000 / 20);

        // set first chicken on x=720 - only for testing
        setInterval(() => {
            if(keyboard.Key1 == true) {
                this.level.enemies[0].x = 720;
            }
        }, 100);
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

        // this.addBoxToMap(false, 1450, 300, 200, 4, 0, "#000000");

        this.addToMap(this.character, this.character.flipH ,false);
        this.addObjectsToMap(this.level.enemies, true, "#0000ff");
        this.addFpsToMap('0', 10, 452);
        this.addFpsToMap('1', 10 + 720, 452);
        this.addFpsToMap('2', 10 + 720 * 2, 452);
        this.addFpsToMap('3', 10 + 720 * 3, 452);
        this.addFpsToMap('4', 10 + 720 * 4, 452);
        this.addFpsToMap('5', 10 + 720 * 5, 452);
        this.addFpsToMap('6', 10 + 720 * 6, 452);

        this.ctx.translate(-this.camera_x - 50, 0);

        this.addFpsToMap('FPS: ' + this.fpsText, 10, 32);
        this.addFpsToMap('Collision: ' + (this.collidingStatus ? '1' : '0'), 300, 32);
        this.addDataToMap(this.character.speedY, 500, 32);
        this.addDataToMap(this.character.isJump, 500, 48);


        this.fpsValue++
        // ################################################################################
        // draw() erneut ausführen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        }
        );
    }

    addObjectsToMap(obj, box = false, color){
        obj.forEach(o => {
            this.addToMap(o, false, box, color);
        });
    }

    addToMap(mo, flip = false, box = false, color) {
        if(flip) {
            this.ctx.save();
            this.ctx.scale(flip ? -1 : 1, 1);
        }
        this.ctx.drawImage(mo.img, flip ? (mo.x + mo.width) * -1 : mo.x, mo.y - mo.yBaseline, mo.width, mo.height);
        if(box) {
            this.addBoxToMap(flip, mo.x, mo.y, mo.width, mo.height, mo.yBaseline, color);
        }

        if(flip) {
            this.ctx.restore();
        }
        // this.addDataToMap(Math.floor(mo.x) + ' ' + Math.floor(mo.y), mo.x, mo.y + 10);
    }

    addFpsToMap(text, x, y) {
        this.ctx.font = '24px sans-serif';
        this.ctx.color = '#000000';
        this.ctx.fillText(text, x, y);
    }

    addDataToMap(text, x, y) {
        this.ctx.font = '16px sans-serif';
        this.ctx.color = '#000000';
        this.ctx.fillText(text, x, y);
    }

    addBoxToMap(flip, x, y, w, h, yb, color = "#ff0000") {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.rect(flip ? (x + w) * -1 : x, y - yb, w, h);
        this.ctx.stroke();
        this.ctx.strokeStyle = "#000000";
    }

}