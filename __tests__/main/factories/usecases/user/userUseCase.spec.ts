import { useUserUseCase } from '@/main/factories/usecases/user/userUseCase';

describe('UserUseCase Factory', () => {
  it('should return a valid IUserUseCase', () => {
    const result = useUserUseCase();
    expect(result).toBeTruthy();
  });
});
