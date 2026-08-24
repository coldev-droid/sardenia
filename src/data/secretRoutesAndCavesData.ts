export interface SecretRouteOrCave {
  id: string;
  name: string;
  sardinianName: string;
  type: 'Karst Cave & Grotto' | 'Secret Mountain Pass & Trail' | 'Subterranean Sanctuary' | 'Volcanic & Forest Secret';
  location: string;
  province: 'Sassari' | 'Nuoro' | 'Oristano' | 'South Sardinia' | 'Cagliari';
  elevationOrDepth: string;
  historicalSignificance: string;
  operationalAccess: string;
  fieldHazards: string[];
}

export const SECRET_ROUTES_AND_CAVES: SecretRouteOrCave[] = [
  {
    id: 'SRV-01',
    name: 'Grotta di Nettuno (Neptune’s Grotto)',
    sardinianName: 'Grotta de Nettunu (Capo Caccia)',
    type: 'Karst Cave & Grotto',
    location: 'Capo Caccia limestone vertical sea cliffs, Alghero',
    province: 'Sassari',
    elevationOrDepth: 'Sea level entrance / Subterranean freshwater lake',
    historicalSignificance: 'Stunning marine stalactite and stalagmite grotto discovered by local fishermen in the 18th century, featuring the subterranean Lamarmora Lake and 9-meter crystal columns.',
    operationalAccess: 'Accessed via the 654-step cliffside staircase (Escala del Cabirol) or seasonal boat ferries from Alghero harbor.',
    fieldHazards: ['Slick limestone stairs', 'Tidal wave surges at sea entrance', 'Steep vertical cliff exposure']
  },
  {
    id: 'SRV-02',
    name: 'Gola di Gorropu (The Grand Canyon of Europe)',
    sardinianName: 'Gorropu (Supramonte Gorge)',
    type: 'Secret Mountain Pass & Trail',
    location: 'Supramonte limestone massif between Orgosolo and Dorgali',
    province: 'Nuoro',
    elevationOrDepth: 'Canyon floor depth up to 500 meters vertical limestone walls',
    historicalSignificance: 'Deepest limestone canyon in Italy; legendary hideout for outlaws, shepherds, and resistance fighters protected by sheer 500-meter vertical white cliffs.',
    operationalAccess: 'Remote trekking routes from Passo Sedda Addai or Dorgali shepherd paths; requires sturdy footwear and route familiarity.',
    fieldHazards: ['Massive boulder scrambling', 'Flash flood risks during autumn rains', 'Zero cellular signal']
  },
  {
    id: 'SRV-03',
    name: 'Grotta del Bue Marino (Marine Ox Grotto)',
    sardinianName: 'Grotta de su Búe Marinu',
    type: 'Karst Cave & Grotto',
    location: 'Gulf of Orosei marine cliffs',
    province: 'Nuoro',
    elevationOrDepth: 'Over 5km of explored subterranean freshwater and saltwater chambers',
    historicalSignificance: 'Ancient sanctuary of the Mediterranean monk seal (bue marino); features prehistoric Neolithic petroglyphs (dancing figures) near the underground freshwater lakes.',
    operationalAccess: 'Accessible exclusively by authorized sea boats from Cala Gonone marina.',
    fieldHazards: ['Submerged underwater siphons', 'Strict marine conservation boundary zones']
  },
  {
    id: 'SRV-04',
    name: 'Conca Fraigada (The Supramonte Ice Cave)',
    sardinianName: 'Sa Conca Fraigada (Supramonte)',
    type: 'Volcanic & Forest Secret',
    location: 'Supramonte high plateau near Oliena and Orgosolo',
    province: 'Nuoro',
    elevationOrDepth: 'High karst doline at 1,300 meters elevation',
    historicalSignificance: 'Natural high-altitude sinkhole where winter snowpack was historically packed into rock cavities to supply Sardinian mountain villages with ice throughout scorching summers.',
    operationalAccess: 'Strenuous high-altitude mule tracks from Corrasi peak trails.',
    fieldHazards: ['Sudden mountain mists', 'Rugged limestone lapiaz terrain', 'Sub-zero winter conditions']
  },
  {
    id: 'SRV-05',
    name: 'Grotta di Ispinigoli & Abyss of the Virgins',
    sardinianName: 'Grotta de Ispinigoli (Dorgali)',
    type: 'Karst Cave & Grotto',
    location: 'Dorgali limestone interior uplands',
    province: 'Nuoro',
    elevationOrDepth: 'Houses a 38-meter-tall giant column (one of Europe’s tallest) and a 60m vertical abyss',
    historicalSignificance: 'Used in ancient times for chthonic subterranean rituals; massive vertical karst cavern connecting deep aquifers.',
    operationalAccess: 'Guided tourist and speleological entry portals off the Dorgali-Orosei highway.',
    fieldHazards: ['Vertical abyss exposure without harness', 'High humidity and dripping condensation']
  },
  {
    id: 'SRV-06',
    name: 'Badde Salighes Forest & Victorian Villa Pass',
    sardinianName: 'Badde Salighes (Bolotana)',
    type: 'Secret Mountain Pass & Trail',
    location: 'Marghine mountain range near Bolotana and Macomer',
    province: 'Nuoro',
    elevationOrDepth: 'Mountain pass at 900 meters elevation amidst ancient beech forests',
    historicalSignificance: 'Remote valley featuring the historic Villa Piercy (built by British engineer Benjamin Piercy during railway construction), surrounded by secret smuggling trails used by 19th-century bandits.',
    operationalAccess: 'Winding forest gravel roads from Bolotana and Macomer interior routes.',
    fieldHazards: ['Dense autumn fog', 'Unpaved forest tracks prone to washouts', 'Wild boar crossings']
  },
  {
    id: 'SRV-07',
    name: 'Anghelu Ruju Prehistoric Necropolis',
    sardinianName: 'Sas Domos de Janas d\'Anghelu Ruju',
    type: 'Subterranean Sanctuary',
    location: 'Fertilia valley floor near Alghero',
    province: 'Sassari',
    elevationOrDepth: 'Subterranean rock-cut hypogea carved 6 to 10 meters beneath surface tuff',
    historicalSignificance: 'Largest necropolis of Domus de Janas in northern Sardinia (38 rock-cut tombs); features carved bull horns and sacred red ochre burial chambers.',
    operationalAccess: 'Main archaeological portal off the Alghero-Fertilia provincial road.',
    fieldHazards: ['Low subterranean ceilings', 'Uneven rock thresholds', 'Slippery stone ramps']
  },
  {
    id: 'SRV-08',
    name: 'Monte Limbara Granite Ridge & Smuggler Routes',
    sardinianName: 'Monte Limbara (Punta Balistreri)',
    type: 'Secret Mountain Pass & Trail',
    location: 'Gallura interior massif near Tempio Pausania',
    province: 'Sassari',
    elevationOrDepth: 'Summit peak at 1,362 meters elevation',
    historicalSignificance: 'Towering granite labyrinth of wind-carved pinnacles and hidden gorges used for centuries by charcoal burners, outlaws, and World War II partisans.',
    operationalAccess: 'Mountain forestry tracks ascending from Tempio Pausania and Calangianus.',
    fieldHazards: ['Severe granite boulder drop-offs', 'High winds', 'Complex unmarked ridge forks']
  },
  {
    id: 'SRV-09',
    name: 'Santa Cristina Subterranean Lunar Well',
    sardinianName: 'Su Putzu Sacru de Santa Cristina',
    type: 'Subterranean Sanctuary',
    location: 'Central basalt plateau near Paulilatino',
    province: 'Oristano',
    elevationOrDepth: 'Underground trapezoidal tholos water chamber descending 15 meters below ground',
    historicalSignificance: 'Nuragic architectural masterpiece where precision-cut basalt steps lead down to an underground spring aligned with 18.6-year lunar cycle standstills.',
    operationalAccess: 'Sanctuary archaeological site park 27km northeast of Oristano.',
    fieldHazards: ['Steep basalt steps without handrails', 'Submerged spring pool edge']
  },
  {
    id: 'SRV-10',
    name: 'Monte Arci Volcanic Obsidian Rifts',
    sardinianName: 'Monte Arci (Su Vitru Nieddu)',
    type: 'Volcanic & Forest Secret',
    location: 'Extinct volcanic massif overlooking the Campidano plain',
    province: 'Oristano',
    elevationOrDepth: 'Volcanic ridges rising up to 812 meters elevation (Punta Trebina)',
    historicalSignificance: 'Primary Mediterranean source of prehistoric black obsidian glass; riddled with volcanic fissures, ancient quarry trenches, and secret oak groves.',
    operationalAccess: 'Forest trails from Pau, Milis, and Albagiara.',
    fieldHazards: ['Razor-sharp obsidian flakes on trails', 'Dense macchia undergrowth', 'Isolated terrain']
  },
  {
    id: 'SRV-11',
    name: 'Grotta di sa Oche e Su Bentu',
    sardinianName: 'Sa Oche e Su Bentu (Loleo Valley)',
    type: 'Karst Cave & Grotto',
    location: 'Supramonte karst valley near Oliena',
    province: 'Nuoro',
    elevationOrDepth: 'Massive subterranean karst resurgence cave system over 30km in length',
    historicalSignificance: 'Legendary underground river system whose cavernous entrance emits roaring wind ("Su Bentu") and booming water echoes ("Sa Oche") during autumn storms.',
    operationalAccess: 'Restricted speleological entry; requires experienced guide and caving equipment.',
    fieldHazards: ['Sudden subterranean flood torrents', 'Total darkness', 'Sub-surface siphon lakes']
  },
  {
    id: 'SRV-12',
    name: 'Castello di Serravalle & Goceano Pass',
    sardinianName: 'Castellu de Serravalle (Bono)',
    type: 'Secret Mountain Pass & Trail',
    location: 'Goceano mountain pass overlooking the Tirso valley',
    province: 'Sassari',
    elevationOrDepth: 'Ridge fortress ruins perched at 650 meters elevation',
    historicalSignificance: 'Strategic medieval fortress of the Judges of Arborea guarding the mountain pass between Oristano and northern territories; secret escape tunnels cut into limestone bedrock.',
    operationalAccess: 'Steep walking trail from Bono village.',
    fieldHazards: ['Unsecured medieval masonry ruins', 'Steep crumbling cliff edges']
  }
];
