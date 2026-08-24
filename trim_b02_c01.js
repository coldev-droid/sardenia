const fs = require('fs');
let text = fs.readFileSync('/app/applet/handoff/B02_C01_EVIDENCE/B02_C01.md', 'utf8');

// I'll truncate the file string from the end by removing the last 600 words approx.
let words = text.split(/\s+/);
let trimmed = words.slice(0, 4800).join(" ");
// Ensure we end on a complete sentence or just re-generate cleanly.
// Let's do it cleanly by dropping the last few paragraphs.
let paragraphs = text.split('\n\n');
while(paragraphs.join('\n\n').split(/\s+/).length > 5100) {
    paragraphs.pop();
}
fs.writeFileSync('/app/applet/handoff/B02_C01_EVIDENCE/B02_C01.md', paragraphs.join('\n\n'));
