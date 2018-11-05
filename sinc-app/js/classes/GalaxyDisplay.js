
var GalaxyDisplay = class {
    constructor(scene) {
        this.scene = scene;
        this.starSystems = [];
        this.starSystemObjects = new THREE.Group();
        this.focusedSystem = "San";
        // this.focusedSystem = "42 n Persei";
        // this.focusedSystem = "HIP 17044";
        this.focusOrigin = new THREE.Vector3();
        this.setup();
    }

    setup() {
        this.scene.add(this.starSystemObjects);
    }

    update() {
        for(let starSystem of this.starSystems) {
            starSystem.lineEnd.y = -starSystem.mapObject.getWorldPosition(new THREE.Vector3()).y;
            starSystem.line.geometry.verticesNeedUpdate = true;
            starSystem.dot.position.y = starSystem.lineEnd.y;
        }
    }

    createStarSystems() {
        for(let sincSystem of sincSystems) {
            let starSystem = new StarSystem(sincSystem);
            if(sincSystem.name == this.focusedSystem) {
                this.focusOrigin = new THREE.Vector3(
                    starSystem.coordinates.x,
                    starSystem.coordinates.y,
                    starSystem.coordinates.z
                );
            }
            starSystem.mapObject.name = sincSystem.name;
            this.starSystems.push(starSystem);
            this.starSystemObjects.add(starSystem.mapObject);
            starSystem.createMapObject();
        }
        this.placeStarSystemObjects(this.starSystems);
    }

    placeStarSystemObjects(starSystems) {

        // /// Move lines into StarSystem
        let material = new THREE.LineBasicMaterial({color: 0x223344});
        let geometry = new THREE.Geometry();
        // ///

        let maxDist = 0;
        for(let starSystem of starSystems) {
            let dist = this.focusOrigin.distanceTo(new THREE.Vector3(
                starSystem.coordinates.x, this.focusOrigin.y, starSystem.coordinates.z
            ));
            if(dist > maxDist) maxDist = dist;
        }
        for(let starSystem of starSystems) {
            let dist = this.focusOrigin.distanceTo(new THREE.Vector3(
                starSystem.coordinates.x, this.focusOrigin.y, starSystem.coordinates.z
            ));
            let scale = 1 / Math.log10(dist);
            starSystem.mapObject.position.set(
                (starSystem.coordinates.x - this.focusOrigin.x) * scale,
                (starSystem.coordinates.y - this.focusOrigin.y) * 0.25, 
                (starSystem.coordinates.z - this.focusOrigin.z) * scale
            );

            // /// Move lines into StarSystem
            geometry.vertices.push(new THREE.Vector3());
            geometry.vertices.push(new THREE.Vector3(
                starSystem.mapObject.position.x, 0, starSystem.mapObject.position.z
            ));
            // ///
        }

        // /// Move lines into StarSystem
        this.scene.add(new THREE.Line(geometry, material));
        // ///
    }
}
