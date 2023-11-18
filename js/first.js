let comeFrom = document.location.pathname;
let mainPath = getMainPath(comeFrom);
let intervalIds = [];
let tempInterval = null;
let worldLoaded = false;
let GameIsRunning = false;
let LevelIsLoaded = false;


/**
 * Gets the main path from the given path by removing the trailing part after the last slash.
 * @param {string} path - The input path.
 * @returns {string} The main path derived from the input path.
 */
function getMainPath(path) {
    const lastSlashIndex = path.lastIndexOf('/');
    if (lastSlashIndex === -1) {
        return path;
    }
    return path.slice(0, (lastSlashIndex - 0));
}


/**
 * Registers an interval ID to the intervalIds array.
 * @param {number} id - The ID of the interval to be registered.
 */
function regInterval(id) {
    intervalIds.push(id);
}


/**
 * Stops all intervals by clearing each interval identified by its ID.
 */
function stopAllInterval() {
    intervalIds.forEach( interval => {
        clearInterval(interval);
    });
}