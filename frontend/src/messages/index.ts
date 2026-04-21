export { en } from '@/messages/en';
export { fr } from '@/messages/fr';

export const LOCALES = ['en', 'fr'] as const;

export type Locale = (typeof LOCALES)[number];
