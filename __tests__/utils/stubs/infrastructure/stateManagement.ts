import { IStateManagement } from '@/application/protocols/stateManagement';

class StateManagementStub implements IStateManagement {
  getAuthToken(context?: any): string {
    return '';
  }

  setAuthToken(value: string, context?: any): void {}

  removeAuthToken(context?: any): void {}

  isAuthenticated(context?: any): boolean {
    return false;
  }
}

export const makeStateManagementStub = (): IStateManagement => {
  return new StateManagementStub();
};
