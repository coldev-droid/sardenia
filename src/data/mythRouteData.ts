// Sardinian Historical Locations, UNESCO Sites, Legends, and Route Matrix Authority
// Strict geographical accuracy, distance arithmetic, and canon preservation rules

export interface HistoricalLocation {
  id: string;
  name: string;
  sardinianName: string;
  category: 'UNESCO World Heritage' | 'Archaeological Complex' | 'Judicate Civil Seat' | 'Coastal & Maritime' | 'Transit Hub' | 'Karst Marine Grotto';
  province: 'Oristano' | 'Sassari' | 'South Sardinia' | 'Nuoro' | 'Cagliari';
  coordinates: {
    lat: number;
    lng: number;
    elevationMeters: number;
  };
  unescoStatus?: {
    isUnesco: boolean;
    refNumber?: string;
    inscriptionYear?: number;
    criteria?: string;
  };
  historicalEra: string;
  canonSignificance: string;
  travelParameters: {
    distanceFromOristanoKm: number;
    railRouteAvailable: boolean;
    railLine?: string;
    avgRailTravelMinutes?: number;
    walkingPaceHours?: number;
    fareCostEUR?: number;
  };
  fieldHazards: string[];
  preservationRules: string[];
}

export interface SardinianMyth {
  id: string;
  title: string;
  sardinianTitle: string;
  domain: 'Nuragic & Prehistoric' | 'Judicate & Historical' | 'Folklore & Tradition' | 'Sacred Craft & Ecology';
  summary: string;
  canonBoundaryRule: string;
  prohibitedMisinterpretations: string[];
  associatedLocations: string[];
}

