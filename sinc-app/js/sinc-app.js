/*
 *  Sirius Inc Three.js App
 */

 // Options
const showStats = false;
const draggable = false;
const demoContent = false;
let paused = false;

// THREE
const clock = new THREE.Clock();
const stats = new Stats();

// Classes
const server        = new FakeServer();
const db            = new Databases();
const font          = new Font();
const sc            = new SceneController(update);
const hud           = new CameraHUD(sc.renderer, sc.camera);
// const loadingScreen = new LoadingScreen(hud);
// const audio         = new AudioManager(sc.camera);
const galaxy        = new GalaxyDisplay(sc.scene);
// const nebEng        = new NebulaEngine();
const controls      = new THREE.OrbitControls(sc.camera);
const cursor        = new Cursor(sc.scene, controls.target);

start();

function start() {
    clock.start();
    if(showStats) statsContainer.appendChild(stats.dom);
    setupEvents();
    font.loadFont(font.fontFiles.helvetikerRegular, ready);
}

function ready() {
    galaxy.createStarSystemsLayer();
}

function update() {
    if(!paused) {
        let deltaTime = clock.getDelta();
        TWEEN.update();
        controls.update();
        // audio.update();
        galaxy.update();
        cursor.update();
        sc.update();
        hud.update(deltaTime);
        // loadingScreen.update(deltaTime);
        if(showStats) stats.update();
    }
}

function pause() {
    audio.pause();
    paused = !paused;
    console.log("Application " + (paused ? "paused" : "resumed"));
}

function setupEvents() {
    window.addEventListener("resize", onWindowResize);
    window.addEventListener("keydown", (event) => {
        switch(event.keyCode) {
            case KeyCodes.M: audio.mute(); break;
            case KeyCodes.P: pause();      break;
        }
    });
}

function onWindowResize() {
    let container = document.getElementById("testdiv");
    sc.renderer.setSize(container.clientWidth, container.clientHeight);
    sc.camera.aspect = container.clientWidth / container.clientHeight;
    sc.camera.updateProjectionMatrix();
    hud.resize();
}





// Random GalaxyDisplay focus origin loop
function func() {
	galaxy.focusOrigin = galaxy.starSystems[getRandomInt(0, galaxy.starSystems.length - 1)].coordinates; 
	for(let s of galaxy.starSystems) s.positionUpdate = true;
}
setInterval(()=>{func();}, 5000);
function getRandomInt(min, max) {
    min = Math.ceil(min);
    return Math.floor(Math.random() * (Math.floor(max) - min + 1)) + min;
}