/**
 * Class representing the game world.
 */
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
    statusbarBoss = new StatusBarBoss('/img/set1/7_statusbars/3_icons/icon_health_endboss.png', 660, 10);
    audio = new AudioManager();
    playgame = false;
    game = -1;

    
    
    /**
     * Creates an instance of World.
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        worldLoaded = true;
        this.setWorld();
        this.setIndexes();
        this.checkColliding();
        this.draw();
    }


    /**
     * Sets indexes for items in the level.
     */
    setIndexes() {
        this.level.items.forEach((element, index) => {
            element.index = index;
        });
    }
    
    
    /**
     * Sets up the initial state of the world.
     */
    setWorld() {
        this.level_end_x = this.level.level_end_x;
        this.character = this.level.character;
        this.character.platforms_toJump = this.level.platforms;
        this.character.cworld = this;
        this.level.enemies.forEach(element => {
        if(element instanceof BossChicken)
            element.cworld = this;
            this.statusbarBoss.current = element.energy;
            element.move();
        });
    }


    /**
     * Checks for collisions and updates game state.
     */
    checkColliding() {
        tempInterval = setInterval( () => {
            if(GameIsRunning || firstFrame ) {
                this.collidingStatus = false;
                this.checkCollidingEnemies();
                this.checkCollectItems();
                this.checkAllItemsToAllEnemies();
                this.checkCharacterOnExit();
                this.checkCharacterDeath();
            }
        }, 1000 / 60);
        regInterval(tempInterval);
    }


    /**
     * Checks collisions with enemies and updates game state accordingly.
     */
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


    /**
     * Sets the character state to hurt and plays hurt sound.
     */
    setCharacterIsHurt() {
        this.character.isHurt = true;
        if(optionSound && this.audio.snd_hurt.paused) {
            this.audio.snd_hurt.play();
        }
        setTimeout(() => {
            this.character.isHurt = false;
        }, 330);
    }


    /**
     * Checks and updates the state when the character collides with a chicken or boss.
     * @param {Chicken | SmallChicken | BossChicken} enemy - The enemy with which the character collides.
     */
    checkCollidingChickenOrBoss(enemy) {
        if(enemy instanceof Chicken || enemy instanceof SmallChicken) {
            (enemy.energy >= this.character.attack) ? enemy.energy -= this.character.attack : enemy.energy = 0;
            if(enemy.y < 420 && this.character.isFalling) {
                enemy.speedY = this.character.speedY;
            }
            if(optionBouncing){
                this.character.speedY = 7;
            }
            enemy.revive();
            if(optionSound) {
                enemy.snd_chicken_dead.play();
            }
        }
    }


    /**
     * Checks and updates the state when the character collects items.
     */
    checkCollectItems() {
        this.level.items.forEach( (item, index) => {
            if(item.isCollidingHitbox(this.character)) {
                this.isCollectCoin(item);
                this.isCollectBottle(item, index);
            }
        });
    }


    /**
     * Updates game state when the character collects a coin.
     * @param {Coin} item - The coin item collected by the character.
     */
    isCollectCoin(item) {
        if(item instanceof Coin && item.energy > 0) {
            item.energy = 0;
            this.character.coins += 1;
            if(optionSound) {
                item.snd_coin.play();
            }
        }
    }


    /**
     * Updates game state when the character collects a bottle.
     * @param {Bottle} item - The bottle item collected by the character.
     * @param {number} index - The index of the bottle item.
     */
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
                this.pushBottleToBackpack(item, index);
            }
        }
    }


    /**
     * Adds a bottle to the character's backpack.
     * @param {Bottle} item - The bottle item to be added to the backpack.
     * @param {number} index - The index of the bottle item.
     */
    pushBottleToBackpack(item, index) {
        this.character.backpack.push(index);
        this.character.bottles += 1;
        item.initStatus = false;
        if(optionSound) {
            item.snd_bottle.play();
        }
    }


    /**
     * Checks collisions between items and enemies.
     */
    checkAllItemsToAllEnemies() {
        this.level.items.forEach(item => {
            this.level.enemies.forEach( (enemy) => {
                this.checkCollidingItemEnemy(item, enemy);
            });
        });
    }


    /**
     * Checks collisions between an item and an enemy and updates game state accordingly.
     * @param {Item} item - The item in collision with the enemy.
     * @param {Enemy} enemy - The enemy in collision with the item.
     */
    checkCollidingItemEnemy(item, enemy) {
        if(enemy.isCollidingHitbox(item)) {
            this.collidingStatus = true;
            if(enemy.energy > 0 && item.fly) {
                enemy.energy >= item.attack ? enemy.energy -= item.attack : enemy.energy = 0;
                this.collidingItemEnemyIsBoss(enemy);
                item.noJump(-100, true);
                if(optionSound && item.snd_bottlebroken.paused) {
                    item.snd_bottlebroken.play();
                }
            }
        }
    }


    /**
     * Updates game state when an item collides with a boss enemy.
     * @param {BossChicken} enemy - The boss enemy in collision with the item.
     */
    collidingItemEnemyIsBoss(enemy) {
        if(enemy instanceof BossChicken){
            this.statusbarBoss.current = enemy.energy;
            if(enemy.energy > 0 && !enemy.isHurt) {
                this.enemyBossIsHurt(enemy);
            } else if(enemy.energy <= 0){
                this.enemyBossIsDead(enemy);
            }
        } else {
            enemy.revive();
        }
    }


    /**
     * Updates game state when a boss enemy is hurt.
     * @param {BossChicken} enemy - The boss enemy that is hurt.
     */
    enemyBossIsHurt(enemy) {
        enemy.isHurt = true;
        if(optionSound) {
            enemy.snd_boss_hurt.play();
        }
        this.enemyBossHurtEnding(enemy);
    }


    /**
     * Updates game state when a boss enemy is dead.
     * @param {BossChicken} enemy - The boss enemy that is dead.
     */
    enemyBossIsDead(enemy) {
        enemy.isHurt = false;
        if(optionSound) {
            enemy.snd_boss_death.play();
        }
    }


    /**
     * Sets a timeout to end the hurt state of a boss enemy.
     * @param {BossChicken} enemy - The boss enemy whose hurt state is ending.
     */
    enemyBossHurtEnding(enemy) {
        setTimeout(() => {
            enemy.isHurt = false;
        }, 1500);
    }


    /**
     * Checks for the character's death and updates game state accordingly.
     */
    checkCharacterDeath() {
        if(this.character.energy <= 0 && !this.character.isDead) {
            this.character.energy = 0;
            this.character.isDead = true;
            if(optionSound) {
                this.audio.snd_dead.play();
            }
            setTimeout(() => {
                this.gameStop(false);
            }, 2000);
        }
    }
    
    
    /**
     * Checks if the character has reached the exit point and updates game state accordingly.
     */
    checkCharacterOnExit() {
        if(this.character.x > 720 * 5.9) {
            world.game = -1;
            this.gameStop(true);
        }
    }


    /**
     * Stops the game and either opens the win or lose screen.
     * @param {boolean} win - Indicates whether the game was won or lost.
     */
    gameStop(win = false) {
        this.audio.snd_walk.pause();
        this.audio.snd_walk.currentTime = 0;
        this.clearGame();
        if(win) {
            openGame(-4);
        } else {
            openGame(-5);
        }
    }


    /**
     * Clears the game state.
     */
    clearGame() {
        setTimeout(() => {
            worldLoaded = false;
            this.character = null;
            this.level = null;
        }, 200);
    }


    /**
     * Loads a new game level.
     * @param {number} startLevel - The level to start loading.
     */
    loadGame(startLevel = 1) {
        this.loadNewLevel(startLevel);
        this.setWorld();
        this.setIndexes();
        this.firstFrame = true;
    }


    /**
     * Loads a new game level based on the specified level.
     * @param {number} startLevel - The level to load.
     */
    loadNewLevel(startLevel) {
        if(this.level != null) {
            worldLoaded = false;
            this.character = null;
            this.level = null;
        }
        if(startLevel == 1) {
            this.level = loadLevel1();
        } else if(startLevel == 2) {
            this.level = loadLevel2();
        }
    }
    

