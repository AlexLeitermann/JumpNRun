let comeFrom = document.location.pathname;
let mainPath = getMainPath(comeFrom);
let intervalIds = [];
let tempInterval = null;
let worldLoaded = false;

function getMainPath(path) {
    // Finde die Position des letzten '/' im Pfad
    const lastSlashIndex = path.lastIndexOf('/');

    // Wenn kein '/' gefunden wurde, gib den ursprünglichen Pfad zurück
    if (lastSlashIndex === -1) {
        return path;
    }

    // Andernfalls schneide alles nach dem letzten '/' ab und gib den übrigen Pfad zurück
    return path.slice(0, (lastSlashIndex - 0));
}


function regInterval(id) {
    intervalIds.push(id);
}