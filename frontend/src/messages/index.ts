export { en } from './en';
export { fr } from './fr';

export const LOCALES = ['en', 'fr'] as const;

export type Locale = (typeof LOCALES)[number];
