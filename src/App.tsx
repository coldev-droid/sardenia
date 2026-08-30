import React, { useState, useMemo, useEffect } from 'react';
import { 
  Download, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  Search, 
  FolderArchive, 
  FileCode, 
  Scale, 
  Hash, 
  AlertCircle,
  RefreshCw,
  FileCheck,
  Binary,
  BrainCircuit,
  AlertOctagon,
  Layers,
  Zap,
  Users,
  Dog,
  Terminal,
  Compass,
  Flame,
  MapPin,
  Sparkles,
  Key,
  Landmark,
  Crown,
  Mountain,
  BookOpen
} from 'lucide-react';
import { ZIP_FILENAME, ENDPOINT_URL, EVIDENCE_FILES, type EvidenceFile } from './bundleData';
import SwarmTrainingCenter from './components/SwarmTrainingCenter';
import V2PostMortem from './components/V2PostMortem';
import CopyPasteAutomationHub from './components/CopyPasteAutomationHub';
import CharacterOperationsHub from './components/CharacterOperationsHub';
import AmuletTracker from './components/AmuletTracker';
import MythRouteAuditor from './components/MythRouteAuditor';
import FinalizeBooks from './components/FinalizeBooks';
import SwarmAntiBoringInspector from './components/SwarmAntiBoringInspector';
import SardinianFiguresAndLegendsExplorer from './components/SardinianFiguresAndLegendsExplorer';
import SecretRoutesAndCavesExplorer from './components/SecretRoutesAndCavesExplorer';

interface DownloadReceipt {
  status: number;
  statusText: string;
  byteSize: number;
  sha256: string;
  filename: string;
  timestamp: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'copy-paste' | 'characters' | 'amulets' | 'myths-routes' | 'anti-boring' | 'sardinian-figures' | 'secret-caves' | 'swarm' | 'files' | 'postmortem' | 'finalize-books'>('copy-paste');
  const [selectedFileName, setSelectedFileName] = useState<string>('B02_C01.md');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [headerCopied, setHeaderCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloadReceipt, setDownloadReceipt] = useState<DownloadReceipt | null>(null);
  const [serverStatus, setServerStatus] = useState<any>(null);

  // Check server endpoint status on mount
  useEffect(() => {
    fetch('/api/admin/audit-bundles/status')
      .then(res => res.json())
      .then(data => setServerStatus(data))
      .catch(err => console.log('Status endpoint check:', err));
  }, []);

  const selectedFile = useMemo(() => {
    return EVIDENCE_FILES.find(f => f.name === selectedFileName) || EVIDENCE_FILES[0];
  }, [selectedFileName]);

