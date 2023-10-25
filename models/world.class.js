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
        tempInterval = setInterval( () => {
            this.collidingStatus = false;
            this.checkCollidingEnemies();
            this.checkCollidingItems();
            if(this.character.energy <= 0) {
                // Spieler tot
            }
        }, 1000 / 20);
        regInterval(tempInterval);

        // set first chicken on x=720 - only for testing
        tempInterval = setInterval(() => {
            if(keyboard.Key1 == true) {
                this.level.enemies[0].x = 720;
            }
            if(keyboard.Key0 == true) {
                this.level.enemies[0].energy = 0;
            }
            if(keyboard.Key2 == true) {
                this.level.enemies[0].energy = 1;
            }
        }, 100);
        regInterval(tempInterval);
    }


    checkCollidingEnemies() {
        this.level.enemies.forEach( (enemy) => {
            if(enemy.isCollidingHitbox(this.character)) {
                this.collidingStatus = true;
                if(enemy.energy > 0 && this.level.character.speedY < -1) {
                    enemy.energy = 0;
                    enemy.revive();
                    this.character.getEnergy(enemy.energy_return);
                } else if(enemy.energy > 0 && this.character.isFalling == false && this.character.isHurt == false) {
                    this.character.isHurt = true;
                    this.character.energy > 0 ? this.character.energy -= enemy.attack : this.character.energy = 0;
                    setTimeout(() => {
                        this.character.isHurt = false;
                    }, 250);
                }
            }
        });
    }


    checkCollidingItems() {
        this.level.items.forEach( (item) => {
            if(item.isCollidingHitbox(this.character)) {
                if(item instanceof Coin && item.energy > 0) {
                    item.energy = 0;
                    this.character.coins += 1;
                }
                if(item instanceof Bottle && item.energy > 0) {
                    item.energy = 0;
                    this.character.bottles += 1;
                }
            }
        });

    }


        // ################################################################################
        // ################################################################################
        // ################################################################################
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

        this.camera_x = -this.character.x;


        // Canvas leeren
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // ################################################################################
        // in Canvas-Context zeichnen
        this.ctx.translate(this.camera_x + 100, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.items, false, "#ff0000");

        // this.addBoxToMap(false, 720, 450, 1, 30, 0, "#000000");

        this.addToMap(this.character, this.character.flipH, false);
        // this.addHitBoxToMap(this.character);
        this.addObjectsToMap(this.level.enemies, false, "#0000ff");
        this.addFpsToMap('0', 10, 452);
        this.addFpsToMap('1', 10 + 720, 452);
        this.addFpsToMap('2', 10 + 720 * 2, 452);
        this.addFpsToMap('3', 10 + 720 * 3, 452);
        this.addFpsToMap('4', 10 + 720 * 4, 452);
        this.addFpsToMap('5', 10 + 720 * 5, 452);
        this.addFpsToMap('6', 10 + 720 * 6, 452);

        this.ctx.translate(-this.camera_x - 100, 0);

        this.addFpsToMap('FPS: ' + this.fpsText, 10, 32);
        this.addDataToMap((this.character.isHurt ? '1' : '0'), 500, 32);
        this.addDataToMap('Pepe: '+ this.character.energy, 10, 48);
        this.addDataToMap('Coins: '+ this.character.coins, 10, 64);
        this.addDataToMap('Bottles: '+ this.character.bottles, 10, 80);


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
        obj.forEach( (o, index) => {
            this.addToMap(o, false, box, color, index);
        });
    }

    addToMap(mo, flip = false, box = false, color = '#000000', index = -2) {
        if(flip) {
            this.ctx.save();
            this.ctx.scale(flip ? -1 : 1, 1);
        }
        this.ctx.drawImage(mo.img, flip ? (mo.x + mo.width) * -1 : mo.x, mo.y - mo.yBaseline, mo.width, mo.height);
        if(box) {
            this.addBoxToMap(flip, mo.x, mo.y, mo.width, mo.height, mo.yBaseline, color);
            if(index > -2) {
                this.addDataToMap(index, mo.x, mo.y);
            }
        }
        if(mo.isMarking == true) {
            this.addBoxToMap(flip, mo.x, mo.y, mo.width, mo.height, mo.yBaseline, '#00ff00');
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

    addHitBoxToMap(mo, color = "#ff0000") {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.rect(mo.x + mo.hitbox_x, mo.y - mo.yBaseline + mo.hitbox_y, mo.hitbox_width, mo.hitbox_height);
        this.ctx.stroke();
        this.ctx.strokeStyle = "#000000";
    }

}