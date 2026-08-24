import React, { useState, useMemo } from 'react';
import {
  Landmark,
  Search,
  Crown,
  BookOpen,
  Skull,
  Mic,
  Palette,
  Shield,
  Copy,
  Check,
  Calendar,
  MapPin,
  HeartPulse
} from 'lucide-react';
import { SARDINIAN_FIGURES_AND_LEGENDS, type SardinianFigureOrLegend } from '../data/sardinianFiguresAndLegendsData';

export default function SardinianFiguresAndLegendsExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'all',
    'Legend & Folklore',
    'Judge & Ruler',
    'Artist & Writer',
    'Criminal & Bandit',
    'Singer & Musician',
    'Historical Monarch'
  ];

  const filteredFigures = useMemo(() => {
    return SARDINIAN_FIGURES_AND_LEGENDS.filter((fig) => {
      const matchesCategory = selectedCategory === 'all' || fig.category === selectedCategory;
      const matchesSearch = 
        fig.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fig.significance.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fig.locationOfLife.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fig.legendOrHistoryDetails.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Legend & Folklore': return <BookOpen className="w-4 h-4 text-amber-700" />;
      case 'Judge & Ruler': return <Crown className="w-4 h-4 text-emerald-700" />;
      case 'Artist & Writer': return <Palette className="w-4 h-4 text-cyan-700" />;
      case 'Criminal & Bandit': return <Skull className="w-4 h-4 text-rose-700" />;
      case 'Singer & Musician': return <Mic className="w-4 h-4 text-indigo-700" />;
      case 'Historical Monarch': return <Shield className="w-4 h-4 text-amber-800" />;
      default: return <Landmark className="w-4 h-4 text-stone-700" />;
    }
  };

  return (
    <div id="sardinian-figures-explorer" className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Sardinian Historical Pantheon & Folklore Registry • B02_C01 Archive
            </div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight mt-1">
              Legends, Rulers, Artists & Outlaws of Sardinia
            </h1>
            <p className="text-sm text-stone-600 mt-1 max-w-3xl">
              Exhaustive biographical and historical catalog of Sardinia's legendary figures, judges (Giudici), rebel bandits, acclaimed writers, folk singers, and monarchs—including life coordinates, causes of death, and historical significance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const summary = SARDINIAN_FIGURES_AND_LEGENDS.map(f => `${f.name} (${f.category}) - Born: ${f.birthDate}, Died: ${f.deathDate} | ${f.significance}`).join('\n\n');
                handleCopy(summary, 'all-figures-summary');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                copiedId === 'all-figures-summary'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              {copiedId === 'all-figures-summary' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedId === 'all-figures-summary' ? 'Catalog Copied!' : 'Copy Full Catalog'}</span>
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-6 pt-4 border-t border-stone-100">
          
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 text-xs font-semibold">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white font-bold shadow-2xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat === 'all' ? 'All Figures & Legends' : cat}
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
              placeholder="Search figures, places, causes..."
              className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-800"
            />
          </div>
        </div>
      </div>

      {/* Figures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredFigures.map((fig) => (
          <div
            key={fig.id}
            className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:border-stone-300 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {fig.id}
                    </span>
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                      {fig.historicalPeriod}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-stone-900 tracking-tight mt-1">
                    {fig.name}
                  </h3>
                </div>

                <div className="p-2 rounded-lg bg-stone-100 border border-stone-200">
                  {getCategoryIcon(fig.category)}
                </div>
              </div>

              {/* Biographical Details Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-stone-50 p-3 rounded-lg border border-stone-200/80">
                <div className="flex items-center gap-1.5 text-stone-700">
                  <Calendar className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                  <span><strong>Life:</strong> {fig.birthDate} – {fig.deathDate}</span>
                </div>
                <div className="flex items-center gap-1.5 text-stone-700">
                  <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                  <span className="truncate" title={fig.locationOfLife}><strong>Where:</strong> {fig.locationOfLife}</span>
                </div>
                <div className="sm:col-span-2 flex items-center gap-1.5 text-stone-700 pt-1 border-t border-stone-200/60">
                  <HeartPulse className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span><strong>Death:</strong> {fig.causeOfDeath}</span>
                </div>
              </div>

              {/* Significance */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  Historical Significance & Fame
                </span>
                <p className="text-xs font-semibold text-stone-900 leading-snug">
                  {fig.significance}
                </p>
              </div>

              {/* Details / Legend Narrative */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  Legend & Historical Background
                </span>
                <p className="text-xs text-stone-700 leading-relaxed font-serif italic">
                  "{fig.legendOrHistoryDetails}"
                </p>
              </div>
            </div>

            {/* Footer Copy Button */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-stone-500 font-bold px-2 py-0.5 bg-stone-100 rounded">
                {fig.category}
              </span>

              <button
                onClick={() => {
                  const payload = `### ${fig.name} (${fig.category})\n- Period: ${fig.historicalPeriod}\n- Birth / Death: ${fig.birthDate} - ${fig.deathDate}\n- Location: ${fig.locationOfLife}\n- Cause of Death: ${fig.causeOfDeath}\n- Significance: ${fig.significance}\n- Details: ${fig.legendOrHistoryDetails}`;
                  handleCopy(payload, fig.id);
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  copiedId === fig.id ? 'bg-emerald-700 text-white' : 'bg-stone-900 hover:bg-stone-800 text-white'
                }`}
              >
                {copiedId === fig.id ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === fig.id ? 'Copied' : 'Copy Record'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
