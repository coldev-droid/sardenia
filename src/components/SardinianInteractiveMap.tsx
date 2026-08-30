import React, { useState, useMemo, useRef } from 'react';
import { Compass, Sparkles, Landmark, FileText, Layers } from 'lucide-react';
import * as d3 from 'd3';
import { SARDINIAN_LOCATIONS_DATABASE, SARDINIAN_MYTHS_DATABASE, type HistoricalLocation, type SardinianMyth } from '../data/mythRouteData';
import { transformEvidenceToGeographicalNodes, type GeoMappedEvidence } from '../utils/geoTransformer';

interface SardinianInteractiveMapProps {
  selectedLocation: HistoricalLocation;
  onSelectLocation: (loc: HistoricalLocation) => void;
  selectedMyth?: SardinianMyth | null;
}

// Haversine geodesic distance calculation (in kilometers)
function calculateGeodesicDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c);
}

export default function SardinianInteractiveMap({
  selectedLocation,
  onSelectLocation,
  selectedMyth
}: SardinianInteractiveMapProps) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [hoveredEvidence, setHoveredEvidence] = useState<GeoMappedEvidence | null>(null);
  const [mapMode, setMapMode] = useState<'sites' | 'myths' | 'manuscripts' | 'transit'>('sites');
  const svgRef = useRef<SVGSVGElement | null>(null);

  // SVG dimensions
  const svgWidth = 560;
  const svgHeight = 620;

  // True D3 Geographic Mercator Projection with fitExtent
  const projection = useMemo(() => {
    const proj = d3.geoMercator();
    const sardiniaGeoJson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [[
              [8.16, 40.56], [8.21, 40.95], [9.61, 40.99], [9.52, 39.10], [8.72, 38.89], [8.45, 39.06], [8.44, 39.87], [8.16, 40.56]
            ]]
          },
          properties: { name: "Sardinia" }
        }
      ]
    };
    proj.fitExtent([[40, 40], [svgWidth - 40, svgHeight - 40]], sardiniaGeoJson as any);
    return proj;
  }, [svgWidth, svgHeight]);

  const project = (lat: number, lng: number) => {
    const coords = projection([lng, lat]);
    return {
      x: coords ? coords[0] : svgWidth / 2,
      y: coords ? coords[1] : svgHeight / 2
    };
  };

  // Transform EVIDENCE_FILES to geographical coordinates via D3 service
  const evidenceNodes = useMemo(() => {
    return transformEvidenceToGeographicalNodes(svgWidth, svgHeight);
  }, [svgWidth, svgHeight]);

  // Find linked myths for selected location
  const getMythsForLocation = (loc: HistoricalLocation) => {
    return SARDINIAN_MYTHS_DATABASE.filter(myth =>
      myth.associatedLocations.some(l =>
        loc.name.toLowerCase().includes(l.toLowerCase()) ||
        loc.sardinianName.toLowerCase().includes(l.toLowerCase()) ||
        l.toLowerCase().includes(loc.province.toLowerCase())
      )
    );
  };

  const hoveredLocation = useMemo(() => {
    if (!hoveredNodeId) return null;
    return SARDINIAN_LOCATIONS_DATABASE.find(l => l.id === hoveredNodeId);
  }, [hoveredNodeId]);

  const hoveredMyths = hoveredLocation ? getMythsForLocation(hoveredLocation) : [];

  // Find linked items based on map mode
  const linkedIds = useMemo(() => {
    if (mapMode === 'myths') {
      return SARDINIAN_LOCATIONS_DATABASE
        .filter(loc => getMythsForLocation(loc).length > 0)
        .map(l => l.id);
    } else if (mapMode === 'manuscripts') {
      return SARDINIAN_LOCATIONS_DATABASE.map(l => l.id);
    } else {
      return SARDINIAN_LOCATIONS_DATABASE
        .filter(l => l.id !== selectedLocation.id && (l.province === selectedLocation.province || calculateGeodesicDistanceKm(selectedLocation.coordinates.lat, selectedLocation.coordinates.lng, l.coordinates.lat, l.coordinates.lng) < 90))
        .map(l => l.id);
    }
  }, [selectedLocation, mapMode]);

  const selectedCoords = project(selectedLocation.coordinates.lat, selectedLocation.coordinates.lng);

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-1.5 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-amber-700 animate-pulse" />
            True D3.js GeoMercator Projection & Geodesic Route Auditor
          </div>
          <h3 className="text-base font-black text-stone-900 tracking-tight mt-0.5">
            Sardinian Topography & Separated Myth/History/Manuscript Network
          </h3>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setMapMode('sites')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap ${
              mapMode === 'sites' ? 'bg-amber-800 text-white font-bold shadow-2xs' : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            Sites
          </button>
          <button
            onClick={() => setMapMode('myths')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap ${
              mapMode === 'myths' ? 'bg-purple-800 text-white font-bold shadow-2xs' : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            Mythic Entities
          </button>
          <button
            onClick={() => setMapMode('manuscripts')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap ${
              mapMode === 'manuscripts' ? 'bg-cyan-800 text-white font-bold shadow-2xs' : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            Fictional Manuscripts
          </button>
          <button
            onClick={() => setMapMode('transit')}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap ${
              mapMode === 'transit' ? 'bg-emerald-800 text-white font-bold shadow-2xs' : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            Geodesic Transit
          </button>
        </div>
      </div>

      <div className="relative w-full bg-stone-950 rounded-xl overflow-hidden border border-stone-800 shadow-inner flex items-center justify-center p-2">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto max-h-[500px] drop-shadow-xl"
        >
          <defs>
            <radialGradient id="mapBgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#090d16" />
            </radialGradient>
            <linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="mythLinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.5" />
            </linearGradient>
            <filter id="svgGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background */}
          <rect width={svgWidth} height={svgHeight} fill="url(#mapBgGrad)" rx="12" />

          {/* D3 Geographic Coastline representation */}
          {(() => {
            const p1 = project(40.56, 8.16);
            const p2 = project(40.95, 8.21);
            const p3 = project(40.99, 9.61);
            const p4 = project(39.10, 9.52);
            const p5 = project(38.89, 8.72);
            const p6 = project(39.06, 8.45);
            const p7 = project(39.87, 8.44);

            const coastlinePath = `M ${p1.x} ${p1.y} 
                                   L ${p2.x} ${p2.y} 
                                   Q ${(p2.x + p3.x)/2} ${p2.y - 12} ${p3.x} ${p3.y}
                                   L ${p3.x + 8} ${p3.y + 15}
                                   Q ${(p3.x + p4.x)/2} ${(p3.y + p4.y)/2} ${p4.x} ${p4.y}
                                   L ${p5.x} ${p5.y} 
                                   L ${p6.x} ${p6.y}
                                   L ${p7.x} ${p7.y}
                                   Z`;

            return (
              <g>
                <path
                  d={coastlinePath}
                  fill="#172238"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                  opacity="0.85"
                />
                <circle cx={selectedCoords.x} cy={selectedCoords.y} r="130" fill="none" stroke="#334155" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4" />
                <circle cx={selectedCoords.x} cy={selectedCoords.y} r="65" fill="none" stroke="#334155" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4" />
              </g>
            );
          })()}

          {/* D3 Dynamic Geodesic Links */}
          {linkedIds.map(id => {
            const targetLoc = SARDINIAN_LOCATIONS_DATABASE.find(l => l.id === id);
            if (!targetLoc) return null;
            const targetCoords = project(targetLoc.coordinates.lat, targetLoc.coordinates.lng);
            const geodesicKm = calculateGeodesicDistanceKm(
              selectedLocation.coordinates.lat, selectedLocation.coordinates.lng,
              targetLoc.coordinates.lat, targetLoc.coordinates.lng
            );

            return (
              <g key={`d3-link-${id}`}>
                <line
                  x1={selectedCoords.x}
                  y1={selectedCoords.y}
                  x2={targetCoords.x}
                  y2={targetCoords.y}
                  stroke={mapMode === 'myths' ? "url(#mythLinkGrad)" : "url(#linkGrad)"}
                  strokeWidth={mapMode === 'transit' ? "2.5" : "1.75"}
                  strokeDasharray={mapMode === 'transit' ? "4 2" : "none"}
                  className="transition-all duration-500"
                />
                {(mapMode === 'transit' || mapMode === 'sites') && (
                  <text
                    x={(selectedCoords.x + targetCoords.x) / 2}
                    y={(selectedCoords.y + targetCoords.y) / 2 - 6}
                    fill="#38bdf8"
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="select-none font-bold"
                  >
                    {geodesicKm} km (Geodesic)
                  </text>
                )}
              </g>
            );
          })}

          {/* Render Evidence File Nodes & Dynamic Paths when in manuscripts mode */}
          {mapMode === 'manuscripts' && evidenceNodes.map((ev, idx) => {
            const loc = SARDINIAN_LOCATIONS_DATABASE.find(l => l.id === ev.linkedLocationId) || SARDINIAN_LOCATIONS_DATABASE[0];
            const locCoords = project(loc.coordinates.lat, loc.coordinates.lng);
            // Slight offset for evidence nodes around location
            const angle = (idx / evidenceNodes.length) * 2 * Math.PI;
            const radiusOffset = 22;
            const evX = locCoords.x + Math.cos(angle) * radiusOffset;
            const evY = locCoords.y + Math.sin(angle) * radiusOffset;

            return (
              <g key={ev.fileId}>
                <line
                  x1={locCoords.x}
                  y1={locCoords.y}
                  x2={evX}
                  y2={evY}
                  stroke="#38bdf8"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  opacity="0.7"
                />
                <circle
                  cx={evX}
                  cy={evY}
                  r="5"
                  fill="#0ea5e9"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-transform hover:scale-150"
                  onMouseEnter={() => setHoveredEvidence(ev)}
                  onMouseLeave={() => setHoveredEvidence(null)}
                />
              </g>
            );
          })}

          {/* Render Locations */}
          {SARDINIAN_LOCATIONS_DATABASE.map(loc => {
            const coords = project(loc.coordinates.lat, loc.coordinates.lng);
            const isSelected = loc.id === selectedLocation.id;
            const isHovered = loc.id === hoveredNodeId;
            const isLinked = linkedIds.includes(loc.id);
            const siteMyths = getMythsForLocation(loc);

            let nodeColor = '#64748b';
            let nodeRadius = 6;

            if (isSelected) {
              nodeColor = '#f59e0b';
              nodeRadius = 11;
            } else if (isLinked) {
              nodeColor = mapMode === 'myths' ? '#c084fc' : mapMode === 'manuscripts' ? '#38bdf8' : '#10b981';
              nodeRadius = 8;
            }

            return (
              <g
                key={loc.id}
                transform={`translate(${coords.x}, ${coords.y})`}
                className="cursor-pointer transition-transform hover:scale-125 focus:outline-hidden"
                onClick={() => onSelectLocation(loc)}
                onMouseEnter={() => setHoveredNodeId(loc.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onTouchStart={() => setHoveredNodeId(loc.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectLocation(loc);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Select location ${loc.name}`}
              >
                {isSelected && (
                  <circle
                    cx="0"
                    cy="0"
                    r="18"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    className="animate-ping opacity-75"
                  />
                )}
                <circle
                  cx="0"
                  cy="0"
                  r={nodeRadius}
                  fill={nodeColor}
                  stroke="#ffffff"
                  strokeWidth="2"
                  filter="url(#svgGlow)"
                  className="transition-all"
                />
                <circle cx="0" cy="0" r="2.5" fill="#0f172a" />
              </g>
            );
          })}
        </svg>

        {/* Hover Evidence Tooltip */}
        {hoveredEvidence && (
          <div className="absolute top-3 right-3 max-w-sm bg-cyan-950/95 backdrop-blur-md text-white p-4 rounded-xl border border-cyan-700 shadow-2xl z-20 space-y-2.5 animate-fadeIn pointer-events-none">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/40 uppercase">
                Fictional Manuscript & Evidence Record
              </span>
              <span className="text-[10px] font-mono text-cyan-400">
                {hoveredEvidence.lat.toFixed(2)}°N, {hoveredEvidence.lng.toFixed(2)}°E
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white leading-tight font-mono">{hoveredEvidence.fileName}</h4>
              <p className="text-[10px] text-cyan-200 mt-0.5">Linked Site: {hoveredEvidence.locationName}</p>
            </div>
            <div className="pt-2 border-t border-cyan-900/60 bg-cyan-900/30 p-2 rounded-lg font-mono text-[10px] text-cyan-100">
              "{hoveredEvidence.summarySnippet}"
            </div>
          </div>
        )}

        {/* Hover Tooltip with Separated Labeled Categories */}
        {hoveredLocation && (
          <div className="absolute top-3 right-3 max-w-sm bg-stone-900/95 backdrop-blur-md text-white p-4 rounded-xl border border-stone-700 shadow-2xl z-20 space-y-2.5 animate-fadeIn pointer-events-none">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">
                {hoveredLocation.province} • {hoveredLocation.category}
              </span>
              <span className="text-[10px] font-mono text-cyan-400">
                {calculateGeodesicDistanceKm(selectedLocation.coordinates.lat, selectedLocation.coordinates.lng, hoveredLocation.coordinates.lat, hoveredLocation.coordinates.lng)} km Geodesic
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white leading-tight">{hoveredLocation.name}</h4>
              <p className="text-[10px] text-stone-400 italic mt-0.5">{hoveredLocation.sardinianName} ({hoveredLocation.historicalEra})</p>
            </div>

            {/* Category 1: Mythological Entity Link */}
            {hoveredMyths.length > 0 && (
              <div className="pt-2 border-t border-stone-800 space-y-1 bg-purple-950/30 p-2 rounded-lg border border-purple-900/40">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  Mythological Entity (Folklore & Myth)
                </span>
                <p className="text-[11px] text-purple-200 font-bold">{hoveredMyths[0].title}</p>
                <p className="text-[10px] text-stone-300 line-clamp-2">{hoveredMyths[0].summary}</p>
              </div>
            )}

            {/* Category 2: Historical Archaeological Evidence */}
            <div className="pt-1 space-y-1 bg-emerald-950/30 p-2 rounded-lg border border-emerald-900/40">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1">
                <Landmark className="w-3 h-3 text-emerald-400" />
                Historical Archaeological Evidence
              </span>
              <p className="text-[10px] text-stone-300 italic">
                "{hoveredLocation.canonSignificance}"
              </p>
            </div>

            {/* Category 3: Fictional Manuscript Reference */}
            <div className="pt-1 space-y-1 bg-cyan-950/30 p-2 rounded-lg border border-cyan-900/40">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1">
                <FileText className="w-3 h-3 text-cyan-400" />
                Fictional Manuscript Reference (Book 02 Custody Narrative)
              </span>
              <p className="text-[10px] text-stone-300">
                Linked in chapter metadata for the Eye of Adrastea transit and guesthouse reconciliation sequence.
              </p>
            </div>
          </div>
        )}

        {/* Map Footer Legend */}
        <div className="absolute bottom-3 left-3 right-3 bg-stone-900/95 backdrop-blur-xs p-2.5 rounded-lg border border-stone-800 flex flex-wrap items-center justify-between text-[11px] text-stone-300 gap-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-xs" />
              <span>Selected Site</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-purple-500 inline-block shadow-xs" />
              <span>Mythic Entity</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block shadow-xs" />
              <span>Fictional Manuscript</span>
            </div>
          </div>
          <span className="font-mono text-cyan-400 font-bold">
            GeoMercator Projection & Haversine Geodesic Distance
          </span>
        </div>
      </div>
    </div>
  );
}
