/*
 *  Sirius Inc Three.js App
 */

// const server = new ServerConnection.ServerConnection();

let clock = new THREE.Clock();
let scene = new THREE.Scene();
let renderer, camera, controls;
let lighting;

let axesHelper;
let grid;

let starSystems = [];
let mapObjects = new THREE.Group();

start();

function start() {
    clock.start();
    setupRenderer();
    setupCamera();
    setupLighting();
    setupObjects();
    scene.add(camera, lighting);
    scene.fog = new THREE.Fog(0x00, 100, 1000);
    window.addEventListener("resize", onWindowResize);
    renderer.setAnimationLoop(update);
}

function update() {
    let deltaTime = clock.getDelta();

    for(let starSystem of starSystems)
        starSystem.update();

    axesHelper.position.set(controls.target.x, controls.target.y, controls.target.z);
    
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
    camera.position.z = 250;
    controls = new THREE.OrbitControls(camera);
}

function setupLighting() {
    lighting = new THREE.Group();
    let directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(100, 100, 100);
    directionalLight.lookAt(new THREE.Vector3(0, 0, 0));
    lighting.add(directionalLight);
}

function setupObjects() {
    setupCursor();
    setupGrid();
    setupMapObjects();
}

function setupCursor() {
    axesHelper = new THREE.AxesHelper(10);
    axesHelper.add(new THREE.Mesh(
        new THREE.CylinderGeometry(2.5, 2.5, 0.001, 16),
        new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.5})
    ));
    scene.add(axesHelper);
}

function setupGrid() {
    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(10000, 10000),
        new THREE.MeshBasicMaterial({
            color: 0xffffff, 
            transparent: true, opacity: 0.025, 
            side: THREE.DoubleSide
        })
    );
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);
}

function setupMapObjects() {
    scene.add(mapObjects);
    for(let sincSystem of sincSystems) {
        let starSystem = new StarSystem(sincSystem);
        starSystems.push(starSystem);
        mapObjects.add(starSystem.mapObject);
        if(sincSystem.name === "San")
            mapObjects.position.set(
                -starSystem.coordinates.x, 
                -starSystem.coordinates.y,
                -starSystem.coordinates.z
            );
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function createWireGrid(gridSize, cellSize) {
    grid = new THREE.Group();
    for(var i = 0; i < gridSize + 1; i++) {
        let material = new THREE.LineBasicMaterial({color: 0xffffff, transparent: true});
        material.opacity = 0.1 - ((1 / gridSize) * Math.abs((i - (gridSize * 0.5))));
        var xGeometry = new THREE.Geometry();
        xGeometry.vertices.push(new THREE.Vector3(
            (i * cellSize) - cellSize * 0.5, 0, cellSize * -0.5
        ));
        xGeometry.vertices.push(new THREE.Vector3(
            (i * cellSize) - cellSize * 0.5, 0, gridSize * cellSize - cellSize * 0.5
        ));
        var zGeometry = new THREE.Geometry();
        zGeometry.vertices.push(new THREE.Vector3(
            cellSize * -0.5, 0, (i * cellSize) - cellSize * 0.5
        ));
        zGeometry.vertices.push(new THREE.Vector3(
            gridSize * cellSize - cellSize * 0.5, 0, (i * cellSize) - cellSize * 0.5
        ));
        grid.add(
            new THREE.Line(xGeometry, material), 
            new THREE.Line(zGeometry, material)
        );
    }
    grid.position.set(-gridSize * 0.5 + cellSize * 0.5, 0, -gridSize * 0.5 + cellSize * 0.5);
    scene.add(grid);
}