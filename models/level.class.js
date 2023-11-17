/**
 * Represents a game level with various elements such as character, enemies, clouds, etc.
 * @class
 */
class Level {
    character;
    enemies;
    clouds;
    backgroundObjects;
    level_end_x;
    platforms;
    items;

    /**
     * Creates a new Level instance.
     * @constructor
     * @param {Array} character - An array containing the main character object.
     * @param {Array} enemies - An array containing enemy objects.
     * @param {Array} clouds - An array containing cloud objects.
     * @param {Array} backgroundObjects - An array containing background object.
     * @param {number} level_end_x - The x-coordinate where the level ends. Default is 720.
     * @param {Array} platforms - An array containing platform objects.
     * @param {Array} items - An array containing item objects.
     */
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