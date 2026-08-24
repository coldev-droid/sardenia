export interface SardinianFigureOrLegend {
  id: string;
  name: string;
  category: 'Legend & Folklore' | 'Judge & Ruler' | 'Artist & Writer' | 'Criminal & Bandit' | 'Singer & Musician' | 'Historical Monarch';
  historicalPeriod: string;
  birthDate: string;
  deathDate: string;
  locationOfLife: string;
  causeOfDeath: string;
  significance: string;
  legendOrHistoryDetails: string;
}

export const SARDINIAN_FIGURES_AND_LEGENDS: SardinianFigureOrLegend[] = [
  {
    id: 'LEG-01',
    name: 'Eleonora d’Arborea',
    category: 'Judge & Ruler',
    historicalPeriod: 'Medieval (c. 1347 – 1404)',
    birthDate: 'c. 1347',
    deathDate: 'c. 1404',
    locationOfLife: 'Oristano, Castle of Goceano, Judicate of Arborea',
    causeOfDeath: 'Presumed plague (Black Death) or natural causes',
    significance: 'Regnant Giudichessa of Arborea who promulgated the Carta de Logu, one of the most advanced legal codes in medieval Europe.',
    legendOrHistoryDetails: 'She successfully resisted the expansion of the Crown of Aragon for decades, uniting most of Sardinia under her enlightened legal system which granted women rights and protected local ecosystems.'
  },
  {
    id: 'LEG-02',
    name: 'Sa Femmina Accabadora',
    category: 'Legend & Folklore',
    historicalPeriod: 'Traditional Folk History (Centuries-old folklore)',
    birthDate: 'Mythological / Time Immemorial',
    deathDate: 'Faded with modernization in mid-20th century',
    locationOfLife: 'Gallura, Logudoro, and Barbagia interior villages',
    causeOfDeath: 'Cultural retirement / taboo obsolescence',
    significance: 'A venerated and feared figure in Sardinian rural folklore who practiced euthanasia for the terminally ill using a sacred olive wood mallet (su maccu).',
    legendOrHistoryDetails: 'Summed up by community consensus, she entered darkened sickrooms cloaked in black to end suffering quietly and mercifully, embodying an ancient pre-Christian covenant of mercy.'
  },
  {
    id: 'LEG-03',
    name: 'Gramsci, Antonio',
    category: 'Artist & Writer',
    historicalPeriod: 'Modern Era (1891 – 1937)',
    birthDate: 'January 22, 1891 (Ales, Oristano, Sardinia)',
    deathDate: 'April 27, 1937 (Rome, Italy)',
    locationOfLife: 'Ghilarza (Sardinia), Turin, Rome, and Fascist prisons (Turi)',
    causeOfDeath: 'Intracerebral hemorrhage exacerbated by years of severe imprisonment and chronic illness',
    significance: 'Philosopher, linguist, journalist, and founding member of the Communist Party of Italy; author of the Prison Notebooks (Quaderni del carcere).',
    legendOrHistoryDetails: 'Imprisoned by Mussolini’s fascist regime, Gramsci formulated revolutionary theories of cultural hegemony and civil society that shaped modern political philosophy worldwide.'
  },
  {
    id: 'LEG-04',
    name: 'Deledda, Grazia',
    category: 'Artist & Writer',
    historicalPeriod: 'Modern Era (1871 – 1936)',
    birthDate: 'September 27, 1871 (Nuoro, Sardinia)',
    deathDate: 'August 15, 1936 (Rome, Italy)',
    locationOfLife: 'Nuoro and Rome',
    causeOfDeath: 'Breast cancer',
    significance: 'First Italian woman and first Sardinian author to win the Nobel Prize in Literature (1926).',
    legendOrHistoryDetails: 'Her novels (such as *La Madre* and *Elias Portolu*) vividly captured the rugged, passionate, and fatalistic soul of Barbagia pastoral life, blending realism with myth.'
  },
  {
    id: 'LEG-05',
    name: 'Tolu, Giovanni',
    category: 'Criminal & Bandit',
    historicalPeriod: '19th Century (1822 – 1896)',
    birthDate: '1822 (Nuoro / Florinas, Sardinia)',
    deathDate: '1896 (Sassari province)',
    locationOfLife: 'Sardinian rugged mountains (Supramonte / Barbagia)',
    causeOfDeath: 'Natural causes in old age after receiving a royal pardon',
    significance: 'One of Sardinia’s most famous fugitive outlaws whose life story was immortalized by Enrico Costa.',
    legendOrHistoryDetails: 'After killing a rival in self-defense and resisting oppressive feudal landlords and corrupt gendarmes, Tolu lived decades on the run as a romanticized bandit before being pardoned.'
  },
  {
    id: 'LEG-06',
    name: 'Nigra, Maria (Maria Carta)',
    category: 'Singer & Musician',
    historicalPeriod: 'Contemporary (1934 – 1994)',
    birthDate: 'June 24, 1934 (Silorgus, Sardinia)',
    deathDate: 'September 22, 1994 (Rome, Italy)',
    locationOfLife: 'Silorgus, Rome, and international stages',
    causeOfDeath: 'Cancer',
    significance: 'Legendary Sardinian folk singer and actress who brought traditional *cantu a chiterra* and sacred lullabies to global prominence.',
    legendOrHistoryDetails: 'A cultural ambassador of Sardinia, she performed at Carnegie Hall and starred in films by Francis Ford Coppola (*The Godfather Part II*), preserving ancient Sardinian poetic heritage.'
  },
  {
    id: 'LEG-07',
    name: 'Mastino, Barisone II (Barisone I of Arborea)',
    category: 'Historical Monarch',
    historicalPeriod: 'Medieval (12th Century)',
    birthDate: 'Early 12th century',
    deathDate: 'c. 1186',
    locationOfLife: 'Oristano and Narbolia',
    causeOfDeath: 'Natural causes / political friction',
    significance: 'Giudice of Arborea who was crowned King of Sardinia (Rex Sardiniae) by Emperor Frederick Barbarossa in 1164.',
    legendOrHistoryDetails: 'He attempted to unite the fragmented giudicati of Sardinia under a single crown, navigating the intense geopolitical rivalries between Pisa, Genoa, and the Papacy.'
  },
  {
    id: 'LEG-08',
    name: 'Nino Visconti (Ugolino della Gherardesca’s Grandson)',
    category: 'Judge & Ruler',
    historicalPeriod: 'Medieval (13th Century - c. 1296)',
    birthDate: 'c. 1265 (Pisa / Cagliari)',
    deathDate: '1296 (Gallura / Rome)',
    locationOfLife: 'Giudicate of Gallura (Castle of Balaiana)',
    causeOfDeath: 'Fever / illness in exile',
    significance: 'Giudice of Gallura immortalized by Dante Alighieri in Canto VIII of the *Inferno*.',
    legendOrHistoryDetails: 'As a Guelph leader in Sardinia, Nino Visconti was Dante’s personal friend; Dante famously places him in Purgatory among the negligent rulers who repented at the hour of death.'
  },
  {
    id: 'LEG-09',
    name: 'Cagnetta (Giovanni Battista Cagnetta)',
    category: 'Criminal & Bandit',
    historicalPeriod: '17th Century Spanish Rule',
    birthDate: 'c. 1610 (Anglona region)',
    deathDate: '1648 (Executed in Sassari)',
    locationOfLife: 'Northern Sardinia mountains and hideouts',
    causeOfDeath: 'Execution by hanging and quartering by Spanish Inquisition/Viceregal courts',
    significance: 'Notorious bandit leader who led popular uprisings against Spanish feudal taxation and aristocratic abuse.',
    legendOrHistoryDetails: 'Considered by peasants as a champion of the poor who stole from Spanish tax collectors, Cagnetta’s rebellion shook the Spanish viceroyalty before his betrayal and public execution.'
  },
  {
    id: 'LEG-10',
    name: 'Nigra, Costantino (Costantino Nivola)',
    category: 'Artist & Writer',
    historicalPeriod: '20th Century (1911 – 1988)',
    birthDate: 'July 5, 1911 (Orani, Nuoro, Sardinia)',
    deathDate: 'May 6, 1988 (East Hampton, New York)',
    locationOfLife: 'Orani, Milan, Paris, and New York',
    causeOfDeath: 'Natural causes / stroke',
    significance: 'World-renowned Sardinian sculptor, modernist designer, and pioneer of sand-casting sculpture techniques.',
    legendOrHistoryDetails: 'Collaborating with architects like Le Corbusier and Eero Saarinen, Nivola infused his modernist sculptures with the archaic, earthy textures of Sardinian Nuragic stone.'
  }
];
