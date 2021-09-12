import { Product } from '@/domain/product';
import { useStaleWhileRevalidateApi } from '@/services/staleWhileRevalidateApiAdapter';
import { createApi } from '@/services/apiAdapter';

export function useFindSimilarProduct(product: Product): Product[] {
  const api = createApi();
  const findUrl = `products?category=${product?.category}&id_ne=${product?.id}&_limit=10`;

  const { data, error } = useStaleWhileRevalidateApi<Product[]>(
    findUrl,
    async url => {
      const { data } = await api.get<Product[]>(url);
      return data;
    }
  );

  if (error) {
    throw new Error(error);
  }

  return data || [];
}
