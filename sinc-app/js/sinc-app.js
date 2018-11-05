/*
 *  Sirius Inc Three.js App
 */

// const server = new ServerConnection.ServerConnection();

const clock = new THREE.Clock();
const stats = new Stats();

const sc  = new SceneController(update);
const am  = new AudioManager(sc.camera);
const gd  = new GalaxyDisplay(sc.scene);
const hud = new CameraHUD(sc.renderer, sc.camera);

let paused = false;

let axesHelper;
let grid;

let galaxySphere;

let starSystems = [];
var mapObjects = new THREE.Group();
let nebulaPoints;
let smokePoints;

let mcLine = [];

start();

function start() {
    clock.start();
    statsContainer.appendChild(stats.dom);
    setupCamera();
    setupObjects();
    setupEvents();
}

function update() {
    if(!paused) {
        let deltaTime = clock.getDelta();
        controls.update();
        am.update();
        gd.update();
        axesHelper.position.set(controls.target.x, controls.target.y, controls.target.z);
        updateSky();
        sc.renderer.render(sc.scene, sc.camera);
        hud.update(deltaTime);
    }
    stats.update();
}

function pause() {
    am.pause();
    paused = !paused;
    console.log("Application " + (paused ? "paused" : "resumed"));
}

function setupCamera() {
    sc.camera.position.z = 250;
    controls = new THREE.OrbitControls(sc.camera);
}

function setupSky() {
    let galaxyTexture = new THREE.TextureLoader().load("assets/textures/galaxy_darker_blur.png");
    galaxySphere = new THREE.Mesh(
        new THREE.SphereGeometry(5000, 32, 16),
        new THREE.MeshBasicMaterial({map: galaxyTexture, side: THREE.BackSide})
    );
    // galaxySphere.scale.x = -1;
    galaxySphere.rotation.y = -Math.PI * 0.5;
    sc.scene.add(galaxySphere);
    // let origin = new THREE.Mesh(
    //     new THREE.SphereGeometry(1, 1, 1),
    //     new THREE.MeshBasicMaterial({color: "blue"})
    // );
    // origin.position.set(
    //     mapObjects.position.x,
    //     mapObjects.position.y,
    //     mapObjects.position.z
    // );
    // sc.scene.add(origin);
}

function updateSky() {
    if(galaxySphere && sc.camera)
        galaxySphere.position.set(
            sc.camera.position.x,
            sc.camera.position.y,
            sc.camera.position.z
        );
}

function setupObjects() {
    setupCursor();
    // setupGrid();
    let fontLoader = new THREE.FontLoader();
    fontLoader.load(
        "assets/fonts/helvetiker_regular.typeface.json",
        (font) => {
            // setupMapObjects(font);
            // drawChain();
            setupSky();
            setupNebula();
        }
    );
}

function setupCursor() {
    axesHelper = new THREE.AxesHelper(10);
    axesHelper.add(new THREE.Mesh(
        new THREE.CylinderGeometry(2.5, 2.5, 0.001, 16),
        new THREE.MeshBasicMaterial({color: 0x888888})
    ));
    sc.scene.add(axesHelper);
}

function setupGrid() {
    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100000, 100000),
        new THREE.MeshBasicMaterial({
            color: 0x000000, 
            transparent: true, opacity: 0.25, 
            side: THREE.DoubleSide
        })
    );
    plane.rotation.x = -Math.PI * 0.5;
    sc.scene.add(plane);
}

function setupMapObjects(font) {
    sc.scene.add(mapObjects);
    for(let sincSystem of sincSystems) {
        let starSystem = new StarSystem(sincSystem);
        starSystem.mapObject.name = sincSystem.name;
        mapObjects.add(starSystem.mapObject);
        starSystems.push(starSystem);
        let index;
        switch(sincSystem.name.toLowerCase()) {
            // case "san":
            //     mapObjects.position.set(
            //         -starSystem.coordinates.x, 
            //         -starSystem.coordinates.y,
            //         -starSystem.coordinates.z
            //     );
            //     break;
            case "hip 17655":                  index = 0; break;
            case "arietis sector xe-z b4":     index = 1; break;
            case "hyades sector ab-w b2-2":    index = 2; break;
            case "42 n persei":                
                index = 3; 
                mapObjects.position.set(
                    -starSystem.coordinates.x, 
                    -starSystem.coordinates.y,
                    -starSystem.coordinates.z
                );
                break;
            case "pleiades sector jc-v d2-62": index = 4; break;
            // case "hip 17044":                  index = 5; break;
            case "hip 17044":
                index = 5;
                // mapObjects.position.set(
                //     -starSystem.coordinates.x, 
                //     -starSystem.coordinates.y,
                //     -starSystem.coordinates.z
                // );
                break;
            case "hip 16813":                  index = 6; break;
            case "pleiades sector hr-w d1-57": index = 7; break;
            case "pleiades sector kc-v c2-4":  index = 8; break;
        }
        if(index >= 0)
            mcLine[index] = [
                starSystem.coordinates.x, 
                starSystem.coordinates.y,
                starSystem.coordinates.z
            ];

        let textSize = 10;
        let letterGeo = new THREE.TextGeometry(sincSystem.name, {
            font: font, size: textSize, height: 0, curveSegments: 2
        });
        letterGeo.computeBoundingBox();
        // let xOffset = -0.5 * (letterGeo.boundingBox.max.x - letterGeo.boundingBox.min.x);
        // let yOffset = 20;
        let xOffset = 15;
        let yOffset = -0.5 * letterGeo.boundingBox.max.y;
        let letterMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true});
        let nametag = new THREE.Mesh(letterGeo, letterMaterial);
        let hudElement = new HUDElement(sc.camera, starSystem.mapObject);
        hudElement.offset = {x: xOffset, y: yOffset};
        hudElement.object = nametag;
        hudElement.overlapElements = hud.elements;
        hud.createElement(hudElement);
    }
    // setupSky();
}

