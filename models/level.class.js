class Level {
    character;
    enemies;
    clouds;
    backgroundObjects;
    level_end_x;
    platforms;

    constructor(character, enemies, clouds, backgroundObjects, level_end_x, platforms) {
        this.character = character;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.level_end_x = level_end_x;
        this.platforms = platforms;
    }
}