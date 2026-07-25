import showCreditsData from '../data/show-credits.json';

export interface ShowCreditsCrewEntry {
  role: string;
  people: string[];
  layout: 'inline' | 'stacked';
}

export interface ShowCreditsSongEntry {
  title: string;
  writers: string[];
}

export interface ShowCreditsCastEntry {
  character: string;
  actors: string[];
}

export interface ShowCredits {
  crew: ShowCreditsCrewEntry[];
  songs: ShowCreditsSongEntry[];
  cast: ShowCreditsCastEntry[];
}

const creditsBySlug = showCreditsData as Record<string, ShowCredits>;

export function getShowCredits(slug: string): ShowCredits | undefined {
  return creditsBySlug[slug];
}

export function hasShowCredits(credits: ShowCredits | undefined): credits is ShowCredits {
  if (!credits) {
    return false;
  }

  return credits.crew.length > 0 || credits.songs.length > 0 || credits.cast.length > 0;
}

const CREW_ROLE_PLURALS: Record<string, string> = {
  'Head Writer': 'Head Writers',
  Director: 'Directors',
  'Co-Director': 'Co-Directors',
  Producer: 'Producers',
  'Assistant Director': 'Assistant Directors',
  'Music Director': 'Music Directors',
  'Technical Director': 'Technical Directors',
  'Assistant Technical Director': 'Assistant Technical Directors',
  'Costume Designer': 'Costume Designers',
};

export function formatCrewRoleLabel(role: string, peopleCount: number): string {
  if (role === 'Band' || role.toUpperCase() === 'BAND') {
    return 'Band';
  }

  if (peopleCount < 2) {
    if (role === 'Head Writers') {
      return 'Head Writer';
    }

    return role;
  }

  if (role.endsWith('s')) {
    return role;
  }

  return CREW_ROLE_PLURALS[role] ?? `${role}s`;
}
