
const NebulaEngine = class {
    constructor() {
        this.textures = {
            smoke: new THREE.TextureLoader().load("assets/textures/smoke.png"),
            star:  new THREE.TextureLoader().load("assets/textures/TEST-blue_star-01.png")
        };
        this.TESTPleiades();
    }

    TESTPleiades() {
        let pleiadesStars  = new ParticleObject(20, this.textures.star);
        let pleiadesGas = new ParticleObject(60, this.textures.smoke, 0x816EFF, 0.015);
        let starPositions = [];
        let gasPositions = [];
        for(let pleiadesSystem of db.pleiadesSystems) {
            let coords = pleiadesSystem.coordinates.split(" / ");
            starPositions.push(Number(coords[0]), Number(coords[1]), Number(coords[2]));
            for(let i = 0; i < 20; i++)
                gasPositions.push(
                    Number(coords[0]) + (-10 + (Math.random() * 20)),
                    Number(coords[1]) + (-10 + (Math.random() * 20)),
                    Number(coords[2]) + (-10 + (Math.random() * 20))
                );
        }
        pleiadesStars.addPositions(starPositions);
        pleiadesGas.addPositions(gasPositions);
        sc.scene.add(pleiadesStars.particles, pleiadesGas.particles);
    }
}

const ParticleObject = class {
    constructor(size, texture, color = 0xffffff, opacity = 1, transparent = true) {
        this.particles = new THREE.Points(
            new THREE.BufferGeometry(),
            new THREE.PointsMaterial({
                size: size,
                transparent: transparent, 
                opacity: opacity,
                blending: THREE.AdditiveBlending,
                depthTest: THREE.NeverDepth,
                map: texture,
                color: color
            })
        );
    }

    addPositions(positions) {
        this.particles.geometry.addAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        this.particles.geometry.computeBoundingSphere();
        this.particles.geometry.verticesNeedUpdate = true;
    }
}
