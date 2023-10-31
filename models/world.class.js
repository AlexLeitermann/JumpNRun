class World {
    level = level1;
    level_end_x = this.level.level_end_x;

    character = this.level.character;
    worldPlatforms = this.level.platforms;
    collidingStatus = false;

    camera_x = 0;
    fpsStart = 0;
    fpsValue = 0;
    fpsText = 0;
    ctx;
    canvas;
    playgame = false;

    
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        worldLoaded = true;
        this.setWorld();
        this.checkColliding();
        this.draw();
    }


    setWorld() {
        this.level.character.cworld = this;
        this.level.enemies.cworld = this;
        this.level.enemies.forEach(element => {
            if(element instanceof BossChicken)
                element.move();
        });

        this.character.platforms_toJump = this.level.platforms;
    }


    checkColliding() {
        tempInterval = setInterval( () => {
            this.collidingStatus = false;
            this.checkCollidingEnemies();
            this.checkCollectItems();
            this.checkCollidingEnemItems();
            if(this.character.energy <= 0 && !this.character.isDead) {
                // Spieler tot
                this.character.isDead = true;
                this.character.snd_dead.play();
            }
        }, 1000 / 60);
        regInterval(tempInterval);

        // set first chicken on x=720 - only for testing
        tempInterval = setInterval(() => {
            if(keyboard.Key1 == true) 
                this.level.enemies[0].x = 720;
            if(keyboard.Key0 == true) 
                this.level.enemies[0].energy = 0;
            if(keyboard.Key2 == true) 
                this.level.enemies[0].energy = 1;
        }, 100);
        regInterval(tempInterval);
    }


    checkCollidingEnemies() {
        this.level.enemies.forEach( (enemy) => {
            if(enemy.isCollidingHitbox(this.character)) {
                this.collidingStatus = true;
                if(enemy.energy > 0 && this.character.speedY < -1) {
                    this.checkCollidingChickenOrBoss(enemy);
                    this.character.getEnergy(enemy.energy_return);
                } else if(enemy.energy > 0 && this.character.isFalling == false && this.character.isHurt == false) {
                    this.character.energy > 0 ? this.character.energy -= enemy.attack : this.character.energy = 0;
                    if(this.character.energy > 0)
                        this.setCharacterIsHurt();
                }
            }
        });
    }

    setCharacterIsHurt() {
        this.character.isHurt = true;
        this.character.snd_hurt.play();
        setTimeout(() => {
            this.character.isHurt = false;
        }, 330);
    }


    checkCollidingChickenOrBoss(enemy) {
        if(enemy instanceof Chicken || enemy instanceof SmallChicken) {
            enemy.energy -= this.character.attack;
            if(enemy.y < 420 && this.character.speedY < -1)
                enemy.speedY = this.character.speedY;
            enemy.revive();
            enemy.snd_chicken_dead.play();
        } else if(enemy instanceof BossChicken) {

        }
    }


    checkCollectItems() {
        this.level.items.forEach( (item, index) => {
            if(item.isCollidingHitbox(this.character)) {
                this.isCollectCoin(item);
                this.isCollectBottle(item, index);
            }
        });
    }


    isCollectCoin(item) {
        if(item instanceof Coin && item.energy > 0) {
            item.energy = 0;
            this.character.coins += 1;
            item.snd_coin.play();
        }
    }


    isCollectBottle(item, index) {
        if(item instanceof Bottle && item.energy == -1 && !item.fly) {
            item.energy = 0;
            let finding = false;
            this.character.backpack.forEach( (packitem) => {
                if(packitem == index){
                    finding = true;
                };
            });
            if(!finding) {
                this.character.backpack.push(index);
                this.character.bottles += 1;
                item.snd_bottle.play();
            }
        }
    }


    checkCollidingEnemItems() {
        this.level.items.forEach(item => {
            this.level.enemies.forEach( (enemy) => {
                if(enemy.isCollidingHitbox(item)) {
                    this.collidingStatus = true;
                    if(enemy.energy > 0 && item.fly) {
                        enemy.energy > 0 ? enemy.energy -= item.attack : enemy.energy = 0;
                        this.collidingEnemItemsIsBoss(enemy);
                        item.noJump();
                        item.snd_bottlebroken.play();
                    }
                }
            });
        });
    }


    collidingEnemItemsIsBoss(enemy) {
        if(!(enemy instanceof BossChicken)) {
            enemy.revive();
        } else if(enemy instanceof BossChicken){
            if(enemy.energy > 0) {
                // sound hurt
                enemy.snd_boss_hurt.play();
            } else {
                // sound death
                enemy.snd_boss_death.play();
            }
        }
    }


