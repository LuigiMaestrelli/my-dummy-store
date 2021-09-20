import { ICookieContainer } from '@/application/protocols/cookieContainer';
import nookies, { parseCookies, setCookie, destroyCookie } from 'nookies';

export class NookiesCookieContainer implements ICookieContainer {
  getCookieClientSide = (cookieName: string): string => {
    const cookies = parseCookies();
    return cookies[cookieName];
  };

  getCookieServerSide = (cookieName: string, context: any): string => {
    const cookies = nookies.get(context);
    return cookies[cookieName];
  };

  getCookie = (cookieName: string, context?: any): string => {
    if (context) {
      return this.getCookieServerSide(cookieName, context);
    }

    return this.getCookieClientSide(cookieName);
  };

  setCookieClientSide = (
    cookieName: string,
    value: string,
    maxAge: number
  ): void => {
    setCookie(null, cookieName, value, {
      maxAge: maxAge,
      path: '/'
    });
  };

  setCookieServerSide = (
    cookieName: string,
    value: string,
    maxAge: number,
    context: any
  ): void => {
    nookies.set(context, cookieName, value, {
      maxAge: maxAge,
      path: '/'
    });
  };

  setCookie = (
    cookieName: string,
    value: string,
    maxAge: number,
    context?: any
  ): void => {
    if (context) {
      return this.setCookieServerSide(cookieName, value, maxAge, context);
    }

    return this.setCookieClientSide(cookieName, value, maxAge);
  };

  deleteCookieClientSide = (cookieName: string): void => {
    destroyCookie(null, cookieName);
  };

  deleteCookieServerSide = (cookieName: string, context: any): void => {
    destroyCookie(context, cookieName);
  };

  deleteCookie = (cookieName: string, context?: any): void => {
    if (context) {
      return this.deleteCookieServerSide(cookieName, context);
    }

    return this.deleteCookieClientSide(cookieName);
  };
}
