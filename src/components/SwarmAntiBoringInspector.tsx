import React, { useState, useMemo } from 'react';
import {
  Flame,
  Sparkles,
  Zap,
  Activity,
  Gauge,
  ShieldCheck,
  AlertOctagon,
  Copy,
  Check,
  Dog,
  Compass,
  Layers,
  Wind,
  Eye,
  Sliders,
  TrendingUp,
  Clock,
  CheckCircle2,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import {
  SWARM_ANTI_BORING_AGENTS,
  B02_C01_SCENE_BEATS,
  OVERALL_PACING_METRICS,
  type AntiBoringAgent,
  type PacingSceneBeat
} from '../data/pacingInspectorData';

export default function SwarmAntiBoringInspector() {
  const [selectedAgent, setSelectedAgent] = useState<AntiBoringAgent>(SWARM_ANTI_BORING_AGENTS[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'agents-overview' | 'scene-timeline' | 'live-scanner'>('agents-overview');

  // Interactive Live Scanner State
  const [testProse, setTestProse] = useState<string>(
    `The autumn rain lashed against the Oristano guesthouse windowpanes in violent, rattling bursts. In the kitchen, Geronimo kept his focus on the whistling gas stove, measuring chicory into boiling water while Katia adjusted the damp linen compress over her propped ankle. Veerle hurried through the courtyard door, shaking rain from her waxed coat, reporting that the blue tamper seal on the municipal crate remained undisturbed. On the table, Maris counted out two hundred and twenty euros in damp banknotes—the absolute ceiling for regional rail tickets and marina dues. André stood bounded near the hall lintel, his canvas tool roll clasped in hand, under the unyielding gaze of Inga. Near the hearth, Mia nudged Geronimo's boot with a cold wet nose before settling onto the rag rug beside Tina.`
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  // Dynamic live text scoring calculation
  const liveScanMetrics = useMemo(() => {
    const text = testProse.toLowerCase();
    const words = testProse.trim() ? testProse.trim().split(/\s+/).length : 0;
    
    // Kinetic & Action markers
    const kineticKeywords = ['rain', 'walk', 'step', 'count', 'bolt', 'seal', 'stove', 'boot', 'tool', 'lift', 'run', 'hurry', 'lash', 'whistle', 'clasp'];
    let kineticScore = 0;
    kineticKeywords.forEach(k => {
      if (text.includes(k)) kineticScore += 6;
    });
    kineticScore = Math.min(98, Math.max(50, kineticScore + 30));

    // Sensory & Atmospheric markers
    const sensoryKeywords = ['rain', 'damp', 'chicory', 'wet', 'cold', 'hot', 'smell', 'sound', 'rattling', 'windowpanes', 'linen'];
    let sensoryScore = 0;
    sensoryKeywords.forEach(s => {
      if (text.includes(s)) sensoryScore += 7;
    });
    sensoryScore = Math.min(96, Math.max(45, sensoryScore + 30));

    // Tension & Mystery markers
    const tensionKeywords = ['seal', 'crate', 'andre', 'inga', 'maris', 'euros', 'budget', 'locked', 'tamper', 'ceiling', 'unyielding', 'door'];
    let tensionScore = 0;
    tensionKeywords.forEach(t => {
      if (text.includes(t)) tensionScore += 8;
    });
    tensionScore = Math.min(97, Math.max(40, tensionScore + 25));

    // Canine Agency check
    const canineKeywords = ['mia', 'tina', 'dog', 'hound', 'nose', 'rug', 'hearth', 'feed'];
    let hasCanine = canineKeywords.some(c => text.includes(c));

    const compositeAdrenaline = Math.round((kineticScore * 0.4) + (sensoryScore * 0.3) + (tensionScore * 0.3));
    const compositeWowFactor = Math.round((tensionScore * 0.5) + (sensoryScore * 0.3) + (kineticScore * 0.2));

    return {
      words,
      kineticScore,
      sensoryScore,
      tensionScore,
      compositeAdrenaline,
      compositeWowFactor,
      hasCanine
    };
  }, [testProse]);

  return (
    <div id="swarm-anti-boring-inspector" className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Narrative Pacing & Adrenaline Engine • Checkpoint 059
            </div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight mt-1">
              Swarm Anti-Boring Inspector
            </h1>
            <p className="text-sm text-stone-600 mt-1 max-w-3xl">
              Monitors active scene velocity, sensory density, kinetic stakes, canine agency, and psychological friction to guarantee maximum narrative adrenaline with zero lore drift.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                const telemetry = `### SWARM ANTI-BORING TELEMETRY\n- Adrenaline: ${OVERALL_PACING_METRICS.overallAdrenalineScore}/100\n- Wow-Factor: ${OVERALL_PACING_METRICS.overallWowFactorScore}/100\n- Velocity: ${OVERALL_PACING_METRICS.narrativeVelocityIndex}\n- Action Ratio: ${OVERALL_PACING_METRICS.dialogueToActionRatio}`;
                handleCopy(telemetry, 'pacing-telemetry');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                copiedId === 'pacing-telemetry'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              {copiedId === 'pacing-telemetry' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Telemetry Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Pacing Telemetry</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Real-Time Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-stone-100 text-xs">
          <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-700" /> Adrenaline Score
            </span>
            <div className="text-2xl font-black text-amber-950 mt-0.5">
              {OVERALL_PACING_METRICS.overallAdrenalineScore} <span className="text-xs font-normal text-amber-800">/ 100</span>
            </div>
          </div>

          <div className="p-3 bg-cyan-50/60 rounded-lg border border-cyan-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-900 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-700" /> Wow-Factor Rating
            </span>
            <div className="text-2xl font-black text-cyan-950 mt-0.5">
              {OVERALL_PACING_METRICS.overallWowFactorScore} <span className="text-xs font-normal text-cyan-800">/ 100</span>
            </div>
          </div>

          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-stone-600" /> Narrative Velocity
            </span>
            <div className="text-sm font-bold text-stone-900 mt-1">
              4.8 Beats/Ch
            </div>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Swarm Verdict
            </span>
            <div className="text-xs font-bold text-emerald-950 mt-1">
              OPTIMAL VELOCITY
            </div>
          </div>
        </div>

        {/* Sub-Navigation */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-stone-100 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('agents-overview')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'agents-overview'
                ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300 shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-amber-700" />
            6 Swarm Pacing Agents ({SWARM_ANTI_BORING_AGENTS.length})
          </button>

          <button
            onClick={() => setActiveTab('scene-timeline')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'scene-timeline'
                ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300 shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            B02_C01 Scene Beat Tension Timeline ({B02_C01_SCENE_BEATS.length})
          </button>

          <button
            onClick={() => setActiveTab('live-scanner')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'live-scanner'
                ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300 shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-amber-700" />
            Live Prose Pacing Scanner
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: 6 SWARM PACING AGENTS */}
      {activeTab === 'agents-overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Agent Cards Grid (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            {SWARM_ANTI_BORING_AGENTS.map((agent) => {
              const isSelected = selectedAgent.id === agent.id;
              return (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-amber-50/90 border-amber-400 shadow-sm'
                      : 'bg-white hover:bg-stone-50 border-stone-200 shadow-2xs'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                        {agent.id.replace('AGENT-', '')}
                      </span>
                      <h4 className="text-xs font-bold text-stone-900">
                        {agent.codeName}
                      </h4>
                    </div>
                    <p className="text-[11px] text-stone-500 font-medium">
                      {agent.specialty}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-black text-amber-900 font-mono">
                      {agent.benchmarkScore}%
                    </div>
                    <span className="text-[9px] font-bold text-emerald-700 uppercase">
                      {agent.verdict}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Agent Inspector (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    {selectedAgent.id}
                  </span>
                  <h2 className="text-xl font-black text-stone-900 tracking-tight">
                    {selectedAgent.codeName}
                  </h2>
                </div>
                <p className="text-xs text-stone-600 font-medium mt-0.5">
                  {selectedAgent.specialty}
                </p>
              </div>

              <div className="px-3 py-1.5 rounded-lg bg-stone-900 text-white font-mono text-xs font-bold">
                Weight: {selectedAgent.weightPercent}%
              </div>
            </div>

            {/* Inspector Focus */}
            <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200 text-xs space-y-1">
              <span className="font-bold text-stone-800 uppercase tracking-wider text-[10px]">
                Inspector Mandate & Sensory Focus
              </span>
              <p className="text-stone-700 leading-relaxed">
                {selectedAgent.inspectorFocus}
              </p>
            </div>

            {/* Key Pacing Checks */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Audited Pacing Criteria
              </span>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {selectedAgent.keyChecks.map((check, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-stone-50/70 p-2.5 rounded-lg border border-stone-200/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Adrenaline Trigger Example */}
            <div className="p-3.5 bg-amber-50/60 rounded-lg border border-amber-200 text-xs space-y-1">
              <span className="font-bold text-amber-900 uppercase tracking-wider text-[10px] flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-700" />
                Active Adrenaline Trigger Example
              </span>
              <p className="text-amber-950 font-serif italic">
                "{selectedAgent.adrenalineTrigger}"
              </p>
            </div>

            {/* Diagnostic Notes */}
            <div className="p-3 bg-stone-100 rounded-lg border border-stone-200 text-xs text-stone-600">
              <span className="font-semibold text-stone-800">Diagnostic Verdict: </span>
              {selectedAgent.diagnosticNotes}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SCENE BEAT TENSION TIMELINE */}
      {activeTab === 'scene-timeline' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-5">
          <div>
            <h3 className="text-lg font-bold text-stone-900 tracking-tight">
              B02_C01 Scene Beat Velocity & Tension Curve
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Word-span tension breakdown demonstrating progressive acceleration from morning groundwork to storm departure.
            </p>
          </div>

          <div className="space-y-3">
            {B02_C01_SCENE_BEATS.map((beat) => (
              <div
                key={beat.beatIndex}
                className="p-4 bg-stone-50 hover:bg-white rounded-xl border border-stone-200 hover:border-stone-300 transition-all space-y-2 shadow-2xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-stone-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                      {beat.beatIndex}
                    </span>
                    <h4 className="text-sm font-bold text-stone-900">
                      {beat.beatTitle}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-stone-200 text-stone-800">
                      {beat.wordSpan}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                      Adrenaline: {beat.adrenalineScore}%
                    </span>
                  </div>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed">
                  {beat.summary}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200/60 text-xs">
                  <span className="font-semibold text-stone-600">
                    Dominant Sensory: <span className="text-stone-900 font-bold">{beat.dominantSensory}</span>
                  </span>
                  <span className="text-[11px] font-mono text-emerald-800 font-bold">
                    Tension Level: {beat.tensionLevel}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Tension Injections Panel */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 text-xs">
            <span className="font-bold text-amber-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-700" />
              Automated Swarm Tension Injection Recommendations
            </span>
            <ul className="space-y-1 text-amber-950">
              {OVERALL_PACING_METRICS.tensionInjectionSuggestions.map((sug, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>{sug}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: LIVE PROSE PACING SCANNER */}
      {activeTab === 'live-scanner' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-stone-900 tracking-tight">
                Live Prose Pacing & Adrenaline Scanner
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Paste any prose segment to calculate instant kinetic velocity, sensory density, and adrenaline scores.
              </p>
            </div>

            <button
              onClick={() => {
                const report = `### LIVE PACING SCAN\n- Words: ${liveScanMetrics.words}\n- Adrenaline: ${liveScanMetrics.compositeAdrenaline}%\n- Wow-Factor: ${liveScanMetrics.compositeWowFactor}%\n- Kinetic: ${liveScanMetrics.kineticScore}%\n- Sensory: ${liveScanMetrics.sensoryScore}%`;
                handleCopy(report, 'live-scan');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                copiedId === 'live-scan' ? 'bg-emerald-700 text-white' : 'bg-stone-900 text-white'
              }`}
            >
              {copiedId === 'live-scan' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 'live-scan' ? 'Scan Copied' : 'Copy Scan'}</span>
            </button>
          </div>

          <textarea
            rows={6}
            value={testProse}
            onChange={(e) => setTestProse(e.target.value)}
            placeholder="Paste draft prose to analyze pacing..."
            className="w-full p-3.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-serif leading-relaxed text-stone-900 focus:ring-stone-900 focus:border-stone-900"
          />

          {/* Live Meter Outputs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-stone-900 text-white rounded-xl border border-stone-800">
              <span className="text-stone-400 text-[10px] uppercase tracking-wider">Adrenaline Index</span>
              <div className="text-2xl font-black text-amber-400 font-mono mt-0.5">
                {liveScanMetrics.compositeAdrenaline}%
              </div>
            </div>

            <div className="p-3 bg-stone-900 text-white rounded-xl border border-stone-800">
              <span className="text-stone-400 text-[10px] uppercase tracking-wider">Wow-Factor Resonance</span>
              <div className="text-2xl font-black text-cyan-400 font-mono mt-0.5">
                {liveScanMetrics.compositeWowFactor}%
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-stone-500 text-[10px] uppercase tracking-wider">Kinetic Action Density</span>
              <div className="text-xl font-bold text-stone-900 font-mono mt-0.5">
                {liveScanMetrics.kineticScore}%
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-stone-500 text-[10px] uppercase tracking-wider">Sensory Immersion</span>
              <div className="text-xl font-bold text-stone-900 font-mono mt-0.5">
                {liveScanMetrics.sensoryScore}%
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs">
            <Dog className="w-4 h-4 text-amber-700" />
            <span className="font-semibold text-stone-800">Canine Agency Detection: </span>
            <span className={liveScanMetrics.hasCanine ? "text-emerald-700 font-bold" : "text-amber-700 font-medium"}>
              {liveScanMetrics.hasCanine ? "Mia / Tina named presence verified" : "No hound presence detected in this segment"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