export const SARDINIAN_LOCATIONS_DATABASE: HistoricalLocation[] = [
  {
    id: 'LOC-01-ORISTANO-CIVIL',
    name: 'Oristano Municipal Receiving Room & Guesthouse',
    sardinianName: 'Aristanis (Seat of the Giudicato di Arborea)',
    category: 'Judicate Civil Seat',
    province: 'Oristano',
    coordinates: {
      lat: 39.9064,
      lng: 8.5925,
      elevationMeters: 9
    },
    historicalEra: '14th-Century Judicate Capital & Modern Civil Administration',
    canonSignificance: 'Current Base of Branch Bravo (Katia, Geronimo, Veerle, Mia, Tina). Contains the municipal receiving room where the Eye of Adrastea rests inside a bolted grey transport crate with 3 family locks.',
    travelParameters: {
      distanceFromOristanoKm: 0,
      railRouteAvailable: true,
      railLine: 'Oristano Main Station (Piazza Ungheria)',
      avgRailTravelMinutes: 0,
      walkingPaceHours: 0,
      fareCostEUR: 0
    },
    fieldHazards: [
      'Heavy autumn rain causing slippery basalt flagstones',
      'Civil surveillance around municipal registries',
      'Restricted vehicular traffic in historical center'
    ],
    preservationRules: [
      'Must maintain legal municipal deposit receipt at all times.',
      'Never refer to licensed guesthouse as a "safehouse".',
      'Never open transport crate without all 3 sibling keys and municipal witness.'
    ]
  },
  {
    id: 'LOC-02-SU-NURAXI',
    name: 'Su Nuraxi di Barumini',
    sardinianName: 'Su Nuraxi de Barùmini',
    category: 'UNESCO World Heritage',
    province: 'South Sardinia',
    coordinates: {
      lat: 39.7061,
      lng: 8.9917,
      elevationMeters: 238
    },
    unescoStatus: {
      isUnesco: true,
      refNumber: '833',
      inscriptionYear: 1997,
      criteria: 'Criteria (i), (iii), (iv) - Outstanding Bronze Age megalithic architecture'
    },
    historicalEra: 'Nuragic Bronze Age (16th–6th Century BCE)',
    canonSignificance: 'Four-lobed basalt nuragic fortress with central tholos tower; primary architectural blueprint for Amulet #2 (Bronze Sun Disc).',
    travelParameters: {
      distanceFromOristanoKm: 58,
      railRouteAvailable: false,
      avgRailTravelMinutes: 0,
      walkingPaceHours: 12.5,
      fareCostEUR: 8.50
    },
    fieldHazards: [
      'Extremely narrow corbelled stone corridors (60cm width)',
      'Steep basalt staircase with worn 3,000-year-old steps',
      'Low lighting inside central tholos vault'
    ],
    preservationRules: [
      'Strict UNESCO archaeological integrity: no climbing or disturbing dry-stone masonry.',
      'All theoretical amulets here remain architectural blueprints only.'
    ]
  },
  {
    id: 'LOC-03-THARROS-SINIS',
    name: 'Tharros & Sinis Peninsula',
    sardinianName: 'Tàrros e Cabu Santu Marcu',
    category: 'Archaeological Complex',
    province: 'Oristano',
    coordinates: {
      lat: 39.8731,
      lng: 8.4403,
      elevationMeters: 14
    },
    historicalEra: 'Nuragic, Phoenician (8th c. BCE), Punic & Roman Naval Base',
    canonSignificance: 'Coastal promontory overlooking the Gulf of Oristano; origin of the quartz-sand lagoons and site of submerged Phoenician breakwaters associated with Amulet #3.',
    travelParameters: {
      distanceFromOristanoKm: 21,
      railRouteAvailable: false,
      walkingPaceHours: 4.5,
      fareCostEUR: 3.20
    },
    fieldHazards: [
      'Exposed coastal mistral winds exceeding 40 knots',
      'Submerged tidal rocks and sharp basalt shelves',
      'Strict Marine Protected Area regulations'
    ],
    preservationRules: [
      'Area Marina Protetta "Penisola del Sinis" - zero unauthorized seabed sampling.',
      'Obsidian artifacts must be cross-referenced with Monte Arci volcanic profiles.'
    ]
  },
  {
    id: 'LOC-04-MACOMER-JUNCTION',
    name: 'Macomer Railway Junction',
    sardinianName: 'Macumere (Historical Transit Crossroads)',
    category: 'Transit Hub',
    province: 'Nuoro',
    coordinates: {
      lat: 40.2644,
      lng: 8.7758,
      elevationMeters: 563
    },
    historicalEra: '19th-Century Sardinian Railway System (Compagnia Reale delle Ferrovie Sarde)',
    canonSignificance: 'Mandatory transfer station for Branch Alpha (Maris, Inga, André) traveling by regional rail from Oristano north toward Alghero/Sassari.',
    travelParameters: {
      distanceFromOristanoKm: 54,
      railRouteAvailable: true,
      railLine: 'Trenitalia Dorsale Sarda (Line 2)',
      avgRailTravelMinutes: 52,
      walkingPaceHours: 11.0,
      fareCostEUR: 4.30
    },
    fieldHazards: [
      'Chilly mountain wind at 560m elevation on the Marghine plateau',
      'Tight 14-minute platform connection window',
      'Surveillance at ticket validation gates'
    ],
    preservationRules: [
      'All rail travel must strictly respect authentic timetable arithmetic and cash tickets.',
      'No teleportation or compressed transit times without explicit transfer scenes.'
    ]
  },
  {
    id: 'LOC-05-ALGHERO-MARINA',
    name: 'Alghero Marina & Catalan Bastions',
    sardinianName: 'L\'Alguer (The Coral Coast Port)',
    category: 'Coastal & Maritime',
    province: 'Sassari',
    coordinates: {
      lat: 40.5580,
      lng: 8.3140,
      elevationMeters: 3
    },
    historicalEra: 'Catalan Gothic Seaport & Modern Yacht Harbor',
    canonSignificance: 'Current destination of Branch Alpha. The expedition vessel *Sentina* (white multi-deck motor yacht) is moored at the outer visitor pontoon awaiting spring line doubling.',
    travelParameters: {
      distanceFromOristanoKm: 132,
      railRouteAvailable: true,
      railLine: 'Trenitalia Regional via Macomer & Sassari (Total transit: 2h 45m)',
      avgRailTravelMinutes: 165,
      walkingPaceHours: 27.0,
      fareCostEUR: 9.80
    },
    fieldHazards: [
      'Autumn sea surge causing mooring line chafing on outer pontoon',
      'Harbor dues penalties if berth is not renewed in cash (max 180 EUR budget)',
      'Submerged ballast stones near the Aragonese seawall'
    ],
    preservationRules: [
      'The vessel *Sentina* is strictly an expedition motor yacht, NEVER a cutter.',
      'Mooring inspections must document physical chafe gear and battery voltage.'
    ]
  },
  {
    id: 'LOC-06-CAPO-CACCIA',
    name: 'Capo Caccia & Grotta di Nettuno',
    sardinianName: 'Cabu de Caza (Karst Marine Cliffs)',
    category: 'Karst Marine Grotto',
    province: 'Sassari',
    coordinates: {
      lat: 40.5619,
      lng: 8.1633,
      elevationMeters: 168
    },
    historicalEra: 'Prehistoric Karst Formations & Subterranean Marine Caves',
    canonSignificance: 'Towering 168m limestone cliffs harboring marine caves (Grotta di Nettuno, Grotta dei Ricami) associated with Amulet #8 (Jasper Compass).',
    travelParameters: {
      distanceFromOristanoKm: 154,
      railRouteAvailable: false,
      walkingPaceHours: 32.0,
      fareCostEUR: 14.50
    },
    fieldHazards: [
      '654-step Escala del Cabirol carved into vertical sea cliffs',
      'Tidal flooding inside cave entrance chambers',
      'Dangerous subterranean acoustic resonance'
    ],
    preservationRules: [
      'Area Naturale Marina Protetta Capo Caccia - Isola Piana.',
      'Grotto exploration requires explicit route contracts; no premature unearned visits.'
    ]
  },
  {
    id: 'LOC-07-SANTA-CRISTINA',
    name: 'Pozzo Sacro di Santa Cristina',
    sardinianName: 'Su Putzu de Santa Cristina',
    category: 'Archaeological Complex',
    province: 'Oristano',
    coordinates: {
      lat: 40.0617,
      lng: 8.7328,
      elevationMeters: 195
    },
    historicalEra: 'Late Bronze Age (12th–11th Century BCE)',
    canonSignificance: 'Isodomic basalt sacred water temple designed as an astronomical lunar calendar; primary reference for Amulet #4 (Quartz Moon Tear).',
    travelParameters: {
      distanceFromOristanoKm: 27,
      railRouteAvailable: true,
      railLine: 'Trenitalia Regional to Paulilatino Station (2.5km walk to site)',
      avgRailTravelMinutes: 24,
      walkingPaceHours: 5.5,
      fareCostEUR: 2.50
    },
    fieldHazards: [
      'Submerged stone stairs coated in slippery moss',
      'Extreme optical reflections during lunar alignment',
      'Restricted access to subterranean spring basin'
    ],
    preservationRules: [
      'Sacred water temple geometry must adhere to verified astronomical dimensions.',
      'No supernatural light beams; optical phenomena must obey physics.'
    ]
  },
  {
    id: 'LOC-08-MONTE-DACCODDI',
    name: 'Monte d\'Accoddi Prehistoric Altar',
    sardinianName: 'Monte de Accoddi (The Stepped Sanctuary)',
    category: 'Archaeological Complex',
    province: 'Sassari',
    coordinates: {
      lat: 40.7914,
      lng: 8.4192,
      elevationMeters: 75
    },
    historicalEra: 'Pre-Nuragic Ozieri Culture (4000–3200 BCE)',
    canonSignificance: 'Unique Mesopotamian-style stepped ziggurat altar in the western Mediterranean; architectural foundation for Amulet #7 (Trachyte Stele).',
    travelParameters: {
      distanceFromOristanoKm: 118,
      railRouteAvailable: true,
      railLine: 'Rail to Sassari Station + Regional bus',
      avgRailTravelMinutes: 130,
      walkingPaceHours: 24.0,
      fareCostEUR: 7.80
    },
    fieldHazards: [
      'Exposed clay ramp slippery after heavy rain',
      'Unconsolidated trachyte boulders near sacrificial stone',
      'Zero shaded cover on plateau'
    ],
    preservationRules: [
      'Pre-Nuragic chronological distinction must be maintained against Nuragic structures.',
      'Sacrificial stone channels must be described accurately as libation grooves.'
    ]
  },
  {
    id: 'LOC-09-SANT-ANTIOCO',
    name: 'Sant\'Antioco & Sulcis Archipelago',
    sardinianName: 'Santu Antiogu (Ancient Sulki)',
    category: 'Coastal & Maritime',
    province: 'South Sardinia',
    coordinates: {
      lat: 39.0664,
      lng: 8.4556,
      elevationMeters: 12
    },
    historicalEra: 'Phoenician-Punic Seaport (8th c. BCE) & Sacred Byssus Guild',
    canonSignificance: 'Center of traditional Mediterranean Sea Byssus (Pinna Nobilis silk) weaving; reference for Amulet #6 (Byssus Matrix).',
    travelParameters: {
      distanceFromOristanoKm: 125,
      railRouteAvailable: true,
      railLine: 'Trenitalia Regional to Carbonia Serbariu + connecting bus across isthmus',
      avgRailTravelMinutes: 140,
      walkingPaceHours: 26.0,
      fareCostEUR: 8.60
    },
    fieldHazards: [
      'Shallow tidal lagoon currents',
      'Strict legal protection of Pinna Nobilis mollusk (CITES protected)',
      'Delicate humidity controls required for historical textile conservation'
    ],
    preservationRules: [
      'Sea byssus is an ancient organic textile, NOT a magical bio-resonance conductor.',
      'Mia and Tina have ZERO ability to track byssus bio-resonance.'
    ]
  },
  {
    id: 'LOC-10-NURAGHE-LOSA',
    name: 'Nuraghe Losa (Abbasanta)',
    sardinianName: 'Nuraghe Losa',
    category: 'Archaeological Complex',
    province: 'Oristano',
    coordinates: {
      lat: 40.1166,
      lng: 8.7905,
      elevationMeters: 310
    },
    historicalEra: 'Middle-Late Bronze Age (14th–12th Century BCE)',
    canonSignificance: 'Compact triangular tholos complex of dark basalt masonry, guarding the central transit route of the Tirso valley.',
    travelParameters: {
      distanceFromOristanoKm: 34,
      railRouteAvailable: true,
      railLine: 'Rail to Abbasanta Station (1.8km walk to site)',
      avgRailTravelMinutes: 30,
      walkingPaceHours: 7.0,
      fareCostEUR: 2.80
    },
    fieldHazards: [
      'Dark spiral intramural stairs with uneven steps',
      'Low doorways requiring ducking below 1.2m',
      'Basalt moisture condensation'
    ],
    preservationRules: [
      'Adhere to the exact triangular floor plan of the main bastion.',
      'Respect historical dry-stone masonry construction technique.'
    ]
  }
];

