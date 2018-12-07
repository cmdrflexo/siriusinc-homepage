const HUDElement = class {
    constructor(camera, target) {
        this.camera = camera;
        this.target = target;
        this.offset = {x: 0, y: 0};
        this.screenGroup;
        this.object;
        this.boundingBoxCorners;
        this.overlapPadding = 5;
        this.overlapElements;
        this.hidden = true;
        this.fadeMin = 0.1;
        this.fadeSpeed = 5;
    }

    update(deltaTime) {
        if(this.hidden || !this.targetOnScreen()) {
            if(this.object.material.opacity > this.fadeMin)
                this.object.material.opacity -= this.fadeSpeed * deltaTime;
        } else {
            if(this.object.material.opacity < 1)
                this.object.material.opacity += this.fadeSpeed * deltaTime;
        }
        if(this.target) {
            let pos = this.targetScreenPosition();
            this.object.position.set(pos.x + this.offset.x, pos.y + this.offset.y, 0);
        }
        if(this.overlapElements) this.checkOverlap();
    }

    targetOnScreen() {
        let hPadding = this.object.geometry.boundingBox.max.x + this.offset.x;
        let vPadding = this.object.geometry.boundingBox.max.y + this.offset.y;
        let targetScreenPos = this.targetScreenPosition();
        let onScreen = this.target && 
            targetScreenPos.x > hPadding && targetScreenPos.x < window.innerWidth - hPadding && 
            targetScreenPos.y > vPadding && targetScreenPos.y < window.innerHeight - vPadding;
        this.hidden = !onScreen;
        return onScreen;
    }

    checkOverlap() {
        this.boundingBoxCorners = [
            new THREE.Vector2(
                this.object.position.x - this.overlapPadding, 
                this.object.position.y - this.overlapPadding
            ),
            new THREE.Vector2(
                this.object.position.x + this.object.geometry.boundingBox.max.x + this.overlapPadding, 
                this.object.position.y + this.object.geometry.boundingBox.max.y + this.overlapPadding
            )
        ]; 
        let overlap = false;
        for(let element of this.overlapElements)
            if(!element.hidden && element.boundingBoxCorners && this.boundingBoxOverlap(element.boundingBoxCorners, this.boundingBoxCorners)){
                let cameraPos = this.camera.getWorldPosition(new THREE.Vector3());
                let pos = this.target.getWorldPosition(new THREE.Vector3());
                let elementPos = element.target.getWorldPosition(new THREE.Vector3());
                overlap = cameraPos.distanceTo(pos) > cameraPos.distanceTo(elementPos)
                if(overlap) break;
            }
        this.hidden = overlap;
    }

    boundingBoxOverlap(cornersA, cornersB) {
        let withinVertical = 
            (cornersA[0].x > cornersB[0].x && cornersA[0].x < cornersB[1].x) || 
            (cornersA[1].x > cornersB[0].x && cornersA[1].x < cornersB[1].x) ||
            (cornersA[0].x < cornersB[0].x && cornersA[1].x > cornersB[1].x);
        let withinHorizontal = 
            (cornersA[0].y > cornersB[0].y && cornersA[0].y < cornersB[1].y) ||
            (cornersA[1].y > cornersB[0].y && cornersA[1].y < cornersB[1].y) ||
            (cornersA[0].y < cornersB[0].y && cornersA[1].y > cornersB[1].y);
        return withinVertical && withinHorizontal;
    }

    targetScreenPosition() {
        let vector = new THREE.Vector3();
        let widthHalf = 0.5 * window.innerWidth;
        let heightHalf = 0.5 * window.innerHeight;
        this.target.updateMatrixWorld();
        vector.setFromMatrixPosition(this.target.matrixWorld);
        vector.project(this.camera);
        vector.x = (vector.x * widthHalf) + widthHalf;
        vector.y = -(vector.y * heightHalf) + heightHalf;
        return {x: vector.x, y: window.innerHeight - vector.y};
    }
}

// this.drawBoundingBox = false;
// this.once = true;
// this.bbMat = new THREE.LineBasicMaterial({color: 0x00ff00});
// this.bbGeo = new THREE.Geometry();
// this.bbObject = new THREE.Line(this.bbGeo, this.bbMat);
// if(this.drawBoundingBox) {
//     this.bbObject.geometry = new THREE.Geometry();
//     for(let i = 0; i < this.boundingBoxCorners.length; i++)
//         this.bbObject.geometry.vertices.push(this.boundingBoxCorners[i]);
//     this.bbObject.geometry.vertices.push(this.bbObject.geometry.vertices[0]);
//     this.bbObject.geometry.verticesNeedUpdate = true;
//     if(this.once) {
//         this.screenGroup.add(this.bbObject);
//         this.once = false;
//     }
// }
