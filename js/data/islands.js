// One Piece Island Database
// locationAccuracy: "confirmed" | "approximate" | "unknown"
// spoiler: 0=East Blue, 1=Paradise, 2=New World, 3=everything

export const PLANET_RADIUS = 100;

export const ISLANDS = [
  // ========== EAST BLUE ==========
  { id:'foosha', name:'Foosha Village', region:'East Blue', type:'Village', climate:'Temperate', arc:'Romance Dawn', spoiler:0, lat:12, lon:85, accuracy:'approximate', importance:'high',
    desc:'Hometown of Monkey D. Luffy. A quiet coastal village at the edge of the East Blue.' },
  { id:'goa', name:'Goa Kingdom', region:'East Blue', type:'Kingdom', climate:'Temperate', arc:'Romance Dawn', spoiler:0, lat:18, lon:78, accuracy:'approximate', importance:'high',
    desc:'Kingdom where Luffy, Ace and Sabo grew up. Contains Windmill Village and the Gray Terminal.' },
  { id:'shells', name:'Shells Town', region:'East Blue', type:'Town', climate:'Temperate', arc:'Romance Dawn', spoiler:0, lat:8, lon:95, accuracy:'approximate', importance:'medium',
    desc:'Marine base town. Captain Morgan once ruled here. Where Zoro was imprisoned.' },
  { id:'orange', name:'Orange Town', region:'East Blue', type:'Town', climate:'Temperate', arc:'Orange Town', spoiler:0, lat:5, lon:105, accuracy:'approximate', importance:'medium',
    desc:'Town attacked by Buggy the Clown. Nami temporarily allied with the Straw Hats here.' },
  { id:'syrup', name:'Syrup Village', region:'East Blue', type:'Village', climate:'Temperate', arc:'Syrup Village', spoiler:0, lat:-2, lon:112, accuracy:'approximate', importance:'high',
    desc:'Hometown of Usopp. Home of Kaya and the fake Usopp Pirate crew.' },
  { id:'baratie', name:'Baratie', region:'East Blue', type:'Restaurant Ship', climate:'Oceanic', arc:'Baratie', spoiler:0, lat:-8, lon:118, accuracy:'approximate', importance:'high',
    desc:'Floating sea restaurant owned by Zeff. Where Sanji worked and joined the crew.' },
  { id:'cocoyasi', name:'Cocoyasi Village', region:'East Blue', type:'Village', climate:'Tropical', arc:'Arlong Park', spoiler:0, lat:-15, lon:125, accuracy:'approximate', importance:'high',
    desc:'Nami\'s hometown. Occupied for years by Arlong\'s fish-man pirates.' },
  { id:'arlong', name:'Arlong Park', region:'East Blue', type:'Pirate Base', climate:'Tropical', arc:'Arlong Park', spoiler:0, lat:-16, lon:128, accuracy:'approximate', importance:'high',
    desc:'Fortress of Arlong. Destroyed by Luffy\'s punch.' },
  { id:'loguetown', name:'Loguetown', region:'East Blue', type:'Town', climate:'Temperate', arc:'Loguetown', spoiler:0, lat:0, lon:140, accuracy:'approximate', importance:'high',
    desc:'"Town of the Beginning and the End". Birthplace and execution ground of Gol D. Roger.' },

  // ========== PARADISE (Grand Line first half) ==========
  { id:'reverse', name:'Reverse Mountain', region:'Grand Line', type:'Mountain', climate:'Extreme', arc:'Reverse Mountain', spoiler:1, lat:0, lon:0, accuracy:'confirmed', importance:'critical', altitude:0.07,
    desc:'Entrance to the Grand Line. Four rivers from the Blues flow upward into the mountain and join the Grand Line.' },
  { id:'twin', name:'Twin Cape', region:'Grand Line', type:'Cape', climate:'Temperate', arc:'Reverse Mountain', spoiler:1, lat:2, lon:6, accuracy:'confirmed', importance:'high',
    desc:'Where the giant whale Laboon waits for the Rumbar Pirates. Home of Crocus.' },
  { id:'whiskey', name:'Whiskey Peak', region:'Grand Line', type:'Island', climate:'Desert', arc:'Whiskey Peak', spoiler:1, lat:5, lon:18, accuracy:'approximate', importance:'medium',
    desc:'First island of the Grand Line. Inhabited by Baroque Works agents posing as a welcoming town.' },
  { id:'little', name:'Little Garden', region:'Grand Line', type:'Island', climate:'Prehistoric', arc:'Little Garden', spoiler:1, lat:8, lon:32, accuracy:'approximate', importance:'medium',
    desc:'Prehistoric island home to giants Dorry and Brogy, dinosaurs and ancient beasts.' },
  { id:'drum', name:'Drum Island', region:'Grand Line', type:'Island', climate:'Winter', arc:'Drum Island', spoiler:1, lat:22, lon:45, accuracy:'approximate', importance:'high',
    desc:'Snowy island and former kingdom of Wapol. Hometown of Tony Tony Chopper.' },
  { id:'alabasta', name:'Alabasta', region:'Grand Line', type:'Kingdom', climate:'Desert', arc:'Alabasta', spoiler:1, lat:-5, lon:58, accuracy:'confirmed', importance:'critical',
    desc:'Vast desert kingdom ruled by the Nefertari family. Capital city is Alubarna.' },
  { id:'jaya', name:'Jaya', region:'Grand Line', type:'Island', climate:'Tropical', arc:'Jaya', spoiler:1, lat:12, lon:72, accuracy:'approximate', importance:'high',
    desc:'Island connected to the sky. Home of Mock Town and the Knock-Up Stream that leads to Skypiea.' },
  { id:'skypiea', name:'Skypiea', region:'Sky', type:'Sky Island', climate:'Sky', arc:'Skypiea', spoiler:1, lat:15, lon:75, accuracy:'approximate', importance:'critical', altitude:0.22,
    desc:'Island in the sky. Home of the Shandia people and the legendary City of Gold.' },
  { id:'longring', name:'Long Ring Long Land', region:'Grand Line', type:'Island', climate:'Temperate', arc:'Long Ring Long Land', spoiler:1, lat:-12, lon:88, accuracy:'approximate', importance:'medium',
    desc:'Strangely elongated island. Site of the Davy Back Fight against Foxy.' },
  { id:'water7', name:'Water 7', region:'Grand Line', type:'City', climate:'Oceanic', arc:'Water 7', spoiler:1, lat:-3, lon:105, accuracy:'confirmed', importance:'critical',
    desc:'City of shipwrights and canals. Home of the Galley-La Company and Franky.' },
  { id:'enies', name:'Enies Lobby', region:'Grand Line', type:'Judicial Island', climate:'Temperate', arc:'Enies Lobby', spoiler:1, lat:5, lon:115, accuracy:'confirmed', importance:'critical',
    desc:'Judicial island of the World Government. Connected to Water 7 by the Sea Train "Puffing Tom".' },
  { id:'thriller', name:'Thriller Bark', region:'Grand Line', type:'Ghost Ship', climate:'Foggy', arc:'Thriller Bark', spoiler:1, lat:-18, lon:130, accuracy:'approximate', importance:'high',
    desc:'Massive ghost ship commanded by Gecko Moria. Where Brook joined the Straw Hat Pirates.' },
  { id:'sabaody', name:'Sabaody Archipelago', region:'Grand Line', type:'Archipelago', climate:'Temperate', arc:'Sabaody', spoiler:1, lat:8, lon:155, accuracy:'confirmed', importance:'critical',
    desc:'Archipelago of giant mangrove trees near the Red Line. Gateway between Paradise and the New World.' },
  { id:'amazon', name:'Amazon Lily', region:'Calm Belt', type:'Island', climate:'Tropical', arc:'Amazon Lily', spoiler:1, lat:25, lon:170, accuracy:'approximate', importance:'high',
    desc:'Island of the Kuja tribe ruled by Empress Boa Hancock. No men are allowed.' },
  { id:'impel', name:'Impel Down', region:'Calm Belt', type:'Prison', climate:'Various', arc:'Impel Down', spoiler:1, lat:-20, lon:175, accuracy:'confirmed', importance:'critical', altitude:-0.12,
    desc:'Underwater maximum-security prison of the World Government. Six levels of increasing hell.' },
  { id:'marineford', name:'Marineford', region:'Grand Line', type:'Marine HQ', climate:'Temperate', arc:'Marineford', spoiler:1, lat:0, lon:180, accuracy:'confirmed', importance:'critical',
    desc:'Former headquarters of the Marines. Site of the Summit War of Marineford.' },
  { id:'fishman', name:'Fish-Man Island', region:'Underwater', type:'Kingdom', climate:'Underwater', arc:'Fish-Man Island', spoiler:1, lat:0, lon:0, accuracy:'confirmed', importance:'critical', altitude:-0.18,
    desc:'Kingdom located under the Red Line. Home of fish-men and mermaids, ruled by King Neptune.' },

  // ========== NEW WORLD ==========
  { id:'punk', name:'Punk Hazard', region:'New World', type:'Island', climate:'Volcanic / Ice', arc:'Punk Hazard', spoiler:2, lat:15, lon:-160, accuracy:'approximate', importance:'high',
    desc:'Island split into fire and ice halves. Former laboratory of Caesar Clown and Dr. Vegapunk.' },
  { id:'dressrosa', name:'Dressrosa', region:'New World', type:'Kingdom', climate:'Mediterranean', arc:'Dressrosa', spoiler:2, lat:-8, lon:-140, accuracy:'confirmed', importance:'critical',
    desc:'Kingdom once ruled by Donquixote Doflamingo. Famous for its Colosseum and the Tontatta tribe.' },
  { id:'zou', name:'Zou', region:'New World', type:'Moving Island', climate:'Forest', arc:'Zou', spoiler:2, lat:20, lon:-120, accuracy:'approximate', importance:'critical',
    desc:'Island on the back of the giant elephant Zunesha. Home of the Mink Tribe.' },
  { id:'wholecake', name:'Whole Cake Island', region:'New World', type:'Island', climate:'Sweet', arc:'Whole Cake Island', spoiler:2, lat:-15, lon:-100, accuracy:'approximate', importance:'critical',
    desc:'Territory of Big Mom (Charlotte Linlin). An island made largely of sweets.' },
  { id:'wano', name:'Wano Country', region:'New World', type:'Country', climate:'Seasonal', arc:'Wano', spoiler:2, lat:10, lon:-70, accuracy:'confirmed', importance:'critical',
    desc:'Isolated country of samurai. Home of the Kozuki clan and the island of Onigashima.' },
  { id:'onigashima', name:'Onigashima', region:'New World', type:'Island', climate:'Volcanic', arc:'Wano', spoiler:2, lat:12, lon:-68, accuracy:'confirmed', importance:'critical',
    desc:'Skull-shaped island fortress of Kaido. Site of the final decisive battle in Wano.' },
  { id:'egghead', name:'Egghead', region:'New World', type:'Future Island', climate:'Artificial', arc:'Egghead', spoiler:2, lat:-5, lon:-40, accuracy:'confirmed', importance:'critical',
    desc:'Island of the future. Advanced laboratory of Dr. Vegapunk filled with futuristic technology.' },
  { id:'elbaf', name:'Elbaf', region:'New World', type:'Kingdom', climate:'Northern', arc:'Elbaf', spoiler:2, lat:30, lon:-20, accuracy:'approximate', importance:'critical',
    desc:'Kingdom of the giants. One of the most powerful nations in the New World.' },

  // ========== RED LINE ==========
  { id:'mary', name:'Mary Geoise', region:'Red Line', type:'Holy Land', climate:'High Altitude', arc:'Various', spoiler:1, lat:5, lon:2, accuracy:'confirmed', importance:'critical', altitude:0.25,
    desc:'Holy Land of the Celestial Dragons and capital of the World Government, located atop the Red Line.' },
  { id:'redport', name:'Red Port', region:'Red Line', type:'Port', climate:'Temperate', arc:'Various', spoiler:1, lat:3, lon:5, accuracy:'confirmed', importance:'high',
    desc:'Port at the foot of the Red Line. Bondolas carry people up to Mary Geoise.' }
];

// Approximate voyage routes (Paradise + New World)
export const ROUTES = [
  {
    id: 'paradise',
    name: 'Paradise Route',
    color: 0x00c4c8,
    path: ['reverse','twin','whiskey','little','drum','alabasta','jaya','skypiea','longring','water7','enies','thriller','sabaody','fishman']
  },
  {
    id: 'newworld',
    name: 'New World Route',
    color: 0xe17055,
    path: ['punk','dressrosa','zou','wholecake','wano','egghead','elbaf']
  }
];
