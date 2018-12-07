
const Cursor = class {
    constructor(scene, targetPosition) {
        this.cursor = new THREE.AxesHelper(3);
        this.scene = scene;
        this.targetPosition = targetPosition;
        this.setup();
    }

    setup() {
        this.scene.add(this.cursor);
    }

    update() {
        this.cursor.position.set(
            this.targetPosition.x, 
            this.targetPosition.y, 
            this.targetPosition.z
        );
    }
}