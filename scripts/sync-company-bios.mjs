/**
 * Regenerates public/data/company-bios.json from src/data/company-data.json.
 * Run after editing company roster or bio content.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const dataPath = path.join(rootDir, 'src/data/company-data.json');
const biosPath = path.join(rootDir, 'public/data/company-bios.json');

const companyData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const bios = {};

for (const profile of Object.values(companyData.profiles)) {
  bios[profile.id] = {
    id: profile.id,
    name: profile.name,
    image: profile.image,
    bioHtml: profile.bioHtml,
  };
}

for (const person of companyData.currentAdditionalPeople) {
  bios[person.id] = {
    id: person.id,
    name: person.name,
    image: person.image,
    bioHtml: person.bioHtml,
  };
}

for (const person of companyData.alumniPeople) {
  bios[person.id] = {
    id: person.id,
    name: person.name,
    image: person.image,
    bioHtml: person.bioHtml,
  };
}

fs.mkdirSync(path.dirname(biosPath), { recursive: true });
fs.writeFileSync(biosPath, JSON.stringify(bios));

console.log(`Wrote ${Object.keys(bios).length} bios to public/data/company-bios.json`);
