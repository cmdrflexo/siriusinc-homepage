
var CameraHUD = class {
    constructor(renderer, camera) {
        this.renderer = renderer;
        this.scene = new THREE.Scene();
        this.camera = camera;
        this.group = new THREE.Group();
        this.depth = this.getDepth();
        this.hudElements = [];
        this.hudPlane;
        this.setup();
    }

    setup() {
        this.group.position.set(-window.innerWidth * 0.5, -window.innerHeight * 0.5, this.getDepth());
        this.scene.add(this.group);
        this.camera.add(this.scene);
        // this.createHUDPlane();
        // this.createDot();
    }

    update() {
        this.updateHUDElements();
        this.renderer.clearDepth();
        this.renderer.render(this.scene, this.camera);
        // this.updateHUDElements(pos.x, pos.y);
    }

    createHUDPlane() {
        this.hudPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(1),
            new THREE.MeshBasicMaterial({
                color: "black",
                transparent: true,
                opacity: 0.5
            })
        );
        this.hudPlane.scale.set(window.innerWidth, window.innerHeight, 1);
        this.group.add(this.hudPlane);
        this.planeWidth();
    }

    createHUDElement(hudElement) {
        hudElement.object = new THREE.Mesh(
            new THREE.SphereGeometry(5, 16, 8),
            new THREE.MeshBasicMaterial({color: 0xff00ff})
        );
        this.group.add(hudElement.object);
        this.hudElements.push(hudElement);
    }

    updateHUDElements() {
        for(let hudElement of this.hudElements) hudElement.update();
    }
    
    resize() {
        // this.hudPlane.scale.set(window.innerWidth, window.innerHeight, 1);
        this.depth = this.getDepth();
        this.group.position.set(-window.innerWidth * 0.5, -window.innerHeight * 0.5, this.depth);
    }

    getDepth() {
        let hyp = window.innerHeight / 2 / Math.sin(this.camera.fov * Math.PI / 360);
        return -Math.sqrt(hyp * hyp - window.innerHeight * window.innerHeight * 0.25);
    }
}