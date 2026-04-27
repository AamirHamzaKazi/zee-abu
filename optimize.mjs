import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images');

async function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            await processDirectory(fullPath);
        } else {
            const ext = path.extname(fullPath).toLowerCase();
            // Look for massive original files
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                const outPath = fullPath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
                if (!fs.existsSync(outPath)) {
                    console.log(`Optimizing: ${file} -> .webp`);
                    try {
                        await sharp(fullPath)
                            .resize({ width: 1920, withoutEnlargement: true }) // Caps size to 1080p desktop specs
                            .webp({ quality: 80 }) // 80% retains cinematic fidelity but crushes size
                            .toFile(outPath);
                        console.log(`✅ Success: ${path.basename(outPath)}`);
                    } catch (e) {
                        console.log(`❌ Failed: ${file}`, e.message);
                    }
                } else {
                    console.log(`⏭️ Skipped (already exists): ${path.basename(outPath)}`);
                }
            }
        }
    }
}

console.log("Starting Image Deep Compression...");
processDirectory(imagesDir).then(() => {
    console.log("Optimization Complete!");
});
