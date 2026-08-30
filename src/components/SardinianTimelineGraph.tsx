import React, { useState } from 'react';
import { Clock, Calendar, Sparkles, Landmark, ArrowRight, Check } from 'lucide-react';
import { SARDINIAN_MYTHS_DATABASE, SARDINIAN_LOCATIONS_DATABASE } from '../data/mythRouteData';

interface SardinianTimelineGraphProps {
  onSelectEraEpoch?: (epochYear: number) => void;
}

const TIMELINE_EPOCHS = [
  {
    year: -3200,
    eraName: 'Neolithic & Chalcolithic Era',
    title: 'Domus de Janas & Ancestral Rock Carvings',
    description: 'Over 2,800 subterranean rock-cut tombs carved into limestone cliffs; dawn of ritual weaving lore and fairy protector traditions.',
    associatedSites: ['Anghelu Ruju (Alghero)', 'Sedilo Tombs'],
    associatedMyths: ['Domus de Janas (Fairies & Prehistoric Rock Tombs)', 'The Golden Weaving Janas of Mount Albo']
  },
  {
    year: -1500,
    eraName: 'Middle Bronze Age (Nuragic Civilization)',
    title: 'Tholos Nuraghi & Shardana Seafaring Warriors',
    description: 'Construction of cyclopean stone towers, sacred wells, and heroic sandstone statuary at Mont\'e Prama; elite Mediterranean navigators.',
    associatedSites: ['Nuraghe Losa (Abbasanta)', 'Su Nuraxi (Barumini)', 'Tharros & Sinis Peninsula'],
    associatedMyths: ['The Shardana Warriors & Sea Peoples', 'The Stone Giants of Mont\'e Prama', 'Mari Olgu & the Mountain Giants']
  },
  {
    year: -800,
    eraName: 'Phoenician-Punic & Roman Era',
    title: 'Coastal Emporiums & Byssus Guild Roots',
    description: 'Establishment of maritime trading posts at Tharros and Sulki; mastery of Pinna Nobilis sea silk harvesting and sacred textile oaths.',
    associatedSites: ['Sant\'Antioco (Ancient Sulki)', 'Tharros & Sinis Peninsula'],
    associatedMyths: ['The Sacred Oath of Sea Byssus (Pinna Nobilis)', 'Masca and Cogas (Sardinian Witches & Vampires)']
  },
  {
    year: 1392,
    eraName: 'Judicate Era (Medieval Arborea)',
    title: 'Carta de Logu & Judge-Queen Eleonora d\'Arborea',
    description: 'Promulgation of one of Europe\'s most progressive legal codes in Sardinian dialect, establishing civil rights, women\'s property, and raptor conservation.',
    associatedSites: ['Oristano Municipal Receiving Room', 'San Gavino Monreale'],
    associatedMyths: ['Carta de Logu & Eleonora d\'Arborea', 'Mamuthones & Issohadores of Mamoiada']
  },
  {
    year: 1850,
    eraName: 'Traditional Pastoral & Ethnographic Era',
    title: 'Agro-Pastoral Rites & Accabadora Customs',
    description: 'Codification of traditional mask dances in Barbagia and compassionate palliative care customs across rural communities.',
    associatedSites: ['Mamoiada', 'Ottana', 'Gennargentu Massif'],
    associatedMyths: ['Sa Femmina Accabadora', 'Boes e Merdules of Ottana', 'Corriolos & S\'Urtzu of Paulilatino']
  },
  {
    year: 2026,
    eraName: 'Contemporary Expedition Era',
    title: 'The Byssus Knot Saga & Relic Custody',
    description: 'Modern archival preservation, rigorous topological tracking, and fail-closed cryptographic swarm auditing of the Eye of Adrastea.',
    associatedSites: ['Oristano Base', 'Alghero Marina Sentina'],
    associatedMyths: ['The Sacred Oath of Sea Byssus (Pinna Nobilis)', 'Carta de Logu & Eleonora d\'Arborea']
  }
];

export default function SardinianTimelineGraph({ onSelectEraEpoch }: SardinianTimelineGraphProps) {
  const [selectedEpochIndex, setSelectedEpochIndex] = useState<number>(3); // Default to Judicate Era (1392)

  const currentEpoch = TIMELINE_EPOCHS[selectedEpochIndex];

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-1.5 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-4 h-4 text-amber-700 animate-pulse" />
            Synchronized D3 / SVG Historical Manuscript & Myth Emergence Timeline
          </div>
          <h3 className="text-base font-black text-stone-900 tracking-tight mt-0.5">
            Chronological Epoch Scrubber & Archaeological Alignment
          </h3>
        </div>

        <div className="text-xs font-mono font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
          Selected Epoch: {currentEpoch.year < 0 ? `${Math.abs(currentEpoch.year)} BCE` : `${currentEpoch.year} CE`}
        </div>
      </div>

      {/* Interactive Timeline Scrubber Bar */}
      <div className="space-y-3">
        <div className="relative pt-6 pb-2 px-2">
          {/* Horizontal Track Line */}
          <div className="absolute top-9 left-4 right-4 h-1.5 bg-stone-200 rounded-full" />
          
          <div className="relative flex justify-between items-center z-10">
            {TIMELINE_EPOCHS.map((epoch, idx) => {
              const isSelected = selectedEpochIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedEpochIndex(idx);
                    if (onSelectEraEpoch) onSelectEraEpoch(epoch.year);
                  }}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                    isSelected
                      ? 'bg-amber-800 text-white ring-4 ring-amber-200 scale-110'
                      : 'bg-white text-stone-700 border-2 border-stone-300 group-hover:border-amber-500'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className={`text-[10px] font-mono mt-1.5 transition-colors ${
                    isSelected ? 'font-bold text-amber-900' : 'text-stone-500 group-hover:text-stone-900'
                  }`}>
                    {epoch.year < 0 ? `${Math.abs(epoch.year)} BCE` : epoch.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Epoch Detailed Inspector Card */}
      <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
              {currentEpoch.eraName}
            </span>
            <h4 className="text-base font-bold text-stone-900 mt-0.5">
              {currentEpoch.title}
            </h4>
          </div>
          <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-amber-100 text-amber-900 border border-amber-200">
            {currentEpoch.year < 0 ? `${Math.abs(currentEpoch.year)} BCE` : `${currentEpoch.year} CE`}
          </span>
        </div>

        <p className="text-xs text-stone-700 leading-relaxed">
          {currentEpoch.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-200/80 text-xs">
          <div>
            <span className="font-bold text-stone-900 uppercase tracking-wider text-[10px]">Associated Historical Sites:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {currentEpoch.associatedSites.map((site, sIdx) => (
                <span key={sIdx} className="px-2 py-0.5 rounded text-[10px] bg-white text-stone-800 border border-stone-200 font-medium">
                  {site}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="font-bold text-stone-900 uppercase tracking-wider text-[10px]">Emerging Mythologies & Codes:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {currentEpoch.associatedMyths.map((myth, mIdx) => (
                <span key={mIdx} className="px-2 py-0.5 rounded text-[10px] bg-amber-50 text-amber-900 border border-amber-200 font-medium">
                  {myth}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
