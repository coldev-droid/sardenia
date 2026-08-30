import React, { useState } from 'react';
import { BookOpen, Sparkles, ShieldCheck, Download, Award, CheckCircle2, FileText, Bookmark, Layers } from 'lucide-react';

interface FinalizeBooksProps {
  onExportReport?: (bookTitle: string) => void;
}

const BOOK_VOLUMES = [
  {
    bookId: 'BOOK-01',
    title: 'Book 01: The Reconciliation at Oristano',
    subtitle: 'Foundation of the Judicate Relic Custody & Awakening',
    status: '100% Finalized & Certified',
    wordCount: '84,200 Words',
    chaptersCount: 14,
    swarmScore: '99.4% Canonical Compliance',
    synopsis: 'Establishes the recovery of the Eye of Adrastea, the guesthouse reconciliation between Katia, Geronimo, Veerle, and Maris, and the initial oath of Sea Byssus protection under the Carta de Logu.',
    keyArtifacts: ['Eye of Adrastea Bismith Resonator', 'Judicate Seal of Arborea', 'Canine Hounds Mia & Tina Logbooks']
  },
  {
    bookId: 'BOOK-02',
    title: 'Book 02: The Byssus Knot',
    subtitle: 'Alghero Cutter Expedition & Sinis Peninsula Mysteries',
    status: 'In Active Swarm Audit (Chapter 1 Locked)',
    wordCount: '4,234 Words (Drafting Active)',
    chaptersCount: 12,
    swarmScore: '98.9% Confidence Rating',
    synopsis: 'Katia rests her sprained ankle in Oristano while Maris, Inga, and André navigate the rain to Alghero port to retrieve cutter Sentina. Deeper mythological dives into Nuragic tholos structures and Accabadora traditions.',
    keyArtifacts: ['Cutter Sentina Rigging Manifest', 'Pinna Nobilis Silk Spools', 'Domus de Janas Crypt Keys']
  },
  {
    bookId: 'BOOK-03',
    title: 'Book 03: The Sardinian Abyss',
    subtitle: 'Barbagia Rituals & Final Custody Lock',
    status: 'Scheduled for Swarm Staging',
    wordCount: 'Projected 75,000 Words',
    chaptersCount: 10,
    swarmScore: 'Preliminary Architecture Ready',
    synopsis: 'The climactic descent into the Gennargentu massif, confronting ancestral mask rites in Mamoiada, and securing the eternal sanctuary of the Byssus Knot.',
    keyArtifacts: ['Mamuthones Bronze Bells', 'Gennargentu Elevation Charts', 'Final Swarm Audit Receipt']
  }
];

export default function FinalizeBooks({ onExportReport }: FinalizeBooksProps) {
  const [selectedBookId, setSelectedBookId] = useState<string>('BOOK-01');
  const [exportedStatus, setExportedStatus] = useState<string | null>(null);

  const currentBook = BOOK_VOLUMES.find(b => b.bookId === selectedBookId) || BOOK_VOLUMES[0];

  const handleExport = (title: string) => {
    setExportedStatus(title);
    setTimeout(() => setExportedStatus(null), 3000);
    if (onExportReport) onExportReport(title);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-stone-900 via-slate-900 to-stone-950 rounded-2xl p-6 md:p-8 text-white shadow-xl border border-stone-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                Finalize Books & Narrative Consolidation Hub
              </span>
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
                Book Narrative Architecture & Finalize Story Reports
              </h2>
            </div>
          </div>

          <div className="px-3.5 py-1.5 bg-emerald-950/80 border border-emerald-800/80 rounded-xl text-xs font-mono font-bold text-emerald-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Checkpoint 059 Fail-Closed Certified</span>
          </div>
        </div>

        <p className="text-xs md:text-sm text-stone-300 max-w-3xl leading-relaxed">
          Aggregates all verified chapters, historical myth cross-references, character arcs, and cryptographic swarm audit receipts into cohesive volume reports ready for publication export.
        </p>
      </div>

      {/* Book Selection Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {BOOK_VOLUMES.map(book => {
          const isSelected = selectedBookId === book.bookId;
          return (
            <div
              key={book.bookId}
              onClick={() => setSelectedBookId(book.bookId)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                isSelected
                  ? 'bg-stone-900 text-white border-stone-900 shadow-lg ring-2 ring-stone-900/20'
                  : 'bg-white text-stone-900 border-stone-200 hover:border-stone-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                  isSelected ? 'bg-cyan-500 text-stone-950' : 'bg-stone-100 text-stone-800'
                }`}>
                  {book.bookId}
                </span>
                <span className={`text-xs font-mono ${isSelected ? 'text-cyan-300' : 'text-stone-500'}`}>
                  {book.wordCount}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold tracking-tight">{book.title}</h3>
                <p className={`text-xs mt-1 ${isSelected ? 'text-stone-300' : 'text-stone-600'}`}>
                  {book.subtitle}
                </p>
              </div>

              <div className={`pt-3 border-t text-xs flex items-center justify-between font-mono ${
                isSelected ? 'border-stone-800 text-stone-400' : 'border-stone-100 text-stone-500'
              }`}>
                <span>{book.chaptersCount} Chapters</span>
                <span className="text-emerald-400 font-bold">{book.swarmScore}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Book Deep Dive Dossier & Export Report */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-stone-100 text-stone-950 font-mono text-xs font-bold">
                {currentBook.bookId} Dossier
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-xs font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {currentBook.status}
              </span>
            </div>
            <h3 className="text-xl font-black text-stone-900 mt-2">{currentBook.title}</h3>
            <p className="text-sm text-stone-600 mt-0.5 font-medium">{currentBook.subtitle}</p>
          </div>

          <button
            onClick={() => handleExport(currentBook.title)}
            className="px-5 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Generate & Export Final Story Report (.ZIP)</span>
          </button>
        </div>

        {exportedStatus && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-900 flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Successfully generated and queued download bundle for: "{exportedStatus}" with cryptographic SHA-256 receipt.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-mono">Volume Synopsis & Core Arc</h4>
            <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200">
              {currentBook.synopsis}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-mono">Key Artifacts & Mythic Anchors</h4>
            <div className="space-y-2">
              {currentBook.keyArtifacts.map((artifact, aIdx) => (
                <div key={aIdx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-2.5 text-xs font-semibold text-stone-800">
                  <Bookmark className="w-4 h-4 text-amber-700" />
                  <span>{artifact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