export const SARDINIAN_MYTHS_DATABASE: SardinianMyth[] = [
  {
    id: 'MYTH-01-ACCABADORA',
    title: 'Sa Femmina Accabadora',
    sardinianTitle: 'Sa Fèmina Accabadòra (The Merciful Guide of Passing)',
    domain: 'Folklore & Tradition',
    summary: 'A revered female figure in traditional Sardinian rural society who performed traditional compassionate palliative rituals for the terminally ill, maintaining solemn dignity and communal peace.',
    canonBoundaryRule: 'Must be treated with ethnographic respect as a dignified historical cultural custom, never sensationalized as a horror trope or violent murder mystery.',
    prohibitedMisinterpretations: [
      'Depicting the Accabadora as a violent killer or assassin',
      'Inventing gothic occult curses around the olive-wood mallet (lu matzolu)',
      'Using the figure outside of authentic rural communal ethnography'
    ],
    associatedLocations: ['Gennargentu Massif', 'Barbagia', 'Marghine Plateau']
  },
  {
    id: 'MYTH-02-DOMUS-DE-JANAS',
    title: 'Domus de Janas (Fairies & Prehistoric Rock Tombs)',
    sardinianTitle: 'Sas Domos de Janas (The Houses of the Fairies)',
    domain: 'Nuragic & Prehistoric',
    summary: 'Over 2,800 prehistoric chamber tombs carved into limestone cliffs and granite outcrops. In Sardinian folklore, they were inhabited by the Janas—tiny, wise fairy women who spun golden threads and guarded ancient memories.',
    canonBoundaryRule: 'The physical structures are strictly Neolithic/Chalcolithic chamber tombs. Folklore may be quoted by characters as cultural stories, but the tombs contain no real magical entities.',
    prohibitedMisinterpretations: [
      'Portraying literal magical fairies casting spells',
      'Confusing pre-Nuragic rock-cut tombs with Bronze Age nuraghi',
      'Allowing dogs or equipment to detect magical fairy auras'
    ],
    associatedLocations: ['Anghelu Ruju (Alghero)', 'Sedilo', 'Paulilatino']
  },
  {
    id: 'MYTH-03-SHARDANA',
    title: 'The Shardana Warriors & Sea Peoples',
    sardinianTitle: 'Sos Sardana (The Horned Navigators of the Mediterranean)',
    domain: 'Nuragic & Prehistoric',
    summary: 'Elite Bronze Age navigators and warriors referenced in Egyptian hieroglyphs at Medinet Habu, depicted wearing horned helmets and carrying circular shields and triangular bronze swords.',
    canonBoundaryRule: 'Archaeological evidence connects Nuragic bronze statuettes (bronzetti) with western Mediterranean seafaring. Navigational techniques must be grounded in physical astronomy and bathymetry.',
    prohibitedMisinterpretations: [
      'Alien or Atlantis theories of Shardana origins',
      'Laser or supernatural Bronze Age energy weapons',
      'Ignoring Phoenician and indigenous continuity'
    ],
    associatedLocations: ['Tharros & Sinis Peninsula', 'Mont\'e Prama', 'Alghero Harbor']
  },
  {
    id: 'MYTH-04-CARTA-DE-LOGU',
    title: 'Carta de Logu & Eleonora d\'Arborea',
    sardinianTitle: 'Sa Carta de Logu de su Giuigau de Arborea (1392)',
    domain: 'Judicate & Historical',
    summary: 'One of the earliest and most progressive legal codes in medieval Europe, promulgated in Sardinian dialect by Judge-Queen Eleonora d\'Arborea, establishing women\'s property rights, due process, and raptor conservation.',
    canonBoundaryRule: 'Forms the direct legal precedent for the municipal legal deposit registry in Oristano. Custody protocols and civil registrations must mirror Judicate legal discipline.',
    prohibitedMisinterpretations: [
      'Treating 14th-century Oristano as lawless or feudal chaos',
      'Ignoring the legal property rights established under the Carta',
      'Falsifying historical Arborean seal formulas'
    ],
    associatedLocations: ['Oristano Municipal Receiving Room', 'San Gavino Monreale']
  },
  {
    id: 'MYTH-05-SEA-BYSSUS-OATH',
    title: 'The Sacred Oath of Sea Byssus (Pinna Nobilis)',
    sardinianTitle: 'Su Giuramentu de sa Seda de Mare',
    domain: 'Sacred Craft & Ecology',
    summary: 'The ancient unwritten law of the Master of Sea Silk in Sant\'Antioco: sacred sea byssus harvested from the sea must never be bought, sold, or commercialized for private profit—it may only be gifted to celebrate life, peace, or charity.',
    canonBoundaryRule: 'Directly informs the moral and conservation philosophy of the saga. Relics incorporating byssus cannot be commercialized or bartered.',
    prohibitedMisinterpretations: [
      'Treating sea byssus as a commercially tradable commodity on the black market',
      'Claiming byssus possesses supernatural bio-magnetic resonance',
      'Harmful simulated harvesting of endangered Pinna Nobilis'
    ],
    associatedLocations: ['Sant\'Antioco & Sulcis Archipelago', 'Gulf of Palmas']
  },
  {
    id: 'MYTH-06-JANAS-WEAVERS',
    title: 'The Golden Weaving Janas of Mount Albo',
    sardinianTitle: 'Sas Janas de Monte Albo',
    domain: 'Folklore & Tradition',
    summary: 'Mythical fairy weavers dwelling in limestone grottoes who spin gold on looms made of bone under moonlight, punishing greedy mortals who steal their spindles.',
    canonBoundaryRule: 'Strictly folklore and mountain storytelling motif.',
    prohibitedMisinterpretations: ['Magical gold transmutation'],
    associatedLocations: ['Mount Albo', 'Lula', 'Siniscola']
  },
  {
    id: 'MYTH-07-GIANTS-OF-MONT-E-PRAMA',
    title: 'The Stone Giants of Mont\'e Prama',
    sardinianTitle: 'Sos Gigantes de Mont\'e Prama',
    domain: 'Nuragic & Prehistoric',
    summary: 'Monumental 2-meter-tall sandstone statues of Nuragic warriors with shields and inlaid circular eyes, guarding ancient heroic necropolises.',
    canonBoundaryRule: 'Archaeological hero-statues from the Iron Age transition.',
    prohibitedMisinterpretations: ['Living stone golems or alien sentinels'],
    associatedLocations: ['Cabras', 'Sinis Peninsula', 'Oristano']
  },
  {
    id: 'MYTH-08-MASCA-WITCHES',
    title: 'Masca and Cogas (Sardinian Witches & Vampires)',
    sardinianTitle: 'Sas Cogas e Mascas',
    domain: 'Folklore & Tradition',
    summary: 'Folk tales of nocturnal shape-shifters and elder sorceresses who take the form of cats or red insects to drain vitality from sleeping infants.',
    canonBoundaryRule: 'Rural superstition and psychological folk deterrents.',
    prohibitedMisinterpretations: ['Real magical spellcasting or actual supernatural monsters'],
    associatedLocations: ['Campidano', 'Logudoro', 'Ogliastra']
  },
  {
    id: 'MYTH-09-MARI-OLGU-GIANT',
    title: 'Mari Olgu & the Mountain Giants',
    sardinianTitle: 'Su Gigante Mari Olgu',
    domain: 'Nuragic & Prehistoric',
    summary: 'Legendary race of prehistoric giant stone-builders who hauled massive megaliths across the Supramonte before the sun turned them to stone.',
    canonBoundaryRule: 'Folk explanation for cyclopean nuragic architecture.',
    prohibitedMisinterpretations: ['Literal mythological giants walking in modern scenes'],
    associatedLocations: ['Supramonte', 'Orgosolo', 'Dorgali']
  },
  {
    id: 'MYTH-10-SU-MAMUTHONES',
    title: 'Mamuthones & Issohadores of Mamoiada',
    sardinianTitle: 'Sos Mamuthones e Sos Issohadores',
    domain: 'Folklore & Tradition',
    summary: 'Ancestral winter carnival figures draped in heavy sheepskins and 30kg of bronze ox-bells, performing rhythmic chthonic dances to awaken the earth and exorcise bad spirits.',
    canonBoundaryRule: 'Authentic ancestral agro-pastoral ritual, treated with profound ethnographic reverence.',
    prohibitedMisinterpretations: ['Occult demonic summoning or pagan blood sacrifice'],
    associatedLocations: ['Mamoiada', 'Barbagia', 'Nuoro Hills']
  },
  {
    id: 'MYTH-11-BOES-E-MERDULES',
    title: 'Boes e Merdules of Ottana',
    sardinianTitle: 'Sos Boes e Merdules de Otzana',
    domain: 'Folklore & Tradition',
    summary: 'Zoomorphic ritual drama where masked herdsmen (Merdules) struggle to tame recalcitrant ox-masked spirits (Boes), symbolizing the taming of nature.',
    canonBoundaryRule: 'Traditional symbolic carnival performance.',
    prohibitedMisinterpretations: ['Actual animal possession or shapeshifting'],
    associatedLocations: ['Ottana', 'Marghine', 'Nuoro']
  },
  {
    id: 'MYTH-12-CORREOS-MASK',
    title: 'Corriolos & S\'Urtzu of Paulilatino',
    sardinianTitle: 'S\'Urtzu e sos Corriolos',
    domain: 'Folklore & Tradition',
    summary: 'Wild goat and boar beasts sacrificed and symbolically resurrected in agrarian rituals of renewal.',
    canonBoundaryRule: 'Agricultural cycle folklore.',
    prohibitedMisinterpretations: ['Literal resurrection magic'],
    associatedLocations: ['Paulilatino', 'Ghilarza', 'Oristano']
  },
  {
    id: 'MYTH-13-KING-NORAX',
    title: 'King Norax & the Foundation of Nora',
    sardinianTitle: 'Nora e su Re Norax',
    domain: 'Nuragic & Prehistoric',
    summary: 'Mythological son of Mercury and Erytheia guided by a sacred bronze-winged falcon to found Nora, the oldest city in Sardinia.',
    canonBoundaryRule: 'Classical foundation myth interwoven with early maritime trade.',
    prohibitedMisinterpretations: ['Demigod superpowers'],
    associatedLocations: ['Nora', 'Pula', 'Southern Coast']
  },
  {
    id: 'MYTH-14-SARDUS-PATER',
    title: 'Sardus Pater (The Progenitor of the Sards)',
    sardinianTitle: 'Sardus Pater Babai',
    domain: 'Nuragic & Prehistoric',
    summary: 'Heroic son of Hercules who led Libyan and Iberian colonists to settle Sardinia, giving the island its name and establishing justice.',
    canonBoundaryRule: 'Ancient ethnic eponymous hero myth.',
    prohibitedMisinterpretations: ['Immortal divine interventions'],
    associatedLocations: ['Temple of Antas', 'Fluminimaggiore', 'Iglesiente']
  },
  {
    id: 'MYTH-15-MONTE-ARCI-OBSIDIAN',
    title: 'The Black Glass of Monte Arci',
    sardinianTitle: 'Su Vitru Nieddu de Monte Arci',
    domain: 'Nuragic & Prehistoric',
    summary: 'Volcanic glass born from ancient eruptions, traded across Neolithic Europe for razor-sharp arrowheads and ritual blades, guarded by volcanic spirits.',
    canonBoundaryRule: 'Geological and archaeological obsidian trade network.',
    prohibitedMisinterpretations: ['Magical crystal energy focusing'],
    associatedLocations: ['Monte Arci', 'Pau', 'Milis', 'Oristano']
  },
  {
    id: 'MYTH-16-GOLFO-DEGLI-ANGELI',
    title: 'Gulf of Angels (Golfo degli Angeli)',
    sardinianTitle: 'Su Golfu de sos Angelos',
    domain: 'Folklore & Tradition',
    summary: 'When Lucifer and rebellious angels were cast out of heaven, angels pleaded for a pristine land to claim; God gave them the Gulf of Cagliari, where their tears formed the white cliffs of Sella del Diavolo.',
    canonBoundaryRule: 'Romantic maritime toponymy legend.',
    prohibitedMisinterpretations: ['Celestial battles or literal angels appearing'],
    associatedLocations: ['Cagliari', 'Sella del Diavolo', 'Poetto']
  },
  {
    id: 'MYTH-17-JANAS-LOOMS',
    title: 'The Invisible Looms of the Coghinas',
    sardinianTitle: 'Sos Telares de sa Coghinas',
    domain: 'Folklore & Tradition',
    summary: 'River valley legends of fairy looms whose rhythmic clacking can be heard underwater during autumn floods.',
    canonBoundaryRule: 'Acoustic river valley folklore.',
    prohibitedMisinterpretations: ['Subaquatic fairy cities'],
    associatedLocations: ['Coghinas River', 'Valledoria', 'Northern Sardinia']
  },
  {
    id: 'MYTH-18-GIANT-TOMB-ODYSSEY',
    title: 'Tombs of the Giants (Tumbas de sos Gigantes)',
    sardinianTitle: 'Tumbas de sos Gigantes',
    domain: 'Nuragic & Prehistoric',
    summary: 'Collective megalithic corridor tombs with semi-circular exedrae designed as giant stone bodies inviting chthonic communion with ancestral spirits.',
    canonBoundaryRule: 'Bronze Age collective burial monuments.',
    prohibitedMisinterpretations: ['Graves of actual 3-meter-tall giants'],
    associatedLocations: ['Coddu Ecchiu', 'Arzachena', 'Dorgali', 'Oristano']
  },
  {
    id: 'MYTH-19-CONCA-FRAIGADA',
    title: 'Conca Fraigada (The Ice Cave of Supramonte)',
    sardinianTitle: 'Sa Conca Fraigada',
    domain: 'Karst Marine Grotto',
    summary: 'High-altitude karst doline in the Supramonte where winter snowpack was historically stored in natural ice caves to supply Sardinian towns in summer.',
    canonBoundaryRule: 'Historical pastoral refrigeration and ice-harvesting practice.',
    prohibitedMisinterpretations: ['Eternal magical glaciers or cryogenic freezing chambers'],
    associatedLocations: ['Supramonte', 'Oliena', 'Orgosolo']
  },
  {
    id: 'MYTH-20-SANTA-CRISTINA-WELL',
    title: 'The Sacred Lunar Well of Santa Cristina',
    sardinianTitle: 'Su Pantu Sacru de Santa Cristina',
    domain: 'Nuragic & Prehistoric',
    summary: 'Subterranean trapezoidal basalt water temple whose staircase perfectly aligns with lunar standstills every 18.6 years.',
    canonBoundaryRule: 'Nuragic architectural precision and astronomical alignment.',
    prohibitedMisinterpretations: ['Portals to other dimensions or time travel devices'],
    associatedLocations: ['Paulilatino', 'Oristano', 'Central Plateau']
  },
  {
    id: 'MYTH-21-MARIANO-IV-ARBOREA',
    title: 'Mariano IV of Arborea & the Hawk Law',
    sardinianTitle: 'Mariano IV e sa Lege de sos Astores',
    domain: 'Judicate & Historical',
    summary: 'Visionary Judge of Arborea who codified falconry protection and established agricultural reforms across Sardinia.',
    canonBoundaryRule: 'Historical medieval monarchical governance.',
    prohibitedMisinterpretations: ['Animal telepathy'],
    associatedLocations: ['Oristano', 'Goceano Castle', 'Bosa']
  },
  {
    id: 'MYTH-22-BAINZU-THE-BANDIT',
    title: 'Bainzu Sanna the Bandit of Badde Salighes',
    sardinianTitle: 'Bainzu su Bandidu de Badde Salighes',
    domain: 'Folklore & Tradition',
    summary: '19th-century oak forest outlaw ballads recounting escape routes through mountain mists and pastoral loyalty codes (codice di barracellato).',
    canonBoundaryRule: 'Historical banditry folklore.',
    prohibitedMisinterpretations: ['Superhero outlaw feats'],
    associatedLocations: ['Bolotana', 'Marghine', 'Badde Salighes']
  },
  {
    id: 'MYTH-23-BEATA-VERGINE-BONARIA',
    title: 'Our Lady of Bonaria & The Sailors\' Storm',
    sardinianTitle: 'Sa Madonna de Bonaria',
    domain: 'Folklore & Tradition',
    summary: 'In 1370, a wooden chest washed ashore in Cagliari during a fierce tempest, calming the seas instantly; inside was a glowing statue of the Virgin holding a candle, becoming the patron saint of sailors and Sardinia.',
    canonBoundaryRule: 'Traditional Catholic maritime legend.',
    prohibitedMisinterpretations: ['Magical relic powers'],
    associatedLocations: ['Cagliari', 'Sanctuary of Bonaria']
  },
  {
    id: 'MYTH-24-IS-ANIMAS-ED-SU-MORTU-MORTU',
    title: 'Is Animas (Sardinian All Souls Day Tradition)',
    sardinianTitle: 'Is Animas e Su Mortu Mortu',
    domain: 'Folklore & Tradition',
    summary: 'Ancient ancestral tradition where children go door-to-door on November 1st asking for offerings (*su mortu mortu* / sweets and dried figs) to feed wandering souls.',
    canonBoundaryRule: 'Authentic Sardinian harvest and All Souls cultural custom.',
    prohibitedMisinterpretations: ['Halloween commercialization or ghost summoning'],
    associatedLocations: ['Campidano', 'Barbagia', 'Logudoro', 'Oristano']
  },
  {
    id: 'MYTH-25-S-ISCULTONE-DRAGON',
    title: 'S\'Iscultone (The Winged Dragon of Supramonte)',
    sardinianTitle: 'S\'Iscultone (Su Draconis de su Supramonte)',
    domain: 'Folklore & Tradition',
    summary: 'A legendary gigantic winged dragon or subterranean serpent inhabiting the deep limestone abysses and dark grottoes of the Supramonte, whose roaring shook mountain ravines and required pastoral tributes.',
    canonBoundaryRule: 'Mountain folklore and oral tradition regarding karst subterranean hazards.',
    prohibitedMisinterpretations: ['Actual fire-breathing dragons roaming modern terrain'],
    associatedLocations: ['Supramonte', 'Dorgali', 'Orgosolo', 'Gola di Gorropu']
  },
  {
    id: 'MYTH-26-DRAGONARA-CAVE',
    title: 'The Sea Dragon of Dragonara Grotto',
    sardinianTitle: 'Sa Grotta de Dragonara (Capo Caccia)',
    domain: 'Karst Marine Grotto',
    summary: 'Coastal limestone sea cave near Alghero named in maritime folklore after the giant marine dragon said to sleep beneath the submerged stalactite chambers.',
    canonBoundaryRule: 'Maritime folklore and coastal cave geography.',
    prohibitedMisinterpretations: ['Subaquatic monster attacks'],
    associatedLocations: ['Capo Caccia', 'Alghero Marine Cliffs', 'Grotta di Nettuno']
  },
  {
    id: 'MYTH-27-LIMBARA-SERPENT',
    title: 'The Horned Serpent of Monte Limbara',
    sardinianTitle: 'Su Serpe Cornudu de Monte Limbara',
    domain: 'Folklore & Tradition',
    summary: 'Legendary giant horned serpent dwelling in the granite crags of Mount Limbara, guarding hidden streams and shepherd wells.',
    canonBoundaryRule: 'Gallurese pastoral legend.',
    prohibitedMisinterpretations: ['Magical serpentine venom with superpowers'],
    associatedLocations: ['Monte Limbara', 'Tempio Pausania', 'Gallura']
  }
];

export const ROUTE_AUDIT_VERIFICATION_RULES = {
  speedLimits: {
    walkingWithPacksKmh: 4.5,
    walkingInRainKmh: 3.8,
    regionalTrainAvgKmh: 65.0,
    motorYachtCruisingKnots: 11.5
  },
  bannedSlopPhrases: [
    { phrase: "safehouse", replacement: "licensed guesthouse" },
    { phrase: "cutter Sentina", replacement: "expedition motor yacht Sentina" },
    { phrase: "bio-resonance", replacement: "organic keratin fibre" },
    { phrase: "karst vent intelligence", replacement: "ordinary canine scent" },
    { phrase: "commander Geronimo", replacement: "Geronimo / sibling custodian" },
    { phrase: "supernatural tracking", replacement: "ordinary lead walking" }
  ]
};