function drawChain() {
    let material = new THREE.LineBasicMaterial({color: 0x00ffff});
    let geometry = new THREE.Geometry();
    for(let i = 0; i < mcLine.length - 3; i++)
        geometry.vertices.push(new THREE.Vector3(
            mcLine[i][0] + mapObjects.position.x,
            mcLine[i][1] + mapObjects.position.y,
            mcLine[i][2] + mapObjects.position.z
        ));
    geometry.vertices.push(new THREE.Vector3(
        mcLine[mcLine.length - 4][0] + mapObjects.position.x,
        mcLine[mcLine.length - 4][1] + mapObjects.position.y,
        mcLine[mcLine.length - 4][2] + mapObjects.position.z
    ));
    geometry.vertices.push(new THREE.Vector3(
        mcLine[mcLine.length - 3][0] + mapObjects.position.x,
        mcLine[mcLine.length - 3][1] + mapObjects.position.y,
        mcLine[mcLine.length - 3][2] + mapObjects.position.z
    ));
    geometry.vertices.push(new THREE.Vector3(
        mcLine[mcLine.length - 4][0] + mapObjects.position.x,
        mcLine[mcLine.length - 4][1] + mapObjects.position.y,
        mcLine[mcLine.length - 4][2] + mapObjects.position.z
    ));
    geometry.vertices.push(new THREE.Vector3(
        mcLine[mcLine.length - 2][0] + mapObjects.position.x,
        mcLine[mcLine.length - 2][1] + mapObjects.position.y,
        mcLine[mcLine.length - 2][2] + mapObjects.position.z
    ));
    geometry.vertices.push(new THREE.Vector3(
        mcLine[mcLine.length - 1][0] + mapObjects.position.x,
        mcLine[mcLine.length - 1][1] + mapObjects.position.y,
        mcLine[mcLine.length - 1][2] + mapObjects.position.z
    ));
    sc.scene.add(new THREE.Line(geometry, material));
}

function setupNebula() {

    let smokeParticles = new THREE.Geometry();
    let smokeTexture = new THREE.TextureLoader().load("assets/textures/smoke.png"); 
    let smokeMaterial = new THREE.PointsMaterial({
        size: 60, 
        transparent: true, 
        opacity: 0.015,
        blending: THREE.AdditiveBlending,
        depthTest: THREE.NeverDepth,
        map: smokeTexture,
        color: 0x816EFF
    });
    smokePoints = new THREE.Points(smokeParticles, smokeMaterial);
    let smokeGeometry = new THREE.BufferGeometry();
    let smokePositions = [];

    let particles = new THREE.Geometry();
    let starTexture = new THREE.TextureLoader().load("assets/textures/TEST-blue_star-01.png");
    let particleMaterial = new THREE.PointsMaterial({
        size: 20, 
        transparent: true, 
        blending: THREE.AdditiveBlending,
        depthTest: THREE.NeverDepth,
        map: starTexture
    });
    nebulaPoints = new THREE.Points(particles, particleMaterial);
    let particleGeometry = new THREE.BufferGeometry();
    let positions = [];

    for(let pleiadesSystem of pleiadesSystems) {
        let coords = pleiadesSystem.coordinates.split(" / ");
        positions.push(
            Number(coords[0]) + mapObjects.position.x,
            Number(coords[1]) + mapObjects.position.y,
            Number(coords[2]) + mapObjects.position.z
        );
        for(let i = 0; i < 20; i++)
            smokePositions.push(
                Number(coords[0]) + mapObjects.position.x + (-10 + (Math.random() * 20)),
                Number(coords[1]) + mapObjects.position.y + (-10 + (Math.random() * 20)),
                Number(coords[2]) + mapObjects.position.z + (-10 + (Math.random() * 20))
            );

    }

    particleGeometry.addAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    // particleGeometry.addAttribute("color", new THREE.Float32BufferAttribute(imageColors, 3));
    particleGeometry.computeBoundingSphere();

    nebulaPoints.geometry = particleGeometry;
    nebulaPoints.geometry.verticesNeedUpdate = true;

    smokeGeometry.addAttribute("position", new THREE.Float32BufferAttribute(smokePositions, 3));
    // particleGeometry.addAttribute('color', new THREE.Float32BufferAttribute(imageColors, 3));
    smokeGeometry.computeBoundingSphere();

    smokePoints.geometry = smokeGeometry;
    smokePoints.geometry.verticesNeedUpdate = true;

    sc.scene.add(nebulaPoints, smokePoints);
}

function setupEvents() {
    window.addEventListener("resize", onWindowResize);
    window.addEventListener("keydown", (event) => {
        switch(event.keyCode) {
            case 77: am.mute(); break; // M
            case 80: pause(); break;    // P
        }
    });
}

function onWindowResize() {
    sc.camera.aspect = window.innerWidth / window.innerHeight;
    sc.camera.updateProjectionMatrix();
    sc.renderer.setSize(window.innerWidth, window.innerHeight);
    hud.resize();
}