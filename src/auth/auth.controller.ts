import { Controller, Post, Body, Res, UnauthorizedException, Get, UseGuards, Req } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserFromJWT } from './jwt.strategy';



@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
 @Post('logout')
logout(@Res({ passthrough: true }) res: Response) {
  res.clearCookie('token');
  return { message: 'Odjava uspješna' };

};
@UseGuards(AuthGuard('jwt'))
@Get('me')
me(@Req() req:Request & {user?:UserFromJWT}){
  return req.user;
}
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: LoginDto
  ) {
    const token = await this.authService.validateUser(loginDto);
    if (!token) {
      throw new UnauthorizedException('Pogrešan username ili lozinka');
    }

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { success: true };
  }
}