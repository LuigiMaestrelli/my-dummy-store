import { IApiClient } from '@/application/protocols/apiClient';
import { UserApiClient } from '@/infrastructure/adapter/user/userApiClient';
import { makeApiClientSub } from '@test/utils/stubs/apiClient';

type SutTypes = {
  sut: UserApiClient;
  apiClientSub: IApiClient;
};

const makeSut = (): SutTypes => {
  const apiClientSub = makeApiClientSub();
  const sut = new UserApiClient(apiClientSub);

  return { sut, apiClientSub };
};

describe('User API Client', () => {
  describe('findById', () => {
    it('should call apiClient.get with correct values', async () => {
      const { sut, apiClientSub } = makeSut();

      const getSpy = jest.spyOn(apiClientSub, 'get');
      await sut.findById(99);

      expect(getSpy).toHaveBeenCalledWith('users/99');
    });

    it('should throw if apiClient throws', async () => {
      const { sut, apiClientSub } = makeSut();

      jest.spyOn(apiClientSub, 'get').mockImplementationOnce(() => {
        throw new Error('test throw');
      });

      const findByIdPromise = sut.findById(99);

      await expect(findByIdPromise).rejects.toThrow(new Error('test throw'));
    });

    it('should return the data object from apiClient', async () => {
      const { sut, apiClientSub } = makeSut();

      jest.spyOn(apiClientSub, 'get').mockReturnValueOnce(
        new Promise(resolve =>
          resolve({
            data: {
              testData: 1
            },
            status: 200,
            statusText: 'Ok',
            total: 0,
            headers: {}
          })
        )
      );

      const result = await sut.findById(9);
      expect(result).toEqual({ testData: 1 });
    });
  });

  describe('findByEmailAndPassword', () => {
    it('should call apiClient.get with correct values', async () => {
      const { sut, apiClientSub } = makeSut();

      const getSpy = jest.spyOn(apiClientSub, 'get');
      await sut.findByEmailAndPassword('valid email', 'valid password');

      expect(getSpy).toHaveBeenCalledWith(
        'users?email=valid email&password=valid password'
      );
    });

    it('should throw if apiClient throws', async () => {
      const { sut, apiClientSub } = makeSut();

      jest.spyOn(apiClientSub, 'get').mockImplementationOnce(() => {
        throw new Error('test throw');
      });

      const findByEmailAndPasswordPromise = sut.findByEmailAndPassword(
        'valid email',
        'valid password'
      );

      await expect(findByEmailAndPasswordPromise).rejects.toThrow(
        new Error('test throw')
      );
    });

    it('should return the data object from apiClient', async () => {
      const { sut, apiClientSub } = makeSut();

      jest.spyOn(apiClientSub, 'get').mockReturnValueOnce(
        new Promise(resolve =>
          resolve({
            data: [
              {
                email: 'valid email',
                password: 'valid password'
              }
            ],
            status: 200,
            statusText: 'Ok',
            total: 0,
            headers: {}
          })
        )
      );

      const result = await sut.findByEmailAndPassword(
        'valid email',
        'valid password'
      );
      expect(result?.email).toEqual('valid email');
    });

    it('should return null if no user was found with e-mail and password', async () => {
      const { sut, apiClientSub } = makeSut();

      jest.spyOn(apiClientSub, 'get').mockReturnValueOnce(
        new Promise(resolve =>
          resolve({
            data: [],
            status: 200,
            statusText: 'Ok',
            total: 0,
            headers: {}
          })
        )
      );

      const result = await sut.findByEmailAndPassword(
        'invalid email',
        'invalid password'
      );
      expect(result).toEqual(null);
    });
  });

  describe('findByAuthToken', () => {
    it('should call findById with correct value', async () => {
      const { sut } = makeSut();

      const findByIdSpy = jest.spyOn(sut, 'findById');
      await sut.findByAuthToken('xxxxxxx-xxxxx-xxxxx_11');

      expect(findByIdSpy).toHaveBeenCalledWith(11);
    });

    it('should throw if findById throws', async () => {
      const { sut } = makeSut();

      jest.spyOn(sut, 'findById').mockImplementationOnce(() => {
        throw new Error('test throw');
      });

      const findByAuthTokenPromise = sut.findByAuthToken('xxxxx_10');

      await expect(findByAuthTokenPromise).rejects.toThrow(
        new Error('test throw')
      );
    });

    it('should return the user attached to the token', async () => {
      const { sut } = makeSut();

      jest.spyOn(sut, 'findById').mockReturnValueOnce(
        new Promise(resolve =>
          resolve({
            id: 11,
            name: 'valid user name',
            email: 'valid email',
            avatar: 'valid avatar'
          })
        )
      );

      const result = await sut.findByAuthToken('xxxxx_11');

      expect(result).toEqual({
        id: 11,
        name: 'valid user name',
        email: 'valid email',
        avatar: 'valid avatar'
      });
    });
  });
});
