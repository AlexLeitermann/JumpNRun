class World {
    level = loadLevel1();
    level_end_x = 720;
    character;
    collidingStatus = false;
    camera_x = 0;
    fpsStart = 0;
    fpsValue = 0;
    fpsText = 0;
    ctx;
    canvas;
    statusbarHealth = new StatusBar('/img/set1/7_statusbars/3_icons/icon_health.png', 10, 0);
    statusbarCoin = new StatusBar('/img/set1/7_statusbars/3_icons/icon_coin.png', 10, 50);
    statusbarBottle = new StatusBar('/img/set1/7_statusbars/3_icons/icon_salsa_bottle.png', 90, 50);
    statusbarBoss = new StatusBarBoss('img/set1/7_statusbars/3_icons/icon_health_endboss.png', 660, 10);
    audio = new AudioManager();
    playgame = false;
    game = -1;

    
    
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        worldLoaded = true;
        this.setWorld();
        this.setIndexes();
        this.updateBossEnergy();
        this.checkColliding();
        this.checkKeybordForTesting();
        this.draw();
    }


    setIndexes() {
        this.level.items.forEach((element, index) => {
            element.index = index;
        });
    }
    
    
    setWorld() {
        this.level_end_x = this.level.level_end_x;
        this.character = this.level.character;
        this.character.platforms_toJump = this.level.platforms;
        this.character.cworld = this;
        this.level.enemies.forEach(element => {
        if(element instanceof BossChicken)
            element.cworld = this;
            element.move();
        });
    }


    checkColliding() {
        tempInterval = setInterval( () => {
            if(GameIsRunning == true ) {
                this.collidingStatus = false;
                this.checkCollidingEnemies();
                this.checkCollectItems();
                this.checkCollidingEnemItems();
                this.checkCharacterOnExit();
                this.checkCharacterDeath();
            }
        }, 1000 / 60);
        regInterval(tempInterval);
    }


    checkKeybordForTesting() { // diese Funktion muss noch weg
        // set first chicken on x=720 - only for testing
        tempInterval = setInterval(() => {
            if(keyboard.Key0 == true) 
                this.level.enemies[0].x = 720;
            if(keyboard.Key1 == true) 
                this.level.enemies[0].energy = 0;
            if(keyboard.Key2 == true) 
                this.level.enemies[0].energy += 1;
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
                this.statusbarHealth.current = this.character.energy;
            }
        });
    }


    setCharacterIsHurt() {
        this.character.isHurt = true;
        this.audio.snd_hurt.play();
        setTimeout(() => {
            this.character.isHurt = false;
        }, 330);
    }


    checkCollidingChickenOrBoss(enemy) {
        if(enemy instanceof Chicken || enemy instanceof SmallChicken) {
            (enemy.energy >= this.character.attack) ? enemy.energy -= this.character.attack : enemy.energy = 0;
            if(enemy.y < 420 && this.character.isFalling) {
                enemy.speedY = this.character.speedY;
            }
            if(optionBouncing){
                this.character.speedY = 6;
            }
            enemy.revive();
            enemy.snd_chicken_dead.play();
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


    isCollectBottle(item, index) { // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
                item.initStatus = false;
            }
        }
    }


    checkCollidingEnemItems() {
        this.level.items.forEach(item => {
            this.level.enemies.forEach( (enemy) => {
                if(enemy.isCollidingHitbox(item)) {
                    this.collidingStatus = true;
                    if(enemy.energy > 0 && item.fly) {
                        enemy.energy >= item.attack ? enemy.energy -= item.attack : enemy.energy = 0;
                        this.collidingEnemItemsIsBoss(enemy);
                        item.noJump(-100, true);
                        item.snd_bottlebroken.play();
                    }
                }
            });
        });
    }


    collidingEnemItemsIsBoss(enemy) { // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if(enemy instanceof BossChicken){
            if(enemy.energy > 0 && !enemy.isHurt) {
                enemy.isHurt = true;
                enemy.snd_boss_hurt.play();
                setTimeout(() => {
                    enemy.isHurt = false;
                }, 1500);
            } else if(enemy.energy <= 0){
                enemy.isHurt = false;
                enemy.snd_boss_death.play();
            }
        } else {
            enemy.revive();
        }
    }


    checkCharacterDeath() {
        if(this.character.energy <= 0 && !this.character.isDead) {
            this.character.energy = 0;
            this.character.isDead = true;
            this.audio.snd_dead.play();
            setTimeout(() => {
                this.gameStop(false);
            }, 2000);
        }
    }
    
    
    checkCharacterOnExit() {
        if(this.character.x > 720 * 5.9) {
            world.game = -1;
            this.gameStop(true);
        }
    }


    gameStop(win = false) {
        this.audio.snd_walk.pause();
        this.audio.snd_walk.currentTime = 0;
        if(win) {
            this.clearGame();
            openGame(-4);
        } else {
            openGame(-5);
        }
    }


    clearGame() {
        setTimeout(() => {
            this.character = null;
            this.level = null;
        }, 200);
    }


    loadGame(startLevel = 1) {
        if(startLevel == 1) {
            this.level = loadLevel1();
        } else if(startLevel == 2) {
            this.level = loadLevel2();
        }
        this.setWorld();
        this.setIndexes();
        this.firstFrame = true;
    }
    

