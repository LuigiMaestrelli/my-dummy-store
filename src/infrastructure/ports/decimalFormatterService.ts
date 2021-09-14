export interface DecimalFormatterService {
  formatCurrent(value: number): string;
  format(value: number): string;
}
