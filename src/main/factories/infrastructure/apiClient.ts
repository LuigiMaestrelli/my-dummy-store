import { IApiClient } from '@/application/protocols/apiClient';
import { AxiosApiClient } from '@/infrastructure/adapter/axiosApiClient';
import { getStateManagement } from '@/main/factories/infrastructure/stateManagement';

const axiosApiClient = new AxiosApiClient();

const stateManagement = getStateManagement();
const currentToken = stateManagement.getAuthToken();

if (currentToken) {
  axiosApiClient.updateAuth(currentToken);
}

export function getApiClient(): IApiClient {
  return axiosApiClient;
}
