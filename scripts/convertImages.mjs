import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, "../public/gallery_images");
const fullDir = path.join(__dirname, "../public/gallery_images/full");
const thumbDir = path.join(__dirname, "../public/gallery_images/thumbnails");

async function init() {
  if (!fs.existsSync(fullDir)) fs.mkdirSync(fullDir, { recursive: true });
  if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir, { recursive: true });

  const files = fs.readdirSync(inputDir).filter((file) => file.match(/\.(jpg|jpeg|png)$/i));

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const parsed = path.parse(file);
    const webpFilename = `${parsed.name}.webp`;
    
    console.log(`Processing: ${file}`);
    
    // Generate Thumbnail
    await sharp(inputPath)
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(path.join(thumbDir, webpFilename));
      
    // Generate Full sized webp
    await sharp(inputPath)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(path.join(fullDir, webpFilename));
  }
  
  console.log("Done generating WebP images!");
}

init().catch(console.error);
