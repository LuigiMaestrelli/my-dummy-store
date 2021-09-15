import { IUserApiClient } from '@/application/protocols/user/userApiClient';
import { UserApiClient } from '@/infrastructure/user/userApiClient';
import { getApiClient } from '@/main/factories/infrastructure/apiClient';

const apiClient = getApiClient();
const userApiClient = new UserApiClient(apiClient);

export function getUserApiClient(): IUserApiClient {
  return userApiClient;
}
