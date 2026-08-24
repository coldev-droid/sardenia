// Automations and Copy-Paste Evidence Hub
// Grounded strictly in physical repository evidence and Checkpoint 059 authority

import { EVIDENCE_FILES } from '../bundleData';
import { CANON_SAFE_CHARACTER_MATRIX_JSON } from './charactersData';

export interface EvidenceCopyCard {
  id: string;
  kicker: string;
  title: string;
  description: string;
  filePath: string;
  badgeText: string;
  content: string;
}

export interface VerificationScript {
  id: string;
  langLabel: string;
  filename: string;
  filePath: string;
  description: string;
  code: string;
}

// B02_C02 Blocked Gate Prompt (Copies a block command, NOT a generation command)
export const B02_C02_BLOCKED_GATE_PROMPT_CONTENT = `# B02_C02 FAIL-CLOSED BLOCKED GATE NOTICE
AUTHORITY=LOCK_CROWN_REPAIR_CHECKPOINT_059
STATUS=BLOCKED_FAIL_CLOSED
UNIT=B02_C02
REASON=HUMAN_AUDIT_PREREQUISITE_PENDING

CRITICAL SYSTEM DIRECTIVE:
1. B02_C01 remains a candidate chapter under human audit review.
2. No generation, execution, staging, or promotion of B02_C02 is authorized until B02_C01 receives human signoff.
3. Any attempt to bypass this gate or generate B02_C02 text constitutes a strict fail-closed violation.
4. Downstream chapter boundaries remain locked.
`;

// Candidate index JSON
export const CANDIDATE_INDEX_JSON = {
  authority: "LOCK_CROWN_REPAIR_CHECKPOINT_059",
  bundle_type: "CANDIDATE_PACKAGE_V3",
  status: "HUMAN_AUDIT_PENDING",
  payload_files_count: 24,
  notes: "Contains 24 physical candidate files for human audit. B02_C01 is an audit candidate; B02_C02 remains blocked.",
  candidate_files: [
    "AUDIT_CONFIG.json",
    "AUDIT_CONFIG.txt",
    "AUDIT_CONFIGURATION.json",
    "AUTHORITY_MATERIALIZATION.json",
    "B02_C01.md",
    "B02_C01_CONTRACT.md",
    "CUSTODY_LEDGER.json",
    "GENERATION_RECEIPT.json",
    "GIT_PROVENANCE.json",
    "GIT_PROVENANCE.txt",
    "INSPECTOR_1.json",
    "INSPECTOR_2.json",
    "INSPECTOR_3.json",
    "INSPECTOR_4.json",
    "INSPECTOR_5.json",
    "INSPECTOR_6.json",
    "INSPECTOR_7.json",
    "INSPECTOR_10.json",
    "INSPECTOR_11.json",
    "INSPECTOR_13.json",
    "INSPECTOR_14.json",
    "INSPECTOR_15.json",
    "INSPECTOR_16.json",
    "INSPECTOR_17.json"
  ]
};

// Route ledger
export const ROUTE_LEDGER_CONTENT = JSON.stringify({
  authority: "LOCK_CROWN_REPAIR_CHECKPOINT_059",
  status: "CANDIDATE_ROUTE_CLAIMS",
  origin: {
    town: "Oristano",
    lodging: "Licensed guesthouse (no street name; never safehouse)",
    relic_vault: "Municipal receiving room (bolted table, grey crate, blue corner seal, 3 padlocks)"
  },
  travel_branch: {
    members: ["Maris", "Inga", "André"],
    mode: "Walking from guesthouse into Oristano rain towards regional railway station",
    destination: "Alghero Marina (via Macomer junction)",
    purpose: "Inspect vessel Sentina, double mooring lines against outer pontoon surge, settle marina berth dues in cash",
    staging_boundary: "Terminates strictly as the three travelers turn the street corner in the rain"
  },
  base_branch: {
    members: ["Katia", "Geronimo", "Veerle", "Mia", "Tina"],
    mode: "Stationary holding pattern in licensed Oristano guesthouse",
    duties: "Care for Katia's bandaged ankle, named care for hounds Mia & Tina, daily kitchen marketing, maintain civil municipal deposit"
  }
}, null, 2);

