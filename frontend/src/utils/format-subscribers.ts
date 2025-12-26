const formatter = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 });
const fmt = (n: number) => formatter.format(n);

export function formatSubscribers(count: number): string {
  if (!Number.isFinite(count) || count <= 0) return '0 abonné';
  if (count === 1) return '1 abonné';

  if (count >= 1e9) return `${fmt(count / 1e9)}G abonnés`;
  if (count >= 1e6) return `${fmt(count / 1e6)}M abonnés`;
  if (count >= 1e3) return `${fmt(count / 1e3)}K abonnés`;
  return `${fmt(count)} abonnés`;
}
