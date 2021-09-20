import { ICookieContainer } from '@/application/protocols/cookieContainer';
import nookies from 'nookies';

export class NookiesCookieContainer implements ICookieContainer {
  getCookie = (cookieName: string, context?: any): string => {
    const cookies = nookies.get(context);
    return cookies[cookieName];
  };

  setCookie = (
    cookieName: string,
    value: string,
    maxAge: number,
    context?: any
  ): void => {
    nookies.set(context, cookieName, value, {
      maxAge: maxAge,
      path: '/'
    });
  };

  deleteCookie = (cookieName: string, context?: any): void => {
    nookies.destroy(context, cookieName);
  };
}
