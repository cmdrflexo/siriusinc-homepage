
const CameraHUD = class {
    constructor(renderer, camera) {
        this.renderer = renderer;
        this.scene = new THREE.Scene();
        this.camera = camera;
        this.screenGroup = new THREE.Group();
        this.depth = this.getDepth();
        this.elements = [];
        this.hudPlane;
        this.setup();
    }

    setup() {
        this.screenGroup.position.set(
            -window.innerWidth * 0.5, 
            -window.innerHeight * 0.5, this.getDepth()
        );
        this.scene.add(this.screenGroup);
        this.camera.add(this.scene);
        this.createHUDPlane();
        // this.createDot();
    }

    update(deltaTime) {
        this.updateElements(deltaTime);
        this.renderer.clearDepth();
        this.renderer.render(this.scene, this.camera);
        // this.updateHUDElements(pos.x, pos.y);
    }

    createHUDPlane() {
        let gridTexture = new THREE.TextureLoader().load("assets/textures/2D-grid-128.png");
        gridTexture.wrapS = gridTexture.wrapT = THREE.RepeatWrapping;
        this.hudPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(1),
            new THREE.MeshBasicMaterial({
                color: "white",
                transparent: true,
                opacity: 0.05,
                map: gridTexture,
            })
        );
        this.hudPlane.material.map.repeat.set(
            window.innerWidth / 64,
            window.innerHeight / 64
        );
        this.hudPlane.material.needsUpdate = this.hudPlane.geometry.uvsNeedUpdate = true;
        this.hudPlane.position.set(window.innerWidth * 0.5, window.innerHeight * 0.5, 0);
        this.hudPlane.scale.set(window.innerWidth, window.innerHeight, 1);
        this.screenGroup.add(this.hudPlane);
    }

    createElement(element) {
        // element.object = new THREE.Mesh(
        //     new THREE.SphereGeometry(5, 16, 8),
        //     new THREE.MeshBasicMaterial({color: 0xff00ff})
        // );
        element.screenGroup = this.screenGroup;
        this.screenGroup.add(element.object);
        this.elements.push(element);
    }

    updateElements(deltaTime) {
        for(let element of this.elements) element.update(deltaTime);
    }
    
    resize() {
        // this.hudPlane.scale.set(window.innerWidth, window.innerHeight, 1);
        this.depth = this.getDepth();
        this.screenGroup.position.set(-window.innerWidth * 0.5, -window.innerHeight * 0.5, this.depth);
    }

    getDepth() {
        let hyp = window.innerHeight / 2 / Math.sin(this.camera.fov * Math.PI / 360);
        return -Math.sqrt(hyp * hyp - window.innerHeight * window.innerHeight * 0.25);
    }
}