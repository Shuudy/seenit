export function formatSubscribers(count: number): string {
  if (!Number.isFinite(count) || count <= 0) return '0 abonné';
  if (count === 1) return '1 abonné';

  const fmt = (n: number) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(n);

  if (count >= 1_000_000_000) return `${fmt(count / 1_000_000_000)}G abonnés`;
  if (count >= 1_000_000) return `${fmt(count / 1_000_000)}M abonnés`;
  if (count >= 1_000) return `${fmt(count / 1_000)}K abonnés`;
  return `${fmt(count)} abonnés`;
}
