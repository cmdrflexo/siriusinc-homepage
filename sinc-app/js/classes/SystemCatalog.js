/*
20    ARIETIS SECTOR XE-Z B4 (MC1)

22    HYADES SECTOR AB-W B2-2 (MC2)

24    42 N PERSEI (MC3)
25    IRANDAN (Tourism stations, also damaged by 'Goids)
26    PLEIADES SECTOR JC-V D2-62 (MC4)
27    HIP 17044 (MC 4.5)

29    PLEIADES SECTOR HR-W D1-57 (MC5)
30    HIP 16813 (The Rock)
*/

var sincSystems = [
    {
		name: "HIP 17044",
		coordinates: "-74.25 / -129.53125 / -283.15625",
        color: "orange"
	},
    {
		name: "HIP 16813",
		coordinates: "-57.03125 / -143.375 / -268.28125",
        color: "white"
	},
    {
		name: "Arietis Sector XE-Z b4",
		coordinates: "-98.78125 / -54.03125 / -199.6875",
        color: "white"
	},
    {
		name: "42 n Persei",
		coordinates: "-83.5625 / -73.40625 / -244.34375",
        color: "white"
	},
    {
		name: "Iapodes",
		coordinates: "-97.125 / -11.78125 / -171.28125",
        color: "white"
	},
    {
		name: "Pleiades Sector HR-W d1-57",
		coordinates: "-86.40625 / -125.15625 / -301.84375",
        color: "white"
	},
    {
		name: "Ch'ortamaye",
        coordinates: "-107.40625 / 11.875 / -149.59375",
        color: "white"
	},
    {
		name: "San",
        coordinates: "-96.0625 / -24.6875 / -175.28125",
        color: "orange"
	},
    {
		name: "HIP 17675",
		coordinates: "-96.84375 / -5.78125 / -159.78125",
        color: "white"
	},
    {
		name: "Arietis Sector YZ-Y c4",
		coordinates: "-97.3125 / -15 / -149.125",
        color: "white"
	},
    {
		name: "HIP 18518",
		coordinates: "-61.5625 / -39.15625 / -169.90625",
        color: "white"
	},
    {
		name: "Hyades Sector DR-V c2-13",
		coordinates: "-92.46875 / 2.21875 / -176.875",
        color: "white"
	},
    {
		name: "Hyades Sector AB-W b2-2",
		coordinates: "-91.65625 / -62.53125 / -224.5",
        color: "white"
	},
    {
		name: "Pleiades Sector JC-V d2-62",
		coordinates: "-82.1875 / -100.9375 / -260.59375",
        color: "white"
	},
    {
		name: "Irandan",
		coordinates: "-86.375 / -12.40625 / -125.0625",
        color: "orange"
	},
    {
		name: "Hyades Sector HI-R b5-0",
		coordinates: "-81.03125 / -1.71875 / -164.8125",
        color: "white"
	},
    {
		name: "HIP 17412",
		coordinates: "-71.25 / -41.59375 / -167.625",
        color: "white"
	},
    {
		name: "Liu Beni",
		coordinates: "-96.09375 / -11.21875 / -135.25",
        color: "white"
	},
    {
		name: "Hsie",
		coordinates: "-84.40625 / -16.6875 / -147.96875",
        color: "white"
	},
    {
		name: "Ngalia",
		coordinates: "-74.625 / -35.03125 / -165.96875",
        color: "orange"
	},
    {
		name: "HIP 18218",
		coordinates: "-88.71875 / 0.1875 / -145.09375",
        color: "white"
	},
    {
		name: "Yuracani",
		coordinates: "-74.9375 / -40.25 / -169.03125",
        color: "white"
	},
    {
		name: "Yen K'an",
		coordinates: "-90.375 / 2.4375 / -179.75",
        color: "white"
	},
    {
		name: "Pic Tok",
		coordinates: "-81.46875 / -22.875 / -160.84375",
        color: "white"
	},
    {
		name: "HIP 16591",
		coordinates: "-77.84375 / -39.8125 / -160.59375",
        color: "white"
	},
    {
		name: "Arietis Sector BV-Y c7",
		coordinates: "-61.8125 / -27.65625 / -160.71875",
        color: "white"
	},
    {
		name: "HIP 17655",
		coordinates: "-83.40625 / -32.90625 / -178.375",
        color: "white"
	},
    {
		name: "HIP 17706",
		coordinates: "-93.375 / 0.03125 / -146.125",
        color: "white"
	},
    {
		name: "Hyades Sector DR-V c2-3",
		coordinates: "-82.625 / 6.6875 / -180.15625",
        color: "white"
	},
    {
		name: "Kongleri",
		coordinates: "-85.71875 / 1.3125 / -144.5",
        color: "white"
	},
    {
		name: "Daik",
		coordinates: "-69.0625 / -22.375 / -148.09375",
        color: "white"
	},
    {
		name: "HIP 15205",
		coordinates: "-71.0625 / -54.625 / -146.4375",
        color: "white"
    },
    {
		name: "Pleiades Sector KC-V c2-4",
		coordinates: "-88.8125 / -148.71875 / -321.1875",
        color: "white"
	}
];

var pleiadesSystems = [
    {
		name: "Alcyone",
        coordinates: "-82.9375 / -156.78125 / -362.09375",
        color: "blue"
    },
    {
        name: "Atlas",
        coordinates: "-76.71875 / -147.34375 / -344.4375",
        color: "blue"
    },
    {
        name: "Electra",
        coordinates: "-86.0625 / -159.9375 / -361.65625",
        color: "blue"
    },
    {
        name: "Maia",
        coordinates: "-81.78125 / -149.4375 / -343.375",
        color: "blue"
    },
    {
        name: "Merope",
        coordinates: "-78.59375 / -149.625 / -340.53125",
        color: "blue"
    },
    {
        name: "Taygeta",
        coordinates: "-88.5 / -159.6875 / -366.28125",
        color: "blue"
    },
    {
        name: "Pleione",
        coordinates: "-77 / -146.78125 / -344.125",
        color: "blue"
    },
    {
        name: "Celaeno",
        coordinates: "-81.09375 / -148.3125 / -337.09375",
        color: "blue"
    },
    {
        name: "Sterope II",
        coordinates: "-81.65625 / -147.28125 / -340.84375",
        color: "blue"
    },
    {
        name: "Asterope",
        coordinates: "-80.15625 / -144.09375 / -333.375",
        color: "blue"
    }
];