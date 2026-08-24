import os
import json
import hashlib
import zipfile

evidence_dir = os.path.join(os.getcwd(), "server", "evidence", "B02_C01_EVIDENCE")

# List all payload files to include (excluding MANIFEST.json and MANIFEST.sha256 initially)
payload_files = sorted([
    "AUDIT_CONFIG.json",
    "AUDIT_CONFIG.txt",
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
    "INSPECTOR_8.json",
    "INSPECTOR_9.json",
    "INSPECTOR_10.json",
    "INSPECTOR_GENERAL_REPORT.json",
    "QUARANTINE_RECEIPT.json",
    "ROUTE_LEDGER.json",
    "SOURCE_LEDGER.json"
])

manifest = {
    "bundle_version": "V3",
    "authority": "LOCK_CROWN_REPAIR_CHECKPOINT_059",
    "unit": "B02_C01/G031",
    "total_files": len(payload_files),
    "files": {}
}

manifest_sha256_lines = []

for filename in payload_files:
    filepath = os.path.join(evidence_dir, filename)
    with open(filepath, "rb") as f:
        content = f.read()
        sha256 = hashlib.sha256(content).hexdigest()
        size = len(content)
        manifest["files"][filename] = {
            "bytes": size,
            "sha256": sha256
        }
        manifest_sha256_lines.append(f"{sha256}  {filename}")

# Write MANIFEST.json
manifest_json_path = os.path.join(evidence_dir, "MANIFEST.json")
with open(manifest_json_path, "w", encoding="utf-8") as f:
    json.dump(manifest, f, indent=2)

# Write MANIFEST.sha256
manifest_sha256_path = os.path.join(evidence_dir, "MANIFEST.sha256")
with open(manifest_sha256_path, "w", encoding="utf-8") as f:
    f.write("\n".join(manifest_sha256_lines) + "\n")

all_files_for_zip = payload_files + ["MANIFEST.json", "MANIFEST.sha256"]

# Create ZIP file in multiple required target locations
zip_filename = "B02_C01_PHYSICAL_AUDIT_BUNDLE_V3.zip"
target_paths = [
    os.path.join(os.getcwd(), zip_filename),
    os.path.join(os.getcwd(), "dist", zip_filename),
    os.path.join(os.getcwd(), "public", zip_filename),
    os.path.join(os.getcwd(), "server", "evidence", zip_filename)
]

for p in target_paths:
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with zipfile.ZipFile(p, "w", zipfile.ZIP_DEFLATED) as zf:
        for fname in all_files_for_zip:
            src = os.path.join(evidence_dir, fname)
            # Store with relative name inside zip root
            zf.write(src, arcname=fname)
    print(f"Created ZIP at {p}, size: {os.path.getsize(p)} bytes")

# Calculate Zip SHA256
with open(target_paths[0], "rb") as f:
    zip_sha256 = hashlib.sha256(f.read()).hexdigest()

print(f"\nZIP SHA256: {zip_sha256}")
print(f"Total files in ZIP: {len(all_files_for_zip)}")
