import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targets = [
    'public/images/before umrah/dua-made-before-wedding.png',
    'public/images/umrah/umrah-1.png',
    'public/images/umrah/umrah-2.png',
    'public/images/umrah/umrah-3.png',
    'public/images/umrah/umrah-hands-in-hands.png',
    'public/images/umrah/umrah-seeoff.png',
];

for (const rel of targets) {
    const fullPath = path.join(__dirname, rel);
    const outPath = fullPath.replace(/\.(png|jpe?g)$/i, '.webp');
    if (fs.existsSync(outPath)) {
        console.log(`⏭️ Skipped (exists): ${path.basename(outPath)}`);
        continue;
    }
    try {
        await sharp(fullPath)
            .resize({ width: 1920, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(outPath);
        console.log(`✅ ${path.basename(outPath)}`);
    } catch (e) {
        console.error(`❌ ${rel}`, e.message);
    }
}
console.log('Done!');
