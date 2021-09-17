import { IStateManagement } from '@/application/protocols/stateManagement';
import { StateManagement } from '@/infrastructure/stateManagement';
import { getCookieContainer } from './cookieContainer';

const cookieContainer = getCookieContainer();
const stateManagement = new StateManagement(cookieContainer);

export function getStateManagement(): IStateManagement {
  return stateManagement;
}
