import { User } from '@/domain/models/user';

export type AuthResult = {
  token: string;
  user: User;
};

export interface IAuthenticationUseCase {
  signIn(email: string, password: string): Promise<AuthResult>;
  signOut(): Promise<void>;
}
