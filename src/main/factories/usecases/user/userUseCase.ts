import { UserUseCase } from '@/application/usecases/user/userUseCase';
import { IUserUseCase } from '@/domain/usecases/user/userUseCase';
import { getUserApiClient } from '@/main/factories/infrastructure/user/userApiClient';

const userApiClient = getUserApiClient();
const userUseCase = new UserUseCase(userApiClient);

export function useUserUseCase(): IUserUseCase {
  return userUseCase;
}
