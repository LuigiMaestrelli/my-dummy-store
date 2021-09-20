import { IntlNumberDecimalFormatter } from '@/infrastructure/intlNumberDecimalFormatter';

const makeSut = (): IntlNumberDecimalFormatter => {
  return new IntlNumberDecimalFormatter();
};

describe('IntlNumberDecimal Adapter', () => {
  describe('formatCurrency', () => {
    test('should format to a valid currency', () => {
      const sut = makeSut();

      const format = sut.formatCurrency(10);
      expect(format).toBe('R$ 10,00');
    });

    test('should format to a valid currency with 2 decimal points', () => {
      const sut = makeSut();

      const format = sut.formatCurrency(10.89);
      expect(format).toBe('R$ 10,89');
    });

    test('should format to a valid currency with 1 decimal points', () => {
      const sut = makeSut();

      const format = sut.formatCurrency(10.9);
      expect(format).toBe('R$ 10,90');
    });

    test('should format to a valid currency with 4 decimal points', () => {
      const sut = makeSut();

      const format = sut.formatCurrency(10.9871);
      expect(format).toBe('R$ 10,99');
    });

    test('should format to a valid currency with thousand separator', () => {
      const sut = makeSut();

      const format = sut.formatCurrency(5498710.98);
      expect(format).toBe('R$ 5.498.710,98');
    });
  });

  describe('format', () => {
    test('should format to a valid number', () => {
      const sut = makeSut();

      const format = sut.format(10);
      expect(format).toBe('10,00');
    });

    test('should format to a valid number with 2 decimal points', () => {
      const sut = makeSut();

      const format = sut.format(10.89);
      expect(format).toBe('10,89');
    });

    test('should format to a valid number with 1 decimal points', () => {
      const sut = makeSut();

      const format = sut.format(10.9);
      expect(format).toBe('10,90');
    });

    test('should format to a valid number with 4 decimal points', () => {
      const sut = makeSut();

      const format = sut.format(10.9871);
      expect(format).toBe('10,99');
    });

    test('should format to a valid number with thousand separator', () => {
      const sut = makeSut();

      const format = sut.format(5498710.98);
      expect(format).toBe('5.498.710,98');
    });
  });
});
