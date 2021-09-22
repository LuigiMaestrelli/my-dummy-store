import { getCookieContainer } from '@/main/factories/infrastructure/cookieContainer';

describe('CookieContainer Factory', () => {
  it('should return a valid ICookieContainer', () => {
    const result = getCookieContainer();
    expect(result).toBeTruthy();
  });
});
