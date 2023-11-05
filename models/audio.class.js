class AudioManager {
    snd_walk;
    snd_dead;
    snd_jump;
    snd_hurt;

    snd_chicken_dead;
    snd_smallchicken_dead;

    snd_boss_alarm;
    snd_boss_death;
    snd_boss_hurt;

    snd_coin;
    snd_bottle;
    snd_bottlebroken;


    constructor() {
        this.initCharacterSound();
        // this.initChickenSound();
        // this.initItemSound();
    }


    initCharacterSound() {
        this.snd_walk = new Audio(mainPath + '/audio/walking.mp3');
        this.snd_jump = new Audio(mainPath + '/audio/jump_2.mp3');
        this.snd_hurt = new Audio(mainPath + '/audio/hurt_1.mp3');
        this.snd_dead = new Audio(mainPath + '/audio/player_dead_short.mp3');
        this.snd_walk.playbackRate = 2.5;
    }


    initChickenSound() {
        this.snd_chicken_dead = new Audio(mainPath + '/audio/chicken_dead.mp3');

        this.snd_smallchicken_dead = new Audio(mainPath + '/audio/birds_1_beep.mp3');

        this.snd_boss_death = new Audio(mainPath + '/audio/win.mp3');
        this.snd_boss_alarm = new Audio(mainPath + '/audio/chicken_boss_alarm.mp3');
        this.snd_boss_hurt = new Audio(mainPath + '/audio/chicken_alarm.mp3');
    }


    initItemSound() {
        this.snd_coin = new Audio(mainPath + '/audio/coin.mp3');

        this.snd_bottle = new Audio(mainPath + '/audio/bottle_open.mp3');
        this.snd_bottlebroken = new Audio(mainPath + '/audio/glass_broken.mp3');
    }
}