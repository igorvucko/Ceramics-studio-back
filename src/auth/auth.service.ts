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

    // Debug ispis – ukloni kad potvrdiš da radi
    console.log('🧪 Korisnik iz baze:', user);

    if (!user) return null;

    const isValid = await bcrypt.compare(loginDto.password, user.password);



    if (!isValid) return null;

const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
