import { User } from '@/domain/models/user';

export interface IUserApiClient {
  findById(id: number): Promise<User | null>;
  findByAuthToken(token: string): Promise<User | null>;
  findByEmailAndPassword(email: string, password: string): Promise<User | null>;
}