// ################################################################################
// ################################################################################
// ################################################################################
    draw() {
        this.getFPS();
        this.camera_x = -this.character.x;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x + 100, 0);
        this.drawMovableWorld();
        this.ctx.translate(-this.camera_x - 100, 0);
        this.drawTextInfo();
        this.fpsValue++
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }


    getFPS() {
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
    }


    drawMovableWorld() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.items);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character, this.character.flipH);
        this.drawSites(); // Für Abgabe entfernen!!!
    }


    addObjectsToMap(obj, box = false, color){
        obj.forEach( (o, index) => {
            this.addToMap(o, false, box, color, index);
            if(o instanceof BossChicken) { // NUR ZUM TESTEN
                // this.addHitBoxToMap(o);
            } // --------------------------------
        });
    }


    addToMap(mo, flip = false, box = false, color = '#000000', index = -2) {
        if(flip) {
            this.ctx.save();
            this.ctx.scale(flip ? -1 : 1, 1);
        }
        this.ctx.drawImage(mo.img, flip ? (mo.x + mo.width) * -1 : mo.x, mo.y - mo.yBaseline, mo.width, mo.height);
        // Für Abgabe entfernen!!! -------------------------------------------------------------------------------------
        if(box) { // Für Abgabe entfernen!!!
            this.addBoxToMap(flip, mo.x, mo.y, mo.width, mo.height, mo.yBaseline, color);
            if(index > -2) {
                this.addDataToMap(index, mo.x, mo.y);
            }
        } 
        if(mo.isMarking == true) { // Für Abgabe entfernen!!!
            this.addBoxToMap(flip, mo.x, mo.y, mo.width, mo.height, mo.yBaseline, '#00ff00');
        } 
        // Für Abgabe bis hier entfernen!!! --------------------------------------------------------------------------------
        if(flip) {
            this.ctx.restore();
        }
    }


    addFpsToMap(text, x, y, size = 24, color = '#000000') {
        this.ctx.font = size + 'px sans-serif';
        this.ctx.color = color;
        this.ctx.fillText(text, x, y);
    }


    addDataToMap(text, x, y, size = 16, color = '#000000') {
        this.ctx.font = size + 'px sans-serif';
        this.ctx.color = color;
        this.ctx.fillText(text, x, y);
    }


    drawTextInfo() {
        this.addFpsToMap('FPS: ' + this.fpsText, 10, 32);
        this.addDataToMap((this.character.isHurt ? '1' : '0'), 500, 32);
        this.addDataToMap(Math.floor(this.level.enemies[0].x), 500, 48);
        this.addDataToMap('Pepe: '+ this.character.energy, 10, 48);
        this.addDataToMap('Coins: '+ this.character.coins, 10, 64);
        this.addDataToMap('Bottles: '+ this.character.bottles, 10, 80);
        this.addDataToMap('Move: Arrow left/right - Jump: Arrow up/Space - Attack: Num 0/D', 120, 454);
        this.addDataToMap('Boss: '+ this.level.enemies[0].energy, 500, 64);
    }

// Für Abgabe entfernen!!! ---------------------------------------------------------------------
    addBoxToMap(flip, x, y, w, h, yb, color = "#ff0000") { // Für Abgabe entfernen!!!
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.rect(flip ? (x + w) * -1 : x, y - yb, w, h);
        this.ctx.stroke();
        this.ctx.strokeStyle = "#000000";
    } 


    addHitBoxToMap(mo, color = "#ff0000") { // Für Abgabe entfernen!!!
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.rect(mo.x + mo.hitbox_x, mo.y - mo.yBaseline + mo.hitbox_y, mo.hitbox_width, mo.hitbox_height);
        this.ctx.stroke();
        this.ctx.strokeStyle = "#000000";
    } 


    drawSites() { // Für Abgabe entfernen!!!
        this.addFpsToMap('0', 10, 452);
        this.addFpsToMap('1', 10 + 720, 452);
        this.addFpsToMap('2', 10 + 720 * 2, 452);
        this.addFpsToMap('3', 10 + 720 * 3, 452);
        this.addFpsToMap('4', 10 + 720 * 4, 452);
        this.addFpsToMap('5', 10 + 720 * 5, 452);
        this.addFpsToMap('6', 10 + 720 * 6, 452);
    } 
// ----- Für Abgabe bis hierher entfernen -----------------------------------------------------
}