import { ICookieContainer } from '@/application/protocols/cookieContainer';
import { StateManagement } from '@/infrastructure/stateManagement';
import { makeCookieContainer } from '@test/utils/stubs/infrastructure/cookieContainer';

type SutTypes = {
  sut: StateManagement;
  cookieContainerStub: ICookieContainer;
};

const makeSut = (): SutTypes => {
  const cookieContainerStub = makeCookieContainer();
  const sut = new StateManagement(cookieContainerStub);

  return {
    sut,
    cookieContainerStub
  };
};

describe('State Management', () => {
  describe('setAuthToken', () => {
    it('should call cookieContainer with correct values', () => {
      const { sut, cookieContainerStub } = makeSut();

      const setCookieSpy = jest.spyOn(cookieContainerStub, 'setCookie');

      sut.setAuthToken('valid token', 'context');

      expect(setCookieSpy).toBeCalledWith(
        'dummy-store.token',
        'valid token',
        18000,
        'context'
      );
    });

    it('should throw if cookieContainer throws', () => {
      const { sut, cookieContainerStub } = makeSut();

      jest
        .spyOn(cookieContainerStub, 'setCookie')
        .mockImplementationOnce(() => {
          throw new Error('Test error');
        });

      expect(() => sut.setAuthToken('valid token', 'context')).toThrow(
        new Error('Test error')
      );
    });
  });

  describe('getAuthToken', () => {
    it('should call cookieContainer with correct values', () => {
      const { sut, cookieContainerStub } = makeSut();

      const setCookieSpy = jest.spyOn(cookieContainerStub, 'getCookie');

      sut.getAuthToken('context');

      expect(setCookieSpy).toBeCalledWith('dummy-store.token', 'context');
    });

    it('should throw if cookieContainer throws', () => {
      const { sut, cookieContainerStub } = makeSut();

      jest
        .spyOn(cookieContainerStub, 'getCookie')
        .mockImplementationOnce(() => {
          throw new Error('Test error');
        });

      expect(() => sut.getAuthToken('context')).toThrow(
        new Error('Test error')
      );
    });

    it('should return the auth value', () => {
      const { sut } = makeSut();

      const token = sut.getAuthToken();
      expect(token).toBe('valid cookie value');
    });
  });

  describe('removeAuthToken', () => {
    it('should call cookieContainer with correct values', () => {
      const { sut, cookieContainerStub } = makeSut();

      const setCookieSpy = jest.spyOn(cookieContainerStub, 'deleteCookie');

      sut.removeAuthToken('context');

      expect(setCookieSpy).toBeCalledWith('dummy-store.token', 'context');
    });

    it('should throw if cookieContainer throws', () => {
      const { sut, cookieContainerStub } = makeSut();

      jest
        .spyOn(cookieContainerStub, 'deleteCookie')
        .mockImplementationOnce(() => {
          throw new Error('Test error');
        });

      expect(() => sut.removeAuthToken('context')).toThrow(
        new Error('Test error')
      );
    });
  });

  describe('isAuthenticated', () => {
    it('should call getAuthToken with correct values', () => {
      const { sut } = makeSut();

      const getAuthTokenSpy = jest.spyOn(sut, 'getAuthToken');

      sut.isAuthenticated('context');

      expect(getAuthTokenSpy).toBeCalledWith('context');
    });

    it('should return true if cookieContainer has a saved token', () => {
      const { sut } = makeSut();

      const isAuthenticated = sut.isAuthenticated('context');

      expect(isAuthenticated).toBe(true);
    });

    it('should return false if cookieContainer does not have a saved token', () => {
      const { sut, cookieContainerStub } = makeSut();

      jest.spyOn(cookieContainerStub, 'getCookie').mockReturnValueOnce('');

      const isAuthenticated = sut.isAuthenticated('context');

      expect(isAuthenticated).toBe(false);
    });
  });
});
