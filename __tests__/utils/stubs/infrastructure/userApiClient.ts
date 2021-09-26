import { IUserApiClient } from '@/application/protocols/user/userApiClient';
import { User } from '@/domain/models/user';

class UserApiClientStub implements IUserApiClient {
  async findById(id: number): Promise<User | null> {
    return {
      id,
      name: 'valid name',
      email: 'valid email',
      avatar: 'valid avatar url'
    };
  }

  async findByAuthToken(token: string): Promise<User | null> {
    return {
      id: 1,
      name: 'valid name',
      email: 'valid email',
      avatar: 'valid avatar url'
    };
  }

  async findByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | null> {
    return {
      id: 1,
      name: 'valid name',
      email: email,
      avatar: 'valid avatar url'
    };
  }
}

export const makeUserApiClient = (): IUserApiClient => {
  return new UserApiClientStub();
};
