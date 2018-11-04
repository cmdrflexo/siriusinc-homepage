var HUDElement = class {
    constructor(camera, target) {
        this.camera = camera;
        this.target = target;
        this.offset = {x: 0, y: 0};
        this.screenGroup;
        this.object;
        this.boundingBoxCorners;
        this.overlapElements;
        // ///
        this.drawBoundingBox = false;
        this.once = true;
        this.bbMat = new THREE.LineBasicMaterial({color: 0x00ff00});
        this.bbGeo = new THREE.Geometry();
        this.bbObject = new THREE.Line(this.bbGeo, this.bbMat);
        // ///
    }

    update() {
        if(this.target) {
            let pos = this.targetScreenPosition();
            this.object.position.set(pos.x + this.offset.x, pos.y + this.offset.y, 0);
        }
        if(this.overlapElements) this.checkOverlap();
    }

    checkOverlap() {
        let objPos = this.object.position;
        let bb = this.object.geometry.boundingBox;
        this.boundingBoxCorners = [
            new THREE.Vector3(objPos.x,            objPos.y,            0),
            new THREE.Vector3(objPos.x,            objPos.y + bb.max.y, 0),
            new THREE.Vector3(objPos.x + bb.max.x, objPos.y + bb.max.y, 0),
            new THREE.Vector3(objPos.x + bb.max.x, objPos.y,            0)
        ]; 
        if(this.drawBoundingBox) {
            this.bbObject.geometry = new THREE.Geometry();
            for(let i = 0; i < this.boundingBoxCorners.length; i++)
                this.bbObject.geometry.vertices.push(this.boundingBoxCorners[i]);
            this.bbObject.geometry.vertices.push(this.bbObject.geometry.vertices[0]);
            this.bbObject.geometry.verticesNeedUpdate = true;
            if(this.once) {
                this.screenGroup.add(this.bbObject);
                this.once = false;
            }
        }
        let overlap = false;
        for(let element of this.overlapElements) {
            if(element.boundingBoxCorners)
                if(this.boundingBoxOverlap(element.boundingBoxCorners, this.boundingBoxCorners)){
                    let cameraPos = this.camera.getWorldPosition(new THREE.Vector3());
                    let pos = this.target.getWorldPosition(new THREE.Vector3());
                    let elementPos = element.target.getWorldPosition(new THREE.Vector3());
                    // let cameraPos = new THREE.Vector3(
                    //     this.camera.position.x, this.camera.position.y, this.camera.position.z
                    // );
                    // let pos = new THREE.Vector3(
                    //     this.target.position.x, this.target.position.y, this.target.position.z
                    // );
                    // let elementPos = new THREE.Vector3(
                    //     element.target.position.x, element.target.position.y, element.target.position.z
                    // );
                    if(cameraPos.distanceTo(pos) > cameraPos.distanceTo(elementPos)) {
                        overlap = true;
                        break;
                    }
                }
        }
        this.object.visible = !overlap;
        // this.object.material.color = overlap ? new THREE.Color(1, 0, 0) : new THREE.Color(1, 1, 1);
    }

    boundingBoxOverlap(cornersA, cornersB) {
        let withinVertical = 
            (cornersA[0].x > cornersB[0].x && cornersA[0].x < cornersB[2].x) || 
            (cornersA[2].x > cornersB[0].x && cornersA[2].x < cornersB[2].x) ||
            (cornersA[0].x < cornersB[0].x && cornersA[2].x > cornersB[2].x);
        let withinHorizontal = 
            (cornersA[0].y > cornersB[0].y && cornersA[0].y < cornersB[2].y) ||
            (cornersA[2].y > cornersB[0].y && cornersA[2].y < cornersB[2].y) ||
            (cornersA[0].y < cornersB[0].y && cornersA[2].y > cornersB[2].y);
        return withinVertical && withinHorizontal;
    }

    targetScreenPosition() {
        var vector = new THREE.Vector3();
        var widthHalf = 0.5 * window.innerWidth;
        var heightHalf = 0.5 * window.innerHeight;
        this.target.updateMatrixWorld();
        vector.setFromMatrixPosition(this.target.matrixWorld);
        vector.project(this.camera);
        vector.x = (vector.x * widthHalf) + widthHalf;
        vector.y = -(vector.y * heightHalf) + heightHalf;
        return {x: vector.x, y: window.innerHeight - vector.y};
    }
}