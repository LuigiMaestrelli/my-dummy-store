import { ICookieContainer } from '@/application/protocols/cookieContainer';
import { NookiesCookieContainer } from '@/infrastructure/nookiesCookieContainer';

const cookieContainer = new NookiesCookieContainer();

export function getCookieContainer(): ICookieContainer {
  return cookieContainer;
}
