
var AudioManager = class {
    constructor(camera) {
        this.camera = camera;
        this.listener = new THREE.AudioListener();
        this.audioLoader = new THREE.AudioLoader();
        this.files = {
            mapAmbient: "assets/audio/music/SpacialHarvest.mp3"
        };
        this.music = {
            mapAmbient: {audio: new THREE.Audio(this.listener), loaded: false}
        };
        this.analysers = {
            mapAmbient: new THREE.AudioAnalyser(this.music.mapAmbient.audio)
        }
        this.masterVolume = 0.5;
        this.setup();
    }

    setup() {
        this.camera.add(this.listener);
        this.audioLoader.load(this.files.mapAmbient, (buffer) => {
            this.music.mapAmbient.audio.setBuffer(buffer);
            this.music.mapAmbient.audio.setLoop(true);
            this.music.mapAmbient.audio.setVolume(this.masterVolume);
            console.log("Spacial Harvest Kevin MacLeod (incompetech.com)\nLicensed under Creative Commons: By Attribution 3.0 License\nhttp://creativecommons.org/licenses/by/3.0/");
            this.play(this.music.mapAmbient.audio);
        });
    }

    update() {
        if(this.music.mapAmbient.audio.isPlaying) {
            this.music.mapAmbient.audio.setVolume(this.masterVolume);
            let freqAdjust = 0.005;
            let soundFreq = this.analysers.mapAmbient.getAverageFrequency();
            if(smokePoints) smokePoints.material.opacity = this.masterVolume > 0 ?
                soundFreq * freqAdjust : 0.015;
        }
    }

    play(audio) {
        if(audio) audio.play();
    }

    pause() {
        if(this.music.mapAmbient.audio.isPlaying) {
            this.music.mapAmbient.audio.pause();
            console.log("Audio paused");
        } else {
            this.music.mapAmbient.audio.play();
            console.log("Audio resumed");
        }
    }

    mute() {
        if(this.masterVolume > 0) {this.masterVolume = 0; console.log("Audio muted");}
        else {this.masterVolume = 0.5; console.log("Audio unmuted");}
    }
}
