import { FindSimilarProduct } from '@/domain/usecases/products/findSimilarProducts';
import { Product } from '@/domain/models/product';
import { useStaleWhileRevalidateApi } from '@/infrastructure/staleWhileRevalidateApiAdapter';
import { createApi } from '@/infrastructure/axiosApiClient';

export function useFindSimilarProduct(): FindSimilarProduct {
  function useFindSimilar(product: Product): Product[] {
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

  return { useFindSimilar };
}
