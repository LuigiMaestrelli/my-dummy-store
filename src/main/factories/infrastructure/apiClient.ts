import { IApiClient } from '@/application/protocols/apiClient';
import { AxiosApiClient } from '@/infrastructure/axiosApiClient';
import { getCookieContainer } from '@/main/factories/infrastructure/cookieContainer';

const axiosApiClient = new AxiosApiClient();

const cookieContainer = getCookieContainer();
const currentToken = cookieContainer.getCookie(
  process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME || ''
);

if (currentToken) {
  axiosApiClient.updateAuth(currentToken);
}

export function getApiClient(): IApiClient {
  return axiosApiClient;
}
