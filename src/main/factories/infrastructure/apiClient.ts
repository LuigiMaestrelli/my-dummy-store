import { IApiClient } from '@/application/protocols/apiClient';
import { IStateManagement } from '@/application/protocols/stateManagement';
import { AxiosApiClient } from '@/infrastructure/adapter/axiosApiClient';
import { getStateManagement } from '@/main/factories/infrastructure/stateManagement';

const axiosApiClient = new AxiosApiClient();

export function init(stateManagement: IStateManagement): void {
  const currentToken = stateManagement.getAuthToken();
  if (currentToken) {
    axiosApiClient.setAuthToken(currentToken);
  }
}

export function getApiClient(): IApiClient {
  return axiosApiClient;
}

init(getStateManagement());