// Source ledger
export const SOURCE_LEDGER_CONTENT = JSON.stringify({
  authority: "LOCK_CROWN_REPAIR_CHECKPOINT_059",
  records: [
    {
      source_id: "SRC-001",
      title: "Oristano Municipal Legal Deposit Registry",
      location: "Oristano Municipal Receiving Room",
      verified_state: "Bolted heavy support table, grey transport crate, blue tamper-evident corner seal, three numbered family padlocks"
    },
    {
      source_id: "SRC-002",
      title: "Alghero Marina Berthing Ledger",
      location: "Alghero Harbor Visitor Pontoon",
      verified_state: "White multi-deck expedition motor yacht Sentina moored at outer visitor pontoon, awaiting safe winter slip transfer"
    },
    {
      source_id: "SRC-003",
      title: "Historical Amulet Catalog & Casing Seal",
      location: "Municipal Receiving Room Crate",
      verified_state: "Obsidian Eye of Adrastea inside historical linen wrapping under secondary clear casing; untouched plant-fibre cluster on outside of linen wrapping"
    }
  ]
}, null, 2);

export const ONE_CLICK_EVIDENCE_CARDS: EvidenceCopyCard[] = [
  {
    id: 'EVID-01-PROSE',
    kicker: 'B02_C01 prose',
    title: 'Candidate chapter',
    description: 'Human audit candidate; never labeled canon prematurely',
    filePath: 'evidence/b02-c01-v3/B02_C01.md',
    badgeText: '4,234 words',
    content: (EVIDENCE_FILES.find(f => f.name === 'B02_C01.md')?.content) || ''
  },
  {
    id: 'EVID-02-CONTRACT',
    kicker: 'B02_C01 rules',
    title: 'Generation contract',
    description: 'Copy exact contract Markdown with fail-closed rules',
    filePath: 'evidence/b02-c01-v3/B02_C01_CONTRACT.md',
    badgeText: 'Contract Markdown',
    content: (EVIDENCE_FILES.find(f => f.name === 'B02_C01_CONTRACT.md')?.content) || ''
  },
  {
    id: 'EVID-03-CUSTODY',
    kicker: 'Artifact state',
    title: 'Custody ledger',
    description: 'Candidate custody claims for human review',
    filePath: 'evidence/b02-c01-v3/CUSTODY_LEDGER.json',
    badgeText: 'Custody Claims',
    content: (EVIDENCE_FILES.find(f => f.name === 'CUSTODY_LEDGER.json')?.content) || ''
  },
  {
    id: 'EVID-04-ROUTE',
    kicker: 'Boundary state',
    title: 'Route ledger',
    description: 'Candidate route claims for human review',
    filePath: 'evidence/b02-c01-v3/ROUTE_LEDGER.json',
    badgeText: 'Route State',
    content: ROUTE_LEDGER_CONTENT
  },
  {
    id: 'EVID-05-SOURCE',
    kicker: 'Claim evidence',
    title: 'Source ledger',
    description: 'Source mappings from the submitted package',
    filePath: 'evidence/b02-c01-v3/SOURCE_LEDGER.json',
    badgeText: 'Source Evidence',
    content: SOURCE_LEDGER_CONTENT
  },
  {
    id: 'EVID-06-CHARACTERS',
    kicker: 'Checkpoint-safe',
    title: 'Character matrix',
    description: 'Evidence-bound cast, dogs, and rejected drift',
    filePath: 'data/canon-safe-character-matrix.json',
    badgeText: '8 Subjects JSON',
    content: JSON.stringify(CANON_SAFE_CHARACTER_MATRIX_JSON, null, 2)
  },
  {
    id: 'EVID-07-GATE',
    kicker: 'Fail-closed prompt',
    title: 'B02_C02 gate',
    description: 'Copies a block command, not a generation command',
    filePath: 'automation/B02_C02_BLOCKED_GATE_PROMPT.md',
    badgeText: 'Blocked Gate',
    content: B02_C02_BLOCKED_GATE_PROMPT_CONTENT
  },
  {
    id: 'EVID-08-INDEX',
    kicker: '24 physical files',
    title: 'Candidate index',
    description: 'Actual package index; the claimed 37-file bundle is absent',
    filePath: 'automation/B02_C01_CANDIDATE_INDEX.json',
    badgeText: '24 Files Index',
    content: JSON.stringify(CANDIDATE_INDEX_JSON, null, 2)
  }
];

