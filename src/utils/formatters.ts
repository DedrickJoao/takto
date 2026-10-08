export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '-';
  try {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? dateString : d.toLocaleDateString('pt-BR');
  } catch {
    return dateString;
  }
}

export function getIntervalLabel(interval: 'month' | 'quarter' | 'semester' | 'year'): string {
  switch (interval) {
    case 'month':
      return 'mês';
    case 'quarter':
      return 'trimestre';
    case 'semester':
      return 'semestre';
    case 'year':
      return 'ano';
    default:
      return 'período';
  }
}

export function getIntervalBadge(interval: 'month' | 'quarter' | 'semester' | 'year'): string {
  switch (interval) {
    case 'month':
      return 'Mensal';
    case 'quarter':
      return 'Trimestral';
    case 'semester':
      return 'Semestral';
    case 'year':
      return 'Anual';
    default:
      return 'Recorrente';
  }
}
