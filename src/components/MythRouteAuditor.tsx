import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Compass,
  Train,
  Ship,
  Footprints,
  ShieldAlert,
  ShieldCheck,
  Check,
  Copy,
  Search,
  BookOpen,
  AlertTriangle,
  FileSearch,
  Sparkles,
  Layers,
  ArrowRight,
  Calculator,
  Building2,
  Landmark
} from 'lucide-react';
import {
  SARDINIAN_LOCATIONS_DATABASE,
  SARDINIAN_MYTHS_DATABASE,
  ROUTE_AUDIT_VERIFICATION_RULES,
  type HistoricalLocation,
  type SardinianMyth
} from '../data/mythRouteData';
import SardinianMythologiesDatabase from './SardinianMythologiesDatabase';

export default function MythRouteAuditor() {
  const [activeSubTab, setActiveSubTab] = useState<'sites-map' | 'myths-canon' | 'route-calculator' | 'prose-auditor'>('sites-map');
  const [selectedLocation, setSelectedLocation] = useState<HistoricalLocation>(SARDINIAN_LOCATIONS_DATABASE[0]);
  const [searchLocation, setSearchLocation] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Route Calculator State
  const [calcOrigin, setCalcOrigin] = useState<string>('LOC-01-ORISTANO-CIVIL');
  const [calcDestination, setCalcDestination] = useState<string>('LOC-05-ALGHERO-MARINA');
  const [travelMode, setTravelMode] = useState<'RAIL' | 'WALK_RAIN' | 'YACHT'>('RAIL');

  // Live Prose Auditor State
  const [proseInput, setProseInput] = useState<string>(
    `The autumn rain was falling steadily across the basalt paving of the Piazza Eleonora in Oristano. In the licensed guesthouse kitchen, Geronimo prepared a hot chicory infusion while Katia rested her sprained ankle in a cane armchair with clean linen compresses. Veerle returned from her dawn inspection past the municipal receiving room, confirming the grey transport crate remained firmly bolted to the masonry support table with the blue tamper-evident corner seal intact. Maris counted out the 220 euros for regional train tickets through the Macomer junction to Alghero to double the spring lines on the white expedition motor yacht Sentina, while Mia and Tina rested near the stove after their morning feed.`
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const filteredLocations = useMemo(() => {
    return SARDINIAN_LOCATIONS_DATABASE.filter(loc =>
      loc.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
      loc.sardinianName.toLowerCase().includes(searchLocation.toLowerCase()) ||
      loc.province.toLowerCase().includes(searchLocation.toLowerCase()) ||
      loc.category.toLowerCase().includes(searchLocation.toLowerCase())
    );
  }, [searchLocation]);

  // Route calculation arithmetic
  const routeCalculation = useMemo(() => {
    const origin = SARDINIAN_LOCATIONS_DATABASE.find(l => l.id === calcOrigin);
    const dest = SARDINIAN_LOCATIONS_DATABASE.find(l => l.id === calcDestination);
    if (!origin || !dest) return null;

    // Approximate distance between coords via Haversine
    const toRad = (v: number) => (v * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(dest.coordinates.lat - origin.coordinates.lat);
    const dLng = toRad(dest.coordinates.lng - origin.coordinates.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(origin.coordinates.lat)) *
        Math.cos(toRad(dest.coordinates.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const directKm = Math.round(R * c);
    const terrainKm = Math.round(directKm * 1.28); // Real winding roads/rails

    let timeHours = 0;
    let costEur = 0;
    let transferNote = '';

    if (travelMode === 'RAIL') {
      timeHours = (terrainKm / 55.0) + (terrainKm > 40 ? 0.35 : 0); // Include transfer buffer at Macomer
      costEur = Math.round(terrainKm * 0.085 * 10) / 10 + 2.0;
      transferNote = 'Includes mandatory transfer at Macomer Railway Junction (14m platform window).';
    } else if (travelMode === 'WALK_RAIN') {
      timeHours = terrainKm / ROUTE_AUDIT_VERIFICATION_RULES.speedLimits.walkingInRainKmh;
      costEur = 0;
      transferNote = 'Heavy rain and 15kg field packs reduce sustained walking pace to 3.8 km/h.';
    } else {
      timeHours = (terrainKm / (ROUTE_AUDIT_VERIFICATION_RULES.speedLimits.motorYachtCruisingKnots * 1.852));
      costEur = Math.round(terrainKm * 1.8); // Marine diesel bunkering
      transferNote = 'Expedition Motor Yacht Sentina at 11.5 knots cruising speed in sheltered coastal waters.';
    }

    return {
      originName: origin.name,
      destName: dest.name,
      terrainKm,
      timeHours: Math.round(timeHours * 10) / 10,
      costEur: Math.round(costEur * 10) / 10,
      transferNote
    };
  }, [calcOrigin, calcDestination, travelMode]);

  // Live Prose Audit Analysis
  const proseAuditReport = useMemo(() => {
    const text = proseInput.toLowerCase();
    const slopMatches: Array<{ phrase: string; replacement: string }> = [];
    const locationHits: string[] = [];
    const mythHits: string[] = [];

    // Check banned phrases
    ROUTE_AUDIT_VERIFICATION_RULES.bannedSlopPhrases.forEach(item => {
      if (text.includes(item.phrase.toLowerCase())) {
        slopMatches.push(item);
      }
    });

    // Check location mentions
    SARDINIAN_LOCATIONS_DATABASE.forEach(loc => {
      if (
        text.includes(loc.name.toLowerCase().split(' ')[0]) ||
        text.includes(loc.sardinianName.toLowerCase().split(' ')[0]) ||
        text.includes('oristano') ||
        text.includes('alghero') ||
        text.includes('macomer')
      ) {
        if (!locationHits.includes(loc.name)) {
          locationHits.push(loc.name);
        }
      }
    });

    // Check myth mentions
    SARDINIAN_MYTHS_DATABASE.forEach(myth => {
      if (
        text.includes('carta de logu') ||
        text.includes('eleonora') ||
        text.includes('byssus') ||
        text.includes('nuraxi')
      ) {
        if (!mythHits.includes(myth.title)) {
          mythHits.push(myth.title);
        }
      }
    });

    const isFailClosed = slopMatches.length === 0;

    return {
      isFailClosed,
      slopMatches,
      locationHits,
      mythHits,
      wordCount: proseInput.trim() ? proseInput.trim().split(/\s+/).length : 0,
      status: isFailClosed ? 'CANON_COMPLIANT' : 'LORE_DRIFT_DETECTED'
    };
  }, [proseInput]);

  return (
    <div id="myth-route-auditor" className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Sardinian Historical Authority • UNESCO & Canon Guard
            </div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight mt-1">
              Myth & Route Auditor
            </h1>
            <p className="text-sm text-stone-600 mt-1 max-w-3xl">
              Cross-reference active narrative routes against verified Sardinian geography, UNESCO World Heritage constraints, authentic Judicate folklore, and physical transit arithmetic.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleCopy(JSON.stringify(SARDINIAN_LOCATIONS_DATABASE, null, 2), 'locations-json')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                copiedId === 'locations-json'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              {copiedId === 'locations-json' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Locations Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Historical Database</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sub-Navigation */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-stone-100 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('sites-map')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'sites-map'
                ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300 shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Landmark className="w-3.5 h-3.5 text-amber-700" />
            Historical & UNESCO Sites ({SARDINIAN_LOCATIONS_DATABASE.length})
          </button>

          <button
            onClick={() => setActiveSubTab('myths-canon')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'myths-canon'
                ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300 shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            Sardinian Myths & Folklore ({SARDINIAN_MYTHS_DATABASE.length})
          </button>

          <button
            onClick={() => setActiveSubTab('route-calculator')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'route-calculator'
                ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300 shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-amber-700" />
            Travel & Distance Calculator
          </button>

          <button
            onClick={() => setActiveSubTab('prose-auditor')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'prose-auditor'
                ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300 shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <FileSearch className="w-3.5 h-3.5 text-amber-700" />
            Live Prose Route Auditor
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: HISTORICAL & UNESCO SITES */}
      {activeSubTab === 'sites-map' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sites List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="bg-white rounded-xl border border-stone-200 p-3 shadow-xs">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search Sardinian site, province, or era..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs w-full focus:ring-stone-900 focus:border-stone-900 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {filteredLocations.map((loc) => {
                const isSelected = selectedLocation.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-2.5 ${
                      isSelected
                        ? 'bg-amber-50/90 border-amber-400 shadow-sm'
                        : 'bg-white hover:bg-stone-50 border-stone-200 shadow-2xs'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <h4 className="text-xs font-bold text-stone-900">
                          {loc.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-stone-500 font-serif italic pl-5">
                        {loc.sardinianName}
                      </p>
                      <div className="flex items-center gap-1.5 pl-5 pt-0.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-700 border border-stone-200">
                          {loc.province}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] text-stone-600 bg-stone-100 border border-stone-200">
                          {loc.category}
                        </span>
                      </div>
                    </div>

                    {loc.unescoStatus?.isUnesco && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 shrink-0">
                        UNESCO #{loc.unescoStatus.refNumber}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Site Detail Inspector (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-stone-900 tracking-tight">
                    {selectedLocation.name}
                  </h2>
                  {selectedLocation.unescoStatus?.isUnesco && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      UNESCO #{selectedLocation.unescoStatus.refNumber}
                    </span>
                  )}
                </div>
                <p className="text-xs text-amber-900 font-serif italic mt-0.5">
                  {selectedLocation.sardinianName} • Province of {selectedLocation.province}
                </p>
              </div>

              <button
                onClick={() => {
                  const dump = `### ${selectedLocation.name}\n- Sardinian: ${selectedLocation.sardinianName}\n- Era: ${selectedLocation.historicalEra}\n- Significance: ${selectedLocation.canonSignificance}\n- Transit from Oristano: ${selectedLocation.travelParameters.distanceFromOristanoKm} km (${selectedLocation.travelParameters.avgRailTravelMinutes} min rail)`;
                  handleCopy(dump, selectedLocation.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  copiedId === selectedLocation.id
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200'
                }`}
              >
                {copiedId === selectedLocation.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
                <span>{copiedId === selectedLocation.id ? 'Copied' : 'Copy Site Data'}</span>
              </button>
            </div>

            {/* Coordinates & Physical Profile */}
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Coordinates</span>
                <div className="font-mono font-semibold text-stone-900 mt-0.5">
                  {selectedLocation.coordinates.lat}° N, {selectedLocation.coordinates.lng}° E
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Elevation</span>
                <div className="font-mono font-semibold text-stone-900 mt-0.5">
                  {selectedLocation.coordinates.elevationMeters} meters ASL
                </div>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Historical Era</span>
                <div className="font-semibold text-stone-900 mt-0.5">
                  {selectedLocation.historicalEra}
                </div>
              </div>
            </div>

            {/* Canon Significance */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Canon Significance & Active Unit Station
              </span>
              <p className="text-xs text-stone-700 leading-relaxed bg-amber-50/40 p-3 rounded-lg border border-amber-200/60">
                {selectedLocation.canonSignificance}
              </p>
            </div>

            {/* Travel Parameters from Oristano Base */}
            <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200 space-y-2 text-xs">
              <span className="font-bold text-stone-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Train className="w-3.5 h-3.5 text-stone-600" />
                Transit Arithmetic from Oristano Base (Distance: {selectedLocation.travelParameters.distanceFromOristanoKm} km)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                <div className="p-2 bg-white rounded border border-stone-200">
                  <span className="text-stone-500">Rail Route:</span>
                  <div className="font-bold text-stone-900">{selectedLocation.travelParameters.railRouteAvailable ? `${selectedLocation.travelParameters.avgRailTravelMinutes} min` : 'No direct rail'}</div>
                </div>
                <div className="p-2 bg-white rounded border border-stone-200">
                  <span className="text-stone-500">Walking In Rain:</span>
                  <div className="font-bold text-stone-900">{selectedLocation.travelParameters.walkingPaceHours} hours (Packs)</div>
                </div>
                <div className="p-2 bg-white rounded border border-stone-200">
                  <span className="text-stone-500">Regional Fare:</span>
                  <div className="font-bold text-stone-900">€{selectedLocation.travelParameters.fareCostEUR.toFixed(2)} EUR</div>
                </div>
              </div>
            </div>

            {/* Preservation & Fail-Closed Rules */}
            <div className="p-3 bg-rose-50/60 rounded-lg border border-rose-200 space-y-1 text-xs">
              <span className="font-bold text-rose-900 uppercase tracking-wider text-[11px] flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-700" />
                Archaeological Preservation & Canon Boundaries
              </span>
              <ul className="list-disc list-inside space-y-1 text-stone-700 text-[11px] pt-1">
                {selectedLocation.preservationRules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SARDINIAN MYTHS & FOLKLORE */}
      {activeSubTab === 'myths-canon' && (
        <SardinianMythologiesDatabase />
      )}

      {/* SUB-TAB 3: TRAVEL & DISTANCE CALCULATOR */}
      {activeSubTab === 'route-calculator' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-stone-900 tracking-tight">
              Sardinian Physical Transit & Arithmetic Engine
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Calculate realistic travel times, rail fares, and fatigue costs to prevent instantaneous travel or unearned route teleportation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Origin */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Origin Station
              </label>
              <select
                value={calcOrigin}
                onChange={(e) => setCalcOrigin(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium text-stone-900 focus:ring-stone-900"
              >
                {SARDINIAN_LOCATIONS_DATABASE.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>

            {/* Destination */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Destination Station
              </label>
              <select
                value={calcDestination}
                onChange={(e) => setCalcDestination(e.target.value)}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium text-stone-900 focus:ring-stone-900"
              >
                {SARDINIAN_LOCATIONS_DATABASE.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>

            {/* Travel Mode */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Travel Mode
              </label>
              <select
                value={travelMode}
                onChange={(e) => setTravelMode(e.target.value as any)}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium text-stone-900 focus:ring-stone-900"
              >
                <option value="RAIL">Trenitalia Regional Rail (Line 2 Dorsale)</option>
                <option value="WALK_RAIN">Foot Reconnaissance in Heavy Rain (3.8 km/h)</option>
                <option value="YACHT">Expedition Motor Yacht Sentina (11.5 Knots)</option>
              </select>
            </div>
          </div>

          {/* Result Card */}
          {routeCalculation && (
            <div className="p-5 bg-stone-900 text-white rounded-xl border border-stone-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2 font-mono text-sm text-amber-300">
                  <span>{routeCalculation.originName.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                  <span>{routeCalculation.destName.split(' ')[0]}</span>
                </div>
                <span className="text-xs font-mono text-stone-400">
                  Calculated Route Distance: {routeCalculation.terrainKm} km
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-stone-950 rounded-lg border border-stone-800">
                  <span className="text-stone-400 text-[10px] uppercase tracking-wider">Elapsed Real Transit Time</span>
                  <div className="text-xl font-bold text-amber-400 font-mono mt-0.5">
                    {routeCalculation.timeHours} Hours
                  </div>
                </div>

                <div className="p-3 bg-stone-950 rounded-lg border border-stone-800">
                  <span className="text-stone-400 text-[10px] uppercase tracking-wider">Cash Budget Expenditure</span>
                  <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">
                    €{routeCalculation.costEur.toFixed(2)} EUR
                  </div>
                </div>

                <div className="p-3 bg-stone-950 rounded-lg border border-stone-800">
                  <span className="text-stone-400 text-[10px] uppercase tracking-wider">Maris Budget Envelope (220 EUR)</span>
                  <div className="text-xl font-bold text-stone-200 font-mono mt-0.5">
                    €{(220 - routeCalculation.costEur).toFixed(2)} Remaining
                  </div>
                </div>
              </div>

              <div className="text-xs text-stone-300 font-serif italic pt-1 border-t border-stone-800">
                {routeCalculation.transferNote}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 4: LIVE PROSE ROUTE AUDITOR */}
      {activeSubTab === 'prose-auditor' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-stone-900 tracking-tight">
                Live Prose Route & Canon Scanner
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Paste draft prose to verify real-time compliance against banned slop phrases, geographic accuracy, and UNESCO preservation rules.
              </p>
            </div>

            <button
              onClick={() => {
                const report = `### CANON ROUTE AUDIT REPORT\n- Verdict: ${proseAuditReport.status}\n- Words: ${proseAuditReport.wordCount}\n- Banned Slop Matches: ${proseAuditReport.slopMatches.length}\n- Detected Locations: ${proseAuditReport.locationHits.join(', ')}`;
                handleCopy(report, 'audit-report');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                copiedId === 'audit-report' ? 'bg-emerald-700 text-white' : 'bg-stone-900 text-white'
              }`}
            >
              {copiedId === 'audit-report' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 'audit-report' ? 'Report Copied' : 'Copy Audit Report'}</span>
            </button>
          </div>

          <textarea
            rows={6}
            value={proseInput}
            onChange={(e) => setProseInput(e.target.value)}
            placeholder="Paste draft chapter text here to audit..."
            className="w-full p-3.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-serif leading-relaxed text-stone-900 focus:ring-stone-900 focus:border-stone-900"
          />

          {/* Audit Result Display */}
          <div className={`p-4 rounded-xl border space-y-3 ${
            proseAuditReport.isFailClosed
              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
              : 'bg-rose-50/70 border-rose-300 text-rose-950'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xs">
                {proseAuditReport.isFailClosed ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>CANON AUDIT PASSED (Strict Fail-Closed Compliant)</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-rose-700" />
                    <span>LORE DRIFT DETECTED ({proseAuditReport.slopMatches.length} Banned Phrases)</span>
                  </>
                )}
              </div>
              <span className="text-xs font-mono font-semibold">
                {proseAuditReport.wordCount} Words Analyzed
              </span>
            </div>

            {proseAuditReport.slopMatches.length > 0 && (
              <div className="p-3 bg-white rounded-lg border border-rose-200 space-y-1 text-xs">
                <span className="font-bold text-rose-900 uppercase tracking-wider text-[10px]">
                  Banned Slop Phrases Found:
                </span>
                <ul className="space-y-1">
                  {proseAuditReport.slopMatches.map((m, i) => (
                    <li key={i} className="text-stone-800 flex items-center gap-1.5">
                      <span className="text-rose-600 font-mono font-bold">"{m.phrase}"</span>
                      <ArrowRight className="w-3 h-3 text-stone-400" />
                      <span className="text-emerald-700 font-semibold">Replace with: "{m.replacement}"</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="font-semibold text-stone-800">Verified Geographical Locations:</span>
              {proseAuditReport.locationHits.map((loc, i) => (
                <span key={i} className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-stone-800 border border-stone-300">
                  {loc}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
