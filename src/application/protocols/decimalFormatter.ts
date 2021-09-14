export interface IDecimalFormatter {
  formatCurrent(value: number): string;
  format(value: number): string;
}
