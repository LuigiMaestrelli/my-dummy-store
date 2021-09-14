import { ProductUseCase } from '@/application/usecases/product/productUseCase';
import { IProductUseCase } from '@/domain/usecases/products/productUseCase';
import { getProductApiClient } from '@/main/factories/infrastructure/product/productApiClient';

const productApiClient = getProductApiClient();
const productUseCase = new ProductUseCase(productApiClient);

export function useProductUseCase(): IProductUseCase {
  return productUseCase;
}
