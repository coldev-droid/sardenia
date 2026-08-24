// Canon-Safe Character and Ordinary Canine Matrix Authority
// Aligned with Checkpoint 059 and strict anti-slop / anti-drift specifications

export interface CharacterMatrixEntry {
  id: string;
  name: string;
  identity: string;
  archetype: string;
  lockedState: string;
  eligibleAgency: string;
  custodyRole: {
    hasKey: boolean;
    keyStorage?: string;
    authorityLevel: string;
  };
  fieldNotes: string[];
  signatureQuote: string;
  // Enhanced Active Role Matrix Fields
  activeRole: {
    currentLocation: string;
    branchUnit: 'Branch Bravo (Oristano Base)' | 'Branch Alpha (Alghero Retrieval)';
    availabilityStatus: 'Active & Available' | 'Stationary / Propped Ankle' | 'In Transit (Rain)' | 'Resting / Caregiver' | 'Under Surveillance / Bounded';
    physicalCondition: string;
    hydrationFatigueLevel: string;
    assignedTasks: string[];
    directCompanions: string[];
    tacticalLimits: string;
    inventoryStatus: string;
    canineCareDetails?: {
      feedSchedule: string;
      coatCondition: string;
      leadProtocol: string;
      ordinarySensoryFocus: string;
    };
  };
}

export interface RejectedClaim {
  suppliedClaim: string;
  verdict: 'REJECT';
  reason: string;
}

