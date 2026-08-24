import React, { useState, useMemo } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Copy, 
  Check, 
  ShieldAlert, 
  AlertOctagon, 
  FileCode, 
  FileText, 
  ExternalLink, 
  Dog, 
  Calculator, 
  Lock, 
  CheckCircle2,
  X,
  MapPin,
  Compass,
  Activity,
  HeartPulse,
  Backpack,
  Radio,
  Clock,
  Search,
  Filter
} from 'lucide-react';
import { 
  CANON_SAFE_CHARACTERS, 
  REJECTED_CLAIMS, 
  CANON_SAFE_CHARACTER_MATRIX_JSON,
  type CharacterMatrixEntry 
} from '../data/charactersData';

export default function CharacterOperationsHub() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showJsonModal, setShowJsonModal] = useState<boolean>(false);
  const [selectedCharForModal, setSelectedCharForModal] = useState<CharacterMatrixEntry | null>(null);
  const [subView, setSubView] = useState<'active-role-matrix' | 'canon-authority' | 'rejected-claims'>('active-role-matrix');
  const [branchFilter, setBranchFilter] = useState<'ALL' | 'BRAVO' | 'ALPHA'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const filteredCharacters = useMemo(() => {
    return CANON_SAFE_CHARACTERS.filter(char => {
      const matchesBranch = 
        branchFilter === 'ALL' ||
        (branchFilter === 'BRAVO' && char.activeRole.branchUnit.includes('Branch Bravo')) ||
        (branchFilter === 'ALPHA' && char.activeRole.branchUnit.includes('Branch Alpha'));

      const matchesSearch = 
        char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.identity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.activeRole.currentLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.activeRole.availabilityStatus.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesBranch && matchesSearch;
    });
  }, [branchFilter, searchQuery]);

  return (
    <div id="characters-hub" className="space-y-6">
      
      {/* Eyebrow & Title Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Checkpoint 059 character authority
            </div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight mt-1">
              Active Cast, Role Matrix & Canine Care Authority
            </h1>
            <p className="text-sm text-stone-600 mt-1 max-w-3xl">
              Real-time narrative location tracking, availability statuses, companion bonds, and realistic hound agency for Mia and Tina.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleCopy(JSON.stringify(CANON_SAFE_CHARACTER_MATRIX_JSON, null, 2), 'matrix-json')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                copiedId === 'matrix-json'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              {copiedId === 'matrix-json' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Role Matrix Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Complete JSON</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowJsonModal(true)}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileCode className="w-4 h-4 text-stone-600" />
              <span>Raw Schema</span>
            </button>
          </div>
        </div>

        {/* Sub-view Navigation Bar */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-stone-100 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setSubView('active-role-matrix')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              subView === 'active-role-matrix'
                ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300 shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-amber-700" />
            Active Role Matrix ({CANON_SAFE_CHARACTERS.length})
          </button>

          <button
            onClick={() => setSubView('canon-authority')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              subView === 'canon-authority'
                ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300 shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            Locked Custody & Agency Rules
          </button>

          <button
            onClick={() => setSubView('rejected-claims')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              subView === 'rejected-claims'
                ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300 shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5 text-rose-700" />
            Rejected Drift Claims ({REJECTED_CLAIMS.length})
          </button>
        </div>
      </div>

      {/* SUB-VIEW 1: ACTIVE ROLE MATRIX */}
      {subView === 'active-role-matrix' && (
        <div className="space-y-5">
          {/* Filter Bar */}
          <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-stone-500 flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5" /> Filter Branch:
              </span>
              <button
                onClick={() => setBranchFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  branchFilter === 'ALL'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                All Subjects ({CANON_SAFE_CHARACTERS.length})
              </button>
              <button
                onClick={() => setBranchFilter('BRAVO')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  branchFilter === 'BRAVO'
                    ? 'bg-amber-700 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                Branch Bravo • Oristano (5)
              </button>
              <button
                onClick={() => setBranchFilter('ALPHA')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  branchFilter === 'ALPHA'
                    ? 'bg-cyan-800 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                Branch Alpha • Alghero Transit (3)
              </button>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search character, role, or station..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs w-full sm:w-64 focus:ring-stone-900 focus:border-stone-900 font-medium"
              />
            </div>
          </div>

          {/* Active Role Cards Grid (2 Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredCharacters.map((char) => {
              const isDog = char.id.includes('MIA') || char.id.includes('TINA');
              const isCopied = copiedId === char.id;
              const isAlpha = char.activeRole.branchUnit.includes('Branch Alpha');

              return (
                <article
                  key={char.id}
                  className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between hover:border-stone-300 hover:shadow-sm transition-all"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-black text-stone-900 tracking-tight">
                            {char.name}
                          </h3>
                          {isDog ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                              <Dog className="w-3 h-3 text-amber-700" />
                              Ordinary Canine
                            </span>
                          ) : (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                              isAlpha 
                                ? 'bg-cyan-50 text-cyan-800 border-cyan-200' 
                                : 'bg-amber-50 text-amber-800 border-amber-200'
                            }`}>
                              {char.activeRole.branchUnit.split(' ')[0]} {char.activeRole.branchUnit.split(' ')[1]}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-500 font-medium mt-0.5">
                          {char.identity}
                        </p>
                      </div>

                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold shrink-0 ${
                        char.activeRole.availabilityStatus === 'Active & Available'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : char.activeRole.availabilityStatus.includes('Stationary')
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : char.activeRole.availabilityStatus.includes('Transit')
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : char.activeRole.availabilityStatus.includes('Surveillance')
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-stone-100 text-stone-800 border border-stone-300'
                      }`}>
                        {char.activeRole.availabilityStatus}
                      </span>
                    </div>

                    {/* Location & Coordinates Banner */}
                    <div className="mt-3.5 p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-1 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-stone-800">
                        <MapPin className="w-3.5 h-3.5 text-stone-600" />
                        <span>Current Station:</span>
                        <span className="font-mono text-stone-900 font-semibold">{char.activeRole.currentLocation}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-600">
                        <HeartPulse className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Condition:</span>
                        <span className="font-medium text-stone-700">{char.activeRole.physicalCondition}</span>
                      </div>
                      <div className="text-[11px] text-stone-500 font-mono pl-5">
                        {char.activeRole.hydrationFatigueLevel}
                      </div>
                    </div>

                    {/* Assigned Tasks */}
                    <div className="mt-3.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                        Active Mission Tasks
                      </div>
                      <ul className="space-y-1 text-xs text-stone-700">
                        {char.activeRole.assignedTasks.map((task, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Canine Care Details (Mia & Tina only) */}
                    {char.activeRole.canineCareDetails && (
                      <div className="mt-3.5 p-3 bg-amber-50/70 rounded-lg border border-amber-200 text-xs space-y-1.5">
                        <div className="font-bold text-amber-900 text-[11px] uppercase tracking-wider flex items-center gap-1">
                          <Dog className="w-3.5 h-3.5 text-amber-700" />
                          Named Canine Care Routine
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-amber-950">
                          <div>
                            <span className="font-semibold text-stone-700">Diet:</span> {char.activeRole.canineCareDetails.feedSchedule}
                          </div>
                          <div>
                            <span className="font-semibold text-stone-700">Coat:</span> {char.activeRole.canineCareDetails.coatCondition}
                          </div>
                          <div>
                            <span className="font-semibold text-stone-700">Lead:</span> {char.activeRole.canineCareDetails.leadProtocol}
                          </div>
                          <div>
                            <span className="font-semibold text-stone-700">Sensory Focus:</span> {char.activeRole.canineCareDetails.ordinarySensoryFocus}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Inventory & Tactical Limits */}
                    <div className="mt-3.5 pt-3 border-t border-stone-100 text-xs space-y-2">
                      <div className="flex items-start gap-1.5">
                        <Backpack className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-stone-800">Inventory: </span>
                          <span className="text-stone-600">{char.activeRole.inventoryStatus}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-1.5">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-rose-900">Tactical Limit: </span>
                          <span className="text-stone-600">{char.activeRole.tacticalLimits}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="text-[11px] font-bold text-stone-500">Co-located Companions:</span>
                        <div className="flex flex-wrap gap-1">
                          {char.activeRole.directCompanions.map((comp, i) => (
                            <span key={i} className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-700 border border-stone-200">
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        const roleDump = `### ${char.name.toUpperCase()} (ROLE MATRIX)\n- Station: ${char.activeRole.currentLocation}\n- Unit: ${char.activeRole.branchUnit}\n- Status: ${char.activeRole.availabilityStatus}\n- Tasks: ${char.activeRole.assignedTasks.join('; ')}\n- Limits: ${char.activeRole.tacticalLimits}`;
                        handleCopy(roleDump, char.id);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isCopied 
                          ? 'bg-emerald-700 text-white' 
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200'
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
                      <span>{isCopied ? 'Role Copied' : 'Copy Role Data'}</span>
                    </button>

                    <button
                      onClick={() => setSelectedCharForModal(char)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Full Bio & Quote</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: CANON AUTHORITY & CUSTODY */}
      {subView === 'canon-authority' && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CANON_SAFE_CHARACTERS.map((char) => {
            const isCopied = copiedId === char.id;
            const isDog = char.id.includes('MIA') || char.id.includes('TINA');
            return (
              <article 
                key={char.id}
                className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between hover:border-stone-300 hover:shadow-sm transition-all"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                      Evidence-bound authority
                    </span>
                    {isDog ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                        <Dog className="w-3 h-3 text-amber-700" />
                        Ordinary Canine
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-700 border border-stone-200">
                        {char.custodyRole.authorityLevel}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mt-1">
                    {char.name}
                  </h3>
                  <p className="text-xs font-medium text-amber-900/90 italic mt-0.5">
                    {char.identity}
                  </p>

                  <div className="mt-4 space-y-3">
                    <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/80">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-rose-700" />
                        Locked state
                      </span>
                      <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                        {char.lockedState}
                      </p>
                    </div>

                    <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-200/60">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                        Eligible agency
                      </span>
                      <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                        {char.eligibleAgency}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      const charCardText = `### ${char.name.toUpperCase()}\n- Identity: ${char.identity}\n- Locked State: ${char.lockedState}\n- Eligible Agency: ${char.eligibleAgency}\n- Custody: ${char.custodyRole.authorityLevel}\n- Quote: "${char.signatureQuote}"`;
                      handleCopy(charCardText, char.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isCopied 
                        ? 'bg-emerald-700 text-white' 
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200'
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
                    <span>{isCopied ? 'Copied' : 'Copy profile'}</span>
                  </button>

                  <button
                    onClick={() => setSelectedCharForModal(char)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}

      {/* SUB-VIEW 3: REJECTED DRIFT CLAIMS */}
      {subView === 'rejected-claims' && (
        <section className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="pb-3 border-b border-stone-100">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-700">
              Adversarial correction
            </div>
            <h2 className="text-lg font-bold text-stone-900 tracking-tight">
              Claims rejected before training
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              These claims appeared in the supplied operations matrix but conflict with physical authority.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-stone-700 font-bold uppercase text-[11px]">
                  <th className="py-2.5 px-3">Supplied claim</th>
                  <th className="py-2.5 px-3 w-28">Verdict</th>
                  <th className="py-2.5 px-3">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {REJECTED_CLAIMS.map((claim, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3 px-3 font-semibold text-stone-900">
                      {claim.suppliedClaim}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300 font-mono">
                        REJECT
                      </span>
                    </td>
                    <td className="py-3 px-3 text-stone-600 leading-relaxed">
                      {claim.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Key Principle Callout Panels */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <article className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl shadow-xs text-emerald-950">
          <strong className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
            <Dog className="w-4 h-4 text-emerald-700" />
            Ordinary dogs can still have agency.
          </strong>
          <p className="text-xs text-emerald-900/90 mt-1.5 leading-relaxed">
            Mia and Tina can choose, hesitate, bark, pull, investigate ordinary smells, seek warmth, refuse footing, need water, and affect human timing. They cannot sense relics or reveal secret routes.
          </p>
        </article>

        <article className="p-5 bg-amber-50 border border-amber-200 rounded-xl shadow-xs text-amber-950">
          <strong className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
            <Calculator className="w-4 h-4 text-amber-700" />
            Maris’s arithmetic must change decisions.
          </strong>
          <p className="text-xs text-amber-900/90 mt-1.5 leading-relaxed">
            Budget, elapsed time, weather, fuel, berth, fatigue, dog care, and abort limits belong in scenes only when their arithmetic produces a choice or consequence.
          </p>
        </article>
      </section>

      {/* Raw JSON Modal */}
      {showJsonModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-stone-900 text-stone-100 border border-stone-700 rounded-xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-stone-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white font-mono">
                  data/canon-safe-character-matrix.json
                </h3>
                <div className="text-xs text-stone-400">
                  Certified Checkpoint 059 Character & Active Role Authority
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(JSON.stringify(CANON_SAFE_CHARACTER_MATRIX_JSON, null, 2), 'modal-copy')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedId === 'modal-copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'modal-copy' ? 'Copied' : 'Copy JSON'}</span>
                </button>
                <button
                  onClick={() => setShowJsonModal(false)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <pre className="p-4 flex-1 overflow-y-auto font-mono text-xs text-amber-200 bg-stone-950 select-all">
              {JSON.stringify(CANON_SAFE_CHARACTER_MATRIX_JSON, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Character Details Modal */}
      {selectedCharForModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-stone-900 text-stone-100 border border-stone-700 rounded-xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-stone-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  {selectedCharForModal.name} — Full Profile
                </h3>
                <div className="text-xs text-amber-400">
                  {selectedCharForModal.identity}
                </div>
              </div>
              <button
                onClick={() => setSelectedCharForModal(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs">
              <div className="p-3 bg-stone-800 rounded-lg border border-stone-700">
                <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">Current Location:</span>
                <p className="text-stone-200 mt-1 font-mono">{selectedCharForModal.activeRole.currentLocation}</p>
                <p className="text-stone-400 text-[11px] mt-0.5">{selectedCharForModal.activeRole.physicalCondition}</p>
              </div>

              <div>
                <span className="font-bold text-rose-400 uppercase tracking-wider text-[11px]">Locked State:</span>
                <p className="text-stone-200 mt-0.5">{selectedCharForModal.lockedState}</p>
              </div>

              <div>
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">Eligible Agency:</span>
                <p className="text-stone-200 mt-0.5">{selectedCharForModal.eligibleAgency}</p>
              </div>

              <div>
                <span className="font-bold text-stone-400 uppercase tracking-wider text-[11px]">Active Mission Tasks:</span>
                <ul className="list-disc list-inside mt-1 space-y-1 text-stone-300">
                  {selectedCharForModal.activeRole.assignedTasks.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-stone-400 uppercase tracking-wider text-[11px]">Field Notes:</span>
                <ul className="list-disc list-inside mt-1 space-y-1 text-stone-300">
                  {selectedCharForModal.fieldNotes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-stone-950 rounded-lg border border-stone-800">
                <span className="font-bold text-stone-400 uppercase tracking-wider text-[11px]">Signature Observation:</span>
                <p className="text-stone-300 italic mt-1">"{selectedCharForModal.signatureQuote}"</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certified Footer */}
      <footer className="text-center text-xs text-stone-500 py-2 border-t border-stone-200">
        Checkpoint 059 is the only certified manuscript authority in this workspace. Books II–V remain fail-closed until separately verified.
      </footer>
    </div>
  );
}
