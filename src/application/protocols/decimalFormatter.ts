export interface IDecimalFormatter {
  formatCurrency(value: number): string;
  format(value: number): string;
}