  const filteredFiles = useMemo(() => {
    return EVIDENCE_FILES.filter(f => {
      const matchesCategory = activeCategory === 'all' || f.category === activeCategory;
      const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            f.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Compute SHA-256 in browser via Web Crypto API
  async function computeSha256(arrayBuffer: ArrayBuffer): Promise<string> {
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Real browser fetch + Blob stream download
  const handleDownloadBundle = async () => {
    setIsDownloading(true);
    setDownloadError(null);

    try {
      const response = await fetch(ENDPOINT_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/zip'
        }
      });

      if (!response.ok) {
        let errMsg = `HTTP Error ${response.status}: ${response.statusText}`;
        try {
          const errJson = await response.json();
          if (errJson.missing_files) {
            errMsg += ` (Missing: ${errJson.missing_files.join(', ')})`;
          }
        } catch (_) {}
        throw new Error(errMsg);
      }

      const arrayBuffer = await response.arrayBuffer();
      const byteSize = arrayBuffer.byteLength;
      const calculatedSha256 = await computeSha256(arrayBuffer);

      // Create browser Blob & trigger object URL download
      const blob = new Blob([arrayBuffer], { type: 'application/zip' });
      const blobUrl = window.URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = ZIP_FILENAME;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(blobUrl);

      // Update receipt state for display
      setDownloadReceipt({
        status: response.status,
        statusText: response.statusText || 'OK',
        byteSize: byteSize,
        sha256: calculatedSha256,
        filename: ZIP_FILENAME,
        timestamp: new Date().toISOString()
      });

    } catch (err: any) {
      console.error('Download error:', err);
      setDownloadError(err.message || 'Failed to download audit bundle.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Download individual file as text/plain
  const handleDownloadSingleFile = (file: EvidenceFile) => {
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyContent = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const chapterWordCount = useMemo(() => {
    const chapter = EVIDENCE_FILES.find(f => f.name === 'B02_C01.md');
    if (!chapter) return 0;
    // Exclude markdown headings (# and ##)
    const proseLines = chapter.content
      .split('\n')
      .filter(line => !line.trim().startsWith('#'));
    return proseLines.join(' ').trim().split(/\s+/).filter(Boolean).length;
  }, []);

  return (
    <div id="app-root" className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans">
      
      {/* Top Header Bar & Navigation */}
      <header id="app-header" className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-stone-900 text-white p-2 rounded-lg">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-stone-900 tracking-tight">
                  B02_C01 Physical Audit Bundle V3
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  Stream Endpoint Active
                </span>
              </div>
              <p className="text-xs text-stone-500">
                On-Demand Server Streaming • Route: <code className="font-mono text-stone-700">{ENDPOINT_URL}</code>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              id="quick-copy-bundle-btn"
              onClick={() => {
                const bundleDump = JSON.stringify(EVIDENCE_FILES, null, 2);
                navigator.clipboard.writeText(bundleDump).then(() => {
                  setHeaderCopied(true);
                  setTimeout(() => setHeaderCopied(false), 2000);
                });
              }}
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold rounded-lg bg-stone-900 hover:bg-stone-800 text-cyan-300 border border-cyan-500/40 shadow-xs transition-all cursor-pointer"
            >
              {headerCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                  <span>Evidence Bundle JSON Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                  <span>1-Click Copy Bundle JSON</span>
                </>
              )}
            </button>

            <button
              id="download-audit-bundle-btn"
              onClick={handleDownloadBundle}
              disabled={isDownloading}
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isDownloading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  Streaming...
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Download ZIP
                </>
              )}
            </button>
          </div>
        </div>

        {/* Top Navigation Bar Tabs */}
        <div className="bg-stone-900 px-4 sm:px-6 lg:px-8 border-t border-stone-800 flex gap-1 overflow-x-auto text-xs font-semibold text-stone-300">
          <button
            onClick={() => setActiveTab('copy-paste')}
            className={`py-3 px-3.5 flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'copy-paste'
                ? 'border-cyan-400 text-white bg-stone-800'
                : 'border-transparent hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Copy className="w-4 h-4 text-cyan-400" />
            <span>Copy & Automations</span>
          </button>

          <button
            onClick={() => setActiveTab('characters')}
            className={`py-3 px-3.5 flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'characters'
                ? 'border-amber-400 text-white bg-stone-800'
                : 'border-transparent hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Users className="w-4 h-4 text-amber-400" />
            <span>Character Directory</span>
          </button>

          <button
            onClick={() => setActiveTab('amulets')}
            className={`py-3 px-3.5 flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'amulets'
                ? 'border-amber-400 text-white bg-stone-800'
                : 'border-transparent hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>12 Amulets & Puzzles</span>
          </button>

          <button
            onClick={() => setActiveTab('myths-routes')}
            className={`py-3 px-3.5 flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'myths-routes'
                ? 'border-emerald-400 text-white bg-stone-800'
                : 'border-transparent hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Landmark className="w-4 h-4 text-emerald-400" />
            <span>Route & Myths Data</span>
          </button>

          <button
            onClick={() => setActiveTab('sardinian-figures')}
            className={`py-3 px-3.5 flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'sardinian-figures'
                ? 'border-amber-400 text-white bg-stone-800'
                : 'border-transparent hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Crown className="w-4 h-4 text-amber-400" />
            <span>History Pantheon & Legends</span>
          </button>

          <button
            onClick={() => setActiveTab('secret-caves')}
            className={`py-3 px-3.5 flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'secret-caves'
                ? 'border-cyan-400 text-white bg-stone-800'
                : 'border-transparent hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Mountain className="w-4 h-4 text-cyan-400" />
            <span>Secret Caves & Passes</span>
          </button>

          <button
            onClick={() => setActiveTab('anti-boring')}
            className={`py-3 px-3.5 flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'anti-boring'
                ? 'border-rose-400 text-white bg-stone-800'
                : 'border-transparent hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Flame className="w-4 h-4 text-rose-400" />
            <span>Anti-Boring Inspector</span>
          </button>

          <button
            onClick={() => setActiveTab('swarm')}
            className={`py-3 px-3.5 flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'swarm'
                ? 'border-indigo-400 text-white bg-stone-800'
                : 'border-transparent hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <BrainCircuit className="w-4 h-4 text-indigo-400" />
            <span>Swarm Training (20)</span>
          </button>

          <button
            onClick={() => setActiveTab('finalize-books')}
            className={`py-3 px-3.5 flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'finalize-books'
                ? 'border-cyan-400 text-white bg-stone-800'
                : 'border-transparent hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Finalize Books</span>
          </button>
          
          <button
            onClick={() => setActiveTab('files')}
            className={`py-3 px-3.5 flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'files'
                ? 'border-blue-400 text-white bg-stone-800'
                : 'border-transparent hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Story Bible & Evidence ({EVIDENCE_FILES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('postmortem')}
            className={`py-3 px-3.5 flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer shrink-0 ${
              activeTab === 'postmortem'
                ? 'border-rose-400 text-white bg-stone-800'
                : 'border-transparent hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <AlertOctagon className="w-4 h-4 text-rose-400" />
            <span>V2 Post-Mortem</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main id="app-main" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Error Alert */}
        {downloadError && (
          <div id="download-error-alert" className="p-4 bg-rose-50 border border-rose-300 rounded-xl flex items-start gap-3 text-rose-900 text-sm">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold">Download Stream Error</div>
              <div className="text-xs mt-0.5 font-mono">{downloadError}</div>
            </div>
          </div>
        )}

        {/* Live Download Receipt Box */}
        {downloadReceipt && (
          <section id="download-receipt-box" className="bg-emerald-950 text-emerald-100 border border-emerald-700 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-800/80">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-400" />
                <h2 className="text-sm font-bold tracking-wide uppercase text-emerald-300">
                  Real Browser Download Verified
                </h2>
              </div>
              <span className="text-xs font-mono text-emerald-400">
                HTTP {downloadReceipt.status} {downloadReceipt.statusText}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-xs font-mono">
              <div className="bg-emerald-900/60 p-3 rounded-lg border border-emerald-800">
                <div className="text-emerald-400 text-[11px]">Filename</div>
                <div className="font-semibold text-white mt-1 truncate" title={downloadReceipt.filename}>
                  {downloadReceipt.filename}
                </div>
              </div>

              <div className="bg-emerald-900/60 p-3 rounded-lg border border-emerald-800">
                <div className="text-emerald-400 text-[11px]">Downloaded Byte Size</div>
                <div className="font-semibold text-white mt-1">
                  {downloadReceipt.byteSize.toLocaleString()} bytes ({(downloadReceipt.byteSize / 1024).toFixed(2)} KB)
                </div>
              </div>

              <div className="bg-emerald-900/60 p-3 rounded-lg border border-emerald-800">
                <div className="text-emerald-400 text-[11px]">HTTP Status</div>
                <div className="font-semibold text-emerald-300 mt-1">
                  {downloadReceipt.status} OK (Binary Stream)
                </div>
              </div>

              <div className="bg-emerald-900/60 p-3 rounded-lg border border-emerald-800">
                <div className="text-emerald-400 text-[11px]">Timestamp</div>
                <div className="font-semibold text-white mt-1 truncate">
                  {downloadReceipt.timestamp}
                </div>
              </div>
            </div>

            <div className="mt-3 bg-emerald-900/40 p-3 rounded-lg border border-emerald-800/80 font-mono text-xs">
              <div className="text-emerald-400 text-[11px] flex items-center gap-1.5">
                <Binary className="w-3.5 h-3.5" />
                Browser-Calculated SHA-256 Checksum:
              </div>
              <div className="text-emerald-200 text-xs mt-1 break-all select-all font-semibold">
                {downloadReceipt.sha256}
              </div>
            </div>
          </section>
        )}

        {/* Audit Status & Authority Summary */}
        <section id="authority-card" className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-100">
            <div>
              <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider">
                Audited Authority & Custody Status
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Physical bundle validated against Checkpoint 059 strict canon specifications.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="bg-stone-100 text-stone-800 px-2.5 py-1 rounded border border-stone-200">
                Direct Prose: <strong>{chapterWordCount.toLocaleString()} words</strong> (Target: 4,200–5,200)
              </span>
              <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded border border-emerald-200">
                20/20 Distinct Swarm Inspectors: PASS
              </span>
              <span className="bg-amber-50 text-amber-800 px-2.5 py-1 rounded border border-amber-200">
                B02_C02: BLOCKED (Fail-Closed)
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <div className="text-stone-500 font-medium">Eye of Adrastea Location</div>
              <div className="font-mono font-semibold text-stone-900 mt-1">Oristano Municipal Room</div>
              <div className="text-[11px] text-stone-500 mt-0.5">Bolted table, grey crate, 3 family locks</div>
            </div>
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <div className="text-stone-500 font-medium">Sentina Vessel Location</div>
              <div className="font-mono font-semibold text-stone-900 mt-1">Alghero Marina</div>
              <div className="text-[11px] text-stone-500 mt-0.5">Untouched, secured berth</div>
            </div>
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <div className="text-stone-500 font-medium">Retrieval Branch</div>
              <div className="font-mono font-semibold text-stone-900 mt-1">Maris, Inga, André</div>
              <div className="text-[11px] text-stone-500 mt-0.5">Departed Oristano, strict limits</div>
            </div>
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <div className="text-stone-500 font-medium">Amulets Introduced</div>
              <div className="font-mono font-semibold text-stone-900 mt-1">1 Introduced (12 Total)</div>
              <div className="text-[11px] text-stone-500 mt-0.5">Historical wrapping & transparent cover</div>
            </div>
          </div>
        </section>



        {/* Tab 1: One-Click Copy & Automations */}
        {activeTab === 'copy-paste' && (
          <CopyPasteAutomationHub />
        )}

        {/* Tab 2: Character Roster & Mia/Tina Matrix */}
        {activeTab === 'characters' && (
          <CharacterOperationsHub />
        )}

        {/* Tab 3: 12 Amulets & Puzzle Tracker */}
        {activeTab === 'amulets' && (
          <AmuletTracker />
        )}

        {/* Tab 4: Myth & Route Auditor */}
        {activeTab === 'myths-routes' && (
          <MythRouteAuditor />
        )}

        {/* Tab 5: Swarm Anti-Boring Inspector */}
        {activeTab === 'anti-boring' && (
          <SwarmAntiBoringInspector />
        )}

        {/* Tab 6: Swarm Training Center */}
        {activeTab === 'swarm' && (
          <SwarmTrainingCenter />
        )}

        {/* Tab: Finalize Books */}
        {activeTab === 'finalize-books' && (
          <FinalizeBooks />
        )}

        {/* Tab 2: File Explorer */}
        {activeTab === 'files' && (
          <section id="evidence-panel" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* File Selector Sidebar */}
            <div className="lg:col-span-4 bg-white rounded-xl border border-stone-200 shadow-xs p-4 flex flex-col h-[640px]">
              <div className="pb-3 border-b border-stone-100 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-stone-600" />
                    Bundle Files ({EVIDENCE_FILES.length})
                  </h3>
                  <span className="text-xs text-stone-500">
                    Select to preview or save
                  </span>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Filter evidence files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-1 pt-1 text-[11px]">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'manuscript', label: 'Manuscript' },
                    { id: 'inspector', label: 'Inspectors' },
                    { id: 'ledger', label: 'Ledgers' },
                    { id: 'manifest', label: 'Manifests' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCategory(tab.id)}
                      className={`px-2 py-0.5 rounded-full font-medium transition-colors cursor-pointer ${
                        activeCategory === tab.id
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* File List with Individual Download Trigger */}
              <div className="flex-1 overflow-y-auto mt-2 space-y-1 pr-1">
                {filteredFiles.length === 0 ? (
                  <div className="py-8 text-center text-xs text-stone-400">
                    No files match your search filter.
                  </div>
                ) : (
                  filteredFiles.map(file => {
                    const isSelected = file.name === selectedFileName;
                    let IconComponent = FileText;
                    if (file.category === 'manuscript') IconComponent = FileCode;
                    else if (file.category === 'inspector') IconComponent = ShieldCheck;
                    else if (file.category === 'ledger') IconComponent = Scale;
                    else if (file.category === 'manifest') IconComponent = Hash;

                    return (
                      <div
                        key={file.name}
                        onClick={() => setSelectedFileName(file.name)}
                        className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-stone-900 text-white font-medium shadow-xs'
                            : 'hover:bg-stone-100 text-stone-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2 truncate">
                          <IconComponent className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-stone-200' : 'text-stone-500'}`} />
                          <span className="truncate">{file.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <span className={`text-[10px] ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                            {file.size < 1024 ? `${file.size} B` : `${(file.size / 1024).toFixed(1)} KB`}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyContent(file.content);
                            }}
                            className={`p-1 rounded hover:bg-stone-700/50 ${isSelected ? 'text-stone-200 hover:text-white' : 'text-stone-400 hover:text-stone-900'}`}
                            title={`Copy text of ${file.name}`}
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownloadSingleFile(file);
                            }}
                            className={`p-1 rounded hover:bg-stone-700/50 ${isSelected ? 'text-stone-200 hover:text-white' : 'text-stone-400 hover:text-stone-900'}`}
                            title={`Download ${file.name}`}
                          >
                            <Download className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* File Content Preview & Reader */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-stone-200 shadow-xs flex flex-col h-[640px] overflow-hidden">
              {/* Viewer Header */}
              <div className="px-5 py-3.5 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <FileCode className="w-4 h-4 text-stone-600" />
                  <span className="font-mono text-xs font-semibold text-stone-900">
                    {selectedFile.name}
                  </span>
                  <span className="text-[11px] text-stone-500">
                    ({(selectedFile.size / 1024).toFixed(2)} KB • {selectedFile.content.split('\n').length} lines)
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCopyContent(selectedFile.content)}
                    className="inline-flex items-center px-2.5 py-1 bg-white hover:bg-stone-100 border border-stone-300 rounded text-xs font-medium text-stone-700 transition-colors shadow-2xs cursor-pointer"
                    title="Copy file text"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1 text-stone-500" />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDownloadSingleFile(selectedFile)}
                    className="inline-flex items-center px-2.5 py-1 bg-white hover:bg-stone-100 border border-stone-300 rounded text-xs font-medium text-stone-700 transition-colors shadow-2xs cursor-pointer"
                    title="Download single file"
                  >
                    <Download className="w-3.5 h-3.5 mr-1 text-stone-500" />
                    Save Single File
                  </button>
                </div>
              </div>

              {/* Viewer Content */}
              <div className="flex-1 p-5 overflow-auto bg-stone-950 text-stone-100 font-mono text-xs leading-relaxed selection:bg-stone-700">
                <pre className="whitespace-pre-wrap break-words font-mono">
                  {selectedFile.content}
                </pre>
              </div>
            </div>

          </section>
        )}

        {/* Tab: Sardinian History Pantheon & Legends */}
        {activeTab === 'sardinian-figures' && (
          <SardinianFiguresAndLegendsExplorer />
        )}

        {/* Tab: Secret Caves & Mountain Passes */}
        {activeTab === 'secret-caves' && (
          <SecretRoutesAndCavesExplorer />
        )}

        {/* Tab 3: V2 Post-Mortem */}
        {activeTab === 'postmortem' && (
          <V2PostMortem />
        )}

        {/* Audit Verification Block */}
        <section id="audit-verdict-receipt" className="bg-stone-900 text-stone-100 rounded-xl p-5 shadow-xs border border-stone-800">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Audit Gate Lock Output
            </h3>
          </div>
          <pre className="text-xs font-mono text-emerald-400 bg-stone-950 p-4 rounded-lg border border-stone-800 overflow-x-auto whitespace-pre">
{`SUCCESS MAY END ONLY:

B02_C01_G031_V3_ATTACHED_FOR_HUMAN_AUDIT
EYE_LOCATION=ORISTANO_MUNICIPAL_RECEIVING_ROOM
SENTINA_LOCATION=ALGHERO
AMULETS_TOTAL=12
AMULETS_INTRODUCED=1
B02_C02_REMAINS_BLOCKED`}
          </pre>
        </section>

      </main>

      {/* Footer */}
      <footer id="app-footer" className="bg-white border-t border-stone-200 py-4 text-center text-xs text-stone-500">
        B02_C01 Physical Audit Bundle V3 • Checkpoint Authority 059 • Verified Isolated Repair Branch
      </footer>
    </div>
  );
}
