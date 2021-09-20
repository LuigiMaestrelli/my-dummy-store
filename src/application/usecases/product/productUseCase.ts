import { IProductUseCase } from '@/domain/usecases/products/productUseCase';
import { Product } from '@/domain/models/product';
import { IProductApiClient } from '@/application/protocols/product/productApiClient';

export class ProductUseCase implements IProductUseCase {
  constructor(private readonly productApiClient: IProductApiClient) {}

  findSimilar = async (product: Product): Promise<Product[]> => {
    return await this.productApiClient.findSimilar(
      product.id,
      product.category
    );
  };
}
