export interface DecimalFormatter {
  formatCurrent(value: number): string;
  format(value: number): string;
}
