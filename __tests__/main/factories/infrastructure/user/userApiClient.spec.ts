import { getUserApiClient } from '@/main/factories/infrastructure/user/userApiClient';

describe('UserApiClient Factory', () => {
  it('should return a valid IUserApiClient', () => {
    const result = getUserApiClient();
    expect(result).toBeTruthy();
  });
});
