import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  MapPin,
  Shield,
  Copy,
  Check,
  Compass,
  Sparkles,
  Flame
} from 'lucide-react';
import { SARDINIAN_MYTHS_DATABASE, type SardinianMyth } from '../data/mythRouteData';

export default function SardinianMythologiesDatabase() {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const domains = [
    'all',
    'Nuragic & Prehistoric',
    'Judicate & Historical',
    'Folklore & Tradition',
    'Sacred Craft & Ecology'
  ];

  const filteredMyths = useMemo(() => {
    return SARDINIAN_MYTHS_DATABASE.filter((myth) => {
      const matchesDomain = selectedDomain === 'all' || myth.domain === selectedDomain;
      const matchesSearch =
        myth.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        myth.sardinianTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        myth.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        myth.associatedLocations.some(loc => loc.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesDomain && matchesSearch;
    });
  }, [selectedDomain, searchQuery]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case 'Nuragic & Prehistoric': return <Compass className="w-4 h-4 text-amber-700" />;
      case 'Judicate & Historical': return <Shield className="w-4 h-4 text-emerald-700" />;
      case 'Folklore & Tradition': return <Sparkles className="w-4 h-4 text-cyan-700" />;
      case 'Sacred Craft & Ecology': return <Flame className="w-4 h-4 text-rose-700" />;
      default: return <BookOpen className="w-4 h-4 text-stone-700" />;
    }
  };

  return (
    <div id="sardinian-mythologies-database" className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Sardinian Mythology, Cave Dragons, Janas & Legends Registry • Canonical Authority
            </div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight mt-1">
              Sardinian Mythologies & Legends Database ({SARDINIAN_MYTHS_DATABASE.length} Entries)
            </h1>
            <p className="text-sm text-stone-600 mt-1 max-w-3xl">
              Complete authoritative inventory of Sardinian folklore, cave dragons (S'Iscultone), fairy weavers (Janas), the merciful Accabadora, Shardana warriors, and sacred locations across the island.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const summary = SARDINIAN_MYTHS_DATABASE.map(m => `${m.title} (${m.sardinianTitle}) - Domain: ${m.domain} | Locations: ${m.associatedLocations.join(', ')} | Summary: ${m.summary}`).join('\n\n');
                handleCopy(summary, 'all-myths-catalog');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                copiedId === 'all-myths-catalog'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              {copiedId === 'all-myths-catalog' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedId === 'all-myths-catalog' ? 'Catalog Copied!' : 'Copy Full Myths Catalog'}</span>
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-6 pt-4 border-t border-stone-100">
          
          {/* Domain Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 text-xs font-semibold">
            {domains.map((dom) => (
              <button
                key={dom}
                onClick={() => setSelectedDomain(dom)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedDomain === dom
                    ? 'bg-amber-800 text-white font-bold shadow-2xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {dom === 'all' ? 'All Myth Domains' : dom}
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
              placeholder="Search myths, dragons, locations..."
              className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-800"
            />
          </div>
        </div>
      </div>

      {/* Myths Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredMyths.map((myth) => (
          <div
            key={myth.id}
            className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:border-stone-300 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {myth.id}
                    </span>
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                      {myth.domain}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-stone-900 tracking-tight mt-1">
                    {myth.title}
                  </h3>
                  <p className="text-xs font-mono text-amber-700 italic">
                    {myth.sardinianTitle}
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-stone-100 border border-stone-200">
                  {getDomainIcon(myth.domain)}
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  Mythological Summary & Folklore
                </span>
                <p className="text-xs font-semibold text-stone-900 leading-snug">
                  {myth.summary}
                </p>
              </div>

              {/* Associated Locations */}
              <div className="space-y-1.5 bg-stone-50 p-3 rounded-lg border border-stone-200/80">
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-stone-500" />
                  Geographic Locations & Sites
                </div>
                <div className="flex flex-wrap gap-1">
                  {myth.associatedLocations.map((loc, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-white text-stone-800 px-2 py-0.5 rounded border border-stone-300 font-medium shadow-2xs"
                    >
                      {loc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Canon Boundary & Misinterpretations */}
              <div className="space-y-2 pt-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-800 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-cyan-700" />
                  Canonical Preservation Boundary
                </div>
                <p className="text-xs text-stone-700 leading-relaxed font-serif italic">
                  "{myth.canonBoundaryRule}"
                </p>

                {myth.prohibitedMisinterpretations && myth.prohibitedMisinterpretations.length > 0 && (
                  <div className="text-[11px] text-rose-800 bg-rose-50 p-2 rounded border border-rose-200 space-y-0.5">
                    <span className="font-bold block uppercase text-[9px]">Prohibited Tropes / Misinterpretations:</span>
                    <ul className="list-disc list-inside space-y-0.5">
                      {myth.prohibitedMisinterpretations.map((rule, rIdx) => (
                        <li key={rIdx}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Copy Button */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-stone-500 font-bold px-2 py-0.5 bg-stone-100 rounded">
                {myth.domain}
              </span>

              <button
                onClick={() => {
                  const payload = `### ${myth.title} (${myth.sardinianTitle})\n- Domain: ${myth.domain}\n- Locations: ${myth.associatedLocations.join(', ')}\n- Summary: ${myth.summary}\n- Canon Rule: ${myth.canonBoundaryRule}`;
                  handleCopy(payload, myth.id);
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  copiedId === myth.id ? 'bg-amber-700 text-white' : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
              >
                {copiedId === myth.id ? <Check className="w-3.5 h-3.5 text-amber-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === myth.id ? 'Copied' : 'Copy Myth Record'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
