// 12 Amulets of the Lock Crown of Sardinia
// Full Mechanical, Mineralogical, Magnetic, Trap, and Puzzle Alignment Authority

export interface AmuletEntry {
  id: string;
  number: number;
  name: string;
  nuragicTitle: string;
  status: 'Introduced & Sealed' | 'Archival Blueprint' | 'Mapped Site' | 'Subterranean Vault' | 'Marine Grotto';
  location: string;
  custodyState: string;
  sealIntegrity: string;
  mineralComposition: {
    primaryMaterial: string;
    secondaryElements: string;
    density: string; // g/cm³
    hardnessMohs: number;
    colorRefraction: string;
  };
  magneticProperties: {
    classification: 'Ferromagnetic' | 'Paramagnetic' | 'Diamagnetic' | 'Antiferromagnetic' | 'Lodestone Permanent';
    susceptibilityEmu: string;
    curieTemperature: string;
    polarityAxis: 'North-Seeking' | 'South-Seeking' | 'Bipolar Axial' | 'Inert Non-Magnetic' | 'Harmonic Flux';
    acousticResonanceHz: number;
  };
  trapMechanism: {
    trapName: string;
    triggerType: string;
    lethalHazard: string;
    disarmProtocol: string;
    failClosedState: string;
  };
  puzzleInterlocking: {
    crownSlotIndex: number;
    gearTeeth: number;
    alignmentDegree: number; // Target alignment angle
    harmonicPairId: string;
    crypticInscription: string;
    nuragicGlyphMeaning: string;
  };
  historicalLore: string;
}

