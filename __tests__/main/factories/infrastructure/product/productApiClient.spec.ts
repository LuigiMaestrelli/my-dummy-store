import { getProductApiClient } from '@/main/factories/infrastructure/product/productApiClient';

describe('ProductApiClient Factory', () => {
  it('should return a valid IProductApiClient', () => {
    const result = getProductApiClient();
    expect(result).toBeTruthy();
  });
});
