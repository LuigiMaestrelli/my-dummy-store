import { useAuthUseCase } from '@/main/factories/usecases/auth/authUseCase';

describe('UseAuthCase Factory', () => {
  it('should return a valid IAuthenticationUseCase', () => {
    const result = useAuthUseCase();
    expect(result).toBeTruthy();
  });
});