export const AMULETS_COLLECTION: AmuletEntry[] = [
  {
    id: 'AMULET-01-OBSIDIAN-EYE',
    number: 1,
    name: 'Obsidian Eye of Adrastea',
    nuragicTitle: 'Sa Boghe de Monte Arci (The Voice of Monte Arci)',
    status: 'Introduced & Sealed',
    location: 'Municipal Receiving Room, Oristano',
    custodyState: 'Triple-Locked Municipal Deposit (Bolted Table, Grey Transport Crate, 3 Family Padlocks)',
    sealIntegrity: 'Blue tamper-evident corner seal INTACT; untouched plant-fibre cluster on historical linen wrapping beneath secondary transparent casing.',
    mineralComposition: {
      primaryMaterial: 'Monte Arci Volcanic Obsidian (Silica Glass 72%)',
      secondaryElements: 'Trace Magnetite micro-crystals, Feldspar spherulites',
      density: '2.45 g/cm³',
      hardnessMohs: 5.5,
      colorRefraction: 'Pitch Black with deep smoky amber translucency under strong directional light'
    },
    magneticProperties: {
      classification: 'Paramagnetic',
      susceptibilityEmu: '+1.42 × 10⁻⁴ emu/g',
      curieTemperature: '580°C (Magnetite inclusion threshold)',
      polarityAxis: 'Bipolar Axial',
      acousticResonanceHz: 432
    },
    trapMechanism: {
      trapName: 'Galvanic Mercury & Hydraulic Counterweight Siphon',
      triggerType: 'Asymmetrical weight release (<180g pressure differential)',
      lethalHazard: 'Breaches a pressurized mercury sump into the holding basin, sealing the floor vault with a 2-ton basalt slab.',
      disarmProtocol: 'Simultaneous insertion of three separate keys within 8 seconds while maintaining 210g tare weight on the balance plate.',
      failClosedState: 'Locks vault doors and drops steel shear pins into lock tumblers.'
    },
    puzzleInterlocking: {
      crownSlotIndex: 1,
      gearTeeth: 36,
      alignmentDegree: 0,
      harmonicPairId: 'AMULET-12-LODESTONE-CROWN',
      crypticInscription: 'Cando su Monte Arci fueddat, su mare de Tharros s\'ammentat (When Monte Arci speaks, the sea of Tharros remembers).',
      nuragicGlyphMeaning: 'The Watcher at the Gate • Primary Anchor of the Lock Crown'
    },
    historicalLore: 'Crafted during the Middle Bronze Age from high-silica glass quarried at the volcanic slopes of Monte Arci. It served as the primary optical focusing prism for the astronomical alignments of the Sinis sanctuary.'
  },
  {
    id: 'AMULET-02-BRONZE-SUN',
    number: 2,
    name: 'Bronze Sun Disc of Su Nuraxi',
    nuragicTitle: 'Su Sole de Barumini (The Sun of Barumini)',
    status: 'Archival Blueprint',
    location: 'Central Tholos Chamber (Theoretical Blueprint), Barumini',
    custodyState: 'Unrecovered • Historical Archival Records in Carta de Logu Manuscripts',
    sealIntegrity: 'Undisturbed subterranean context • UNESCO Archaeological Zone Protocol',
    mineralComposition: {
      primaryMaterial: 'Arsenical Tin-Bronze Alloy (Cu 88%, Sn 10%, As 2%)',
      secondaryElements: 'Trace Silver and Lead inclusions',
      density: '8.82 g/cm³',
      hardnessMohs: 4.0,
      colorRefraction: 'Lustrous Golden Patina with emerald malachite encrustations'
    },
    magneticProperties: {
      classification: 'Diamagnetic',
      susceptibilityEmu: '-0.85 × 10⁻⁶ emu/g',
      curieTemperature: 'N/A (Non-ferrous alloy)',
      polarityAxis: 'Inert Non-Magnetic',
      acousticResonanceHz: 528
    },
    trapMechanism: {
      trapName: 'Corbelled Basalt Keystone Collapse',
      triggerType: 'Direct axial pulling without clockwise rotation',
      lethalHazard: 'Releases a suspension ring holding 14 tons of dry-stone basalt vault blocks.',
      disarmProtocol: 'Rotate outer bronze bezel 120° clockwise until solstice chime aligns with noon sunbeam.',
      failClosedState: 'Keystone binds permanently in conical granite sleeve.'
    },
    puzzleInterlocking: {
      crownSlotIndex: 2,
      gearTeeth: 24,
      alignmentDegree: 30,
      harmonicPairId: 'AMULET-04-QUARTZ-MOON',
      crypticInscription: 'Su chelu abberit sa domo de su sole (The sky opens the house of the sun).',
      nuragicGlyphMeaning: 'Solar Solstice Vector • Outer Gear Driver'
    },
    historicalLore: 'Recovered in legend during the construction of the four-lobed central bastion of Su Nuraxi. Its perimeter is inscribed with 24 notches corresponding to the solar azimuths.'
  },
  {
    id: 'AMULET-03-BASALT-TORUS',
    number: 3,
    name: 'Basalt Torus of Tharros',
    nuragicTitle: 'S\'Aneddu de Sinis (The Ring of Sinis)',
    status: 'Mapped Site',
    location: 'Submerged Phoenician-Punic Breakwater, Sinis Peninsula',
    custodyState: 'Surveyed via Hydrographic Bathymetry; Unrecovered',
    sealIntegrity: 'Submerged in tidal surge shelf beneath marine calcification',
    mineralComposition: {
      primaryMaterial: 'Vesicular Olivine-Basalt (Pyroxene 45%, Plagioclase 40%)',
      secondaryElements: 'Magnetite grains, Marine Aragonite deposits',
      density: '2.95 g/cm³',
      hardnessMohs: 6.0,
      colorRefraction: 'Dull Charcoal Grey with greenish olivine crystalline inclusions'
    },
    magneticProperties: {
      classification: 'Ferromagnetic',
      susceptibilityEmu: '+3.85 × 10⁻³ emu/g',
      curieTemperature: '575°C',
      polarityAxis: 'North-Seeking',
      acousticResonanceHz: 216
    },
    trapMechanism: {
      trapName: 'Tidal Siphon Surge Well',
      triggerType: 'Removal during high spring tide without closing sluice valve',
      lethalHazard: 'Floods the access shaft with 4,000 liters of seawater in 12 seconds.',
      disarmProtocol: 'Open the sea-chest bypass petcock at dead low water slack tide.',
      failClosedState: 'Hydraulic lock seals the submerged stone chest indefinitely.'
    },
    puzzleInterlocking: {
      crownSlotIndex: 3,
      gearTeeth: 48,
      alignmentDegree: 60,
      harmonicPairId: 'AMULET-11-CORAL-HEART',
      crypticInscription: 'In fundu de mare reposat sa veridade (At the sea bottom rests the truth).',
      nuragicGlyphMeaning: 'Oceanic Gyre Anchor • Marine Polarity Stabilizer'
    },
    historicalLore: 'Positioned at the tip of the Sinis peninsula, this dense basalt torus was used by Nuragic and later Punic navigators as a magnetic navigation guide for the Gulf of Oristano.'
  },
  {
    id: 'AMULET-04-QUARTZ-MOON',
    number: 4,
    name: 'Quartz Moon Tear of Santa Cristina',
    nuragicTitle: 'Sa Làcrima de Luna (The Tear of the Moon)',
    status: 'Archival Blueprint',
    location: 'Sacred Water Well Vault, Paulilatino',
    custodyState: 'Theoretical Blueprint • Astronomical Survey Records',
    sealIntegrity: 'Subterranean spring basin alignment protocol',
    mineralComposition: {
      primaryMaterial: 'Hydrothermal Crystalline Quartz (SiO₂ 99.8%)',
      secondaryElements: 'Liquid-gas inclusion vacuoles, trace Lithium',
      density: '2.65 g/cm³',
      hardnessMohs: 7.0,
      colorRefraction: 'Optically Pure Milky-Clear with strong lunar polarization birefringence'
    },
    magneticProperties: {
      classification: 'Diamagnetic',
      susceptibilityEmu: '-0.50 × 10⁻⁶ emu/g',
      curieTemperature: 'N/A',
      polarityAxis: 'Inert Non-Magnetic',
      acousticResonanceHz: 864
    },
    trapMechanism: {
      trapName: 'Reflected Lunar Prism Detent',
      triggerType: 'Interference with the sacred well water mirror at full moon',
      lethalHazard: 'Trips a balanced stone counter-gate that drains the sacred aquifer.',
      disarmProtocol: 'Align the quartz prism apex with the major lunar standstill zenith angle (18.6-year cycle).',
      failClosedState: 'The mirror well drains into deep karst crevices.'
    },
    puzzleInterlocking: {
      crownSlotIndex: 4,
      gearTeeth: 28,
      alignmentDegree: 90,
      harmonicPairId: 'AMULET-02-BRONZE-SUN',
      crypticInscription: 'Abba chi naschet dae sa rocca santa (Water born from the sacred rock).',
      nuragicGlyphMeaning: 'Lunar Standstill Lens • Water Mirror Harmonizer'
    },
    historicalLore: 'Engineered with mathematical precision to capture the reflection of the moon through the trapezoidal stairway of the sacred well of Santa Cristina.'
  },
  {
    id: 'AMULET-05-ELECTRUM-SPIRAL',
    number: 5,
    name: 'Electrum Spiral of Nora',
    nuragicTitle: 'S\'Ispira de Nora (The Spiral of Nora)',
    status: 'Mapped Site',
    location: 'Submerged Temple Crypt, Nora Promontory',
    custodyState: 'Documented in Antiquarian Manuscripts; Unrecovered',
    sealIntegrity: 'Encased in ancient hydraulic pozzolanic cement',
    mineralComposition: {
      primaryMaterial: 'Natural Electrum Alloy (Gold 55%, Silver 42%, Copper 3%)',
      secondaryElements: 'Trace Platinum group metals',
      density: '15.6 g/cm³',
      hardnessMohs: 3.0,
      colorRefraction: 'Pale Golden Metallic with iridescent silver sheen'
    },
    magneticProperties: {
      classification: 'Diamagnetic',
      susceptibilityEmu: '-1.20 × 10⁻⁶ emu/g',
      curieTemperature: 'N/A',
      polarityAxis: 'Inert Non-Magnetic',
      acousticResonanceHz: 640
    },
    trapMechanism: {
      trapName: 'Galvanic Acid Ampoule Seal',
      triggerType: 'Electrolytic corrosion induced by non-conductive pry tools',
      lethalHazard: 'Shatters sealed glass vial of vitriolic acid, melting delicate gold gearing.',
      disarmProtocol: 'Bridge the grounding copper lugs with a 0.5-ohm silver jumper before unseating.',
      failClosedState: 'Gear teeth fuse into solid electrum lump.'
    },
    puzzleInterlocking: {
      crownSlotIndex: 5,
      gearTeeth: 30,
      alignmentDegree: 120,
      harmonicPairId: 'AMULET-10-SILVER-DIAL',
      crypticInscription: 'Sa currente de s\'oro no morit mai (The current of gold never dies).',
      nuragicGlyphMeaning: 'Electrical Continuity Link • Spiral Gear Step-Up'
    },
    historicalLore: 'Discovered in the pre-Phoenician foundations of Nora, demonstrating advanced proto-metallurgical knowledge of precious metal conductivity.'
  },
  {
    id: 'AMULET-06-BYSSUS-MATRIX',
    number: 6,
    name: 'Byssus Matrix of Sant\'Antioco',
    nuragicTitle: 'Sa Seda de Mare (The Sacred Sea Silk)',
    status: 'Archival Blueprint',
    location: 'Sulcis Lagoon Guild Archive, Sant\'Antioco',
    custodyState: 'Protected Cultural Legacy / Non-Material Heritage Records',
    sealIntegrity: 'Preserved in airtight desiccated cedar box in traditional custody',
    mineralComposition: {
      primaryMaterial: 'Pinna Nobilis Sea Byssus Protein Filaments (Organic Keratin/Collagen)',
      secondaryElements: 'Woven micro-threads of 24k hammered gold foil',
      density: '1.32 g/cm³',
      hardnessMohs: 2.0,
      colorRefraction: 'Luminous Golden-Bronze changing to deep olive in shadow'
    },
    magneticProperties: {
      classification: 'Diamagnetic',
      susceptibilityEmu: '-0.30 × 10⁻⁶ emu/g',
      curieTemperature: 'Decomposes above 180°C',
      polarityAxis: 'Inert Non-Magnetic (Zero Static Accumulation)',
      acousticResonanceHz: 1024
    },
    trapMechanism: {
      trapName: 'Hygroscopic Tension Filament Tripwire',
      triggerType: 'Sudden humidity change (>85% RH) or dry severing',
      lethalHazard: 'Fires spring-loaded obsidian needles into the retrieval chamber.',
      disarmProtocol: 'Apply pure cold-pressed mastic oil to the guide threads while maintaining 65% RH.',
      failClosedState: 'Filaments unravel instantly, destroying the cipher weave.'
    },
    puzzleInterlocking: {
      crownSlotIndex: 6,
      gearTeeth: 18,
      alignmentDegree: 150,
      harmonicPairId: 'AMULET-08-JASPER-COMPASS',
      crypticInscription: 'Fiscu de seda, ligàmine de vida (Thread of silk, binding of life).',
      nuragicGlyphMeaning: 'Organic Damper • Frictionless Bearing Cushion'
    },
    historicalLore: 'Woven by the legendary Master of Sea Byssus using ancient formulas that combine marine mussel filaments with gold wire to create an indestructible, non-sparking bearing.'
  },
  {
    id: 'AMULET-07-TRACHYTE-STELE',
    number: 7,
    name: 'Trachyte Stele of Monte d\'Accoddi',
    nuragicTitle: 'S\'Artare de Sassari (The Altar of Sassari)',
    status: 'Mapped Site',
    location: 'Ziggurat Foundation Chamber, Monte d\'Accoddi',
    custodyState: 'Subterranean Basal Layer; Unrecovered',
    sealIntegrity: 'Compacted prehistoric red ochre and clay matrix',
    mineralComposition: {
      primaryMaterial: 'Porphyritic Trachyte Sandstone (Feldspar 65%, Quartz 20%)',
      secondaryElements: 'Red Iron Oxide pigment (Hematite/Ochre)',
      density: '2.55 g/cm³',
      hardnessMohs: 6.0,
      colorRefraction: 'Warm Ochre Red with light mica sparkles'
    },
    magneticProperties: {
      classification: 'Antiferromagnetic',
      susceptibilityEmu: '+2.10 × 10⁻⁵ emu/g',
      curieTemperature: '675°C (Hematite phase)',
      polarityAxis: 'Harmonic Flux',
      acousticResonanceHz: 108
    },
    trapMechanism: {
      trapName: 'Inclined Ramp Sand-Choke Trap',
      triggerType: 'Disturbing the central sacrificial stone plate',
      lethalHazard: 'Releases 50 cubic meters of fine desert sand into the entrance corridor in 20 seconds.',
      disarmProtocol: 'Insert two trachyte counter-wedges into the lateral expansion joints simultaneously.',
      failClosedState: 'Entry ramp filled with solid compacted sand.'
    },
    puzzleInterlocking: {
      crownSlotIndex: 7,
      gearTeeth: 72,
      alignmentDegree: 180,
      harmonicPairId: 'AMULET-01-OBSIDIAN-EYE',
      crypticInscription: 'Terra cun terra, pedra cun pedra (Earth with earth, stone with stone).',
      nuragicGlyphMeaning: 'Foundation Keystone • Grounding Baseplate'
    },
    historicalLore: 'Carved for the Mesopotamian-style stepped pyramid altar of Monte d\'Accoddi, this stele acts as the massive gravitational balance for the entire Lock Crown assembly.'
  },
  {
    id: 'AMULET-08-JASPER-COMPASS',
    number: 8,
    name: 'Jasper Compass of Capo Caccia',
    nuragicTitle: 'Sa Bussola de sa Falza (The Cliff Compass)',
    status: 'Marine Grotto',
    location: 'Grotta dei Ricami Karst Chamber, Capo Caccia',
    custodyState: 'Subterranean Marine Karst Crevice; Unrecovered',
    sealIntegrity: 'Natural limestone stalactite calcification and sea-salt crust',
    mineralComposition: {
      primaryMaterial: 'Banded Jasper Chert (Microcrystalline Quartz 95%)',
      secondaryElements: 'Hematite banding, Goethite veins',
      density: '2.70 g/cm³',
      hardnessMohs: 7.0,
      colorRefraction: 'Banded Blood Red, Ochre Yellow, and Deep Umber'
    },
    magneticProperties: {
      classification: 'Paramagnetic',
      susceptibilityEmu: '+8.90 × 10⁻⁵ emu/g',
      curieTemperature: '350°C',
      polarityAxis: 'North-Seeking',
      acousticResonanceHz: 720
    },
    trapMechanism: {
      trapName: 'Karst Cave Stalactite Deadfall',
      triggerType: 'Acoustic shockwave (>90 dB) or metal hammer impact',
      lethalHazard: 'Triggers natural resonance fracture in overhead limestone stalactites.',
      disarmProtocol: 'Maintain strict silence; dampen all metal tools with sheep\'s wool padding.',
      failClosedState: 'Cave roof fractures, burying the grotto crevice.'
    },
    puzzleInterlocking: {
      crownSlotIndex: 8,
      gearTeeth: 32,
      alignmentDegree: 210,
      harmonicPairId: 'AMULET-06-BYSSUS-MATRIX',
      crypticInscription: 'Su bentu de tramuntana no ingannat s\'istella (The north wind does not deceive the star).',
      nuragicGlyphMeaning: 'Navigational Cardinal Pointer • Gyroscope Ring'
    },
    historicalLore: 'Suspended in an airtight limestone niche high above the surging waves of Capo Caccia, guiding ancient Nuragic navigators past the treacherous reefs of Porto Conte.'
  },
  {
    id: 'AMULET-09-SERPENTINITE-COIL',
    number: 9,
    name: 'Serpentinite Coil of Gennargentu',
    nuragicTitle: 'Su Serbiadore de sa Serra (The Mountain Serpent)',
    status: 'Subterranean Vault',
    location: 'Granite Fault Fissure, Punta La Marmora',
    custodyState: 'High Altitude Mountain Vault; Unrecovered',
    sealIntegrity: 'Sealed by natural tectonic mineral accretion',
    mineralComposition: {
      primaryMaterial: 'Antigorite Serpentinite (Hydrated Magnesium Silicate)',
      secondaryElements: 'Magnetite veins, Chrysotile fibers',
      density: '2.60 g/cm³',
      hardnessMohs: 3.5,
      colorRefraction: 'Mottled Deep Forest Green with silvery silky sheen'
    },
    magneticProperties: {
      classification: 'Ferromagnetic',
      susceptibilityEmu: '+5.12 × 10⁻³ emu/g',
      curieTemperature: '580°C',
      polarityAxis: 'South-Seeking',
      acousticResonanceHz: 360
    },
    trapMechanism: {
      trapName: 'Pressurized Geothermal Nitrogen Vent',
      triggerType: 'Rotational torque applied without venting the pressure chamber',
      lethalHazard: 'Discharges 120 PSI of sub-zero suffocating gas into the mountain chamber.',
      disarmProtocol: 'Open the needle vent valve with a bronze key and allow pressure equalization for 4 minutes.',
      failClosedState: 'Thermal shock shatters the serpentinite coil.'
    },
    puzzleInterlocking: {
      crownSlotIndex: 9,
      gearTeeth: 40,
      alignmentDegree: 240,
      harmonicPairId: 'AMULET-03-BASALT-TORUS',
      crypticInscription: 'In altu de sa serra s\'iscutat su fuidu (High on the ridge the fleeing wind is heard).',
      nuragicGlyphMeaning: 'Magnetic Flux Inductor • Torsional Spring'
    },
    historicalLore: 'Forged to harness the fierce mountain currents of the Gennargentu massif, anchoring the terrestrial magnetic lines that crisscross the island.'
  },
  {
    id: 'AMULET-10-SILVER-DIAL',
    number: 10,
    name: 'Silver Dial of Castelsardo',
    nuragicTitle: 'Su Quadrante de s\'Arzola (The Silver Clock)',
    status: 'Archival Blueprint',
    location: 'Castel Aragonese Under-Crypt, Castelsardo',
    custodyState: 'Medieval Judicate Inventory Reference; Unrecovered',
    sealIntegrity: 'Guarded by masonry walling inside fourteenth-century foundation',
    mineralComposition: {
      primaryMaterial: 'Native Sardinian Refined Silver (Ag 96%, Cu 4%)',
      secondaryElements: 'Niello enamel inlay (Silver Sulfide)',
      density: '10.49 g/cm³',
      hardnessMohs: 2.8,
      colorRefraction: 'Brilliant Mirror Polish with jet-black niello astronomical lines'
    },
    magneticProperties: {
      classification: 'Diamagnetic',
      susceptibilityEmu: '-1.81 × 10⁻⁶ emu/g',
      curieTemperature: 'N/A',
      polarityAxis: 'Inert Non-Magnetic',
      acousticResonanceHz: 960
    },
    trapMechanism: {
      trapName: 'Spring-Loaded Shear Blade Clockwork',
      triggerType: 'Forced advancement of the clock dial out of sequence',
      lethalHazard: 'Fires curved tempered spring steel blades across the dial face.',
      disarmProtocol: 'Align the retrograde pointer with the winter solstice lunar eclipse hour.',
      failClosedState: 'Internal escapement wheel shears its drive teeth.'
    },
    puzzleInterlocking: {
      crownSlotIndex: 10,
      gearTeeth: 60,
      alignmentDegree: 270,
      harmonicPairId: 'AMULET-05-ELECTRUM-SPIRAL',
      crypticInscription: 'S\'ora chi passat no torrat a coa (The hour that passes never returns).',
      nuragicGlyphMeaning: 'Chronological Escapement • Vernier Scale Ring'
    },
    historicalLore: 'Incorporating pre-Roman Nuragic astronomical gears, this exquisite silver dial was preserved through the Judicate of Torres to maintain precise calendar time.'
  },
  {
    id: 'AMULET-11-CORAL-HEART',
    number: 11,
    name: 'Coral Heart of Alghero',
    nuragicTitle: 'Su Coraddu de s\'Alighera (The Red Coral of Alghero)',
    status: 'Mapped Site',
    location: 'Underwater Limestone Ledge, Capo Galera',
    custodyState: 'Underwater Vault Coordinate; Unrecovered',
    sealIntegrity: 'Living Corallium Rubrum reef encrustation',
    mineralComposition: {
      primaryMaterial: 'Precious Red Coral (Calcium Carbonate / Calcite 85%, Magnesite 12%)',
      secondaryElements: 'Organic Carotenoid Pigment (Canthaxanthin), trace Iron',
      density: '2.68 g/cm³',
      hardnessMohs: 3.5,
      colorRefraction: 'Intense Crimson Scarlet with porcelain vitreous luster'
    },
    magneticProperties: {
      classification: 'Diamagnetic',
      susceptibilityEmu: '-0.38 × 10⁻⁶ emu/g',
      curieTemperature: 'Calcines at 825°C',
      polarityAxis: 'Inert Non-Magnetic',
      acousticResonanceHz: 576
    },
    trapMechanism: {
      trapName: 'Pneumatic Deep-Water Float Trap',
      triggerType: 'Severing the primary anchor stem without counter-buoyancy',
      lethalHazard: 'Triggers rapid ascent bag that launches the relic into a jagged ceiling fissure.',
      disarmProtocol: 'Attach three lead ballast weights of exactly 500g before cutting the living coral branch.',
      failClosedState: 'Relic pulverizes against the cave roof.'
    },
    puzzleInterlocking: {
      crownSlotIndex: 11,
      gearTeeth: 20,
      alignmentDegree: 300,
      harmonicPairId: 'AMULET-03-BASALT-TORUS',
      crypticInscription: 'Dae su sàmbene de su mare naschet sa vida (From the blood of the sea life is born).',
      nuragicGlyphMeaning: 'Biological Sealant • Shock Absorption Gasket'
    },
    historicalLore: 'Carved from a single massive branch of Corallium Rubrum harvested in antiquity off the red cliffs of Alghero, symbolizing the bloodline of the Nuragic coastal kings.'
  },
  {
    id: 'AMULET-12-LODESTONE-CROWN',
    number: 12,
    name: 'Lodestone Master Key of the Crown',
    nuragicTitle: 'Sa Crae de Sa Corona (The Crown Lodestone)',
    status: 'Archival Blueprint',
    location: 'Central Vault Sanctum (Theoretical Apex), Gennargentu Peak',
    custodyState: 'Theoretical Archetype • Ultimate Lock Crown Keystone',
    sealIntegrity: 'Unknown / Sealed in Primordial Lithic Vault',
    mineralComposition: {
      primaryMaterial: 'Natural Magnetized Magnetite (Fe₃O₄ 98%)',
      secondaryElements: 'Titanomagnetite lamellae, trace Maghemite',
      density: '5.18 g/cm³',
      hardnessMohs: 6.0,
      colorRefraction: 'Metallic Iron Black with natural magnetic polarized sheen'
    },
    magneticProperties: {
      classification: 'Lodestone Permanent',
      susceptibilityEmu: '+8.45 × 10⁻² emu/g (High Remanence)',
      curieTemperature: '585°C',
      polarityAxis: 'North-Seeking',
      acousticResonanceHz: 432
    },
    trapMechanism: {
      trapName: 'Super-Magnetic Repulsion Shear Gate',
      triggerType: 'Approaching with ferrous tools or incorrect polarity orientation',
      lethalHazard: 'Violently repels opposing magnets, tripping a 4-ton guillotine gate in the doorway.',
      disarmProtocol: 'Match exact north-south field vector and insert non-ferrous bronze damping sleeve.',
      failClosedState: 'Guillotine severs the access portal permanently.'
    },
    puzzleInterlocking: {
      crownSlotIndex: 12,
      gearTeeth: 12,
      alignmentDegree: 330,
      harmonicPairId: 'AMULET-01-OBSIDIAN-EYE',
      crypticInscription: 'Chie giughet sa crae regit sa terra (Whoever holds the key rules the land).',
      nuragicGlyphMeaning: 'Master Polarizer • Apex Key of the Twelve Amulets'
    },
    historicalLore: 'The legendary central keystone that binds all twelve amulets into the unified Lock Crown mechanism. When properly aligned with the other eleven relics, it unlocks the master geotechnical vault of ancient Sardinia.'
  }
];

export const AMULET_PUZZLE_RULES = {
  totalAmulets: 12,
  introducedCount: 1, // Strictly Obsidian Eye of Adrastea (B02_C01 canon)
  remainingArchitecture: 11,
  gearTotalToothSum: 420,
  masterResonanceChordHz: [108, 216, 360, 432, 528, 576, 640, 720, 864, 960, 1024],
  safeDisarmPrinciples: [
    "Never approach ferromagnetic amulets with unsheathed iron tools.",
    "Maintain exact tare weights on counterbalanced balance plates during removal.",
    "Observe astronomical solstice alignments before turning mechanical gear bezels.",
    "Keep all keys in separate locked cases under individual custodian authority."
  ]
};
