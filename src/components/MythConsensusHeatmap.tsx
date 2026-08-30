import React, { useState } from 'react';
import { Sparkles, ShieldCheck, BarChart3, Layers, CheckCircle2, Award, ArrowUpRight } from 'lucide-react';

interface MythConsensusHeatmapProps {
  onSelectRegion?: (regionName: string) => void;
}

const CONSENSUS_SECTORS = [
  { id: 'sec-1', sectorName: 'Oristano Municipal & Guesthouse Sector', confidence: 99.4, swarmVotes: '20 / 20 Verified', driftRisk: '0.1%', auditRigour: 'Maximum (Fail-Closed)', dominantMyth: 'Carta de Logu & Eye of Adrastea Custody' },
  { id: 'sec-2', sectorName: 'Alghero Marina & Cutter Sentina Sector', confidence: 98.8, swarmVotes: '20 / 20 Verified', driftRisk: '0.3%', auditRigour: 'High (Continuous)', dominantMyth: 'Anghelu Ruju & Coral Seafaring Traditions' },
  { id: 'sec-3', sectorName: 'Sinis Peninsula & Tharros Ruins Sector', confidence: 97.9, swarmVotes: '19 / 20 Verified', driftRisk: '0.6%', auditRigour: 'Intensive', dominantMyth: 'Phoenician-Nuragic Transition Shardana Lore' },
  { id: 'sec-4', sectorName: 'Barbagia Uplands & Mamoiada Sector', confidence: 96.5, swarmVotes: '19 / 20 Verified', driftRisk: '0.9%', auditRigour: 'High', dominantMyth: 'Mamuthones, Issohadores & Sa Accabadora' },
  { id: 'sec-5', sectorName: 'Sant\'Antioco Byssus Guild Vaults Sector', confidence: 98.2, swarmVotes: '20 / 20 Verified', driftRisk: '0.2%', auditRigour: 'Maximum', dominantMyth: 'Pinna Nobilis Sea Byssus Conservation Oath' },
  { id: 'sec-6', sectorName: 'Gennargentu Massif & Cave Tombs Sector', confidence: 95.8, swarmVotes: '18 / 20 Verified', driftRisk: '1.2%', auditRigour: 'Intensive', dominantMyth: 'Domus de Janas & S\'Iscultone Cave Dragon' }
];

export default function MythConsensusHeatmap({ onSelectRegion }: MythConsensusHeatmapProps) {
  const [selectedSectorId, setSelectedSectorId] = useState<string>('sec-1');

  const activeSector = CONSENSUS_SECTORS.find(s => s.id === selectedSectorId) || CONSENSUS_SECTORS[0];

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-1.5 text-cyan-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-cyan-600 animate-pulse" />
            D3 / SVG Myth Consensus & Narrative Consistency Heatmap
          </div>
          <h3 className="text-base font-black text-stone-900 tracking-tight mt-0.5">
            20-Agent Swarm Confidence & Historical Alignment Grid
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 text-xs font-mono font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Overall Swarm Consensus: 97.8%
          </span>
        </div>
      </div>

      <p className="text-xs text-stone-600 leading-relaxed">
        Visualizing the real-time confidence scores and consensus metrics across all geographical and mythological sectors of the manuscript. Sectors with confidence exceeding 95% are locked under verified historical canon.
      </p>

      {/* Heatmap Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CONSENSUS_SECTORS.map((sector) => {
          const isSelected = selectedSectorId === sector.id;
          const confColor = sector.confidence >= 98 ? 'bg-emerald-500' : sector.confidence >= 96 ? 'bg-cyan-500' : 'bg-amber-500';
          const confBg = sector.confidence >= 98 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : sector.confidence >= 96 ? 'bg-cyan-50 border-cyan-200 text-cyan-900' : 'bg-amber-50 border-amber-200 text-amber-900';

          return (
            <div
              key={sector.id}
              onClick={() => {
                setSelectedSectorId(sector.id);
                if (onSelectRegion) onSelectRegion(sector.sectorName);
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 ${
                isSelected 
                  ? 'border-stone-900 ring-2 ring-stone-900/10 bg-stone-50/80 shadow-xs' 
                  : 'border-stone-200 hover:border-stone-400 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${confBg}`}>
                  {sector.confidence}% Confidence
                </span>
                <span className="text-[10px] font-mono text-stone-500">{sector.swarmVotes}</span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-stone-900">{sector.sectorName}</h4>
                <p className="text-[11px] text-stone-600 mt-0.5 truncate font-medium">{sector.dominantMyth}</p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                <div className={`${confColor} h-full rounded-full transition-all`} style={{ width: `${sector.confidence}%` }} />
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] font-mono text-stone-500">
                <span>Drift Risk: <strong className="text-stone-900">{sector.driftRisk}</strong></span>
                <span className="text-cyan-700 font-bold">{sector.auditRigour}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Sector Deep Dive */}
      <div className="p-4 bg-stone-900 text-white rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 font-mono">
            Active Sector Consensus Dossier
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono">
            Verified Canonical
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold">{activeSector.sectorName}</h4>
            <p className="text-xs text-stone-300 mt-0.5">Primary Focus: {activeSector.dominantMyth}</p>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs">
            <div>
              <span className="text-stone-400 block text-[10px]">Swarm Confidence</span>
              <span className="text-emerald-400 font-bold text-base">{activeSector.confidence}%</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px]">Drift Risk</span>
              <span className="text-cyan-400 font-bold text-base">{activeSector.driftRisk}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
