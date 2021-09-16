import { IUserUseCase } from '@/domain/usecases/user/userUseCase';
import { IUserApiClient } from '@/application/protocols/user/userApiClient';
import { User } from '@/domain/models/user';

export class UserUseCase implements IUserUseCase {
  constructor(private readonly userApiClient: IUserApiClient) {}

  findByToken = async (token: string): Promise<User | null> => {
    return await this.userApiClient.findByAuthToken(token);
  };
}
