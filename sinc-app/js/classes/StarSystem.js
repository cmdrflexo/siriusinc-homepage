/*
 * Star System
 */

const StarSystem = class {
    constructor(galaxy, systemInfo) {
        this.lastUpdated;

        this.allegiance;
        this.bodies;
        this.controllingFaction;
        this.economies;
        this.factions;
        this.government;
        this.permit;
        this.population;
        this.powers;
        this.powerState;
        this.reserve;
        this.security;
        this.state;

        this.galaxy = galaxy;
        this.coordinates;
        this.dot;
        this.line;
        // this.lineEnd;
        this.name;
        this.mapObject = new THREE.Group();
        this.starMesh;
        this.color = systemInfo.color;
        this.distScale;
        this.positionUpdate = true;
        this.setup(systemInfo);
    }

    setup(systemInfo) {
        this.name = this.mapObject.name = systemInfo.name;
        let coords = systemInfo.coordinates.split(" / ");
        this.coordinates = new THREE.Vector3(
            Number(coords[0]), Number(coords[1]), Number(coords[2])
        );        
    }

    startUpdate() {
        setInterval(() => {this.update()}, 0, clock.getDelta());
    }

    update(deltaTime) {
        if(this.positionUpdate) {
            let c = {x: this.mapObject.position.x, y: this.mapObject.position.y, z: this.mapObject.position.z};
            // let coords = this.getRelativePosition();
            let coords = this.getRelativeLogPosition();
            new TWEEN.Tween(c)
                .to(coords, 2000)
                .easing(TWEEN.Easing.Quartic.InOut)
                .onUpdate( () => {
                    this.mapObject.position.set(c.x, c.y, c.z);
                }).start();
            this.positionUpdate = false;
        }
        this.updateLine();
    }

    updateLine() {
        this.line.geometry.vertices[1].y = -this.mapObject.position.y;
        this.line.geometry.vertices[2].set(
            -this.mapObject.position.x, -this.mapObject.position.y, -this.mapObject.position.z
        );
        this.line.geometry.verticesNeedUpdate = true;
        this.dot.position.y = this.line.geometry.vertices[1];
    }

    createMapObject() {
        let size = this.color == "white" ? 0.5 : 0.75;
        // this.starMesh = new THREE.Mesh(
        //     new THREE.SphereGeometry(size, 16, 8),
        //     new THREE.MeshBasicMaterial({color: this.color})
        // );

        // var spriteMap = new THREE.TextureLoader().load("assets/textures/sprite001.png");
        // var spriteMaterial = new THREE.SpriteMaterial({map: spriteMap, color: this.color});
        // this.starMesh = new THREE.Sprite(spriteMaterial);
        // this.starMesh.scale.set(2, 2, 2);

        let lineGeometry = new THREE.Geometry();
        lineGeometry.vertices.push(new THREE.Vector3());
        lineGeometry.vertices.push(new THREE.Vector3());
        lineGeometry.vertices.push(new THREE.Vector3());
        // this.lineEnd = lineGeometry.vertices[1];
        this.line = new THREE.Line(
            lineGeometry,
            new THREE.LineBasicMaterial({color: 0x304454})
        );
        this.dot = new THREE.Mesh(
            new THREE.CylinderGeometry(0.25, 0.25, 0.001, 16),
            new THREE.MeshBasicMaterial({color: 0x334455})
        );
        this.mapObject.add(this.line, this.dot);
        // this.createRing();
        setTimeout(() => {
            this.createNametag();
        }, 2000);
    }

    createRing() {
        // // Rings
        // let ringGeometry = new THREE.Geometry();
        // let step = 360 / 128;
        // for(let i = 0; i < 129; i++) {
        //     let p = THREE.Math.degToRad(step * i);
        //     ringGeometry.vertices.push(new THREE.Vector3(
        //         scale * dist * Math.cos(p), 0, 
        //         scale * dist * Math.sin(p)
        //     ));
        //     // if(i % 10 == 0) console.log(new THREE.Vector3(
        //     //     dist * Math.cos(p), 0, dist * Math.sin(p)
        //     // ));
        // }
        // // ringGeometry.vertices.push(new THREE.Vector3(
        // //     scale * dist * Math.cos(p), 0, 
        // //     scale * dist * Math.sin(p)
        // // ));
        // let ring = new THREE.Line(
        //     ringGeometry,
        //     new THREE.LineBasicMaterial({color: 0x223344})
        // );
        // ring.name = "ring";
        // this.scene.add(ring);
    }

    createNametag() {
        let textSize = 15;
        let letterGeo = new THREE.TextGeometry(this.name, {
            font: font.fonts[0], size: textSize, height: 0, curveSegments: 2
        });
        letterGeo.computeBoundingBox();
        let xOffset = 35; //15
        let yOffset = -0.5 * letterGeo.boundingBox.max.y;
        
        let letterMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true});
        let nametag = new THREE.Mesh(letterGeo, letterMaterial);

        let hudElement = new HUDElement(sc.camera, this.mapObject);
        // if(this.name == "San" ||
        //    this.name == "Pic Tok" ||
        //    this.name == "Ngalia") {
        //     let arrow = new THREE.Mesh(
        //         new THREE.CylinderGeometry(20, 0, 8, 8),
        //         new THREE.MeshBasicMaterial({
        //             color: "magenta", transparent: true
        //         })
        //     );
        //     arrow.position.set(-xOffset, 50, 0);
        //     arrow.scale.y = 5;
        //     nametag.add(arrow);
        // }
        hudElement.object = nametag;
        hudElement.offset = {x: xOffset, y: yOffset};
        
        hudElement.overlapElements = hud.elements;
        hud.createElement(hudElement);

        let spriteMap = new THREE.TextureLoader().load("assets/textures/ring.png");
        let spriteMaterial = new THREE.SpriteMaterial({map: spriteMap, color: this.color});
        let sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.set(-35, 12.5, 0);
        let spriteSize = 20;
        sprite.scale.set(spriteSize, spriteSize, spriteSize);
        hudElement.object.add(sprite);

        // OLD Nametags
        // let textSize = 10;
        // let letterGeo = new THREE.TextGeometry(sincSystem.name, {
        //     font: font.fonts[0], size: textSize, height: 0, curveSegments: 2
        // });
        // letterGeo.computeBoundingBox();
        // let xOffset = 15;
        // let yOffset = -0.5 * letterGeo.boundingBox.max.y;
        // let letterMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true});
        // let nametag = new THREE.Mesh(letterGeo, letterMaterial);
        // let hudElement = new HUDElement(sc.camera, starSystem.mapObject);
        // hudElement.offset = {x: xOffset, y: yOffset};
        // hudElement.object = nametag;
        // hudElement.overlapElements = hud.elements;
        // hud.createElement(hudElement);
    }

    getRelativePosition() {
        return new THREE.Vector3(
            this.coordinates.x - this.galaxy.focusOrigin.x,
            this.coordinates.y - this.galaxy.focusOrigin.y,
            this.coordinates.z - this.galaxy.focusOrigin.z
        );
    }

    getRelativeLogPosition() {
        let scale = 1 / Math.log10(this.galaxy.focusOrigin.distanceTo(new THREE.Vector3(
            this.coordinates.x, this.galaxy.focusOrigin.y, this.coordinates.z
        )));
        return new THREE.Vector3(
            (this.coordinates.x - this.galaxy.focusOrigin.x) * scale,
            (this.coordinates.y - this.galaxy.focusOrigin.y) * 0.25,
            (this.coordinates.z - this.galaxy.focusOrigin.z) * scale
        );
    }
}
