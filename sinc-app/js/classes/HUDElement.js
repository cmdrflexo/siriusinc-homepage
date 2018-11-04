var HUDElement = class {
    constructor(camera, target) {
        this.camera = camera;
        this.object;
        this.target = target;
    }

    update() {
        if(this.target) {
            let pos = this.targetScreenPosition();
            // console.log(this.objectScreenPosition());
            this.object.position.set(pos.x, pos.y, 0);
        }
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