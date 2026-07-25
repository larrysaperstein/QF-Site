import companyData from '../data/company-data.json';

export interface CompanyPerson {
  id: string;
  name: string;
  role?: string;
  extra?: string;
  image: string;
  bioHtml?: string;
  pageUrl?: string;
}

interface RosterEntry {
  id: string;
  role?: string;
  extra?: string;
}

interface ProfileRecord {
  id: string;
  name: string;
  image: string;
  bioHtml: string;
}

const EXCLUDED_CURRENT_IDS = ['ellie-diberardino', 'tony-gonzalez'];

const IMAGE_BASE_PATTERN = /^assets\/images\/headshots\//;

export function normalizeImagePath(path: string): string {
  return path.replace(IMAGE_BASE_PATTERN, '/images/headshots/');
}

export function getImageCandidates(path: string): string[] {
  const normalized = normalizeImagePath(path);
  const extensionMatch = normalized.match(/\.([^./]+)$/);

  if (!extensionMatch) {
    return [normalized];
  }

  const extension = extensionMatch[1];
  const basePath = normalized.slice(0, -extension.length - 1);
  const candidates = [normalized];
  const extensions = ['jpg', 'jpeg', 'JPG', 'JPEG', 'png', 'PNG', 'webp', 'WEBP'];

  for (const candidateExtension of extensions) {
    const candidate = `${basePath}.${candidateExtension}`;
    if (!candidates.includes(candidate)) {
      candidates.push(candidate);
    }
  }

  return candidates;
}

function buildPeople(definitions: RosterEntry[]): CompanyPerson[] {
  const profiles = companyData.profiles as Record<string, ProfileRecord>;

  return definitions.map((definition) => {
    const profile = profiles[definition.id];
    if (!profile) {
      throw new Error(`Missing shared bio profile for ${definition.id}`);
    }

    return {
      id: profile.id,
      name: profile.name,
      role: definition.role || '',
      extra: definition.extra || '',
      image: profile.image,
      bioHtml: profile.bioHtml,
      pageUrl: '',
    };
  });
}

function getCurrentCompanyPeople(): CompanyPerson[] {
  const castPeople = buildPeople(companyData.rosters.cast as RosterEntry[]);
  const creativePeople = buildPeople(companyData.rosters.creative as RosterEntry[]);
  const allCurrentPeople = castPeople.concat(
    creativePeople,
    (companyData.currentAdditionalPeople as CompanyPerson[]) || []
  );
  const seenIds: Record<string, boolean> = {};

  return allCurrentPeople.filter((person) => {
    if (seenIds[person.id]) {
      return false;
    }

    if (EXCLUDED_CURRENT_IDS.includes(person.id)) {
      return false;
    }

    seenIds[person.id] = true;
    return true;
  });
}

function getLastName(person: CompanyPerson): string {
  const nameParts = person.name.trim().split(/\s+/);
  return nameParts[nameParts.length - 1].toLowerCase();
}

function compareByLastName(a: CompanyPerson, b: CompanyPerson): number {
  const lastNameComparison = getLastName(a).localeCompare(getLastName(b));

  if (lastNameComparison !== 0) {
    return lastNameComparison;
  }

  return a.name.localeCompare(b.name);
}

export function getSortedCurrentCompany(): CompanyPerson[] {
  return getCurrentCompanyPeople().slice().sort(compareByLastName);
}

export function getSortedAlumni(): CompanyPerson[] {
  return (companyData.alumniPeople as CompanyPerson[]).slice().sort(compareByLastName);
}
