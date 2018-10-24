/*
 *  Sirius Inc Three.js App
 */

// const server = new ServerConnection.ServerConnection();

let clock = new THREE.Clock();
let scene = new THREE.Scene();
let renderer, camera, controls;
let lighting;

let axesHelper;

let systems;

start();

function start() {
    clock.start();
    setupRenderer();
    setupCamera();
    setupLighting();
    setupObjects(true);
    scene.add(camera, lighting);
    window.addEventListener("resize", onWindowResize);
    renderer.setAnimationLoop(update);
}

function update() {
    let deltaTime = clock.getDelta();
    
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
    camera.position.z = 5;
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
    setupSystems();
    createWireGrid(100, 1);
}

function setupSystems() {
    systems = new THREE.Group();
    systems.position.set(1.92125, 0.49375, 3.505625);;
    scene.add(systems);

    let material = new THREE.LineBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.25});

    for(let s of sincSystems) {
        let system = new THREE.Mesh(
            new THREE.SphereGeometry(0.02, 16, 8),
            new THREE.MeshBasicMaterial()
        );
        let coords = s.coordinates.split(" / ");
        system.position.set(Number(coords[0]) * 0.02, Number(coords[1]) * 0.02, Number(coords[2]) * 0.02);
        systems.add(system);
        
        let geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(system.position.x, system.position.y, system.position.z));
        geometry.vertices.push(new THREE.Vector3(system.position.x, -0.49375, system.position.z));
        let line = new THREE.Line(geometry, material);
        
        let dot = new THREE.Mesh(
            new THREE.CylinderGeometry(0.02, 0.02, 0.001, 16),
            new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.5})
        );
        // dot.scale.y = 0.001;
        dot.position.set(
            system.position.x, -0.49375, system.position.z
        );
        systems.add(line, dot);
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function createWireGrid(gridSize, cellSize) {
    let grid = new THREE.Group();
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