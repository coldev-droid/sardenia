import * as d3 from 'd3';
import { EVIDENCE_FILES, type EvidenceFile } from '../bundleData';
import { SARDINIAN_LOCATIONS_DATABASE, type HistoricalLocation } from '../data/mythRouteData';

export interface GeoMappedEvidence {
  fileId: string;
  fileName: string;
  category: EvidenceFile['category'];
  linkedLocationId: string;
  locationName: string;
  lat: number;
  lng: number;
  svgCoordinates: { x: number; y: number };
  summarySnippet: string;
  explicitSource: string;
}

// D3 geoMercator projection service for Sardinia
export function getSardinianGeoMercator(width: number = 560, height: number = 620) {
  return d3.geoMercator()
    .center([9.0, 40.0])
    .scale(8200)
    .translate([width / 2, height / 2]);
}

export function projectLatLonToSvg(lat: number, lng: number, width: number = 560, height: number = 620): { x: number; y: number } {
  const projection = getSardinianGeoMercator(width, height);
  const coords = projection([lng, lat]);
  return {
    x: coords ? coords[0] : width / 2,
    y: coords ? coords[1] : height / 2
  };
}

// Data transformer function mapping EVIDENCE_FILES to specific geographical coordinates with explicit source checks and UNMAPPED fallback
export function transformEvidenceToGeographicalNodes(width: number = 560, height: number = 620): GeoMappedEvidence[] {
  return EVIDENCE_FILES.map((file, index) => {
    let targetLoc: HistoricalLocation | null = null;
    let explicitSource = '';

    const nameUpper = file.name.toUpperCase();
    const contentLower = file.content.toLowerCase();

    if (nameUpper.includes('B02_C01') || contentLower.includes('oristano') || contentLower.includes('guesthouse')) {
      targetLoc = SARDINIAN_LOCATIONS_DATABASE.find(l => l.id === 'LOC-01-ORISTANO-CIVIL') || null;
      explicitSource = 'Explicit Manuscript Keyword: Oristano Guesthouse / B02_C01';
    } else if (contentLower.includes('alghero') || contentLower.includes('sentina') || contentLower.includes('yacht')) {
      targetLoc = SARDINIAN_LOCATIONS_DATABASE.find(l => l.id === 'LOC-05-ALGHERO-MARINA') || null;
      explicitSource = 'Explicit Manuscript Keyword: Alghero Marina / Sentina';
    } else if (contentLower.includes('tharros') || contentLower.includes('sinis')) {
      targetLoc = SARDINIAN_LOCATIONS_DATABASE.find(l => l.id === 'LOC-03-THARROS-SINIS') || null;
      explicitSource = 'Explicit Manuscript Keyword: Tharros & Sinis Peninsula';
    } else if (contentLower.includes('nuraxi') || contentLower.includes('barumini') || contentLower.includes('bronze')) {
      targetLoc = SARDINIAN_LOCATIONS_DATABASE.find(l => l.id === 'LOC-02-SU-NURAXI') || null;
      explicitSource = 'Explicit Manuscript Keyword: Su Nuraxi di Barumini';
    } else {
      // Unsupported mapping remains UNMAPPED per strict protocol
      targetLoc = null;
      explicitSource = 'NONE (UNMAPPED)';
    }

    const isUnmapped = !targetLoc;
    const activeLoc = targetLoc || SARDINIAN_LOCATIONS_DATABASE[0];
    const svgCoords = projectLatLonToSvg(activeLoc.coordinates.lat, activeLoc.coordinates.lng, width, height);

    // Extract summary snippet
    let snippet = file.content.slice(0, 120).replace(/\n/g, ' ') + '...';
    if (file.name.endsWith('.json')) {
      try {
        const parsed = JSON.parse(file.content);
        snippet = JSON.stringify(parsed).slice(0, 100) + '...';
      } catch {
        // fallback
      }
    }

    return {
      fileId: `EV-NODE-${index}-${file.name}`,
      fileName: file.name,
      category: file.category,
      linkedLocationId: isUnmapped ? 'UNMAPPED' : activeLoc.id,
      locationName: isUnmapped ? 'UNMAPPED' : activeLoc.name,
      lat: isUnmapped ? 0 : activeLoc.coordinates.lat,
      lng: isUnmapped ? 0 : activeLoc.coordinates.lng,
      svgCoordinates: svgCoords,
      summarySnippet: snippet,
      explicitSource
    };
  });
}

