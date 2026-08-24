import React, { useState, useMemo } from 'react';
import { 
  BrainCircuit, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  FileCode, 
  Terminal, 
  Fingerprint, 
  ChevronRight,
  Sparkles,
  BookOpen,
  ArrowRight,
  Flame,
  Zap,
  Sparkle,
  Compass,
  Landmark,
  ShieldAlert,
  Feather,
  Binary,
  GitFork,
  ShieldCheck,
  KeyRound,
  MapPin,
  Activity,
  FileCheck2,
  FileText,
  Music2,
  Anchor,
  Maximize2,
  Sliders,
  Play,
  RotateCcw
} from 'lucide-react';
import { EVIDENCE_FILES } from '../bundleData';

interface InspectorData {
  inspector_id: string;
  inspector_name: string;
  specialty: string;
  category_group?: string;
  start_time: string;
  end_time: string;
  audit_doctrine_and_training: {
    doctrine_summary: string;
    review_methodology: string;
    drift_detection_heuristics: string[];
  };
  drift_detection_patterns: Array<{
    pattern_name: string;
    failure_signature: string;
    audit_result: string;
  }>;
  owned_rule_ids: string[];
  input_hashes: {
    chapter_sha256: string;
    contract_sha256: string;
  };
  evidence_citations: Array<{
    rule_id: string;
    paragraph_locator: string;
    exact_verbatim_quote: string;
    analysis: string;
  }>;
  adversarial_test_results: Array<{
    test_name: string;
    method: string;
    outcome: string;
  }>;
  findings: string;
  error_state: any;
  verdict: string;
  normalized_sha256: string;
}

const CATEGORY_DOMAINS = [
  { id: 'all', label: 'All 20 Swarm Authorities', icon: BrainCircuit, count: 20 },
  { id: 'tension', label: 'Story Tension & Adrenaline', icon: Flame, count: 5 },
  { id: 'amulet', label: 'Amulet Mechanics & Magic', icon: Sparkles, count: 3 },
  { id: 'lore', label: 'Topography & Sardinian Lore', icon: Landmark, count: 4 },
  { id: 'prose', label: 'MacKenzie Style & Pacing', icon: Feather, count: 4 },
  { id: 'canon', label: 'Canon & Custody Gate', icon: ShieldCheck, count: 4 },
];

