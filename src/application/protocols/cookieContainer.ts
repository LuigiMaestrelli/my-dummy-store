export interface ICookieContainer {
  getCookie(cookieName: string, context?: any): string;
  setCookie(
    cookieName: string,
    value: string,
    maxAge: number,
    context?: any
  ): void;
  deleteCookie(cookieName: string, context?: any): void;
}
