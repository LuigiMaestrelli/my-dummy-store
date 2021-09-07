import { DecimalFormaterService } from '@/application/ports/decimalFormaterService';

const currencyFormater = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

const defaultFormater = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
});

export function useDecimalFormater(): DecimalFormaterService {
  function formatCurrent(value: number): string {
    return currencyFormater.format(value);
  }

  function format(value: number): string {
    return defaultFormater.format(value);
  }

  return {
    formatCurrent,
    format
  };
}
