class Level {
    character;
    enemies;
    clouds;
    backgroundObjects;
    level_end_x;

    constructor(character, enemies, clouds, backgroundObjects, level_end_x) {
        this.character = character;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.level_end_x = level_end_x;
    }
}