import React, { useState } from 'react';
import { ShieldAlert, Search, AlertTriangle, CheckCircle2, ArrowRight, FileText, Sparkles, Filter } from 'lucide-react';

interface InspectorAlertLogProps {
  onJumpToManuscriptSection?: (sectionId: string) => void;
}

const HISTORICAL_DEVIATION_ALERTS = [
  {
    id: 'ALERT-01',
    inspectorId: 'INSP-11-ANTI-BORING',
    inspectorName: 'Anti-Boring & Kinetic Pacing Authority',
    manuscriptRef: 'Book 02, Chapter 1, Paragraph 4',
    severity: 'Warning',
    category: 'Pacing Stagnation',
    description: 'Detected potential conversational lag during guesthouse tea pouring. Enforced immediate sensory injection (basalt rain patter and sprained ankle compress) to maintain 88/100 adrenaline baseline.',
    status: 'Resolved & Canonized',
    timestamp: '2026-08-30 08:14'
  },
  {
    id: 'ALERT-02',
    inspectorId: 'INSP-07-AMULET-PHYSICS',
    inspectorName: 'Amulet Mechanics & Metaphysics Inspector',
    manuscriptRef: 'Book 02, Chapter 1, Paragraph 12',
    severity: 'Critical',
    category: 'Artifact Custody Breach Risk',
    description: 'Initial draft omitted triple padlocks on the grey transport crate. Intercepted under fail-closed rule RULE-OCCULT-01; required explicit mention of blue tamper-evident corner seal.',
    status: 'Fixed & Verified',
    timestamp: '2026-08-30 08:22'
  },
  {
    id: 'ALERT-03',
    inspectorId: 'INSP-12-SARDINIAN-MYTH',
    inspectorName: 'Topography & Sardinian Myth Authenticity',
    manuscriptRef: 'Book 02, Chapter 1, Paragraph 18',
    severity: 'Notice',
    category: 'Toponymic Precision',
    description: 'Verified railway transit time through Macomer junction and Alghero cutter Sentina rigging checks against maritime tide tables.',
    status: 'Verified',
    timestamp: '2026-08-30 08:35'
  },
  {
    id: 'ALERT-04',
    inspectorId: 'INSP-14-PROSE-CRAFT',
    inspectorName: 'MacKenzie Style & Prose Craft Authority',
    manuscriptRef: 'Book 02, Chapter 1, Paragraph 21',
    severity: 'Warning',
    category: 'Banned Slop Terminology',
    description: 'Flagged generic SaaS phrasing ("seamless experience"). Replaced with tactile masonry descriptors in accordance with strict anti-slop dictionary guidelines.',
    status: 'Resolved & Canonized',
    timestamp: '2026-08-30 08:50'
  }
];

export default function InspectorAlertLog({ onJumpToManuscriptSection }: InspectorAlertLogProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');

  const filteredAlerts = HISTORICAL_DEVIATION_ALERTS.filter(alert => {
    const matchesSearch = alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          alert.inspectorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          alert.manuscriptRef.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = selectedSeverity === 'ALL' || alert.severity === selectedSeverity;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-1.5 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-700 animate-pulse" />
            Inspector Alert Log & Historical Deviation Archive
          </div>
          <h3 className="text-base font-black text-stone-900 tracking-tight mt-0.5">
            Real-Time Swarm Correction & Manuscript Revision Tracker
          </h3>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 bg-amber-50 text-amber-900 rounded-lg border border-amber-200 font-bold">
            {filteredAlerts.length} Active Flags
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search flags, inspectors, or refs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/20"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'Critical', 'Warning', 'Notice'].map(sev => (
            <button
              key={sev}
              onClick={() => setSelectedSeverity(sev)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedSeverity === sev
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-3">
        {filteredAlerts.map(alert => {
          const sevColor = alert.severity === 'Critical' ? 'bg-rose-50 text-rose-800 border-rose-200' : alert.severity === 'Warning' ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-cyan-50 text-cyan-800 border-cyan-200';

          return (
            <div key={alert.id} className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2.5 hover:border-stone-400 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${sevColor}`}>
                    {alert.severity}
                  </span>
                  <span className="text-xs font-bold text-stone-900 font-mono">{alert.id} • {alert.inspectorName}</span>
                </div>
                <span className="text-[10px] font-mono text-stone-500">{alert.timestamp}</span>
              </div>

              <div className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-stone-500" />
                <span>Target: {alert.manuscriptRef}</span>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed">
                {alert.description}
              </p>

              <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-bold font-mono flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {alert.status}
                </span>

                <button
                  onClick={() => {
                    if (onJumpToManuscriptSection) onJumpToManuscriptSection(alert.manuscriptRef);
                  }}
                  className="px-3 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <span>Jump to Revision Section</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
