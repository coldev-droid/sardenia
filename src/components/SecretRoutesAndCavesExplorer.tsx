import React, { useState, useMemo } from 'react';
import {
  Compass,
  Search,
  Mountain,
  MapPin,
  ShieldAlert,
  Copy,
  Check,
  Footprints,
  Sparkles
} from 'lucide-react';
import { SECRET_ROUTES_AND_CAVES, type SecretRouteOrCave } from '../data/secretRoutesAndCavesData';

export default function SecretRoutesAndCavesExplorer() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const types = [
    'all',
    'Karst Cave & Grotto',
    'Secret Mountain Pass & Trail',
    'Subterranean Sanctuary',
    'Volcanic & Forest Secret'
  ];

  const filteredItems = useMemo(() => {
    return SECRET_ROUTES_AND_CAVES.filter((item) => {
      const matchesType = selectedType === 'all' || item.type === selectedType;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sardinianName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.historicalSignificance.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [selectedType, searchQuery]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Karst Cave & Grotto': return <Compass className="w-4 h-4 text-cyan-700" />;
      case 'Secret Mountain Pass & Trail': return <Mountain className="w-4 h-4 text-amber-700" />;
      case 'Subterranean Sanctuary': return <Sparkles className="w-4 h-4 text-indigo-700" />;
      case 'Volcanic & Forest Secret': return <Footprints className="w-4 h-4 text-emerald-700" />;
      default: return <Mountain className="w-4 h-4 text-stone-700" />;
    }
  };

  return (
    <div id="secret-routes-explorer" className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-800">
              Sardinian Underground, Karst Caves & Mountain Passes • Field Intelligence
            </div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight mt-1">
              Secret Routes, Karst Caves & Mountain Secrets
            </h1>
            <p className="text-sm text-stone-600 mt-1 max-w-3xl">
              Complete catalog of subterranean marine grottoes, vertical canyons, ancient smuggling passes, ice sinkholes, and prehistoric hypogea across Sardinia's rugged limestone and granite massifs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const summary = SECRET_ROUTES_AND_CAVES.map(i => `${i.name} (${i.type}) - Location: ${i.location} | Depth/Elevation: ${i.elevationOrDepth} | Significance: ${i.historicalSignificance}`).join('\n\n');
                handleCopy(summary, 'all-secret-routes-summary');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                copiedId === 'all-secret-routes-summary'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              {copiedId === 'all-secret-routes-summary' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedId === 'all-secret-routes-summary' ? 'Catalog Copied!' : 'Copy Full Caves & Routes'}</span>
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-6 pt-4 border-t border-stone-100">
          
          {/* Type Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 text-xs font-semibold">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedType === t
                    ? 'bg-cyan-800 text-white font-bold shadow-2xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {t === 'all' ? 'All Caves, Passes & Secrets' : t}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search caves, passes, hazards..."
              className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-cyan-800"
            />
          </div>
        </div>
      </div>

      {/* Grid of Caves & Routes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:border-stone-300 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                      {item.id}
                    </span>
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                      {item.province} Province
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-stone-900 tracking-tight mt-1">
                    {item.name}
                  </h3>
                  <p className="text-xs font-mono text-cyan-700 italic">
                    {item.sardinianName}
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-stone-100 border border-stone-200">
                  {getTypeIcon(item.type)}
                </div>
              </div>

              {/* Location & Elevation Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-stone-50 p-3 rounded-lg border border-stone-200/80">
                <div className="flex items-center gap-1.5 text-stone-700">
                  <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                  <span className="truncate" title={item.location}><strong>Location:</strong> {item.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-stone-700">
                  <Mountain className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate" title={item.elevationOrDepth}><strong>Depth/Elev:</strong> {item.elevationOrDepth}</span>
                </div>
              </div>

              {/* Historical Significance */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  Historical & Geological Significance
                </span>
                <p className="text-xs font-semibold text-stone-900 leading-snug">
                  {item.historicalSignificance}
                </p>
              </div>

              {/* Operational Access */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  Operational Access & Trekking Routes
                </span>
                <p className="text-xs text-stone-700 leading-relaxed font-serif italic">
                  "{item.operationalAccess}"
                </p>
              </div>

              {/* Field Hazards */}
              <div className="space-y-1.5 pt-1 border-t border-stone-100">
                <div className="text-[10px] font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-rose-600" />
                  Field Hazards & Precautions
                </div>
                <div className="flex flex-wrap gap-1">
                  {item.fieldHazards.map((hazard, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-rose-50 text-rose-800 px-2 py-0.5 rounded border border-rose-200 font-medium"
                    >
                      {hazard}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Copy Button */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-stone-500 font-bold px-2 py-0.5 bg-stone-100 rounded">
                {item.type}
              </span>

              <button
                onClick={() => {
                  const payload = `### ${item.name} (${item.sardinianName})\n- Type: ${item.type}\n- Location: ${item.location}\n- Province: ${item.province}\n- Depth/Elevation: ${item.elevationOrDepth}\n- Significance: ${item.historicalSignificance}\n- Access: ${item.operationalAccess}\n- Hazards: ${item.fieldHazards.join(', ')}`;
                  handleCopy(payload, item.id);
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  copiedId === item.id ? 'bg-cyan-700 text-white' : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
              >
                {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-cyan-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === item.id ? 'Copied' : 'Copy Cave Record'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
