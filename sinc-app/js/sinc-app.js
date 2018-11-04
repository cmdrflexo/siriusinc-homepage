/*
 *  Sirius Inc Three.js App
 */

// const server = new ServerConnection.ServerConnection();

let clock = new THREE.Clock();

const sc = new SceneController(update);
const hud = new CameraHUD(sc.renderer, sc.camera);

// let scene = new THREE.Scene();
// let renderer, camera, controls;
// let lighting;

let axesHelper;
let grid;

let starSystems = [];
var mapObjects = new THREE.Group();
let nebulaObjects = new THREE.Group();

let mcLine = [];

start();

function start() {
    clock.start();
    setupCamera();
    setupObjects();    
    window.addEventListener("resize", onWindowResize);
}

function update() {
    let deltaTime = clock.getDelta();
    controls.update();
    axesHelper.position.set(controls.target.x, controls.target.y, controls.target.z);
    sc.renderer.render(sc.scene, sc.camera);
    hud.update();
    // hud.update(toScreenPosition(mapObjects.children[0], sc.camera));
}

function toScreenPosition(obj, camera)
{
    var vector = new THREE.Vector3();

    var widthHalf = 0.5 * window.innerWidth;
    var heightHalf = 0.5 * window.innerHeight;

    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);

    vector.x = (vector.x * widthHalf) + widthHalf;
    vector.y = -(vector.y * heightHalf) + heightHalf;

    return {x: vector.x, y: window.innerHeight - vector.y};

};

function setupCamera() {
    sc.camera.position.z = 250;
    controls = new THREE.OrbitControls(sc.camera);
}

function setupObjects() {
    setupCursor();
    setupGrid();
    setupMapObjects();
    setupNebula();
    // hud.createDot();
    // let dot = new HUDElement(sc.camera, mapObjects.children[0]);
    // hud.createHUDElement(dot);
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
        new THREE.PlaneGeometry(10000, 10000),
        new THREE.MeshBasicMaterial({
            color: 0xffffff, 
            transparent: true, opacity: 0.025, 
            side: THREE.DoubleSide
        })
    );
    plane.rotation.x = -Math.PI * 0.5;
    sc.scene.add(plane);
}

function setupMapObjects() {
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
            case "42 n persei":                index = 3; break;
            case "pleiades sector jc-v d2-62": index = 4; break;
            // case "hip 17044":                  index = 5; break;
            case "hip 17044":
                index = 5;
                mapObjects.position.set(
                    -starSystem.coordinates.x, 
                    -starSystem.coordinates.y,
                    -starSystem.coordinates.z
                );
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
        
        // ///
        // let fontLoader = new THREE.FontLoader();
        // fontLoader.load(
        //     "assets/fonts/helvetiker_regular.typeface.json",
        //     (font) => {
        //         let letterGeo = new THREE.TextGeometry(sincSystem.name, {
        //             font: font, size: 1.5, height: 0, curveSegments: 2
        //         });
        //         letterGeo.computeBoundingBox();
        //         let offset = -0.5 * (letterGeo.boundingBox.max.x - letterGeo.boundingBox.min.x);
        //         let letterMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
        //         let keyLetter = new THREE.Mesh(letterGeo, letterMaterial);
        //         keyLetter.position.set(
        //             offset + starSystem.coordinates.x,
        //             starSystem.coordinates.y + 5,
        //             starSystem.coordinates.z
        //         );
        //         mapObjects.add(keyLetter);
        //     }
        // );

        hud.createHUDElement(new HUDElement(sc.camera, starSystem.mapObject));
        // ///
    }
    drawChain();
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

    let particles = new THREE.Geometry();
    let starTexture = new THREE.TextureLoader().load("assets/textures/TEST-blue_star-01.png");
    let particleMaterial = new THREE.PointsMaterial({
        size: 20, 
        transparent: true, 
        blending: THREE.AdditiveBlending,
        depthTest: THREE.NeverDepth,
        map: starTexture
    });
    nebulaObjects = new THREE.Points(particles, particleMaterial);

    let particleGeometry = new THREE.BufferGeometry();
    let positions = [];

    for(let pleiadesSystem of pleiadesSystems) {
        let coords = pleiadesSystem.coordinates.split(" / ");
        positions.push(
            Number(coords[0]) + mapObjects.position.x,
            Number(coords[1]) + mapObjects.position.y,
            Number(coords[2]) + mapObjects.position.z
        );

    }

    particleGeometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    // particleGeometry.addAttribute('color', new THREE.Float32BufferAttribute(imageColors, 3));
    particleGeometry.computeBoundingSphere();

    nebulaObjects.geometry = particleGeometry;
    nebulaObjects.geometry.verticesNeedUpdate = true;
    // particleSystem.material = particleMaterial;

    sc.scene.add(nebulaObjects);
}

function onWindowResize() {
    sc.camera.aspect = window.innerWidth / window.innerHeight;
    sc.camera.updateProjectionMatrix();
    sc.renderer.setSize(window.innerWidth, window.innerHeight);
    hud.resize();
}