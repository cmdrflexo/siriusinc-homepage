
const LoadingScreen = class {
    constructor(hud) {
        this.hud = hud;
        this.group = new THREE.Group();
        this.background;
        this.image;
        this.barGroup = new THREE.Group();
        this.bar;
        this.timer = 0;
        this.setup();
    }

    setup() {
        this.group.visible = false;
        this.setupBackground();
        this.setupImage();
        this.setupBar();
        this.group.position.set(0, 50, 0);
        this.hud.screenGroup.add(this.group);
    }

    update(deltaTime) {
        this.timer += (this.timer * 0.05) + deltaTime;
        if(this.timer < 100) {
            this.group.visible = true;
            let scale = (512 / 100) * this.timer;
            this.bar.position.set(scale * 0.5, 0, 0);
            this.bar.scale.set(scale, 5, 1);
        } else {
            this.group.visible = false;
        }
    }

    setupBackground() {
        this.background = new THREE.Mesh(
            new THREE.PlaneGeometry(1),
            new THREE.MeshBasicMaterial({color: "black"})
        );
        this.background.position.set(window.innerWidth * 0.5, window.innerHeight * 0.5, 1);
        this.background.scale.set(window.innerWidth * 2, window.innerHeight * 2, 1);
        this.group.add(this.background);
    }

    setupImage() {
        this.image = new THREE.Sprite(
            new THREE.SpriteMaterial({
                map: new THREE.TextureLoader().load("assets/textures/sinc-white_on_black.png")
            })
        );
        this.image.position.set(window.innerWidth * 0.5, window.innerHeight * 0.5, 2);
        // this.image.position.set(10,0,0);
        this.image.scale.set(256, 256, 1);
        this.group.add(this.image);
    }

    setupBar() {
        this.bar = new THREE.Mesh(
            new THREE.PlaneGeometry(1),
            new THREE.MeshBasicMaterial({color: "white"})
        );
        this.bar.position.set(256, 0, 0);
        this.bar.scale.set(512, 10, 1);
        this.barGroup.position.set(window.innerWidth * 0.5 - 256, window.innerHeight * 0.5 - 200, 3);
        this.barGroup.add(this.bar);
        this.group.add(this.barGroup);
    }
}