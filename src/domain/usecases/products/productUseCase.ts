import { Product } from '@/domain/models/product';

export interface IProductUseCase {
  findSimilar(product: Product): Promise<Product[]>;
}
