class Level {
    backgroundObjects;
    character;
    clouds;
    enemies;
    items;
    level_end_x;
    platforms;

    constructor(character, enemies, clouds, backgroundObjects, level_end_x, platforms, items) {
        this.character = character;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.level_end_x = level_end_x;
        this.platforms = platforms;
        this.items = items;
    }
}