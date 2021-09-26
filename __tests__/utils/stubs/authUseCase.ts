import {
  AuthResult,
  IAuthenticationUseCase
} from '@/domain/usecases/auth/authUseCase';

class AuthenticationUseCaseStub implements IAuthenticationUseCase {
  async signIn(email: string, password: string): Promise<AuthResult> {
    return {
      token: 'valid token',
      user: {
        id: 1,
        name: 'valid name',
        email: 'valid email',
        avatar: 'valid avatar'
      }
    };
  }
}

export const makeAuthUseCaseStub = (): IAuthenticationUseCase => {
  return new AuthenticationUseCaseStub();
};
