import { AuthenticationUseCase } from '@/application/usecases/auth/authUseCase';
import { IAuthenticationUseCase } from '@/domain/usecases/auth/authUseCase';
import { getUserApiClient } from '@/main/factories/infrastructure/user/userApiClient';
import { getUUIDGenerator } from '../../infrastructure/uuidGenerator';

const userApiClient = getUserApiClient();
const uuidGenerator = getUUIDGenerator();
const authUseCase = new AuthenticationUseCase(userApiClient, uuidGenerator);

export function useUserUseCase(): IAuthenticationUseCase {
  return authUseCase;
}
