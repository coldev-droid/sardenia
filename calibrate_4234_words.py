import re

# Let's inspect the target difference: 4234 - 3747 = 487 words to distribute across 217 paragraphs.
# That is an average of ~2.2 words per paragraph.
# Let's refine the prose carefully so that each sentence is rich, sensory, and strictly compliant.

from make_canonical_v3_chapter import create_canonical_chapter

paras = create_canonical_chapter()
print("Initial:", len(paras), sum(len(p.split()) for p in paras))