export const CANON_SAFE_CHARACTERS: CharacterMatrixEntry[] = [
  {
    id: 'CHAR-01-GERONIMO',
    name: 'Geronimo',
    identity: 'Protagonist; Katia and Veerle\'s brother',
    archetype: 'Grounded Brother, Caregiver & Sibling Custodian',
    lockedState: 'One of three sibling custodians. Any key remains in a separate locked case. No invented military rank, command title, or unilateral command authority.',
    eligibleAgency: 'May make grounded family, nutrition, logistics, and hound care decisions only inside an approved chapter contract.',
    custodyRole: {
      hasKey: true,
      keyStorage: 'Separate locked case inside personal field luggage (never worn loose, on neck, or on lanyard)',
      authorityLevel: 'Sibling Custodian (1 of 3)'
    },
    fieldNotes: [
      'Stands at the gas range preparing hot chicory infusions and breakfast for the household',
      'Provides named, grounded human care for Mia and Tina (food, lead walking, drying wet coats)',
      'Receives and manages household marketing reserves from Maris',
      'Oversees street departure from guesthouse threshold without staging into public transit'
    ],
    signatureQuote: 'Lock one is secured with my key, lock two with Katia\'s, and lock three with Veerle\'s. None of us carries a loose key on our person. When human circumstances grow complicated, the simple duty of caring for a hound preserves a person\'s balance.',
    activeRole: {
      currentLocation: 'Licensed Guesthouse Kitchen, Oristano',
      branchUnit: 'Branch Bravo (Oristano Base)',
      availabilityStatus: 'Active & Available',
      physicalCondition: 'Rested, well-hydrated, watchful',
      hydrationFatigueLevel: 'Fatigue 15% • Hydrated (Hot Chicory Infusions)',
      assignedTasks: [
        'Maintain daily nutrition and hot meals for Katia and Veerle',
        'Direct named care routine for Mia & Tina (soup bones, towelling, twice-daily lead walks)',
        'Maintain visual contact on guesthouse courtyard threshold',
        'Guard custody case containing Family Key #1'
      ],
      directCompanions: ['Katia', 'Veerle', 'Mia', 'Tina'],
      tacticalLimits: 'Cannot leave Oristano base unattended while Katia remains stationary; cannot carry loose keys.',
      inventoryStatus: 'Key #1 in locked case inside field luggage; 2 spare leads, 3 clean linen towels, emergency marketing cash (65 EUR)'
    }
  },
  {
    id: 'CHAR-02-KATIA',
    name: 'Katia',
    identity: 'Botanist; Geronimo\'s sister',
    archetype: 'Botanist, Conservationist & Sibling Custodian',
    lockedState: 'Injured foot/ankle remains raised and managed in clean linen; she is active in consent, conservation, and strategic decisions. One of three sibling custodians.',
    eligibleAgency: 'Material decision-making is required; unsupported diagnoses and a sudden recovery are strictly prohibited.',
    custodyRole: {
      hasKey: true,
      keyStorage: 'Separate locked case inside personal leather satchel',
      authorityLevel: 'Sibling Custodian (1 of 3)'
    },
    fieldNotes: [
      'Confined to deep cane-backed armchair with propped, linen-wrapped foot on cushioned stool',
      'Maintains active intellectual and strategic authority over expedition boundaries',
      'Enforces strict non-custody parameters on André and mandates vessel safety over schedule',
      'Requires herbal infusions and rest; no miraculous rapid healing'
    ],
    signatureQuote: 'We do not take unnecessary risks to save a day of harbor dues. The boat is a means of transport and a winter shelter, nothing more. If the weather breaks bad, you pay the daily berth fee, double the spring lines, and stay tied to the pontoon.',
    activeRole: {
      currentLocation: 'Guesthouse Sitting Room (Armchair by Hearth), Oristano',
      branchUnit: 'Branch Bravo (Oristano Base)',
      availabilityStatus: 'Stationary / Propped Ankle',
      physicalCondition: 'Sprained left ankle securely bound in clean linen, elevated on cushioned footstool; pain managed without fever',
      hydrationFatigueLevel: 'Fatigue 35% • Requires scheduled rest & herbal compresses',
      assignedTasks: [
        'Strategic oversight of expedition financial and route envelopes',
        'Verification of botanical and archival records regarding Sinis peninsula flora',
        'Hold Family Key #2 inside personal leather satchel locked case',
        'Maintain oversight of household consensus protocols'
      ],
      directCompanions: ['Geronimo', 'Veerle', 'Mia', 'Tina'],
      tacticalLimits: 'Strictly stationary; no unassisted walking outdoors; must keep foot elevated above hip level.',
      inventoryStatus: 'Key #2 in locked case in leather satchel; botanical field notebook, herbal compresses, linen bandages'
    }
  },
  {
    id: 'CHAR-03-VEERLE',
    name: 'Veerle',
    identity: 'Linguist; Geronimo\'s sister',
    archetype: 'Linguist, Archival Scholar & Sibling Custodian',
    lockedState: 'One of three sibling custodians. She is not certified as a physicist, metallurgist, or bio-mineral cryptographer.',
    eligibleAgency: 'Language, historical records, and documentary analysis may be used only when the chapter and sources earn it.',
    custodyRole: {
      hasKey: true,
      keyStorage: 'Separate locked case inside personal pack',
      authorityLevel: 'Sibling Custodian (1 of 3)'
    },
    fieldNotes: [
      'Conducts dawn walk past the municipal building to verify peaceful civil conditions',
      'Supplies hand-drawn harbor chart warning of shallow banks near Alghero bastion wall',
      'Maintains clean wash water and linen towels for household hygiene',
      'Confirms the blue tamper-evident corner seal across the crate lid seam remains intact'
    ],
    signatureQuote: 'The municipal receiving room is undisturbed. The heavy support table remains firmly bolted to the masonry floor, and the grey transport crate rests securely with the blue tamper-evident corner seal intact across the lid seam.',
    activeRole: {
      currentLocation: 'Municipal Perimeter & Guesthouse Study, Oristano',
      branchUnit: 'Branch Bravo (Oristano Base)',
      availabilityStatus: 'Active & Available',
      physicalCondition: 'Alert, rested, observant',
      hydrationFatigueLevel: 'Fatigue 10% • Well-hydrated & nourished',
      assignedTasks: [
        'Periodic civil reconnaissance past Oristano municipal receiving room building',
        'Verify integrity of grey transport crate blue corner seal and municipal legal registry',
        'Transcribe Sardinian dialect glosses from Eleonora d\'Arborea Carta de Logu transcripts',
        'Hold Family Key #3 inside locked case in field rucksack'
      ],
      directCompanions: ['Geronimo', 'Katia', 'Mia', 'Tina'],
      tacticalLimits: 'Cannot enter municipal receiving room without full 3-sibling quorum; must not publish findings.',
      inventoryStatus: 'Key #3 in locked case inside rucksack; Carta de Logu archival transcript notes, magnifying loupe'
    }
  },
  {
    id: 'CHAR-04-MARIS',
    name: 'Maris',
    identity: 'Male; Inga\'s brother',
    archetype: 'Pragmatic Seafarer & Practical Logistical Lead',
    lockedState: 'Demonstrated practical route, load, fatigue, and risk judgment. He holds no artifact key.',
    eligibleAgency: 'Material budget, time, weather, transport, marina, and stop-limit arithmetic belongs on page when authorized and produces real choices.',
    custodyRole: {
      hasKey: false,
      authorityLevel: 'Vessel Pilot & Financial Controller (Zero Key Access)'
    },
    fieldNotes: [
      'Counts physical banknotes and coins on the table to budget regional rail fares and harbor fees',
      'Packs spare cordage to double spring lines against autumn surge chafing on the outer pontoon',
      'Enforces safety margin on diesel bunkering and signs harbor registers in person',
      'Leads the retrieval branch departing into the Oristano rain'
    ],
    signatureQuote: 'Let us review the figures before anyone steps out into the rain. We must keep our travel expenses strictly within the cash we have in hand. Second-class regional fares are modest, but every euro must be recorded.',
    activeRole: {
      currentLocation: 'En Route to Oristano Railway Station (Via Macomer to Alghero)',
      branchUnit: 'Branch Alpha (Alghero Retrieval)',
      availabilityStatus: 'In Transit (Rain)',
      physicalCondition: 'Walking in heavy autumn rain under waxed oilskin coat; carrying transit kitbag',
      hydrationFatigueLevel: 'Fatigue 20% • Walking pace steady',
      assignedTasks: [
        'Lead Branch Alpha to Alghero via Trenitalia regional line through Macomer junction',
        'Inspect vessel Sentina at outer visitor pontoon, double spring lines, check bilge water level',
        'Settle marina dues in cash with Alghero harbor master (max 180 EUR budget envelope)',
        'Maintain constant escort and visual perimeter over André'
      ],
      directCompanions: ['Inga', 'André'],
      tacticalLimits: 'Strictly zero artifact key custody; cannot board Sentina alone; abort voyage if swell exceeds 1.8m.',
      inventoryStatus: 'Branch cash reserve (220 EUR in notes/coins), rail tickets, tide tables, 20m braided polyester spring line'
    }
  },
  {
    id: 'CHAR-05-INGA',
    name: 'Inga',
    identity: 'Maris\'s sister; André\'s wife',
    archetype: 'Witness, Provisioner & Grounded Decision-Maker',
    lockedState: 'A witness and decision-maker whose trust in André remains damaged. She is not one of the three sibling key holders.',
    eligibleAgency: 'Her choices and boundaries must have consequences; she is never reduced to André\'s escort or passive passenger.',
    custodyRole: {
      hasKey: false,
      authorityLevel: 'Field Provisioner & Logistical Decision-Maker (Zero Key Access)'
    },
    fieldNotes: [
      'Packs durable provisions (durum wheat bread, pecorino cheese, tinned sardines, dried figs) in linen',
      'Packs woolen jerseys into waterproof oilcloth bundles to resist sea dampness',
      'Greases walking boots and checks gear for the rainy transit',
      'Shares direct responsibility for navigation choices and vessel safety'
    ],
    signatureQuote: 'We are retrieving our vessel and securing her lines, not proving anything to the sea. Every coin saved on food is a coin in reserve for harbor dues or marine supplies.',
    activeRole: {
      currentLocation: 'En Route to Oristano Railway Station (Via Macomer to Alghero)',
      branchUnit: 'Branch Alpha (Alghero Retrieval)',
      availabilityStatus: 'In Transit (Rain)',
      physicalCondition: 'Walking in heavy rain, greased leather boots, carrying waterproof food bundle',
      hydrationFatigueLevel: 'Fatigue 20% • Focused and vigilant',
      assignedTasks: [
        'Manage Branch Alpha food logistics and dry clothing reserves',
        'Maintain strict emotional and tactical boundaries with André during transit',
        'Assist Maris with harbor ledger verification and mooring line inspection at Alghero',
        'Validate weather forecast at station newsagent bulletin board'
      ],
      directCompanions: ['Maris', 'André'],
      tacticalLimits: 'Zero key access; no romantic reconciliation with André; immediate abort if André deviates from line of sight.',
      inventoryStatus: 'Oilcloth food bundle (pane carasau, aged pecorino, dried figs), first-aid kit, waterproof match cylinder'
    }
  },
  {
    id: 'CHAR-06-ANDRE',
    name: 'André',
    identity: 'Inga\'s husband; capable and persuasive, but secretive and progressively unreliable',
    archetype: 'Mechanical Expert under Surveillance & Bounded Yacht Laborer',
    lockedState: 'No receiving-room address, artifact key, custody authority, forgiveness, intimacy, or restored trust.',
    eligibleAgency: 'Any bounded yacht familiarity must be explicitly contracted and cannot expose protected people or records.',
    custodyRole: {
      hasKey: false,
      authorityLevel: 'Strict Surveillance / Bounded Deck Labor (Zero Key Access)'
    },
    fieldNotes: [
      'Stands quietly near doorway with hands in coat pockets, speaking only when addressed',
      'Bounded to deck gear, mooring lines, battery electrical voltage checks, and bilge bolt inspections',
      'Zero access to the municipal receiving room or relic secrets',
      'Turns up coat collar and steps out into the rain with kitbag in hand'
    ],
    signatureQuote: 'I will check the battery voltage and ensure the connections are clean before touching the starter. I will lift the floorboards the moment we unlock the companionway. I will do my duty, Katia.',
    activeRole: {
      currentLocation: 'En Route to Oristano Railway Station (Under Direct Maris/Inga Escort)',
      branchUnit: 'Branch Alpha (Alghero Retrieval)',
      availabilityStatus: 'Under Surveillance / Bounded',
      physicalCondition: 'Wet coat collar turned up against rain, carrying mechanical tool roll',
      hydrationFatigueLevel: 'Fatigue 25% • Tense, guarded, compliant under observation',
      assignedTasks: [
        'Inspect Sentina 24V starter battery bank with analog multimeter upon arrival',
        'Examine auxiliary bilge pump float switch and seafilt strainers for marine growth',
        'Secure deck cleats and check engine raw water intake seacocks under Maris\'s eye',
        'Strictly obey all proximity boundaries set by Inga and Maris'
      ],
      directCompanions: ['Maris', 'Inga'],
      tacticalLimits: 'Zero access to municipal building or any relic records; cannot step off vessel without permission.',
      inventoryStatus: 'Canvas mechanical tool roll (wrenches, feeler gauges, analog voltmeter), heavy rubber gloves (all tools inspected)'
    }
  },
  {
    id: 'CHAR-07-MIA',
    name: 'Mia',
    identity: 'Female, realistic non-magical dog',
    archetype: 'Loyal Field Companion under Named Care',
    lockedState: 'Healthy. Ordinary light-following, sleeping, eating, walking, barking, and scent behavior only.',
    eligibleAgency: 'Named human care, hydration, rest, leads, food, wet-coat care, and ordinary canine agency may be shown. Real canine choices affect human timing.',
    custodyRole: {
      hasKey: false,
      authorityLevel: 'Ordinary Domestic Animal (Named Care under Geronimo)'
    },
    fieldNotes: [
      'Rests muzzle on Geronimo\'s work boot by the gas stove and receives ear scratches',
      'Thumps tail against floorboards in canine contentment',
      'Walked on lead twice daily along quiet lanes behind the cathedral',
      'Fed cornmeal and soup bones from the local butcher; dried thoroughly with towels after rainy walks'
    ],
    signatureQuote: 'A faithful hunting hound resting by the hearth, nudging Geronimo\'s hand with a cool wet nose and keeping human routines grounded in ordinary care.',
    activeRole: {
      currentLocation: 'Guesthouse Kitchen & Rug by Hearth, Oristano',
      branchUnit: 'Branch Bravo (Oristano Base)',
      availabilityStatus: 'Resting / Caregiver',
      physicalCondition: 'Healthy, glossy short coat, ears alert to street traffic, paws dried clean',
      hydrationFatigueLevel: 'Hydrated • Fed morning cornmeal & simmered beef marrow broth',
      assignedTasks: [
        'Maintain calm domestic presence near Geronimo and Katia',
        'Ordinary auditory alert if strangers approach guesthouse gate (ordinary short bark)',
        'Scheduled afternoon lead walk along cathedral cloister lane with Geronimo'
      ],
      directCompanions: ['Geronimo', 'Katia', 'Veerle', 'Tina'],
      tacticalLimits: 'Strictly non-magical; no relic sensing, no subterranean cave detection, no prophecy.',
      inventoryStatus: 'Heavy leather walking collar with brass ring, braided cotton lead, wool sleeping blanket',
      canineCareDetails: {
        feedSchedule: 'Morning 07:30 (Cornmeal + beef broth), Evening 18:30 (Meat scraps + dry biscuit)',
        coatCondition: 'Clean & towel-dried after morning courtyard excursion',
        leadProtocol: 'Mandatory 1.5m braided lead outside guesthouse threshold',
        ordinarySensoryFocus: 'Smell of roasting coffee from next door; distant sound of cathedral bells'
      }
    }
  },
  {
    id: 'CHAR-08-TINA',
    name: 'Tina',
    identity: 'Female, realistic non-magical dog',
    archetype: 'Cautious Young Hound & Hearth Companion',
    lockedState: 'Tolerated the controlled road transfer; remains under ordinary hydration and rest rules.',
    eligibleAgency: 'No supernatural tracking, cave sensing, prophecy, relic reaction, or special breed claim without authority. Ordinary canine agency (warmth, smells, hesitation, rest) is preserved.',
    custodyRole: {
      hasKey: false,
      authorityLevel: 'Ordinary Domestic Animal (Named Care under Geronimo)'
    },
    fieldNotes: [
      'Methodically sniffs bottom trim of pantry cupboard with ticking claws against glazed tiles',
      'Curls up on rag rug by the brick hearth to seek warmth',
      'Dislikes walking in heavy downpours, requiring brisk walks and careful towelling',
      'Stretches paws and sighs in canine repose near Katia\'s chair'
    ],
    signatureQuote: 'A young hound with sensitive paws, methodical nose for kitchen corners, and natural instinct to curl near the fire away from autumn storms.',
    activeRole: {
      currentLocation: 'Guesthouse Hearth Rag Rug, Oristano',
      branchUnit: 'Branch Bravo (Oristano Base)',
      availabilityStatus: 'Resting / Caregiver',
      physicalCondition: 'Warm, curled on wool rug; paws slightly sensitive to damp cobbles',
      hydrationFatigueLevel: 'Hydrated • Rested after dry towel rubbing by Geronimo',
      assignedTasks: [
        'Provide gentle companionship beside Katia\'s propped footstool',
        'Pantry baseboard inspection (ordinary curious sniffing of pantry aroma)',
        'Seek warm spots as autumn rain lashes the windowpanes'
      ],
      directCompanions: ['Geronimo', 'Katia', 'Veerle', 'Mia'],
      tacticalLimits: 'Strictly non-magical; ordinary canine hesitation in cold rain; zero relic sensitivity.',
      inventoryStatus: 'Red nylon collar with license tag, padded lead, soft fleece drying towel',
      canineCareDetails: {
        feedSchedule: 'Morning 07:30 (Warm porridge + broth), Evening 18:30 (Butcher scraps)',
        coatCondition: 'Fully dry & brushed; curled near brick hearth radiator',
        leadProtocol: 'Walked in tandem with Mia or short solo yard excursions',
        ordinarySensoryFocus: 'Scent of dried rosemary hanging in kitchen; raindrops clicking on glass'
      }
    }
  }
];