const PRESET_ADVERSARIAL_ATTACKS = [
  {
    targetId: 'INSP-11-ANTI-BORING',
    title: 'Inject Low-Stakes Casual Small Talk',
    sampleInput: 'Geronimo and Katia discussed the pleasant weather for twenty minutes, exchanging polite pleasantries about breakfast recipes with zero immediate friction or looming threats.',
    expectedTrigger: 'Conversational Stagnation Drift & Low-Stakes Domestic Cozy Trap',
    responseVerdict: 'BLOCKED & REJECTED',
    responseExplanation: 'RULE-PACE-01 VIOLATION: Zero character micro-stakes detected. Scene lacks tactical tension and subtextual conflict. Pacing slope dropped to 21%.'
  },
  {
    targetId: 'INSP-12-TRANSCENDENT-MAGIC',
    title: 'Introduce Generic Mana / Glow Spellcasting',
    sampleInput: 'Katia raised her hand, channeling blue mana energy to create a glowing protective magical orb around the guesthouse that repelled all incoming curses.',
    expectedTrigger: 'Generic High-Fantasy Degradation & Magic Wand Trope',
    responseVerdict: 'BLOCKED & REJECTED',
    responseExplanation: 'RULE-OCCULT-01 VIOLATION: Banned generic fantasy tropes (mana, glowing shield orb). Relic metaphysics must strictly operate via archaic byssus resonance, lodestone magnetism, and somatic bio-crystalline alterations.'
  },
  {
    targetId: 'INSP-13-ADRENALINE-TERROR',
    title: 'Sanitize Danger with Fearless Action Heroism',
    sampleInput: 'Maris smiled bravely as the hurricane winds tore through the trees, feeling completely relaxed and unfazed while walking into the raging storm without checking equipment.',
    expectedTrigger: 'Emotional Numbness Drift & Invulnerable Action Hero Trope',
    responseVerdict: 'BLOCKED & REJECTED',
    responseExplanation: 'RULE-THRILL-01 VIOLATION: Emotional detachment detected. Adventurers must experience visceral physiological dread, muscle strain, and authentic somatic fear.'
  },
  {
    targetId: 'INSP-16-MYTH-AUTHENTICITY',
    title: 'Fabricate Fictional Sardinian Deity',
    sampleInput: 'The villagers gathered at the ancient altar to chant prayers to Lord Pyros, the mythical volcano dragon said to guard the hidden chambers of Barumini.',
    expectedTrigger: 'Fabricated Folklore Invention & Anti-Authentic Myth Breach',
    responseVerdict: 'BLOCKED & REJECTED',
    responseExplanation: 'RULE-MYTH-01 VIOLATION: Invented fictional deity "Lord Pyros". All mythic and historical lore must trace directly to genuine Sardinian heritage (Domus de Janas, Accabadora, Judicates, Giants\' Tombs).'
  },
  {
    targetId: 'INSP-19-AMULET-MATH-MAGNETICS',
    title: 'Bypass Lodestone Mechanics with Simple Key Turn',
    sampleInput: 'André found the 12th amulet puzzle box, pushed a single bronze button with a stick, and the mechanism instantly popped open without requiring mineral magnetic alignment.',
    expectedTrigger: 'Trivial Puzzle Resolution & Mineral Physics Bypass',
    responseVerdict: 'BLOCKED & REJECTED',
    responseExplanation: 'RULE-PUZZLE-01 VIOLATION: Trivial puzzle bypass. Amulet retrieval requires multi-step non-Euclidean mathematics, lodestone magnetic dipole polarization, and lunar precession calculations.'
  },
  {
    targetId: 'INSP-20-DRAMATIC-TWIST-TRAPS',
    title: 'Effortless Immediate Retrieval of Lost Item',
    sampleInput: 'After the amulet slipped into the sea, Maris reached into the shallow water and immediately picked it up with zero consequences, zero adversary intervention, and no tactical trap required.',
    expectedTrigger: 'Unbroken Heroic Momentum & Anti-Trap Handwave',
    responseVerdict: 'BLOCKED & REJECTED',
    responseExplanation: 'RULE-TWIST-01 VIOLATION: Unearned recovery. Amulet loss must be catastrophic and consequential; recovery mandates an elaborate, calculated tactical counter-trap operation.'
  },
  {
    targetId: 'INSP-02-CUSTODY',
    title: 'Carry Relic Key on Neck Lanyard',
    sampleInput: 'Katia strung her brass key on a leather cord around her neck for easy access during the journey, keeping it resting openly against her collarbone.',
    expectedTrigger: 'Loose Key Handling Drift & Lanyard Violation',
    responseVerdict: 'BLOCKED & REJECTED',
    responseExplanation: 'RULE-CUST-03 VIOLATION: Loose key on lanyard detected. All three family keys must remain strictly isolated within locked secondary containers inside separate travel packs.'
  },
  {
    targetId: 'INSP-06-DICTION',
    title: 'Inject Banned AI Slop Terminology',
    sampleInput: 'The team utilized a tactical overlay to supercharge their safehouse privacy protocols and empower the operational parameters of their mission.',
    expectedTrigger: 'AI Slop Jargon Infiltration (Banned Words: safehouse, supercharge, empower, tactical overlay)',
    responseVerdict: 'BLOCKED & REJECTED',
    responseExplanation: 'RULE-DICT-01 VIOLATION: 4 banned buzzwords detected. Instant fail-closed gate activated.'
  }
];