// ################################################################################
// ################################################################################
// ################################################################################
    draw() {
        this.getFPS();
        if (GameIsRunning || firstFrame) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.camera_x = this.character instanceof Character ? -this.character.x : 0;
            this.drawMovableWorld();
            this.drawTextInfo();
            this.addStatusToMap();
            firstFrame = false;
        }
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
                this.fpsText = Math.floor((this.fpsValue / (fpsStop - this.fpsStart)) * 1000);
                this.fpsValue = 0;
                this.fpsStart = fpsStop;
            }
        }
        this.fpsValue++
    }


    drawMovableWorld() {
        this.ctx.translate(this.camera_x + 100, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.items);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character, this.character.flipH);
        this.ctx.translate(-this.camera_x - 100, 0);
    }


    addObjectsToMap(obj){
        obj.forEach( (o) => {
            this.addToMap(o, o.flipH);
        });
    }


    addToMap(mo, flip = false) {
        if(flip) {
            this.ctx.save();
            this.ctx.scale(flip ? -1 : 1, 1);
        }
        this.ctx.drawImage(mo.img, flip ? (mo.x + mo.width) * -1 : mo.x, mo.y - mo.yBaseline, mo.width, mo.height);
        if(flip) {
            this.ctx.restore();
        }
    }


    addImageToMap(moimg, x, y, width, height) {
        this.ctx.drawImage(moimg, x, y, width, height);
    }


    addStatusToMap() {
        // this.updateBossEnergy();
        this.addImageToMap(this.statusbarHealth.imgBackground, this.statusbarHealth.barX, this.statusbarHealth.barY, this.statusbarHealth.barWidth, this.statusbarHealth.barHeight); // Statusbar Health Background
        this.addImageToMap(this.statusbarHealth.imgForeground, this.statusbarHealth.barX, this.statusbarHealth.barY, this.statusbarHealth.barWidth / this.statusbarHealth.max * this.statusbarHealth.current, this.statusbarHealth.barHeight); // Statusbar Health Foreground
        this.addImageToMap(this.statusbarHealth.imgIcon, this.statusbarHealth.iconX, this.statusbarHealth.iconY, this.statusbarHealth.iconWidth, this.statusbarHealth.iconHeight); // Icon Health
        
        this.addImageToMap(this.statusbarCoin.imgIcon, this.statusbarCoin.iconX, this.statusbarCoin.iconY, this.statusbarCoin.iconWidth, this.statusbarCoin.iconHeight); // Icon Coin
        this.addImageToMap(this.statusbarBottle.imgIcon, this.statusbarBottle.iconX, this.statusbarBottle.iconY, this.statusbarBottle.iconWidth, this.statusbarBottle.iconHeight); // Icon Bottle

        this.addImageToMap(this.statusbarBoss.imgBackground, this.statusbarBoss.barX - this.statusbarBoss.barWidth, this.statusbarBoss.barY, this.statusbarBoss.barWidth, this.statusbarBoss.barHeight); // Statusbar Boss Background
        this.addImageToMap(this.statusbarBoss.imgForeground, this.statusbarBoss.barX - (this.statusbarBoss.barWidth / this.statusbarBoss.max * this.statusbarBoss.current), this.statusbarBoss.barY, this.statusbarBoss.barWidth / this.statusbarBoss.max * this.statusbarBoss.current, this.statusbarBoss.barHeight); // Statusbar Boss Foreground
        this.addImageToMap(this.statusbarBoss.imgIcon, this.statusbarBoss.iconX, this.statusbarBoss.iconY, this.statusbarBoss.iconWidth, this.statusbarBoss.iconHeight); // Icon Boss
    }


    updateBossEnergy() {
        this.level.enemies.forEach(element => {
            if(element instanceof BossChicken) {
                this.statusbarBoss.current = element.energy;
            }
        });
    }


    addFpsToMap(text, x, y, size = 24, color = '#000000') {
        this.ctx.font = size + "px sans-serif";
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x - this.ctx.measureText(text).width, y);
    }


    addTextToMap(text, x, y, size = 16, fontbold = false, color = '#000000', middle = false) {
        let halfWidth = 0;
        let bold = fontbold ? 'bold ' : '';
        this.ctx.font = bold + size + "px sans-serif";
        this.ctx.fillStyle = color;
        if(middle) {
            halfWidth = this.ctx.measureText(text).width / 2;
        }
        this.ctx.fillText(text, x - halfWidth, y);
    }


    drawTextInfo() {
        if(optionFPS) {
            this.addFpsToMap(this.fpsText+'FPS', 710, 460, 12, '#00ff00');
        } 
        this.addTextToMap(Math.floor(this.character.x), 10, 450, 16);
        this.addTextToMap(this.character.coins, 75, 86, 24, true, null, true);
        this.addTextToMap(this.character.bottles, 150, 86, 24, true, null, true);
        this.addTextToMap('Move: Arrow left/right   Jump: Arrow up/Space   Attack: Num 0/D', 360, 450, 16, null, '#000000', true);
        this.addTextToMap('Fall down: Arrow down   Change 10 Coins into 1 Bottle: Enter', 360, 468, 16, null, '#000000', true);
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