export const REJECTED_CLAIMS: RejectedClaim[] = [
  {
    suppliedClaim: 'Mia tracks byssus bio-resonance',
    verdict: 'REJECT',
    reason: 'Magical-dog regression; the Series Bible explicitly forbids supernatural canine abilities.'
  },
  {
    suppliedClaim: 'Tina detects hidden karst vents as intelligence',
    verdict: 'REJECT',
    reason: 'Ordinary scent and hearing may be shown, but not supernatural route finding or structural reconnaissance.'
  },
  {
    suppliedClaim: 'Sentina is a cutter',
    verdict: 'REJECT',
    reason: 'Certified vessel: white multi-deck expedition motor yacht.'
  },
  {
    suppliedClaim: 'Veerle deciphers the twelfth amulet',
    verdict: 'REJECT',
    reason: 'Only the Obsidian Eye has been introduced; the other eleven remain architecture.'
  },
  {
    suppliedClaim: 'Named field trunk / brass / strongbox key cases',
    verdict: 'REJECT',
    reason: 'Separate locked cases are required; container materials are not certified.'
  },
  {
    suppliedClaim: 'Mandatory Capo Caccia grotto unit in G032',
    verdict: 'REJECT',
    reason: 'The next chapter boundary must be earned by its own route contract.'
  },
  {
    suppliedClaim: 'Twenty inspector hashes prove independence',
    verdict: 'REJECT',
    reason: 'Different hashes alone do not prove separate authority, calls, evidence, or reasoning.'
  }
];

export const CANON_SAFE_CHARACTER_MATRIX_JSON = {
  authority: "LOCK_CROWN_REPAIR_CHECKPOINT_059",
  matrix_type: "CANON_SAFE_CHARACTER_AND_CANINE_MATRIX",
  status: "CHECKPOINT_059_CERTIFIED",
  total_subjects: 8,
  subjects: CANON_SAFE_CHARACTERS.map(c => ({
    id: c.id,
    name: c.name,
    identity: c.identity,
    archetype: c.archetype,
    locked_state: c.lockedState,
    eligible_agency: c.eligibleAgency,
    custody_role: c.custodyRole,
    active_role_matrix: c.activeRole
  })),
  rejected_claims_before_training: REJECTED_CLAIMS,
  core_principles: {
    canine_agency: "Mia and Tina can choose, hesitate, bark, pull, investigate ordinary smells, seek warmth, refuse footing, need water, and affect human timing. They cannot sense relics or reveal secret routes.",
    financial_arithmetic: "Budget, elapsed time, weather, fuel, berth, fatigue, dog care, and abort limits belong in scenes only when their arithmetic produces a choice or consequence."
  }
};
