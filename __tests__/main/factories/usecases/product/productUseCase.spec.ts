import { useProductUseCase } from '@/main/factories/usecases/product/productUseCase';

describe('ProductUseCase Factory', () => {
  it('should return a valid IProductUseCase', () => {
    const result = useProductUseCase();
    expect(result).toBeTruthy();
  });
});
