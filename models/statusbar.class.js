/**
 * Represents a status bar with an icon, background, and foreground images.
 * @class
 */
class StatusBar {
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
     * Creates a new StatusBar instance.
     * @param {string} icon - The path to the icon image.
     * @param {number} x - The x-coordinate of the status bar.
     * @param {number} y - The y-coordinate of the status bar.
     */
    constructor(icon, x, y) {
        this.loadImages(icon);
        this.loadValues(x, y);
    }


    /**
     * Loads background, foreground, and icon images.
     * @param {string} path - The path to the icon image.
     */
    loadImages(path) {
        this.imgBackground.src = mainPath + '/img/set1/7_statusbars/4_bar_elements/statusbar_empty.png';
        this.imgForeground.src = mainPath + '/img/set1/7_statusbars/4_bar_elements/statusbar_blue.png';
        this.imgIcon.src = mainPath + path;
    }


    /**
     * Loads initial values for the status bar.
     * @param {number} x - The x-coordinate of the status bar.
     * @param {number} y - The y-coordinate of the status bar.
     */
    loadValues(x, y) {
        this.iconX = x;
        this.iconY = y;
        this.iconWidth = 50;
        this.iconHeight = 50;
        this.barX = 40;
        this.barY = this.iconY + 15;
        this.barWidth = 120;
        this.barHeight = 32;
        this.max = 100;
        this.current = 100;
    }
}