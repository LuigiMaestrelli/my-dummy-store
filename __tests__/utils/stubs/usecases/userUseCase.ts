import { User } from '@/domain/models/user';
import { IUserUseCase } from '@/domain/usecases/user/userUseCase';

class UserUseCaseStub implements IUserUseCase {
  async findByToken(token: string): Promise<User | null> {
    return {
      id: 1,
      name: 'valid name',
      email: 'valid email',
      avatar: 'valid avatar url'
    };
  }
}

export const makeUserUseCaseStub = (): IUserUseCase => {
  return new UserUseCaseStub();
};
