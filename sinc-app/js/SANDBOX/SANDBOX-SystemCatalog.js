/*
MC1   - ARIETIS SECTOR XE-Z B4
MC2   - HYADES SECTOR AB-W B2-2
MC3   - 42 N PERSEI
MC4   - PLEIADES SECTOR JC-V D2-62
MC4.5 - HIP 17044
MC5   - PLEIADES SECTOR HR-W D1-57
*/

var sincSystems =[
    {
        name:"42 n Persei",
        copStatus:"control",
        coordinates:"-83.5625 / -73.40625 / -244.34375",
        color:"white"
    },
    {
        name:"Arietis Sector BV-Y c7",
        copStatus:"control",
        coordinates:"-61.8125 / -27.65625 / -160.71875",
        color:"white"
    },
    {
        name:"Arietis Sector XE-Z b4",
        copStatus:"control",
        coordinates:"-98.78125 / -54.03125 / -199.6875",
        color:"white"
    },
    {
        name:"Arietis Sector YZ-Y c4",
        copStatus:"control",
        coordinates:"-97.3125 / -15 / -149.125",
        color:"white"
    },
    {
        name:"Ch'ortamaye",
        copStatus:"control",
        coordinates:"-107.40625 / 11.875 / -149.59375",
        color:"white"
    },
    {
        name:"Daik",
        copStatus:"present",
        coordinates:"-69.0625 / -22.375 / -148.09375",
        color:"white"
    },
    {
        name:"Hyades Sector AB-W b2-2",
        copStatus:"control",
        coordinates:"-91.65625 / -62.53125 / -224.5",
        color:"white"
    },
    {
        name:"Hyades Sector DR-V c2-13",
        copStatus:"control",
        coordinates:"-92.46875 / 2.21875 / -176.875",
        color:"white"
    },
    {
        name:"Hyades Sector DR-V c2-3",
        copStatus:"present",
        coordinates:"-82.625 / 6.6875 / -180.15625",
        color:"white"
    },
    {
        name:"Hyades Sector HI-R b5-0",
        copStatus:"control",
        coordinates:"-81.03125 / -1.71875 / -164.8125",
        color:"white"
    },
    // {
    //     name:"HIP 15205",
    //     copStatus:"present",
    //     coordinates:"-71.0625 / -54.625 / -146.4375",
    //     color:"white"
    // },
    {
        name:"HIP 16591",
        copStatus:"control",
        coordinates:"-77.84375 / -39.8125 / -160.59375",
        color:"white"
    },
    {
        name:"HIP 16813",
        copStatus:"control",
        coordinates:"-57.03125 / -143.375 / -268.28125",
        color:"white"
    },
    {
        name:"HIP 17044",
        copStatus:"control",
        coordinates:"-74.25 / -129.53125 / -283.15625",
        color:"orange"
    },
    {
        name:"HIP 17412",
        copStatus:"present",
        coordinates:"-71.25 / -41.59375 / -167.625",
        color:"white"
    },
    {
        name:"HIP 17655",
        copStatus:"control",
        coordinates:"-83.40625 / -32.90625 / -178.375",
        color:"white"
    },
    {
        name:"HIP 17675",
        copStatus:"control",
        coordinates:"-96.84375 / -5.78125 / -159.78125",
        color:"white"
    },
    {
        name:"HIP 17706",
        copStatus:"control",
        coordinates:"-93.375 / 0.03125 / -146.125",
        color:"white"
    },
    {
        name:"HIP 18218",
        copStatus:"control",
        coordinates:"-88.71875 / 0.1875 / -145.09375",
        color:"white"
    },
    {
        name:"HIP 18518",
        copStatus:"control",
        coordinates:"-61.5625 / -39.15625 / -169.90625",
        color:"white"
    },
    {
        name:"HIP 20541",
        copStatus:"present",
        coordinates:"-99.1875 / 12.09375 / -184.4375",
        color:"white"
    },
    {
        name:"Hsie",
        copStatus:"control",
        coordinates:"-84.40625 / -16.6875 / -147.96875",
        color:"white"
    },
    {
        name:"Iapodes",
        copStatus:"control",
        coordinates:"-97.125 / -11.78125 / -171.28125",
        color:"white"
    },
    {
        name:"Irandan",
        copStatus:"control",
        coordinates:"-86.375 / -12.40625 / -125.0625",
        color:"orange"
    },
    {
        name:"Liu Beni",
        copStatus:"control",
        coordinates:"-96.09375 / -11.21875 / -135.25",
        color:"white"
    },
    {
        name:"Ngalia",
        copStatus:"control",
        coordinates:"-74.625 / -35.03125 / -165.96875",
        color:"orange"
    },
    {
        name:"Pic Tok",
        copStatus:"control",
        coordinates:"-81.46875 / -22.875 / -160.84375",
        color:"white"
    },
    {
        name:"Pleiades Sector HR-W d1-57",
        copStatus:"control",
        coordinates:"-86.40625 / -125.15625 / -301.84375",
        color:"white"
    },
    {
        name:"Pleiades Sector JC-V d2-62",
        copStatus:"control",
        coordinates:"-82.1875 / -100.9375 / -260.59375",
        color:"white"
    },
    {
        name:"Pleiades Sector KC-V c2-4",
        copStatus:"present",
        coordinates:"-88.8125 / -148.71875 / -321.1875",
        color:"white"
    },
    {
        name:"San",
        copStatus:"control",
        coordinates:"-96.0625 / -24.6875 / -175.28125",
        color:"orange"
    },
    {
        name:"Yen K'an",
        copStatus:"control",
        coordinates:"-90.375 / 2.4375 / -179.75",
        color:"white"
    },
    {
        name:"Yuracani",
        copStatus:"control",
        coordinates:"-74.9375 / -40.25 / -169.03125",
        color:"white"
    }
];

var pleiadesSystems = [
    {
		name: "Alcyone",
        coordinates: "-82.9375 / -156.78125 / -362.09375",
        color:     "blue"
    },
    {
        name: "Atlas",
        coordinates: "-76.71875 / -147.34375 / -344.4375",
        color:     "blue"
    },
    {
        name: "Electra",
        coordinates: "-86.0625 / -159.9375 / -361.65625",
        color:     "blue"
    },
    {
        name: "Maia",
        coordinates: "-81.78125 / -149.4375 / -343.375",
        color:     "blue"
    },
    {
        name: "Merope",
        coordinates: "-78.59375 / -149.625 / -340.53125",
        color:     "blue"
    },
    {
        name: "Taygeta",
        coordinates: "-88.5 / -159.6875 / -366.28125",
        color:     "blue"
    },
    {
        name: "Pleione",
        coordinates: "-77 / -146.78125 / -344.125",
        color:     "blue"
    },
    {
        name: "Celaeno",
        coordinates: "-81.09375 / -148.3125 / -337.09375",
        color:     "blue"
    },
    {
        name: "Sterope II",
        coordinates: "-81.65625 / -147.28125 / -340.84375",
        color:     "blue"
    },
    {
        name: "Asterope",
        coordinates: "-80.15625 / -144.09375 / -333.375",
        color:     "blue"
    }
];