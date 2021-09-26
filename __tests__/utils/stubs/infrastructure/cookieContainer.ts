import { ICookieContainer } from '@/application/protocols/cookieContainer';

class CookieContainerStub implements ICookieContainer {
  getCookie(cookieName: string, context?: any): string {
    return 'valid cookie value';
  }

  setCookie(
    cookieName: string,
    value: string,
    maxAge: number,
    context?: any
  ): void {}

  deleteCookie(cookieName: string, context?: any): void {}
}

export const makeCookieContainer = (): ICookieContainer => {
  return new CookieContainerStub();
};
