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

    constructor(icon, x, y) {
        this.loadImages(icon);
        this.loadValues(x, y);
    }


    loadImages(path) {
        this.imgBackground.src = mainPath + '/img/set1/7_statusbars/4_bar_elements/statusbar_empty.png';
        this.imgForeground.src = mainPath + '/img/set1/7_statusbars/4_bar_elements/statusbar_blue.png';
        this.imgIcon.src = mainPath + path;
    }


    loadValues(x, y) {
        this.iconX = x;
        this.iconY = y;
        this.iconWidth = 50;
        this.iconHeight = 50;
        this.barX = 40;
        this.barY = this.iconY + 10;
        this.barWidth = 120;
        this.barHeight = 32;
        this.max = 100;
        this.current = 100;
    }


}