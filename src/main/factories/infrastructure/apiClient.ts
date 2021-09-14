import { IApiClient } from '@/application/protocols/apiClient';
import { AxiosApiClient } from '@/infrastructure/axiosApiClient';

const axiosApiClient = new AxiosApiClient();

export function getApiClient(): IApiClient {
  return axiosApiClient;
}
