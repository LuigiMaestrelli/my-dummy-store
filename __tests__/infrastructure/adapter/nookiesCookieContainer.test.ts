import nookies from 'nookies';

import { NookiesCookieContainer } from '@/infrastructure/adapter/nookiesCookieContainer';

const makeSut = (): NookiesCookieContainer => {
  return new NookiesCookieContainer();
};

describe('Nookies adapter', () => {
  describe('getCookie', () => {
    it('should return the cookie value on the client side', () => {
      const sut = makeSut();

      nookies.set(null, 'test_get_cookie', 'test value', {
        maxAge: 360,
        path: '/'
      });

      const cookieValue = sut.getCookie('test_get_cookie');
      expect(cookieValue).toBe('test value');
    });
  });

  describe('setCookie', () => {
    it('should set the cookie value on the client side', () => {
      const sut = makeSut();

      sut.setCookie('test_set_cookie', 'test value some', 360);

      const cookieValue = nookies.get(null).test_set_cookie;
      expect(cookieValue).toBe('test value some');
    });
  });

  describe('deleteCookie', () => {
    it('should delete the cookie value on the client side', () => {
      const sut = makeSut();

      nookies.set(null, 'test_delete_cookie', 'test value some', {
        maxAge: 360,
        path: '/'
      });

      let cookieValue = nookies.get(null).test_delete_cookie;
      expect(cookieValue).toBe('test value some');

      sut.deleteCookie('test_delete_cookie');

      cookieValue = nookies.get(null).test_delete_cookie;
      expect(cookieValue).toBeFalsy();
    });
  });
});
