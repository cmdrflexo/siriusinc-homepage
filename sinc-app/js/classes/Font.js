
let Font = class {
    constructor() {
        this.loader = new THREE.FontLoader();
        this.fontFiles = {
            helvetikerRegular: "assets/fonts/helvetiker_regular.typeface.json"
        }
        this.fonts = [];
    }

    loadFont(fontFile, finished) {
        this.loader.load(
            fontFile, (loadedFont) => {
                this.fonts.push(loadedFont);
                finished();
            }
        );
    }
}