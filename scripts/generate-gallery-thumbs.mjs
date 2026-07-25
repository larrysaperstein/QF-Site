/**
 * Generates gallery thumbnail WebPs for show grid images.
 * Skips files when the thumb exists and is newer than the source.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const THUMB_WIDTH = 800;
const WEBP_QUALITY = 82;

const showsModuleUrl = pathToFileURL(path.join(rootDir, 'src/data/shows.ts')).href;
const { shows } = await import(showsModuleUrl);

function toThumbPath(src) {
  return src.replace(/(\.[^./]+)$/, '-thumb.webp');
}

function toAbsolutePath(webPath) {
  return path.join(rootDir, webPath.replace(/^\//, ''));
}

async function ensureThumb(sourcePath, thumbPath) {
  if (!fs.existsSync(sourcePath)) {
    console.warn(`Missing source image: ${sourcePath}`);
    return { missing: true };
  }

  const sourceStat = fs.statSync(sourcePath);

  if (fs.existsSync(thumbPath)) {
    const thumbStat = fs.statSync(thumbPath);
    if (thumbStat.mtimeMs >= sourceStat.mtimeMs) {
      return { skipped: true };
    }
  }

  fs.mkdirSync(path.dirname(thumbPath), { recursive: true });

  await sharp(sourcePath)
    .rotate()
    .resize({
      width: THUMB_WIDTH,
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY })
    .toFile(thumbPath);

  return { generated: true };
}

const galleryPaths = [...new Set(shows.flatMap((show) => show.galleryImages))];
let generated = 0;
let skipped = 0;
let missing = 0;

for (const src of galleryPaths) {
  const sourcePath = toAbsolutePath(src);
  const thumbPath = toAbsolutePath(toThumbPath(src));
  const result = await ensureThumb(sourcePath, thumbPath);

  if (result.generated) {
    generated += 1;
    console.log(`Generated ${path.relative(rootDir, thumbPath)}`);
  } else if (result.skipped) {
    skipped += 1;
  } else if (result.missing) {
    missing += 1;
  }
}

console.log(
  `Gallery thumbs: ${generated} generated, ${skipped} up to date, ${missing} missing sources (${galleryPaths.length} total).`
);

if (missing > 0) {
  process.exitCode = 1;
}
