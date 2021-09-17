import { ICookieContainer } from '@/application/protocols/cookieContainer';
import { IStateManagement } from '@/application/protocols/stateManagement';

const AUTH_COOKIE_NAME = 'dummy-store.token';
const TOKEN_MAX_AGE = 60 * 60 * 5; // 5 hours

export class StateManagement implements IStateManagement {
  constructor(private readonly cookieContainer: ICookieContainer) {}

  setAuthToken = (token: string, context?: any): void => {
    this.cookieContainer.setCookie(
      AUTH_COOKIE_NAME,
      token,
      TOKEN_MAX_AGE,
      context
    );
  };

  getAuthToken = (context?: any): string => {
    return this.cookieContainer.getCookie(AUTH_COOKIE_NAME, context);
  };

  removeAuthToken = (context?: any): void => {
    this.cookieContainer.deleteCookie(AUTH_COOKIE_NAME, context);
  };

  isAuthenticated = (context?: any): boolean => {
    return !!this.getAuthToken(context);
  };
}
