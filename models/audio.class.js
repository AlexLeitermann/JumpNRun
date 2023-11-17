/**
 * Manages audio functionality for the game.
 * @class
 */
class AudioManager {
    snd_walk;
    snd_dead;
    snd_jump;
    snd_hurt;

    snd_init;

    /**
     * Creates a new AudioManager and initializes sounds.
     * @constructor
     */
    constructor() {
        this.initFistSound();
        this.initCharacterSound();
    }


    /**
     * Initializes the fist sound for the game.
     * @memberof AudioManager
     * @instance
     * @method
     */
    initFistSound() {
        this.snd_init = new Audio(mainPath + '/audio/bottle_open.mp3');
        this.snd_init.volume = 0;
        this.snd_init.play();
    }


    /**
     * Initializes sounds related to the game character.
     * @memberof AudioManager
     * @instance
     * @method
     */
    initCharacterSound() {
        this.snd_walk = new Audio(mainPath + '/audio/walking.mp3');
        this.snd_jump = new Audio(mainPath + '/audio/jump_2.mp3');
        this.snd_hurt = new Audio(mainPath + '/audio/hurt_1.mp3');
        this.snd_dead = new Audio(mainPath + '/audio/player_dead_short.mp3');
        this.snd_walk.playbackRate = 2.5;
        this.snd_walk.loop = true;
    }
}