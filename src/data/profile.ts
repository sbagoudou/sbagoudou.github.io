import type { ImageMetadata } from 'astro';
import raw from '../../content/profile.json';

export interface Fact {
  value: string;
  label: string;
}

export interface Role {
  role: string;
  company: string;
  start: string;
  end: string;
  place: string;
  type: string;
  summary: string;
  highlights: string[];
}

export interface StackGroup {
  group: string;
  items: string[];
  also?: string[];
}

export interface SoftSkill {
  name: string;
  text: string;
}

export interface Education {
  degree: string;
  school: string;
  years: string;
  city: string;
}

export interface Language {
  name: string;
  level: string;
  percent: number;
}

export interface Profile {
  name: { first: string; last: string };
  title: string;
  location: string;
  email: string;
  links: { github: string; linkedin: string };
  portrait: string;
  intro: string;
  facts: Fact[];
  experience: Role[];
  stackIntro: string;
  stack: StackGroup[];
  softSkills: SoftSkill[];
  education: Education[];
  languages: Language[];
}

export const profile: Profile = raw;

export const fullName = `${profile.name.first} ${profile.name.last}`;
export const mailto = `mailto:${profile.email}`;

/** Links still set to "[ADD URL]" are left off the page until a real URL is filled in. */
export const isRealUrl = (value: string) => /^https?:\/\/\S+$/.test(value);

export const socialLinks = [
  { label: 'GitHub', href: profile.links.github },
  { label: 'LinkedIn', href: profile.links.linkedin },
].filter((link) => isRealUrl(link.href));

/** "10/2018" -> 2018 */
export const yearOf = (monthYear: string) => Number(monthYear.split('/').pop());

export const pad2 = (n: number) => String(n).padStart(2, '0');

// The portrait path in profile.json is resolved against /assets so Astro can optimise it.
const images = import.meta.glob<{ default: ImageMetadata }>('/assets/*.{png,jpg,jpeg,webp}', {
  eager: true,
});
const portraitModule = images[`/${profile.portrait}`];
if (!portraitModule) {
  throw new Error(`Portrait "${profile.portrait}" from profile.json was not found in /assets.`);
}
export const portrait = portraitModule.default;
