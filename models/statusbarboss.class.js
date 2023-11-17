/**
 * Represents a status bar with an icon, background, and foreground images.
 * @class
 */
class StatusBarBoss {
    iconX;
    iconY;
    iconWidth;
    iconHeight;
    barX;
    barY;
    barWidth;
    barHeight;
    max;
    current;

    imgIcon = new Image();
    imgBackground = new Image();
    imgForeground = new Image();


    /**
     * Creates a new StatusBarBoss.
     * @constructor
     * @param {string} icon - The path to the icon image.
     * @param {number} x - The x-coordinate for the icon.
     * @param {number} y - The y-coordinate for the icon.
     */
    constructor(icon, x, y) {
        this.loadImages(icon);
        this.loadValues(x, y);
    }


    /**
     * Loads the background, foreground, and icon images.
     * @param {string} path - The path to the icon image.
     */
    loadImages(path) {
        this.imgBackground.src = mainPath + '/img/set1/7_statusbars/4_bar_elements/statusbar_empty_r.png';
        this.imgForeground.src = mainPath + '/img/set1/7_statusbars/4_bar_elements/statusbar_blue_r.png';
        this.imgIcon.src = mainPath + path;
    }


    /**
     * Loads initial values for the icon and status bar.
     * @param {number} x - The x-coordinate for the icon.
     * @param {number} y - The y-coordinate for the icon.
     */
    loadValues(x, y) {
        this.iconX = x;
        this.iconY = y;
        this.iconWidth = 50;
        this.iconHeight = 50;
        this.barX = 677;
        this.barY = this.iconY + 10;
        this.barWidth = 120;
        this.barHeight = 32;
        this.max = 50;
        this.current = 50;
    }
}