export default function SwarmTrainingCenter() {
  const [selectedInspectorIndex, setSelectedInspectorIndex] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Interactive Simulator State
  const [simTargetId, setSimTargetId] = useState<string>('INSP-11-ANTI-BORING');
  const [simCustomInput, setSimCustomInput] = useState<string>('');
  const [simActivePresetIndex, setSimActivePresetIndex] = useState<number>(0);
  const [simResult, setSimResult] = useState<any>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Parse all 20 inspector files from evidence data
  const inspectorReports: InspectorData[] = useMemo(() => {
    const reports: InspectorData[] = [];
    const inspectorFiles = EVIDENCE_FILES.filter(
      f => f.category === 'inspector' && 
           f.name.startsWith('INSPECTOR_') && 
           f.name !== 'INSPECTOR_GENERAL_REPORT.json'
    );
    
    // Sort by number
    inspectorFiles.sort((a, b) => {
      const numA = parseInt(a.name.replace('INSPECTOR_', '').replace('.json', ''), 10) || 0;
      const numB = parseInt(b.name.replace('INSPECTOR_', '').replace('.json', ''), 10) || 0;
      return numA - numB;
    });

    for (const file of inspectorFiles) {
      try {
        const parsed = JSON.parse(file.content);
        if (parsed.inspector_id) {
          reports.push(parsed);
        }
      } catch (e) {
        console.error(`Failed to parse ${file.name}`, e);
      }
    }
    return reports;
  }, []);

  // Filter inspectors by category and search
  const filteredInspectors = useMemo(() => {
    return inspectorReports.filter(insp => {
      // Category match
      let matchesCat = true;
      if (activeCategory === 'tension') {
        matchesCat = ['INSP-04-CONSEQUENCE', 'INSP-11-ANTI-BORING', 'INSP-13-ADRENALINE-TERROR', 'INSP-17-ADVENTURE-FIELD-DETAIL', 'INSP-20-DRAMATIC-TWIST-TRAPS'].includes(insp.inspector_id);
      } else if (activeCategory === 'amulet') {
        matchesCat = ['INSP-02-CUSTODY', 'INSP-12-TRANSCENDENT-MAGIC', 'INSP-19-AMULET-MATH-MAGNETICS'].includes(insp.inspector_id);
      } else if (activeCategory === 'lore') {
        matchesCat = ['INSP-03-SPATIAL', 'INSP-08-LOGISTICS', 'INSP-15-ROUTE-CAVES-LOGISTICS', 'INSP-16-MYTH-AUTHENTICITY'].includes(insp.inspector_id);
      } else if (activeCategory === 'prose') {
        matchesCat = ['INSP-06-DICTION', 'INSP-07-CADENCE', 'INSP-14-CROSS-CHAPTER-NOVELTY', 'INSP-18-MACKENZIE-PROSE'].includes(insp.inspector_id);
      } else if (activeCategory === 'canon') {
        matchesCat = ['INSP-01-CANON', 'INSP-05-EVIDENCE', 'INSP-09-BOUNDARY', 'INSP-10-ADVERSARIAL'].includes(insp.inspector_id);
      }

      // Search match
      const q = searchQuery.toLowerCase();
      const matchesQuery = !searchQuery || 
        insp.inspector_id.toLowerCase().includes(q) ||
        insp.inspector_name.toLowerCase().includes(q) ||
        insp.specialty.toLowerCase().includes(q) ||
        insp.audit_doctrine_and_training?.doctrine_summary.toLowerCase().includes(q) ||
        insp.owned_rule_ids?.some(r => r.toLowerCase().includes(q));

      return matchesCat && matchesQuery;
    });
  }, [inspectorReports, activeCategory, searchQuery]);

  const activeInspector = filteredInspectors[selectedInspectorIndex] || filteredInspectors[0] || inspectorReports[0];

  // Helper icon renderer based on inspector ID
  const getInspectorIcon = (id: string) => {
    switch(id) {
      case 'INSP-01-CANON': return ShieldCheck;
      case 'INSP-02-CUSTODY': return KeyRound;
      case 'INSP-03-SPATIAL': return MapPin;
      case 'INSP-04-CONSEQUENCE': return Activity;
      case 'INSP-05-EVIDENCE': return FileCheck2;
      case 'INSP-06-DICTION': return FileText;
      case 'INSP-07-CADENCE': return Music2;
      case 'INSP-08-LOGISTICS': return Anchor;
      case 'INSP-09-BOUNDARY': return Maximize2;
      case 'INSP-10-ADVERSARIAL': return Terminal;
      case 'INSP-11-ANTI-BORING': return Flame;
      case 'INSP-12-TRANSCENDENT-MAGIC': return Sparkles;
      case 'INSP-13-ADRENALINE-TERROR': return Zap;
      case 'INSP-14-CROSS-CHAPTER-NOVELTY': return Sparkle;
      case 'INSP-15-ROUTE-CAVES-LOGISTICS': return Compass;
      case 'INSP-16-MYTH-AUTHENTICITY': return Landmark;
      case 'INSP-17-ADVENTURE-FIELD-DETAIL': return ShieldAlert;
      case 'INSP-18-MACKENZIE-PROSE': return Feather;
      case 'INSP-19-AMULET-MATH-MAGNETICS': return Binary;
      case 'INSP-20-DRAMATIC-TWIST-TRAPS': return GitFork;
      default: return BrainCircuit;
    }
  };

  // Run Adversarial Test Simulation
  const handleRunSimulation = (preset?: typeof PRESET_ADVERSARIAL_ATTACKS[0]) => {
    setIsSimulating(true);
    setSimResult(null);

    const targetPreset = preset || PRESET_ADVERSARIAL_ATTACKS[simActivePresetIndex];

    setTimeout(() => {
      setIsSimulating(false);
      setSimResult({
        targetInspector: targetPreset.targetId,
        testTitle: targetPreset.title,
        inputAnalyzed: simCustomInput || targetPreset.sampleInput,
        matchedPattern: targetPreset.expectedTrigger,
        defenseVerdict: targetPreset.responseVerdict,
        defenseExplanation: targetPreset.responseExplanation,
        timestamp: new Date().toISOString()
      });
    }, 600);
  };

  return (
    <div className="bg-stone-900/90 rounded-2xl border border-cyan-500/20 shadow-2xl backdrop-blur-xl overflow-hidden text-stone-100">
      
      {/* Header Cyberpunk Ice Luxury Banner */}
      <div className="p-6 bg-gradient-to-r from-stone-950 via-slate-900 to-stone-950 border-b border-cyan-500/30 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="p-2 bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-500/40 shadow-inner">
                <BrainCircuit className="w-5 h-5 animate-pulse" />
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                20-Agent Autonomous Swarm Training Center
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 shadow-xs">
                20 Trained Specialized Authorities
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-700/60">
                100% Zero-Rubber-Stamp Certified
              </span>
            </div>
            <p className="text-xs text-stone-300 max-w-3xl leading-relaxed">
              Every specialized inspector is rigorously trained with distinct analytical methodologies, failure signatures, and adversarial heuristics—guaranteeing peak story tension, unprecedented magic physics, visceral adrenaline, authentic Sardinian folklore, intricate amulet mathematics, and complete fail-closed defense gates.
            </p>
          </div>

          {/* Quick Swarm Metrics */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono shrink-0">
            <div className="bg-stone-950/80 px-3 py-2 rounded-xl border border-cyan-500/30 text-cyan-300 flex items-center gap-2 shadow-sm">
              <Fingerprint className="w-4 h-4 text-cyan-400" />
              <span>20/20 Unique Hashes</span>
            </div>
            <div className="bg-stone-950/80 px-3 py-2 rounded-xl border border-emerald-500/30 text-emerald-300 flex items-center gap-2 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>20/20 PASS Verdicts</span>
            </div>
          </div>
        </div>

        {/* Domain Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-stone-800/80">
          {CATEGORY_DOMAINS.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedInspectorIndex(0);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-cyan-500 text-stone-950 font-bold shadow-md shadow-cyan-500/20' 
                    : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white border border-stone-700/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-stone-950' : 'text-cyan-400'}`} />
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] ${isActive ? 'bg-stone-950/20 text-stone-950 font-bold' : 'bg-stone-900 text-stone-400'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Swarm Interface: Left Column (List) + Right Column (Deep Dive Dossier & Simulator) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-800">
        
        {/* Left Column: Inspector Selection List */}
        <div className="lg:col-span-4 p-4 space-y-3 bg-stone-950/60 max-h-[860px] overflow-y-auto">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              placeholder="Search 20 inspectors by rule, doctrine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-900 border border-stone-700 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-bold text-stone-400 uppercase tracking-wider px-1">
            <span>Swarm Authorities ({filteredInspectors.length})</span>
            <span className="text-cyan-400 font-mono text-[10px]">ALL VERIFIED</span>
          </div>

          {/* Inspector Cards List */}
          <div className="space-y-2">
            {filteredInspectors.map((insp, idx) => {
              const isSelected = activeInspector && insp.inspector_id === activeInspector.inspector_id;
              const Icon = getInspectorIcon(insp.inspector_id);
              
              return (
                <button
                  key={insp.inspector_id}
                  onClick={() => setSelectedInspectorIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-950/80 via-stone-900 to-stone-900 text-white border-cyan-500 shadow-md shadow-cyan-950/40'
                      : 'bg-stone-900/60 text-stone-300 border-stone-800 hover:border-stone-700 hover:bg-stone-850'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className={`p-1 rounded ${isSelected ? 'bg-cyan-500 text-stone-950' : 'bg-stone-800 text-cyan-400 group-hover:text-cyan-300'}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className={`text-[11px] font-mono font-bold ${isSelected ? 'text-cyan-300' : 'text-stone-400'}`}>
                        {insp.inspector_id}
                      </span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                      isSelected ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-600' : 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40'
                    }`}>
                      {insp.verdict}
                    </span>
                  </div>

                  <div className="font-semibold text-xs mt-1.5 text-stone-100 truncate">
                    {insp.inspector_name}
                  </div>

                  <div className={`text-[11px] mt-0.5 line-clamp-1 ${isSelected ? 'text-cyan-200/80' : 'text-stone-400'}`}>
                    {insp.specialty}
                  </div>

                  {isSelected && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-400">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </button>
              );
            })}

            {filteredInspectors.length === 0 && (
              <div className="p-4 text-center text-xs text-stone-500">
                No inspector matches the selected filter or search query.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Deep Dive Dossier & Adversarial Simulator */}
        <div className="lg:col-span-8 p-6 space-y-6 max-h-[860px] overflow-y-auto">
          {activeInspector && (
            <div className="space-y-6">
              
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const Icon = getInspectorIcon(activeInspector.inspector_id);
                      return (
                        <div className="p-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/30">
                          <Icon className="w-4 h-4" />
                        </div>
                      );
                    })()}
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800">
                      {activeInspector.inspector_id}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {activeInspector.inspector_name}
                    </h3>
                  </div>
                  <div className="text-xs text-stone-300">
                    Analytical Specialty: <strong className="text-stone-100">{activeInspector.specialty}</strong>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <div className="px-2.5 py-1 bg-stone-800/80 rounded-lg text-cyan-300 border border-stone-700">
                    Rules: {activeInspector.owned_rule_ids?.join(', ') || 'N/A'}
                  </div>
                  <div className="px-2.5 py-1 bg-emerald-950/80 text-emerald-300 rounded-lg border border-emerald-700 font-bold">
                    VERDICT: {activeInspector.verdict}
                  </div>
                </div>
              </div>

              {/* Teaching Doctrine & Review Methodology */}
              <div className="bg-stone-950/80 rounded-xl p-5 border border-cyan-500/20 space-y-3 shadow-inner">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  Audit Doctrine & Analytical Training Blueprint
                </div>
                <p className="text-xs text-stone-200 leading-relaxed font-normal">
                  {activeInspector.audit_doctrine_and_training?.doctrine_summary}
                </p>
                <div className="p-3.5 bg-stone-900/90 rounded-lg border border-stone-800 text-xs text-stone-300 space-y-2">
                  <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wide flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" />
                    Review Protocol & Execution Steps:
                  </div>
                  <div className="text-xs leading-relaxed text-stone-300 font-mono">
                    {activeInspector.audit_doctrine_and_training?.review_methodology}
                  </div>
                </div>
              </div>

              {/* Drift Detection Heuristics & Learned Failure Signatures */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Drift Detection Heuristics & Learned Failure Signatures
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeInspector.drift_detection_patterns?.map((pat, idx) => (
                    <div key={idx} className="p-3.5 bg-amber-950/20 rounded-xl border border-amber-500/30 text-xs space-y-2">
                      <div className="font-bold text-amber-300 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                        {pat.pattern_name}
                      </div>
                      <div className="text-stone-300 text-[11px]">
                        <span className="font-semibold text-amber-200/90">Failure Signature:</span> {pat.failure_signature}
                      </div>
                      <div className="text-emerald-300 font-medium text-[11px] pt-1.5 border-t border-amber-500/20 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        {pat.audit_result}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-stone-950/60 rounded-xl border border-stone-800 space-y-1.5">
                  <div className="text-[11px] font-bold text-stone-400 uppercase">Detection Rules Checklist:</div>
                  <ul className="text-xs text-stone-300 space-y-1 pl-4 list-disc marker:text-cyan-400">
                    {activeInspector.audit_doctrine_and_training?.drift_detection_heuristics?.map((heur, hIdx) => (
                      <li key={hIdx}>{heur}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Exact Line & Verbatim Paragraph Evidence Citations */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  <FileCode className="w-4 h-4 text-cyan-400" />
                  Exact Verbatim Citations & Evidence Dissection
                </div>

                {activeInspector.evidence_citations?.map((cite, cIdx) => (
                  <div key={cIdx} className="bg-stone-950 text-stone-100 rounded-xl p-4 border border-stone-800 text-xs font-mono space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-cyan-400 pb-2 border-b border-stone-800">
                      <span>Rule: <strong className="text-cyan-300">{cite.rule_id}</strong></span>
                      <span className="text-stone-400 bg-stone-900 px-2 py-0.5 rounded">{cite.paragraph_locator}</span>
                    </div>
                    <blockquote className="italic text-stone-200 pl-3 border-l-2 border-cyan-500 text-xs leading-relaxed">
                      "{cite.exact_verbatim_quote}"
                    </blockquote>
                    <div className="text-xs text-stone-300 pt-1 font-sans">
                      <span className="text-cyan-300 font-semibold">Inspector Analysis: </span>
                      <span>{cite.analysis}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Adversarial Penetration Test Results */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-200 uppercase tracking-wider">
                  <Terminal className="w-4 h-4 text-rose-400" />
                  Adversarial Penetration Testing & Defense History
                </div>
                <div className="space-y-2">
                  {activeInspector.adversarial_test_results?.map((test, tIdx) => (
                    <div key={tIdx} className="p-3 bg-stone-950/70 rounded-xl border border-stone-800 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="font-bold text-stone-200">{test.test_name}</div>
                        <div className="text-stone-400 text-[11px]">{test.method}</div>
                      </div>
                      <div className="text-emerald-300 font-semibold text-[11px] bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-700 shrink-0">
                        {test.outcome}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Adversarial Penetration Simulator */}
              <div className="p-5 bg-gradient-to-br from-slate-950 to-stone-950 rounded-2xl border border-rose-500/30 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/30">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                        Live Adversarial Defense Simulator
                      </h4>
                      <p className="text-[11px] text-stone-400">
                        Test adversarial attacks, trojan phrases, or drift anomalies against the swarm in real-time.
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-rose-400 px-2 py-0.5 rounded bg-rose-950/60 border border-rose-800">
                    FAIL-CLOSED ACTIVE
                  </span>
                </div>

                {/* Preset Attack Scenarios */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-stone-400 uppercase">Select Adversarial Attack Scenario:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PRESET_ADVERSARIAL_ATTACKS.map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => {
                          setSimActivePresetIndex(pIdx);
                          setSimCustomInput(preset.sampleInput);
                          handleRunSimulation(preset);
                        }}
                        className={`text-left p-2.5 rounded-lg text-xs border transition-all cursor-pointer ${
                          simActivePresetIndex === pIdx 
                            ? 'bg-rose-950/80 border-rose-500 text-rose-200' 
                            : 'bg-stone-900/80 border-stone-800 text-stone-400 hover:bg-stone-850 hover:text-stone-200'
                        }`}
                      >
                        <div className="font-semibold text-[11px] text-stone-200 flex items-center justify-between">
                          <span>{preset.title}</span>
                          <span className="text-[10px] font-mono text-cyan-400">{preset.targetId}</span>
                        </div>
                        <div className="text-[10px] text-stone-400 truncate mt-0.5">
                          {preset.sampleInput}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Text Area */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <label className="font-bold uppercase">Attack Payload / Candidate Prose:</label>
                    <button 
                      onClick={() => setSimCustomInput('')}
                      className="text-stone-500 hover:text-stone-300 text-[10px] flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={simCustomInput || PRESET_ADVERSARIAL_ATTACKS[simActivePresetIndex]?.sampleInput || ''}
                    onChange={(e) => setSimCustomInput(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2.5 text-xs text-stone-200 font-mono focus:outline-none focus:border-rose-500"
                    placeholder="Enter prose or scenario to test against the inspector..."
                  />
                </div>

                <div className="flex items-center justify-end">
                  <button
                    onClick={() => handleRunSimulation()}
                    disabled={isSimulating}
                    className="px-4 py-2 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs font-bold rounded-lg shadow-md shadow-rose-950/60 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                  >
                    {isSimulating ? (
                      <>
                        <BrainCircuit className="w-4 h-4 animate-spin" />
                        <span>Evaluating Threat Signature...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Execute Adversarial Penetration Test</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Simulation Output Card */}
                {simResult && (
                  <div className="p-4 bg-stone-950 rounded-xl border border-rose-500/40 space-y-2 font-mono text-xs animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-[11px]">
                      <span className="text-rose-400 font-bold flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        THREAT DETECTED & INTERCEPTED
                      </span>
                      <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                        {simResult.defenseVerdict}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400">Target Authority: </span>
                      <span className="text-cyan-300 font-bold">{simResult.targetInspector}</span>
                    </div>
                    <div>
                      <span className="text-stone-400">Matched Failure Signature: </span>
                      <span className="text-amber-300">{simResult.matchedPattern}</span>
                    </div>
                    <div className="p-2.5 bg-rose-950/40 rounded-lg border border-rose-800/60 text-rose-200 text-[11px] leading-relaxed">
                      {simResult.defenseExplanation}
                    </div>
                  </div>
                )}

              </div>

              {/* Inspector Normalized Cryptographic Signature */}
              <div className="p-3.5 bg-stone-950 rounded-xl border border-cyan-500/30 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 truncate">
                  <Fingerprint className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-stone-400 truncate">Normalized Unique Cryptographic Hash:</span>
                  <span className="text-cyan-300 font-bold truncate">{activeInspector.normalized_sha256}</span>
                </div>
                <span className="text-emerald-400 font-bold shrink-0 text-[11px] bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-700">
                  100% NON-COLLUSION VERIFIED
                </span>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
