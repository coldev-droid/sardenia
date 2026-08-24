import React, { useState, useMemo } from 'react';
import { 
  Copy, 
  Check, 
  FileText, 
  ShieldAlert, 
  ExternalLink, 
  FileCode, 
  Terminal, 
  Layers, 
  AlertTriangle,
  Code2,
  Sliders,
  CheckCircle2,
  X
} from 'lucide-react';
import { 
  ONE_CLICK_EVIDENCE_CARDS, 
  VERIFICATION_SCRIPTS, 
  type EvidenceCopyCard,
  type VerificationScript 
} from '../data/automationsData';

export default function CopyPasteAutomationHub() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copyStatusMsg, setCopyStatusMsg] = useState<string>('Choose an artifact to copy.');
  const [previewingCard, setPreviewingCard] = useState<EvidenceCopyCard | VerificationScript | null>(null);

  // Bundle builder state
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({
    'EVID-01-PROSE': true,
    'EVID-02-CONTRACT': true,
    'EVID-03-CUSTODY': true,
    'EVID-04-ROUTE': false,
    'EVID-05-SOURCE': false,
    'EVID-06-CHARACTERS': false,
    'EVID-07-GATE': false,
    'EVID-08-INDEX': false
  });
  const [bundleFormat, setBundleFormat] = useState<'markdown' | 'json'>('markdown');
  const [bundleCopied, setBundleCopied] = useState<boolean>(false);

  const handleCopySingle = (text: string, id: string, title: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setCopyStatusMsg(`Copied ${title} to clipboard!`);
      setTimeout(() => {
        setCopiedId(null);
      }, 2500);
    });
  };

  const toggleItem = (id: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Assembled packet
  const assembledPacketText = useMemo(() => {
    const activeCards = ONE_CLICK_EVIDENCE_CARDS.filter(c => selectedItems[c.id]);
    
    if (activeCards.length === 0) {
      return '/* No artifacts selected. Check one or more items above to compose a review packet. */';
    }

    if (bundleFormat === 'json') {
      const jsonOutput: Record<string, any> = {
        packet_title: "B02_C01 Candidate Review Packet",
        authority: "LOCK_CROWN_REPAIR_CHECKPOINT_059",
        timestamp: new Date().toISOString(),
        format: "structured_json",
        included_artifacts_count: activeCards.length,
        artifacts: {}
      };

      activeCards.forEach(card => {
        try {
          jsonOutput.artifacts[card.filePath] = JSON.parse(card.content);
        } catch {
          jsonOutput.artifacts[card.filePath] = card.content;
        }
      });

      return JSON.stringify(jsonOutput, null, 2);
    }

    // Markdown format
    const lines: string[] = [
      "# B02_C01 CANDIDATE REVIEW PACKET",
      `AUTHORITY: LOCK_CROWN_REPAIR_CHECKPOINT_059`,
      `GENERATED_AT: ${new Date().toISOString()}`,
      `TOTAL_ARTIFACTS: ${activeCards.length}`,
      "--------------------------------------------------\n"
    ];

    activeCards.forEach(card => {
      lines.push(`## ${card.title.toUpperCase()} (${card.filePath})`);
      lines.push(`> ${card.description}\n`);
      const lang = card.filePath.endsWith('.json') ? 'json' : card.filePath.endsWith('.md') ? 'markdown' : 'text';
      lines.push(`\`\`\`${lang}`);
      lines.push(card.content);
      lines.push("```\n");
    });

    return lines.join('\n');
  }, [selectedItems, bundleFormat]);

  const handleBuildAndCopyBundle = () => {
    navigator.clipboard.writeText(assembledPacketText).then(() => {
      setBundleCopied(true);
      setCopyStatusMsg('Custom review packet assembled and copied to clipboard!');
      setTimeout(() => setBundleCopied(false), 2500);
    });
  };

  return (
    <div id="automations-hub" className="space-y-6">
      
      {/* Eyebrow & Main Title Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="text-xs font-bold uppercase tracking-wider text-cyan-800">
          Real client-side utilities
        </div>
        <h1 className="text-2xl font-black text-stone-900 tracking-tight mt-1">
          Copy-Paste & Automation Hub
        </h1>
        <p className="text-sm text-stone-600 mt-1 max-w-3xl">
          Clipboard tools now read physical local artifacts. Copying never certifies, promotes, indexes, or generates a chapter.
        </p>
      </div>

      {/* Truth Boundary Warning Panel */}
      <section className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-sm flex items-start gap-3 shadow-xs">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Truth boundary:</strong> the uploaded V3 archive contains 24 regular payload files, not a 37-file raw JSON bundle. B02_C01 remains a human-audit candidate and B02_C02 remains blocked.
        </div>
      </section>

      {/* Section 1: One-Click Sources */}
      <section className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
              One-click sources
            </div>
            <h2 className="text-lg font-bold text-stone-900 tracking-tight">
              Copy exact physical evidence
            </h2>
          </div>
          <div className="text-xs font-medium text-stone-600 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200 font-mono">
            {copyStatusMsg}
          </div>
        </div>

        {/* 8 Copy Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ONE_CLICK_EVIDENCE_CARDS.map((card) => {
            const isCopied = copiedId === card.id;
            return (
              <article 
                key={card.id}
                className="bg-stone-50 rounded-xl border border-stone-200 p-4 flex flex-col justify-between hover:border-stone-300 hover:shadow-xs transition-all"
              >
                <div>
                  <div className="text-[11px] font-semibold text-cyan-800 uppercase tracking-wider">
                    {card.kicker}
                  </div>
                  <h3 className="text-sm font-bold text-stone-900 mt-1">
                    {card.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleCopySingle(card.content, card.id, card.title)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isCopied 
                        ? 'bg-emerald-700 text-white' 
                        : 'bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 shadow-2xs'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setPreviewingCard(card)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Section 2: Two-Column Builder & Verification Scripts */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Custom Clipboard Builder */}
        <article className="lg:col-span-7 bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Custom clipboard builder
            </div>
            <h2 className="text-lg font-bold text-stone-900 tracking-tight">
              Compose a review packet
            </h2>

            {/* Checkbox Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
              {ONE_CLICK_EVIDENCE_CARDS.map((card) => {
                const checked = !!selectedItems[card.id];
                return (
                  <label 
                    key={card.id}
                    className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                      checked 
                        ? 'bg-stone-100 border-stone-400 text-stone-900 font-medium' 
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100/60'
                    }`}
                  >
                    <input 
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleItem(card.id)}
                      className="mt-0.5 rounded text-stone-900 focus:ring-stone-800 cursor-pointer"
                    />
                    <div>
                      <div className="font-semibold text-stone-900">{card.title}</div>
                      <div className="text-[11px] text-stone-500">{card.kicker}</div>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Format Selector */}
            <div className="mt-4 flex items-center gap-3">
              <label htmlFor="format-select" className="text-xs font-bold text-stone-700">
                Format:
              </label>
              <select
                id="format-select"
                value={bundleFormat}
                onChange={(e) => setBundleFormat(e.target.value as 'markdown' | 'json')}
                className="bg-stone-50 border border-stone-300 text-xs rounded-lg px-3 py-1.5 font-medium text-stone-800 focus:ring-stone-900 focus:border-stone-900"
              >
                <option value="markdown">Composite Markdown</option>
                <option value="json">Structured JSON</option>
              </select>
            </div>
          </div>

          {/* Action & Preview Box */}
          <div className="space-y-3 pt-3 border-t border-stone-100">
            <button
              onClick={handleBuildAndCopyBundle}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer ${
                bundleCopied 
                  ? 'bg-emerald-700 text-white' 
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              {bundleCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Review Packet Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Build and copy selected</span>
                </>
              )}
            </button>

            <div>
              <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                Live Assembled Packet Preview
              </div>
              <textarea
                readOnly
                value={assembledPacketText}
                rows={7}
                placeholder="The assembled text will appear here for inspection."
                className="w-full bg-stone-900 text-stone-200 text-xs font-mono p-3 rounded-lg border border-stone-700 resize-none select-all"
              />
            </div>
          </div>
        </article>

        {/* Right Column: Portable Checksum Checks */}
        <article className="lg:col-span-5 bg-stone-900 text-stone-100 rounded-xl border border-stone-800 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Verification scripts
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Portable checksum checks
            </h2>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
              These scripts verify the portal’s complete SHA256SUMS ledger. They do not call a hidden server or trust dashboard labels.
            </p>

            {/* Script List */}
            <div className="mt-4 space-y-2.5">
              {VERIFICATION_SCRIPTS.map((script) => (
                <div 
                  key={script.id}
                  className="bg-stone-800/90 border border-stone-700 rounded-lg p-3 flex items-center justify-between gap-3 hover:border-stone-600 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-stone-950 text-cyan-300 border border-stone-700 shrink-0">
                      {script.langLabel}
                    </span>
                    <span className="text-xs font-mono font-bold text-stone-200 truncate">
                      {script.filename}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleCopySingle(script.code, script.id, script.filename)}
                      className="p-1.5 rounded-md hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
                      title="Copy script code"
                    >
                      {copiedId === script.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => setPreviewingCard(script)}
                      className="p-1.5 rounded-md hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
                      title="View script"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compact Warning Panel */}
          <div className="p-3.5 bg-rose-950/70 border border-rose-800/80 rounded-xl text-rose-200 text-xs">
            <strong className="font-bold text-rose-300 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              No Chapter 2 generation prompt is enabled.
            </strong>
            <p className="text-[11px] text-rose-300/90 mt-1 leading-relaxed">
              The only supplied Chapter 2 automation is the fail-closed gate prompt (<code className="font-mono text-white">B02_C02_BLOCKED_GATE_PROMPT.md</code>).
            </p>
          </div>
        </article>

      </section>

      {/* Modal Preview for Open button */}
      {previewingCard && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-stone-900 text-stone-100 border border-stone-700 rounded-xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-stone-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white font-mono">
                  {'filePath' in previewingCard ? previewingCard.filePath : previewingCard.filename}
                </h3>
                <div className="text-xs text-stone-400">
                  {'description' in previewingCard ? previewingCard.description : ''}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const textToCopy = 'content' in previewingCard ? previewingCard.content : previewingCard.code;
                    handleCopySingle(textToCopy, 'modal-copy', 'filePath' in previewingCard ? previewingCard.filePath : previewingCard.filename);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedId === 'modal-copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'modal-copy' ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => setPreviewingCard(null)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4 flex-1 overflow-y-auto font-mono text-xs text-stone-300 bg-stone-950 whitespace-pre-wrap select-all">
              {'content' in previewingCard ? previewingCard.content : previewingCard.code}
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
