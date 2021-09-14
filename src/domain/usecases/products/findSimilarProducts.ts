import { Product } from '@/domain/models/product';

export interface FindSimilarProduct {
  useFindSimilar(product: Product): Product[];
}
