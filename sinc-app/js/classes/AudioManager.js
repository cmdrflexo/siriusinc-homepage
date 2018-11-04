
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
        this.setup();
    }

    setup() {
        this.camera.add(this.listener);
        this.audioLoader.load(this.files.mapAmbient, (buffer) => {
            this.music.mapAmbient.audio.setBuffer(buffer);
            this.music.mapAmbient.audio.setLoop(true);
            this.music.mapAmbient.audio.setVolume(0.5);
            console.log("Spacial Harvest Kevin MacLeod (incompetech.com)\nLicensed under Creative Commons: By Attribution 3.0 License\nhttp://creativecommons.org/licenses/by/3.0/");
            this.play(this.music.mapAmbient.audio);
        });
    }

    update() {
        if(this.music.mapAmbient.audio.isPlaying) {
            let freqAdjust = 0.005;
            let soundFreq = this.analysers.mapAmbient.getAverageFrequency();
            if(smokePoints) smokePoints.material.opacity = soundFreq * freqAdjust;
        }
    }

    play(audio) {
        if(audio) audio.play();
    }

    pause() {
        if(this.music.mapAmbient.audio.isPlaying) this.music.mapAmbient.audio.pause();
        else this.music.mapAmbient.audio.play();
    }
}
/*
    var analyser = new THREE.AudioAnalyser(_ambientSound.audio, 32);
    var soundFreq;
    var soundData = [];
    soundFreq = analyser.getAverageFrequency();
    if(_exogons[0])
        for(var i = 0; i < _exogons[0].children.length; i++) {
            if(_exogons[0].children[i].material)
                _exogons[0].children[i].material.color = {
                    r: 1 * soundFreq * matSoundScale + colorBoost.r,
                    g: 1 * soundFreq * matSoundScale + colorBoost.g,
                    b: 1 * soundFreq * matSoundScale + colorBoost.b
                };
            }
    if(soundData.length == l.geometry.vertices.length) {
        soundData.shift();
        soundData.push(soundFreq);
        for(var i = 0; i < l.geometry.vertices.length; i++) {
            l.geometry.vertices[i].y = l.position.y + soundData[i] * lineScale;
        }
        l.geometry.verticesNeedUpdate = true;
    } else {
        soundData.push(soundFreq);
    }
*/