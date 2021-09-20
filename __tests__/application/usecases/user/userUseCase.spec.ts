import { IUserApiClient } from '@/application/protocols/user/userApiClient';
import { UserUseCase } from '@/application/usecases/user/userUseCase';
import { User } from '@/domain/models/user';

type SutTypes = {
  sut: UserUseCase;
  userApiClientStub: IUserApiClient;
};

const makeUserApiClient = (): IUserApiClient => {
  class UserApiClientStub implements IUserApiClient {
    async findById(id: number): Promise<User | null> {
      return {
        id: 1,
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

    findByEmailAndPassword(
      email: string,
      password: string
    ): Promise<User | null> {
      throw new Error('Method not implemented.');
    }
  }

  return new UserApiClientStub();
};

const makeSut = (): SutTypes => {
  const userApiClientStub = makeUserApiClient();
  const sut = new UserUseCase(userApiClientStub);

  return {
    sut,
    userApiClientStub
  };
};

describe('User UseCase', () => {
  describe('findByToken', () => {
    it('should call findByAuthToken with correct value', async () => {
      const { sut, userApiClientStub } = makeSut();

      const findByAuthTokenSpy = jest.spyOn(
        userApiClientStub,
        'findByAuthToken'
      );

      await sut.findByToken('valid auth token');

      expect(findByAuthTokenSpy).toBeCalledWith('valid auth token');
    });

    it('should throw if findByAuthToken throws', async () => {
      const { sut, userApiClientStub } = makeSut();

      jest
        .spyOn(userApiClientStub, 'findByAuthToken')
        .mockImplementationOnce(() => {
          throw new Error('test throw');
        });

      const findByAuthTokenPromise = sut.findByToken('valid auth token');

      await expect(findByAuthTokenPromise).rejects.toThrow(
        new Error('test throw')
      );
    });

    it('should return a valid user data', async () => {
      const { sut } = makeSut();

      const result = await sut.findByToken('valid token');

      expect(result).toEqual({
        id: 1,
        name: 'valid name',
        email: 'valid email',
        avatar: 'valid avatar url'
      });
    });
  });
});