// ################################################################################
// ################################################################################
// ################################################################################
    /**
     * Draws the game world and updates the animation frame.
     */
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


    /**
     * Calculates and updates the frames per second (FPS) for the game.
     */
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


    /**
     * Draws the movable elements of the game world.
     */
    drawMovableWorld() {
        this.ctx.translate(this.camera_x + 100, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.items);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character, this.character.flipH);
        this.ctx.translate(-this.camera_x - 100, 0);
    }


    /**
     * Adds objects to the game map.
     * @param {Array} obj - The array of objects to be added to the map.
     */
    addObjectsToMap(obj){
        obj.forEach( (o) => {
            this.addToMap(o, o.flipH);
        });
    }


    /**
     * Adds an object to the game map.
     * @param {MovableObject} mo - The movable object to be added to the map.
     * @param {boolean} flip - Indicates whether to flip the object horizontally.
     */
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


    /**
     * Adds an image to the game map.
     * @param {HTMLImageElement} moimg - The image to be added to the map.
     * @param {number} x - The x-coordinate of the image.
     * @param {number} y - The y-coordinate of the image.
     * @param {number} width - The width of the image.
     * @param {number} height - The height of the image.
     */
    addImageToMap(moimg, x, y, width, height) {
        this.ctx.drawImage(moimg, x, y, width, height);
    }


    /**
     * Adds the status bars to the game map.
     */
    addStatusToMap() {
        this.addImageToMap(this.statusbarHealth.imgBackground, this.statusbarHealth.barX, this.statusbarHealth.barY, this.statusbarHealth.barWidth, this.statusbarHealth.barHeight); // Statusbar Health Background
        this.addImageToMap(this.statusbarHealth.imgForeground, this.statusbarHealth.barX, this.statusbarHealth.barY, this.statusbarHealth.barWidth / this.statusbarHealth.max * this.statusbarHealth.current, this.statusbarHealth.barHeight); // Statusbar Health Foreground
        this.addImageToMap(this.statusbarHealth.imgIcon, this.statusbarHealth.iconX, this.statusbarHealth.iconY, this.statusbarHealth.iconWidth, this.statusbarHealth.iconHeight); // Icon Health
        this.addImageToMap(this.statusbarCoin.imgIcon, this.statusbarCoin.iconX, this.statusbarCoin.iconY, this.statusbarCoin.iconWidth, this.statusbarCoin.iconHeight); // Icon Coin
        this.addImageToMap(this.statusbarBottle.imgIcon, this.statusbarBottle.iconX, this.statusbarBottle.iconY, this.statusbarBottle.iconWidth, this.statusbarBottle.iconHeight); // Icon Bottle
        this.addImageToMap(this.statusbarBoss.imgBackground, this.statusbarBoss.barX - this.statusbarBoss.barWidth, this.statusbarBoss.barY, this.statusbarBoss.barWidth, this.statusbarBoss.barHeight); // Statusbar Boss Background
        this.addImageToMap(this.statusbarBoss.imgForeground, this.statusbarBoss.barX - (this.statusbarBoss.barWidth / this.statusbarBoss.max * this.statusbarBoss.current), this.statusbarBoss.barY, this.statusbarBoss.barWidth / this.statusbarBoss.max * this.statusbarBoss.current, this.statusbarBoss.barHeight); // Statusbar Boss Foreground
        this.addImageToMap(this.statusbarBoss.imgIcon, this.statusbarBoss.iconX, this.statusbarBoss.iconY, this.statusbarBoss.iconWidth, this.statusbarBoss.iconHeight); // Icon Boss
    }


    /**
     * Adds the frames per second (FPS) information to the game map.
     * @param {string} text - The text to display for the FPS.
     * @param {number} x - The x-coordinate of the text.
     * @param {number} y - The y-coordinate of the text.
     * @param {number} size - The font size of the text.
     * @param {string} color - The color of the text.
     */
    addFpsToMap(text, x, y, size = 24, color = '#000000') {
        this.ctx.font = size + "px sans-serif";
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x - this.ctx.measureText(text).width, y);
    }


    /**
     * Adds text information to the game map.
     * @param {string} text - The text to display.
     * @param {number} x - The x-coordinate of the text.
     * @param {number} y - The y-coordinate of the text.
     * @param {number} size - The font size of the text.
     * @param {boolean} fontbold - Indicates whether the font should be bold.
     * @param {string} color - The color of the text.
     * @param {boolean} middle - Indicates whether to center the text horizontally.
     */
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


    /**
     * Draws additional text information on the game map.
     */
    drawTextInfo() {
        if(optionFPS) {
            this.addFpsToMap(this.fpsText+'FPS', 710, 460, 12, '#00ff00');
        } 
        this.addTextToMap(this.character.coins, 75, 86, 24, true, '#000000', true);
        this.addTextToMap(this.character.bottles, 150, 86, 24, true, '#000000', true);
        this.addTextToMap('Move: Arrow left/right   Jump: Arrow up/Space   Attack: Num 0/D', 360, 450, 16, null, '#000000', true);
        this.addTextToMap('Fall down: Arrow down   Change 10 Coins into 1 Bottle: Enter', 360, 468, 16, null, '#000000', true);
    }
}