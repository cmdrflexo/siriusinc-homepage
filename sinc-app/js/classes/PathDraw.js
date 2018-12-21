
const PathDraw = class {
    constructor() {
        this.paths = [];
    }

    drawChain() {
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
}

const Path = class {
    constructor() {
        //
    }
}