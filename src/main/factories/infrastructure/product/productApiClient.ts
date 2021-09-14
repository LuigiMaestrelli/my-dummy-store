import { IProductApiClient } from '@/application/protocols/product/productApiClient';
import { ProductApiClient } from '@/infrastructure/product/productApiClient';
import { getApiClient } from '@/main/factories/infrastructure/apiClient';

const apiClient = getApiClient();
const productApiClient = new ProductApiClient(apiClient);

export function getProductApiClient(): IProductApiClient {
  return productApiClient;
}
