import { IUserApiClient } from '@/application/protocols/user/userApiClient';
import { IUUIDGenerator } from '@/application/protocols/uuidGenerator';
import { AuthenticationUseCase } from '@/application/usecases/auth/authUseCase';
import { UnauthorizedError } from '@/domain/errors';

import { makeUserApiClient } from '@test/utils/stubs/infrastructure/userApiClient';
import { makeUUIDGenerator } from '@test/utils/stubs/infrastructure/uuidGenerator';

type SutTypes = {
  sut: AuthenticationUseCase;
  userApiClientStub: IUserApiClient;
  uuidGeneratorStub: IUUIDGenerator;
};

const makeSut = (): SutTypes => {
  const uuidGeneratorStub = makeUUIDGenerator();
  const userApiClientStub = makeUserApiClient();
  const sut = new AuthenticationUseCase(userApiClientStub, uuidGeneratorStub);

  return {
    sut,
    uuidGeneratorStub,
    userApiClientStub
  };
};

describe('Auth UseCase', () => {
  describe('signIn', () => {
    it('should call findByEmailAndPassword with correct values', async () => {
      const { sut, userApiClientStub } = makeSut();

      const findByEmailAndPasswordSpy = jest.spyOn(
        userApiClientStub,
        'findByEmailAndPassword'
      );

      await sut.signIn('valid email', 'valid password');

      expect(findByEmailAndPasswordSpy).toBeCalledWith(
        'valid email',
        'valid password'
      );
    });

    it('should throw if findByEmailAndPassword throws', async () => {
      const { sut, userApiClientStub } = makeSut();

      jest
        .spyOn(userApiClientStub, 'findByEmailAndPassword')
        .mockImplementationOnce(() => {
          throw new Error('test throw');
        });

      const signInPromise = sut.signIn('valid email', 'valid password');

      await expect(signInPromise).rejects.toThrow(new Error('test throw'));
    });

    it('should throw if no user was found', async () => {
      const { sut, userApiClientStub } = makeSut();
      jest
        .spyOn(userApiClientStub, 'findByEmailAndPassword')
        .mockImplementationOnce(async () => null);

      const signInPromise = sut.signIn('valid email', 'valid password');
      await expect(signInPromise).rejects.toThrow(
        new UnauthorizedError('Wrong e-mail or password')
      );
    });

    it('should return valid token and user info on success', async () => {
      const { sut } = makeSut();

      const authResult = await sut.signIn('valid email', 'valid password');

      expect(authResult).toEqual({
        token: 'valid uuid_1',
        user: {
          id: 1,
          name: 'valid name',
          email: 'valid email',
          avatar: 'valid avatar url'
        }
      });
    });
  });
});
