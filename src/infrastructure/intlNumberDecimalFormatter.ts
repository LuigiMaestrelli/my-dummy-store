import { IDecimalFormatter } from '@/application/protocols/decimalFormatter';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
});

const defaultFormatter = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
});

export class IntlNumberDecimalFormatter implements IDecimalFormatter {
  formatCurrency(value: number): string {
    return currencyFormatter.format(value);
  }

  format(value: number): string {
    return defaultFormatter.format(value);
  }
}
