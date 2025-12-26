const formatter = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 });
const fmt = (n: number) => formatter.format(n);

export function formatViews(count: number): string {
  if (!Number.isFinite(count) || count <= 0) return '0 vue';
  if (count === 1) return '1 vue';

  if (count >= 1e9) return `${fmt(count / 1e9)}G vues`;
  if (count >= 1e6) return `${fmt(count / 1e6)}M vues`;
  if (count >= 1e3) return `${fmt(count / 1e3)}K vues`;
  return `${fmt(count)} vues`;
}
