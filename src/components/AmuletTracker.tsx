import React, { useState, useMemo } from 'react';
import {
  Compass,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  AlertTriangle,
  RotateCw,
  Sliders,
  Copy,
  Check,
  Search,
  Filter,
  Sparkles,
  Layers,
  Activity,
  Flame,
  Waves,
  Zap,
  Info,
  CheckCircle2,
  XCircle,
  Eye,
  Key
} from 'lucide-react';
import {
  AMULETS_COLLECTION,
  AMULET_PUZZLE_RULES,
  type AmuletEntry
} from '../data/amuletsData';

export default function AmuletTracker() {
  const [selectedAmulet, setSelectedAmulet] = useState<AmuletEntry>(AMULETS_COLLECTION[0]);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Interactive Puzzle Simulator State
  const [bezelAngle, setBezelAngle] = useState<number>(0);
  const [testTareWeight, setTestTareWeight] = useState<number>(210);
  const [keySlotsInserted, setKeySlotsInserted] = useState<[boolean, boolean, boolean]>([true, true, true]);
  const [simulationResult, setSimulationResult] = useState<{
    status: 'ALIGNED' | 'TRAP_TRIGGERED' | 'UNALIGNED';
    message: string;
  }>({
    status: 'ALIGNED',
    message: 'Obsidian Eye alignment stable at 0° with triple keys inserted and 210g tare balance.'
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const filteredAmulets = useMemo(() => {
    return AMULETS_COLLECTION.filter(a => {
      const matchesFilter = 
        statusFilter === 'ALL' ||
        (statusFilter === 'SEALED' && a.status === 'Introduced & Sealed') ||
        (statusFilter === 'MAPPED' && (a.status === 'Mapped Site' || a.status === 'Marine Grotto')) ||
        (statusFilter === 'BLUEPRINT' && a.status === 'Archival Blueprint');

      const matchesSearch = 
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.nuragicTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.mineralComposition.primaryMaterial.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [statusFilter, searchQuery]);

  // Handle puzzle simulation evaluation
  const runPuzzleSimulation = (angle: number, tare: number, keys: [boolean, boolean, boolean]) => {
    setBezelAngle(angle);
    const targetAngle = selectedAmulet.puzzleInterlocking.alignmentDegree;
    const isAngleClose = Math.abs(angle - targetAngle) < 5 || Math.abs(angle - (targetAngle + 360)) < 5;
    const allKeysIn = keys[0] && keys[1] && keys[2];

    if (selectedAmulet.id === 'AMULET-01-OBSIDIAN-EYE') {
      if (!allKeysIn) {
        setSimulationResult({
          status: 'TRAP_TRIGGERED',
          message: 'FAIL-CLOSED: Missing family custodian key. Mercury siphon pressure valves locked.'
        });
      } else if (tare < 190 || tare > 230) {
        setSimulationResult({
          status: 'TRAP_TRIGGERED',
          message: 'TRAP TRIGGERED: Asymmetrical tare weight detected (<190g or >230g). Counterweight released.'
        });
      } else if (isAngleClose) {
        setSimulationResult({
          status: 'ALIGNED',
          message: 'PERFECT ALIGNMENT: 0° Solstice Axis locked. Harmonic resonance 432 Hz engaged safely.'
        });
      } else {
        setSimulationResult({
          status: 'UNALIGNED',
          message: `UNALIGNED: Bezel at ${angle}°. Target is ${targetAngle}°. Adjust dial gear.`
        });
      }
    } else {
      if (isAngleClose) {
        setSimulationResult({
          status: 'ALIGNED',
          message: `HARMONIC LOCK: Target angle ${targetAngle}° reached. Gear tooth mesh ${selectedAmulet.puzzleInterlocking.gearTeeth}T engaged.`
        });
      } else {
        setSimulationResult({
          status: 'UNALIGNED',
          message: `UNALIGNED: Bezel at ${angle}°. Required Nuragic alignment is ${targetAngle}°.`
        });
      }
    }
  };

  return (
    <div id="amulet-tracker" className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
              The 12 Amulets of Sardinia • Lock Crown Authority
            </div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight mt-1">
              Amulet Mechanics, Magnetic Properties & Puzzle Tracker
            </h1>
            <p className="text-sm text-stone-600 mt-1 max-w-3xl">
              Strict physical tracking of the 12 ancient Nuragic relics: mineral density, magnetic susceptibility, lethal trap triggers, and the 420-tooth Crown interlocking gear matrix.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleCopy(JSON.stringify(AMULETS_COLLECTION, null, 2), 'all-amulets-json')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                copiedId === 'all-amulets-json'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              {copiedId === 'all-amulets-json' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>12 Amulets Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy 12 Relic Specs</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Top Metric Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-stone-100 text-xs">
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Introduced Relics</span>
            <div className="text-lg font-black text-amber-900 mt-0.5">
              1 of 12 <span className="text-[11px] font-semibold text-emerald-700">(Obsidian Eye)</span>
            </div>
          </div>
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Remaining Architecture</span>
            <div className="text-lg font-black text-stone-800 mt-0.5">
              11 Amulets <span className="text-[11px] font-normal text-stone-500">(Unrecovered)</span>
            </div>
          </div>
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Crown Gear Teeth</span>
            <div className="text-lg font-black text-stone-800 mt-0.5">
              420 Teeth <span className="text-[11px] font-normal text-stone-500">(Master Mesh)</span>
            </div>
          </div>
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Master Resonance Chord</span>
            <div className="text-lg font-black text-stone-800 mt-0.5">
              432 Hz <span className="text-[11px] font-normal text-stone-500">(Fundamental)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid: Left Column = 12 Amulets Explorer; Right Column = Detailed Relic Inspector & Puzzle Alignment Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: List / Filter (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Filter Bar */}
          <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs space-y-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search relic name, mineral, or site..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs w-full focus:ring-stone-900 focus:border-stone-900 font-medium"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 text-xs">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  statusFilter === 'ALL' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                All (12)
              </button>
              <button
                onClick={() => setStatusFilter('SEALED')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  statusFilter === 'SEALED' ? 'bg-amber-700 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Sealed In Vault (1)
              </button>
              <button
                onClick={() => setStatusFilter('MAPPED')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  statusFilter === 'MAPPED' ? 'bg-cyan-800 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Mapped Sites (4)
              </button>
              <button
                onClick={() => setStatusFilter('BLUEPRINT')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                  statusFilter === 'BLUEPRINT' ? 'bg-stone-700 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Blueprints (7)
              </button>
            </div>
          </div>

          {/* 12 Amulets Scrollable List */}
          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredAmulets.map((amulet) => {
              const isSelected = selectedAmulet.id === amulet.id;
              const isSealed = amulet.status === 'Introduced & Sealed';

              return (
                <div
                  key={amulet.id}
                  onClick={() => {
                    setSelectedAmulet(amulet);
                    setBezelAngle(amulet.puzzleInterlocking.alignmentDegree);
                    runPuzzleSimulation(amulet.puzzleInterlocking.alignmentDegree, testTareWeight, keySlotsInserted);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-amber-50/90 border-amber-400 shadow-sm'
                      : 'bg-white hover:bg-stone-50 border-stone-200 shadow-2xs'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-stone-900 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                        {amulet.number}
                      </span>
                      <h4 className="text-xs font-bold text-stone-900">
                        {amulet.name}
                      </h4>
                    </div>

                    <p className="text-[11px] text-stone-500 font-serif italic pl-6">
                      {amulet.nuragicTitle}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1 pl-6">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-700 border border-stone-200">
                        {amulet.mineralComposition.primaryMaterial.split(' ')[0]}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono text-stone-600 bg-stone-100 border border-stone-200">
                        {amulet.magneticProperties.classification}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                        {amulet.puzzleInterlocking.gearTeeth}T
                      </span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                    isSealed
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : amulet.status.includes('Mapped')
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : 'bg-stone-100 text-stone-700 border border-stone-300'
                  }`}>
                    {amulet.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Relic Inspector & Puzzle Alignment Simulator (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Detailed Inspector Card */}
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
            
            {/* Inspector Top Row */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-700 text-white font-mono text-xs font-bold flex items-center justify-center">
                    {selectedAmulet.number}
                  </span>
                  <h2 className="text-xl font-black text-stone-900 tracking-tight">
                    {selectedAmulet.name}
                  </h2>
                </div>
                <p className="text-xs text-amber-900 font-serif italic mt-0.5">
                  {selectedAmulet.nuragicTitle}
                </p>
              </div>

              <button
                onClick={() => {
                  const dump = `### ${selectedAmulet.name} (Amulet #${selectedAmulet.number})\n- Mineral: ${selectedAmulet.mineralComposition.primaryMaterial}\n- Magnetic: ${selectedAmulet.magneticProperties.classification} (${selectedAmulet.magneticProperties.susceptibilityEmu})\n- Trap: ${selectedAmulet.trapMechanism.trapName}\n- Disarm: ${selectedAmulet.trapMechanism.disarmProtocol}\n- Crown Alignment: ${selectedAmulet.puzzleInterlocking.alignmentDegree}° (${selectedAmulet.puzzleInterlocking.gearTeeth}T)`;
                  handleCopy(dump, `amulet-${selectedAmulet.id}`);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  copiedId === `amulet-${selectedAmulet.id}`
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200'
                }`}
              >
                {copiedId === `amulet-${selectedAmulet.id}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === `amulet-${selectedAmulet.id}` ? 'Copied' : 'Copy Specs'}</span>
              </button>
            </div>

            {/* Custody & Seal Integrity Banner */}
            <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between font-bold text-stone-900">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-stone-600" />
                  Physical Location:
                </span>
                <span className="font-mono text-stone-800">{selectedAmulet.location}</span>
              </div>
              <div className="text-stone-700">
                <span className="font-semibold text-stone-900">Custody State: </span>
                {selectedAmulet.custodyState}
              </div>
              <div className="text-stone-600 text-[11px] pt-1 border-t border-stone-200/60 flex items-start gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <span>{selectedAmulet.sealIntegrity}</span>
              </div>
            </div>

            {/* Two-Column Mineralogical & Magnetic Properties */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              {/* Mineral Composition */}
              <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-200/80 space-y-1">
                <div className="font-bold text-amber-900 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <Layers className="w-3 h-3 text-amber-700" />
                  Mineral Composition
                </div>
                <div className="text-stone-900 font-semibold">{selectedAmulet.mineralComposition.primaryMaterial}</div>
                <div className="text-stone-600 text-[11px]">Inclusions: {selectedAmulet.mineralComposition.secondaryElements}</div>
                <div className="text-stone-500 font-mono text-[11px] pt-1">
                  Density: {selectedAmulet.mineralComposition.density} • Mohs: {selectedAmulet.mineralComposition.hardnessMohs}
                </div>
                <div className="text-stone-600 text-[11px] italic">
                  {selectedAmulet.mineralComposition.colorRefraction}
                </div>
              </div>

              {/* Magnetic Properties */}
              <div className="p-3 bg-cyan-50/50 rounded-lg border border-cyan-200/80 space-y-1">
                <div className="font-bold text-cyan-900 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <Zap className="w-3 h-3 text-cyan-700" />
                  Magnetic & Acoustic Physics
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900">{selectedAmulet.magneticProperties.classification}</span>
                  <span className="font-mono text-cyan-800 text-[11px] font-bold">{selectedAmulet.magneticProperties.polarityAxis}</span>
                </div>
                <div className="text-stone-600 font-mono text-[11px]">Susceptibility: {selectedAmulet.magneticProperties.susceptibilityEmu}</div>
                <div className="text-stone-600 font-mono text-[11px]">Curie Temp: {selectedAmulet.magneticProperties.curieTemperature}</div>
                <div className="text-cyan-950 font-bold text-[11px] pt-1 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-cyan-700" />
                  Resonance: {selectedAmulet.magneticProperties.acousticResonanceHz} Hz
                </div>
              </div>
            </div>

            {/* Trap Mechanism & Hazard Section */}
            <div className="p-3.5 bg-rose-50/60 rounded-lg border border-rose-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                  Trap: {selectedAmulet.trapMechanism.trapName}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-200 text-rose-900">
                  {selectedAmulet.trapMechanism.triggerType}
                </span>
              </div>
              <p className="text-stone-700 leading-relaxed">
                <span className="font-semibold text-rose-950">Lethal Hazard: </span>
                {selectedAmulet.trapMechanism.lethalHazard}
              </p>
              <div className="pt-1 border-t border-rose-200/80 text-rose-950">
                <span className="font-bold">Disarm Protocol: </span>
                <span className="text-stone-800">{selectedAmulet.trapMechanism.disarmProtocol}</span>
              </div>
            </div>

            {/* Historical Lore & Cryptic Inscription */}
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs space-y-1">
              <span className="font-bold text-stone-800 text-[11px]">Sardinian Inscription & Lore:</span>
              <p className="text-stone-700 font-serif italic">"{selectedAmulet.puzzleInterlocking.crypticInscription}"</p>
              <p className="text-stone-600 text-[11px] mt-1">{selectedAmulet.historicalLore}</p>
            </div>
          </div>

          {/* Interactive Lock Crown Puzzle & Alignment Simulator */}
          <div className="bg-stone-900 text-white rounded-xl border border-stone-800 p-5 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Interactive Lock Crown Alignment & Magnetic Bonding Simulator
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const targetAngle = selectedAmulet.puzzleInterlocking.alignmentDegree;
                    setBezelAngle(targetAngle);
                    setTestTareWeight(210);
                    setKeySlotsInserted([true, true, true]);
                    runPuzzleSimulation(targetAngle, 210, [true, true, true]);
                  }}
                  className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-[11px] flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Auto-Solve / Calibrate</span>
                </button>
                <span className="text-xs font-mono text-amber-300">
                  {selectedAmulet.puzzleInterlocking.gearTeeth}T
                </span>
              </div>
            </div>

            {/* CSS Animated Magnetic Bonding & Crystal Lattice Visualizer */}
            <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 flex flex-col sm:flex-row items-center justify-around gap-4">
              
              {/* Rotating Bezel / Lock Gear Ring Animation */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Outer Magnetic Field Ring */}
                <div className={`absolute inset-0 rounded-full border-2 border-dashed ${
                  simulationResult.status === 'ALIGNED' ? 'border-emerald-400 animate-magnetic' : 'border-cyan-500/60 animate-magnetic'
                }`}></div>
                
                {/* Middle Rotating Crown Gear */}
                <div 
                  className={`absolute inset-2 rounded-full border-4 border-amber-500/80 flex items-center justify-center ${
                    simulationResult.status === 'ALIGNED' ? 'animate-lock-spin' : ''
                  }`}
                  style={{ transform: `rotate(${bezelAngle}deg)` }}
                >
                  <div className="w-2 h-2 bg-amber-400 rounded-full absolute top-1"></div>
                </div>

                {/* Center Crystal Core with Vibrate / Glow Animation */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-black text-xs shadow-lg ${
                  simulationResult.status === 'ALIGNED' 
                    ? 'bg-emerald-500 text-stone-950 animate-crystal shadow-emerald-500/50' 
                    : simulationResult.status === 'TRAP_TRIGGERED'
                    ? 'bg-rose-600 text-white animate-bounce'
                    : 'bg-cyan-900 text-cyan-200 border border-cyan-700'
                }`}>
                  {selectedAmulet.number}
                </div>
              </div>

              {/* Live Mineral & Magnetic Bonding Telemetry */}
              <div className="space-y-1.5 text-xs text-stone-300 flex-1 w-full">
                <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  Mineral Bonding & Flux Status
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-1">
                  <span className="text-stone-400">Mineral Core:</span>
                  <span className="font-semibold text-stone-100">{selectedAmulet.mineralComposition.primaryMaterial}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-1">
                  <span className="text-stone-400">Magnetic Susceptibility:</span>
                  <span className="font-mono text-cyan-300">{selectedAmulet.magneticProperties.susceptibilityEmu}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-1">
                  <span className="text-stone-400">Harmonic Resonance:</span>
                  <span className="font-mono text-amber-300">{selectedAmulet.magneticProperties.acousticResonanceHz} Hz</span>
                </div>
                <div className="flex justify-between pt-0.5 font-bold">
                  <span className="text-stone-400">Bonding State:</span>
                  <span className={simulationResult.status === 'ALIGNED' ? 'text-emerald-400' : 'text-amber-400'}>
                    {simulationResult.status === 'ALIGNED' ? 'LOCKED & HARMONIZED' : 'SEEKING ALIGNMENT'}
                  </span>
                </div>
              </div>
            </div>

            {/* Simulator Controls */}
            <div className="space-y-3 text-xs">
              
              {/* Dial Bezel Rotation Slider */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-stone-300 flex items-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                    Dial Bezel Rotation Angle:
                  </span>
                  <span className="font-mono text-amber-400 font-bold text-sm">
                    {bezelAngle}° <span className="text-stone-500 font-normal text-xs">(Target: {selectedAmulet.puzzleInterlocking.alignmentDegree}°)</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="5"
                  value={bezelAngle}
                  onChange={(e) => runPuzzleSimulation(parseInt(e.target.value), testTareWeight, keySlotsInserted)}
                  className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Special Controls for Obsidian Eye (#1) */}
              {selectedAmulet.id === 'AMULET-01-OBSIDIAN-EYE' && (
                <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 space-y-2">
                  <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    Obsidian Eye Triple-Key & Hydraulic Balance Rig
                  </div>

                  {/* Tare Weight Slider */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-stone-400">Balance Tare Weight:</span>
                      <span className="font-mono text-stone-200">{testTareWeight} grams (Allowed: 190g – 230g)</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="350"
                      step="5"
                      value={testTareWeight}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setTestTareWeight(val);
                        runPuzzleSimulation(bezelAngle, val, keySlotsInserted);
                      }}
                      className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>

                  {/* 3 Family Keys Toggle */}
                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-stone-400 flex items-center gap-1">
                      <Key className="w-3 h-3 text-amber-400" /> Sibling Keys:
                    </span>
                    <div className="flex items-center gap-2">
                      {['Geronimo #1', 'Katia #2', 'Veerle #3'].map((keyName, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            const updated: [boolean, boolean, boolean] = [...keySlotsInserted];
                            updated[idx] = !updated[idx];
                            setKeySlotsInserted(updated);
                            runPuzzleSimulation(bezelAngle, testTareWeight, updated);
                          }}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                            keySlotsInserted[idx]
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                              : 'bg-rose-950 text-rose-400 border-rose-800'
                          }`}
                        >
                          {keyName}: {keySlotsInserted[idx] ? 'LOCKED IN' : 'EMPTY'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Simulation Status Feedback Box */}
            <div className={`p-3.5 rounded-lg border text-xs font-mono flex items-start gap-2.5 ${
              simulationResult.status === 'ALIGNED'
                ? 'bg-emerald-950/80 border-emerald-700 text-emerald-200'
                : simulationResult.status === 'TRAP_TRIGGERED'
                ? 'bg-rose-950/80 border-rose-700 text-rose-200'
                : 'bg-amber-950/80 border-amber-700 text-amber-200'
            }`}>
              {simulationResult.status === 'ALIGNED' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : simulationResult.status === 'TRAP_TRIGGERED' ? (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              ) : (
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-0.5">
                <div className="font-bold text-[11px] tracking-wider uppercase">
                  Simulation State: {simulationResult.status}
                </div>
                <div className="text-[11px] leading-relaxed">
                  {simulationResult.message}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
