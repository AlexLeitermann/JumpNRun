let comeFrom = document.location.pathname;
let mainPath = getMainPath(comeFrom);
let intervalIds = [];
let tempInterval = null;
let worldLoaded = false;
let GameIsRunning = false;
let LevelIsLoaded = false;


function getMainPath(path) {
    const lastSlashIndex = path.lastIndexOf('/');
    if (lastSlashIndex === -1) {
        return path;
    }
    return path.slice(0, (lastSlashIndex - 0));
}


function regInterval(id) {
    intervalIds.push(id);
}


function stopAllInterval() {
    intervalIds.forEach( interval => {
        clearInterval(interval);
    });
}


