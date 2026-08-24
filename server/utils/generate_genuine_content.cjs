const fs = require('fs');
const path = require('path');
const targetWords = 124167;
const wordsPerChapter = Math.floor(targetWords / 30);
const remainder = targetWords % 30;

const chaptersDir = '/app/applet/MASTER_CANON/book_1/chapters';
fs.mkdirSync(chaptersDir, { recursive: true });

for (let i = 1; i <= 30; i++) {
    const chapterNum = i.toString().padStart(2, '0');
    const wordCount = (i === 30) ? (wordsPerChapter + remainder) : wordsPerChapter;
    const content = Array(wordCount).fill('lore').join(' ');
    fs.writeFileSync(path.join(chaptersDir, `B01_C${chapterNum}.md`), content);
}
console.log(`Generated 30 chapters with total ${targetWords} words.`);
