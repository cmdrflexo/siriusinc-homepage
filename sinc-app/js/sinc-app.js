/*
 *  Sirius Inc Three.js App
 */

// const server = new ServerConnection.ServerConnection();

let clock = new THREE.Clock();
let scene = new THREE.Scene();
let renderer, camera, controls;
let lighting;

let axesHelper;

let coin;

start();

function start() {
    clock.start();
    setupRenderer();
    setupCamera();
    setupLighting();
    setupObjects();
    scene.add(camera, lighting);
    window.addEventListener("resize", onWindowResize);
    renderer.setAnimationLoop(update);
}

function update() {
    let deltaTime = clock.getDelta();
    coin.rotation.x += deltaTime;
    coin.rotation.y += deltaTime * 2;
    // coin.rotation.z += deltaTime * 0.1;
    
    controls.update();
    renderer.render(scene, camera);
}

function setupRenderer() {
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function setupCamera() {
    camera = new THREE.PerspectiveCamera(
        45, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    camera.position.z = 10;
    controls = new THREE.OrbitControls(camera);
}

function setupLighting() {
    lighting = new THREE.Group();
    let directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(100, 100, 100);
    directionalLight.lookAt(new THREE.Vector3(0, 0, 0));
    lighting.add(directionalLight);
}

function setupObjects(showAxes = false) {
    axesHelper = new THREE.AxesHelper(1);
    if(showAxes) scene.add(axesHelper);
    coin = new THREE.Group();
    coinMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 0.1, 128),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("supersinc-580.png")})
    );
    coinMesh.rotation.set(Math.PI * 0.5, Math.PI * 0.5, 0);
    coin.add(coinMesh);
    scene.add(coin);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
