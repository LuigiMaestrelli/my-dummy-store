export interface IStateManagement {
  getAuthToken: (context?: any) => string;
  setAuthToken: (value: string, context?: any) => void;
  removeAuthToken: (context?: any) => void;
  isAuthenticated: (context?: any) => boolean;
}
