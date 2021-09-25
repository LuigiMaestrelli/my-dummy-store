import { AuthResult } from '@/domain/usecases/auth/authUseCase';

export const getSignInMockResult = async (): Promise<AuthResult> => {
  return {
    token: 'valid token',
    user: {
      id: 1,
      name: 'valid name',
      email: 'valid email',
      avatar: 'valid avatar'
    }
  };
};