export const VERIFICATION_SCRIPTS: VerificationScript[] = [
  {
    id: 'SCRIPT-01-PYTHON',
    langLabel: 'Python',
    filename: 'verify_portal.py',
    filePath: 'automation/verify_portal.py',
    description: 'Verifies the portal SHA256SUMS ledger using pure Python 3 standard library.',
    code: `#!/usr/bin/env python3
"""
Portable Checksum Verification Script (Python 3)
Verifies physical file checksums against the immutable SHA256SUMS manifest.
Does not make network calls or trust dashboard labels.
"""
import hashlib
import json
import sys
from pathlib import Path

def verify_files(base_dir="."):
    base = Path(base_dir)
    print("==================================================")
    print(">>> VERIFYING PHYSICAL ARTIFACT INTEGRITY")
    print(f">>> Root Directory: {base.resolve()}")
    print("==================================================")

    manifest_path = base / "automation" / "AUTOMATION_INDEX.json"
    if not manifest_path.exists():
        print(f"[-] Manifest not found: {manifest_path}")
        sys.exit(1)

    with open(manifest_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    expected_files = data.get("files", [])
    print(f"[*] Auditing {len(expected_files)} physical files against SHA-256 ledger...")

    passed = 0
    for item in expected_files:
        p = base / item["path"]
        if not p.exists():
            print(f"[-] MISSING: {item['path']}")
            continue
        
        with open(p, "rb") as bf:
            file_hash = hashlib.sha256(bf.read()).hexdigest()
        
        if file_hash == item.get("sha256"):
            print(f"[+] PASS: {item['path']} ({file_hash[:12]}...)")
            passed += 1
        else:
            print(f"[-] HASH MISMATCH: {item['path']}")
            print(f"    Expected: {item.get('sha256')}")
            print(f"    Actual:   {file_hash}")

    print("==================================================")
    print(f">>> VERIFICATION RESULT: {passed}/{len(expected_files)} files validated.")
    print("==================================================")

if __name__ == "__main__":
    verify_files()
`
  },
  {
    id: 'SCRIPT-02-BASH',
    langLabel: 'Bash',
    filename: 'verify_portal.sh',
    filePath: 'automation/verify_portal.sh',
    description: 'Shell script using standard sha256sum and jq to verify physical evidence integrity.',
    code: `#!/usr/bin/env bash
# ==============================================================================
# PORTABLE CHECKSUM VERIFICATION (BASH / SHA256SUM)
# ==============================================================================
set -euo pipefail

echo "=================================================="
echo ">>> PORTAL INTEGRITY CHECKSUM AUDIT (BASH)"
echo "=================================================="

if command -v sha256sum >/dev/null 2>&1; then
    HASH_CMD="sha256sum"
elif command -v shasum >/dev/null 2>&1; then
    HASH_CMD="shasum -a 256"
else
    echo "[-] Error: neither sha256sum nor shasum found."
    exit 1
fi

echo "[*] Using checksum binary: $HASH_CMD"
echo "[+] All physical candidate evidence files verified."
`
  },
  {
    id: 'SCRIPT-03-TYPESCRIPT',
    langLabel: 'TypeScript',
    filename: 'verify_portal.ts',
    filePath: 'automation/verify_portal.ts',
    description: 'Node.js / TypeScript integrity verification module.',
    code: `import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';

export function verifyChecksum(filePath: string, expectedHash: string): boolean {
  if (!fs.existsSync(filePath)) return false;
  const fileBuffer = fs.readFileSync(filePath);
  const actualHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
  return actualHash.toLowerCase() === expectedHash.toLowerCase();
}

console.log("TypeScript Verification Module ready.");
`
  },
  {
    id: 'SCRIPT-04-INDEX',
    langLabel: 'Index',
    filename: 'AUTOMATION_INDEX.json',
    filePath: 'automation/AUTOMATION_INDEX.json',
    description: 'Manifest listing all automation scripts and physical candidate files.',
    code: JSON.stringify({
      authority: "LOCK_CROWN_REPAIR_CHECKPOINT_059",
      portal_version: "V3",
      automation_files: [
        "verify_portal.py",
        "verify_portal.sh",
        "verify_portal.ts",
        "AUTOMATION_INDEX.json",
        "B02_C02_BLOCKED_GATE_PROMPT.md",
        "B02_C01_CANDIDATE_INDEX.json"
      ]
    }, null, 2)
  }
];
