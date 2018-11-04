
var SceneController = class {
    constructor(update) {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.camera = new THREE.PerspectiveCamera(
            45, window.innerWidth / window.innerHeight, 1, 10000
        );
        this.lighting = new THREE.Group();
        this.setupScene();
        this.setupRenderer(update);
        this.setupLighting();
    }

    setupScene() {
        this.renderer.autoClear = false;
        this.scene.fog = new THREE.Fog(0x00, 100, 1000);
        this.scene.add(this.camera, this.lighting);
    }

    setupRenderer(update) {
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.renderer.setAnimationLoop(update);
    }

    setupLighting() {
        let directionalLight = new THREE.DirectionalLight(0xffffff, 3);
        directionalLight.position.set(100, 100, 100);
        directionalLight.lookAt(new THREE.Vector3(0, 0, 0));
        this.lighting.add(directionalLight);
    }
}
