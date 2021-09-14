import { DecimalFormatter } from '@/application/protocols/decimalFormatter';

export class IntlNumberDecimalFormatter implements DecimalFormatter {
  currencyFormatter: Intl.NumberFormat;
  defaultFormatter: Intl.NumberFormat;

  constructor() {
    this.currencyFormatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    this.defaultFormatter = new Intl.NumberFormat('pt-BR', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
  }

  formatCurrent = (value: number): string => {
    return this.currencyFormatter.format(value);
  };

  format = (value: number): string => {
    return this.defaultFormatter.format(value);
  };
}
