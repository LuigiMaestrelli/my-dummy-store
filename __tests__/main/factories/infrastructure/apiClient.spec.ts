import { getApiClient, init } from '@/main/factories/infrastructure/apiClient';
import { makeStateManagementStub } from '@test/utils/stubs/infrastructure/stateManagement';

describe('ApiClient Factory', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getApiClient', () => {
    it('should return a valid IApiClient', () => {
      const result = getApiClient();
      expect(result).toBeTruthy();
    });
  });

  describe('init', () => {
    it('should call stateManagement getAuthToken on init', () => {
      const stateManagementStub = makeStateManagementStub();
      const getAuthTokenSpy = jest.spyOn(stateManagementStub, 'getAuthToken');

      init(stateManagementStub);

      expect(getAuthTokenSpy).toBeCalled();
    });

    it('should call axiosApiClient setAuthToken if getAuthToken return a valid token', () => {
      const stateManagementStub = makeStateManagementStub();
      jest
        .spyOn(stateManagementStub, 'getAuthToken')
        .mockReturnValueOnce('valid token');
      const apiClient = getApiClient();
      const setAuthTokenSpy = jest.spyOn(apiClient, 'setAuthToken');

      init(stateManagementStub);

      expect(setAuthTokenSpy).toBeCalledWith('valid token');
    });

    it('should not call axiosApiClient setAuthToken if getAuthToken does not return a token', () => {
      const stateManagementStub = makeStateManagementStub();
      jest.spyOn(stateManagementStub, 'getAuthToken').mockReturnValueOnce('');

      const apiClient = getApiClient();
      const setAuthTokenSpy = jest.spyOn(apiClient, 'setAuthToken');

      init(stateManagementStub);

      expect(setAuthTokenSpy).not.toBeCalled();
    });
  });
});
