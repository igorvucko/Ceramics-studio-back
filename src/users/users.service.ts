import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      username: 'admin',
      password: '$2b$10$LqY1fQsBhx2hUyC6QwFaSeI08YbXnOwFk/kB5fBeEN/UzqMaY9ks6', // Hashirana lozinka (admin123)
    },
  ];

  async findByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
}