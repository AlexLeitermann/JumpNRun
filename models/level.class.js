class Level {
    character;
    enemies;
    clouds;
    backgroundObjects;
    level_end_x;
    platforms;
    items;

    constructor(character = [], enemies = [], clouds = [], backgroundObjects = [], level_end_x = 720, platforms = [], items = []) {
        this.character = character[0];
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.level_end_x = level_end_x;
        this.platforms = platforms;
        this.items = items;
    }
}