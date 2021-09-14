import { IApiClient } from '@/application/protocols/apiClient';
import {
  IProductApiClient,
  FindOptions
} from '@/application/protocols/product/productApiClient';
import { Product } from '@/domain/models/product';

export class ProductApiClient implements IProductApiClient {
  constructor(private readonly apiClient: IApiClient) {}

  findById = async (id: number): Promise<Product | null> => {
    const { data } = await this.apiClient.get<Product>(`products/${id}`);
    return data;
  };

  findBySlug = async (slug: string): Promise<Product | null> => {
    const { data } = await this.apiClient.get<Product[]>(
      `products?slug=${slug}`
    );

    if (!data.length) {
      return null;
    }

    return data[0];
  };

  findSimilar = async (product: Product): Promise<Product[]> => {
    const response = await this.apiClient.get<Product[]>('products', {
      params: {
        category: product.category,
        id_ne: product.id,
        _limit: 10
      }
    });

    return response.data;
  };

  find = async (options?: FindOptions): Promise<[Product[], number]> => {
    const response = await this.apiClient.get<Product[]>('products', {
      params: {
        q: options?.query,
        _page: options?.page,
        _limit: options?.limit
      }
    });

    return [response.data, response.total];
  };
}
