import { Product } from '@/domain/product';
import { useApiCache } from '@/services/apiCacheAdapter';
import { createApi } from '@/services/apiAdapter';

const api = createApi();

export function useFindSimilarProduct(product: Product): Product[] {
  const { data, error } = useApiCache<Product[]>(
    `products?category=${product.category}&id_ne=${product.id}&_limit=10`,
    async url => {
      const response = await api.get<Product[]>(url);
      return response.data;
    }
  );

  if (error) {
    throw new Error(error);
  }

  return data || [];
}
