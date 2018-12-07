
const SceneController = class {
    constructor(animationLoop) {
        this.animationLoop = animationLoop;
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.camera = new THREE.PerspectiveCamera(
            45, window.innerWidth / window.innerHeight, 1, 100000
        );
        this.lighting = new THREE.Group();
        this.background;
        this.setup();
    }

    setup() {
        this.setupScene();
        this.setupRenderer();
        this.setupCamera();
        this.setupLighting();
        this.setupBackground();
    }

    update() {
        this.renderer.render(this.scene, this.camera);
        // if(this.background)
            this.background.position.set(
                this.camera.position.x, this.camera.position.y, this.camera.position.z
            );
    }

    setupScene() {
        this.renderer.autoClear = false;
        // this.scene.fog = new THREE.Fog(0x00, 100, 10000);
        this.scene.add(this.camera, this.lighting);
    }

    setupRenderer() {
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        let container = document.getElementById("testdiv");
        container.appendChild(this.renderer.domElement);
        document.getElementsByClassName("canvas").width = "100%";
        document.getElementsByClassName("canvas").height = "100%";
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setAnimationLoop(this.animationLoop);
    }

    setupCamera() {
        this.camera.position.set(110, 30, 0);
    }

    setupLighting() {
        let directionalLight = new THREE.DirectionalLight(0xffffff, 3);
        directionalLight.position.set(100, 100, 100);
        directionalLight.lookAt(new THREE.Vector3(0, 0, 0));
        this.lighting.add(directionalLight);
    }

    setupBackground() {
        this.background = new THREE.Mesh(
            new THREE.SphereGeometry(5000, 32, 16),
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load("./assets/textures/galaxy_darker_blur.png"), 
                side: THREE.BackSide
            })
        );
        this.background.rotation.y = -Math.PI * 0.5;
        this.scene.add(this.background);
    }
}
