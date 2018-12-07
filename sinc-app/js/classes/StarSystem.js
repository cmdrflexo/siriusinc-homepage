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
        this.distScale;
        this.setup(systemInfo);
    }

    setup(systemInfo) {
        this.name = systemInfo.name;
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
        let size = this.color == "white" ? 0.5 : 0.75;
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
        // this.createRing();
        this.createNametag();
    }

    createRing() {
        /*
        Vector3[] GetEllipsePoints(int points, float major, float ecc) {
            Vector3[] ellipsePoints = new Vector3[points];
            float step = 360f/points;

            float focus = major*ecc;
            float minor = Mathf.Sqrt(major*major - focus*focus);

            for (int i = 0; i < ellipsePoints.Length; i++) {
                // Position
                Vector3 position = new Vector3(
                    major * Mathf.Cos(step*i*Mathf.Deg2Rad), 0, 
                    minor * Mathf.Sin(step*i*Mathf.Deg2Rad)
                );
                // Rotation
                rotation = RotatePointAroundPivot(position, Vector3.zero, Vector3.up * systemBodies[1].argumentOfPeriapsis);
                ellipsePoints[i] = RotatePointAroundPivot(rotation, Vector3.zero, Vector3.right * systemBodies[1].inclination);
            }
            return ellipsePoints;
        }
        */
    }

    createNametag() {
        let textSize = 15;
        let letterGeo = new THREE.TextGeometry(this.name, {
            font: font.fonts[0], size: textSize, height: 0, curveSegments: 2
        });
        letterGeo.computeBoundingBox();
        let xOffset = 15;
        let yOffset = -0.5 * letterGeo.boundingBox.max.y;
        
        let letterMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true});
        let nametag = new THREE.Mesh(letterGeo, letterMaterial);

        let hudElement = new HUDElement(sc.camera, this.mapObject);
        if(this.name == "San" ||
           this.name == "Pic Tok" ||
           this.name == "Ngalia") {
            let arrow = new THREE.Mesh(
                new THREE.CylinderGeometry(20, 0, 8, 8),
                new THREE.MeshBasicMaterial({
                    color: "magenta", transparent: true
                })
            );
            arrow.position.set(-xOffset, 50, 0);
            arrow.scale.y = 5;
            nametag.add(arrow);
        }
        hudElement.object = nametag;
        hudElement.offset = {x: xOffset, y: yOffset};
        
        hudElement.overlapElements = hud.elements;
        hud.createElement(hudElement);
    }
}
