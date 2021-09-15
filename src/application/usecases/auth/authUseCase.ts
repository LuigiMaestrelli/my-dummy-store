import { IUserApiClient } from '@/application/protocols/user/userApiClient';
import { IUUIDGenerator } from '@/application/protocols/uuidGenerator';
import {
  AuthResult,
  IAuthenticationUseCase
} from '@/domain/usecases/auth/authUseCase';

export class AuthenticationUseCase implements IAuthenticationUseCase {
  constructor(
    private readonly userApiClient: IUserApiClient,
    private readonly uuidGenerator: IUUIDGenerator
  ) {}

  generateDummyToken = (userId: number): string => {
    const token = this.uuidGenerator.generate();
    return `${token}_${userId}`;
  };

  signIn = async (email: string, password: string): Promise<AuthResult> => {
    const user = await this.userApiClient.findByEmailAndPassword(
      email,
      password
    );

    if (!user) {
      throw new Error('Wrong e-mail or password');
    }

    const token = this.generateDummyToken(user.id);

    return {
      token,
      user
    };
  };

  signOut = async (): Promise<void> => {};
}
