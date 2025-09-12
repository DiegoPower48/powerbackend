import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { LoginService } from './usuarios.service';
import type { Response } from 'express';

@Controller('usuarios')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/login')
  async login(
    @Body() data: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.loginService.login(data, res);
  }

  @Post('/register')
  async register(
    @Body() data: { email: string; password: string; username: string },
  ) {
    const user = await this.loginService.register(data);
    return { message: 'Usuario registrado con éxito', user };
  }

  @Get('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    console.log('Logout');
    res.clearCookie('token');
    return { message: 'Logout exitoso' };
  }
}
