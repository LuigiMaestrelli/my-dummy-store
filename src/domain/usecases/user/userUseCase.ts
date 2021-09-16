import { User } from '@/domain/models/user';

export interface IUserUseCase {
  findByToken(token: string): Promise<User | null>;
}
