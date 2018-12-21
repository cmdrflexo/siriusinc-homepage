
const FakeServer = class {
    constructor() {
        //
    }

    getStarSystemInfo(starSystemName) {
        
        for(let sincSystem of db.sincSystems) {
            // console.log(starSystemName + " <-> " + sincSystem.name);
            if(starSystemName == sincSystem.name) return sincSystem;
        }
    }
}
