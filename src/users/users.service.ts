import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      email: 'user1@email.com',
      password: 'password1',
    },
    {
      id: 2,
      email: 'user2@email.com',
      password: 'password2',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
