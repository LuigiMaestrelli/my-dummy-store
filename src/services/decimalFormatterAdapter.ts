import { DecimalFormatterService } from '@/application/ports/decimalFormatterService';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

const defaultFormatter = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
});

export function useDecimalFormatter(): DecimalFormatterService {
  function formatCurrent(value: number): string {
    return currencyFormatter.format(value);
  }

  function format(value: number): string {
    return defaultFormatter.format(value);
  }

  return {
    formatCurrent,
    format
  };
}
