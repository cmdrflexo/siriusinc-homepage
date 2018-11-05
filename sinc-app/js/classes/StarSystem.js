/*
 * Star System
 */

StarSystem = class {
    constructor(systemInfo) {
        this.allegiance;
        this.bodies;
        this.controllingFaction;
        this.coordinates;
        this.dot;
        this.economies;
        this.factions;
        this.government;
        this.lastUpdated;
        this.line;
        this.lineEnd;
        this.name;
        this.mapObject = new THREE.Group();
        this.permit;
        this.population;
        this.powers;
        this.powerState;
        this.reserve;
        this.security;
        this.starMesh;
        this.state;
        this.color = systemInfo.color;
        this.setup(systemInfo);
    }

    setup(systemInfo) {
        let coords = systemInfo.coordinates.split(" / ");
        this.coordinates = new THREE.Vector3(
            Number(coords[0]), Number(coords[1]), Number(coords[2])
        );
    }

    update() {
        // this.updateLine();
    }

    // updateLine() {
    //     this.lineEnd.y = -this.mapObject.getWorldPosition(new THREE.Vector3()).y;
    //     this.line.geometry.verticesNeedUpdate = true;
    //     this.dot.position.y = this.lineEnd.y;
    // }

    createMapObject() {
        let size = this.color == "white" ? 1 : 1.5;
        this.starMesh = new THREE.Mesh(
            new THREE.SphereGeometry(size, 16, 8),
            new THREE.MeshBasicMaterial({color: this.color})
        );
        let lineGeometry = new THREE.Geometry();
        lineGeometry.vertices.push(new THREE.Vector3());
        lineGeometry.vertices.push(new THREE.Vector3());
        this.lineEnd = lineGeometry.vertices[1];
        this.line = new THREE.Line(
            lineGeometry,
            new THREE.LineBasicMaterial({color: 0x333333})
        );
        this.dot = new THREE.Mesh(
            new THREE.CylinderGeometry(0.5, 0.5, 0.001, 16),
            new THREE.MeshBasicMaterial({color: 0x334455})
        );
        this.mapObject.add(this.starMesh, this.line, this.dot);
    }
}
