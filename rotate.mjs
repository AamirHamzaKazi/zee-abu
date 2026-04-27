import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targets = [
    'public/images/nikkah/nikkah-hero.webp',
    'public/images/mehendi/mehendi-1.webp',
    'public/images/mehendi/mehendi-4.webp',
    'public/images/reception/reception-2.webp',
];

for (const rel of targets) {
    const fullPath = path.join(__dirname, rel);
    const outPath = fullPath + '.rotated.webp';
    try {
        await sharp(fullPath)
            .rotate(270)   // 270° CW == 90° CCW (left portrait)
            .webp({ quality: 80 })
            .toFile(outPath);
        console.log(`✅ Written: ${path.basename(outPath)}`);
    } catch (e) {
        console.error(`❌ Failed: ${rel}`, e.message);
    }
}

console.log('Done! Now manually copy the .rotated.webp files over the originals, or stop dev server first.');
