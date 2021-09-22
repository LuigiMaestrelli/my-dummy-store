import { useDecimalFormatter } from '@/main/factories/infrastructure/decimalFormater';

describe('DecimalFormatter Factory', () => {
  it('should return a valid IDecimalFormatter', () => {
    const result = useDecimalFormatter();
    expect(result).toBeTruthy();
  });
});
