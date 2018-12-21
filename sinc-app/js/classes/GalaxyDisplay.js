
const GalaxyDisplayLayer = class {
    constructor(name) {
        this.name = name;
        this.group = new THREE.Group();
    }
}

const GalaxyDisplay = class {
    constructor(scene) {
        this.layers = [];
        this.scene = scene;
        this.starSystems = [];
        this.starSystemObjects = new THREE.Group();
        this.focusOrigin = new THREE.Vector3(-96.0625, -24.6875, -175.28125); // San
        this.setup();
        // DEBUG
        // this.scene.add(new THREE.AxesHelper(10));
        this.dot = new THREE.Mesh(
            new THREE.SphereGeometry()
        );
    }

    setup() {
        this.scene.add(this.starSystemObjects);
    }

    update() {
        //
    }

    createStarSystemsLayer() {
        let starSystemsLayer = new GalaxyDisplayLayer("starsystems");

        let names = [];

        for(let sincSystem of db.sincSystems) names.push(sincSystem.name);
        this.starSystems = db.getStarSystems(this, names);
        
        for(let starSystem of this.starSystems) {
            starSystem.createMapObject();
            starSystemsLayer.group.add(starSystem.mapObject);
            starSystem.startUpdate();
        }

        this.layers.push(starSystemsLayer);
        sc.scene.add(starSystemsLayer.group);
    }
}
