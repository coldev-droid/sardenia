import re

# Comprehensive Banned patterns from instructions
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
    r"biometric",
    r"surveillance\s*grid",
    r"covert\s*agent",
    r"covert\s*cell",
    r"fail-safe\s*trigger",
    r"extraction\s*team",
    r"cybernetic"
]

