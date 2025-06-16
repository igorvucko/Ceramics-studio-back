import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}


async validateUser(loginDto: LoginDto): Promise<string | null> {
  const user = await this.usersService.findByUsername(loginDto.username);
  if (!user) return null;

 const isValid = loginDto.password === user.password;
  if (!isValid) return null;

const payload = { username: user.username, sub: user.id };
  return this.jwtService.sign(payload);
}
}