import { Product } from '@/domain/models/product';

export type FindOptions = {
  limit?: number;
  page: number;
  query?: string;
};

export interface IProductApiClient {
  findById(id: number): Promise<Product | null>;
  findBySlug(slug: string): Promise<Product | null>;
  findSimilar(id: number, category: string): Promise<Product[]>;
  find(options?: FindOptions): Promise<[Product[], number]>;
}
