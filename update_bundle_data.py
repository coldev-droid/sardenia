import os
import json

evidence_dir = os.path.join(os.getcwd(), "server", "evidence", "B02_C01_EVIDENCE")
all_files = sorted(os.listdir(evidence_dir))

evidence_files = []
for fname in all_files:
    if fname.endswith(".zip"):
        continue
    fpath = os.path.join(evidence_dir, fname)
    if not os.path.isfile(fpath):
        continue
    size = os.path.getsize(fpath)
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()
    
    category = "config"
    if fname.startswith("INSPECTOR_GENERAL"):
        category = "inspector"
    elif fname.startswith("INSPECTOR_"):
        category = "inspector"
    elif fname.endswith(".md"):
        category = "manuscript"
    elif fname.endswith("_LEDGER.json") or fname == "QUARANTINE_RECEIPT.json":
        category = "ledger"
    elif fname.startswith("MANIFEST") or fname.startswith("GIT_PROVENANCE"):
        category = "manifest"
    
    evidence_files.append({
        "name": fname,
        "size": size,
        "content": content,
        "category": category
    })

ts_content = """// Auto-generated evidence bundle data V3
export const ZIP_FILENAME = "B02_C01_PHYSICAL_AUDIT_BUNDLE_V3.zip";
export const ENDPOINT_URL = "/api/admin/audit-bundles/b02-c01-v3.zip";

export interface EvidenceFile {
  name: string;
  size: number;
  content: string;
  category: "manuscript" | "inspector" | "ledger" | "manifest" | "config";
}

export const EVIDENCE_FILES: EvidenceFile[] = """ + json.dumps(evidence_files, indent=2) + ";\n"

with open(os.path.join(os.getcwd(), "src", "bundleData.ts"), "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Updated src/bundleData.ts with {len(evidence_files)} evidence files.")
