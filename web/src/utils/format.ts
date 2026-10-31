export function formatCurrency(value: number): string {

  const n = Number.isFinite(value) ? value : 0;
  return '₹' + n.toFixed(2);
}

export function toNumber(text: string): number {

  const n = Number(text);
  return Number.isFinite(n) ? n : 0;
}

export function formatDate(iso?: string | null): string {
  if (!iso) return '—';

  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(iso?: string | null): string {
  if (!iso) return '—';

  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return (
    formatDate(iso) +
    ', ' +
    d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  );
}

export function dayLabel(iso?: string | null): string {
  if (!iso) return '—';

  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toDateString();
}
