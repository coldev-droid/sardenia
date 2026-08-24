import re
from make_full_chapter_v3 import chapter_text

# 1. Banned patterns check
BANNED_PATTERNS = [
    r"tactical\s*overlay",
    r"safehouse",
    r"military\s*bunker",
    r"operational\s*parameters?",
    r"privacy\s*protocols?",
    r"digital\s*tracking",
    r"communication\s*discipline",
    r"catastrophic\s*failure",
    r"component\s*of\s*the\s*machine",
    r"holding\s*the\s*line",
    r"maritime\s*armor",
    r"information\s*security",
    r"sub-dermal",
    r"lanyard",
    r"protocol\s*suite",
    r"biometric"
]

print("--- 1. BANNED PATTERNS AUDIT ---")
banned_found = False
for pat in BANNED_PATTERNS:
    m = re.findall(pat, chapter_text, re.IGNORECASE)
    if m:
        print(f"FAILED: Found banned pattern: {pat} -> {m}")
        banned_found = True
if not banned_found:
    print("PASSED: Zero banned patterns found.")

# 2. Check for duplicate paragraphs or sections
print("\n--- 2. DUPLICATE PARAGRAPH AUDIT ---")
paragraphs = [p.strip() for p in chapter_text.split("\n\n") if p.strip() and not p.strip().startswith("#")]
seen_p = {}
duplicates = 0
for idx, p in enumerate(paragraphs):
    if p in seen_p:
        print(f"DUPLICATE PARAGRAPH at {idx} (first seen at {seen_p[p]}): {p[:60]}...")
        duplicates += 1
    else:
        seen_p[p] = idx

if duplicates == 0:
    print("PASSED: No duplicate paragraphs.")
else:
    print(f"FAILED: Found {duplicates} duplicate paragraphs.")

# 3. Check exact word count excluding markdown headings
lines = [l for l in chapter_text.strip().split("\n") if not l.startswith("#")]
prose = "\n".join(lines)
ws_words = prose.strip().split()
print(f"\n--- 3. WORD COUNT AUDIT ---")
print(f"Prose whitespace word count: {len(ws_words)} (Target range: 4,200 - 5,200)")
if 4200 <= len(ws_words) <= 5200:
    print("PASSED: Word count within target range.")
else:
    print("FAILED: Word count out of range.")

