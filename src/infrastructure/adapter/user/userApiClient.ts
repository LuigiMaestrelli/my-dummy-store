import { IApiClient } from '@/application/protocols/apiClient';
import { IUserApiClient } from '@/application/protocols/user/userApiClient';
import { User } from '@/domain/models/user';

export class UserApiClient implements IUserApiClient {
  constructor(private readonly apiClient: IApiClient) {}

  findById = async (id: number): Promise<User | null> => {
    const { data } = await this.apiClient.get<User>(`users/${id}`);
    return data;
  };

  findByEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    const { data } = await this.apiClient.get<User[]>(
      `users?email=${email}&password=${password}`
    );

    if (!data.length) {
      return null;
    }

    return data[0];
  };

  findByAuthToken = async (token: string): Promise<User | null> => {
    const userId = parseInt(token.split('_')[1]);
    return this.findById(userId);
  };
}
