import {
  FindOptions,
  IProductApiClient
} from '@/application/protocols/product/productApiClient';
import { Product } from '@/domain/models/product';

class ProductApiClientStub implements IProductApiClient {
  async findById(id: number): Promise<Product | null> {
    return {
      id,
      title: 'valid title',
      slug: 'valid slug',
      price: 5,
      description: 'valid description',
      category: 'valid category',
      image: 'valid image url',
      otherImages: [],
      rating: {
        count: 1,
        rate: 3
      }
    };
  }

  async findBySlug(slug: string): Promise<Product | null> {
    return {
      id: 2,
      title: 'valid title',
      slug,
      price: 5,
      description: 'valid description',
      category: 'valid category',
      image: 'valid image url',
      otherImages: [],
      rating: {
        count: 1,
        rate: 3
      }
    };
  }

  async findSimilar(id: number, category: string): Promise<Product[]> {
    return [
      {
        id: 2,
        title: 'valid title',
        slug: 'valid slug',
        price: 5,
        description: 'valid description',
        category: 'valid category',
        image: 'valid image url',
        otherImages: [],
        rating: {
          count: 1,
          rate: 3
        }
      }
    ];
  }

  find(options?: FindOptions): Promise<[Product[], number]> {
    throw new Error('Method not implemented.');
  }
}

export const makeProductApiClient = (): IProductApiClient => {
  return new ProductApiClientStub();
};
