export function formatViews(count: number): string {
  if (!Number.isFinite(count) || count <= 0) return '0 vue';
  if (count === 1) return '1 vue';

  const fmt = (n: number) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(n);

  if (count >= 1_000_000_000) return `${fmt(count / 1_000_000_000)}G vues`;
  if (count >= 1_000_000) return `${fmt(count / 1_000_000)}M vues`;
  if (count >= 1_000) return `${fmt(count / 1_000)}K vues`;
  return `${fmt(count)} vues`;
}
