import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LoginService {
  private logger = new Logger(LoginService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    { email, password }: { email: string; password: string },
    res: Response,
  ) {
    const user = await this.prisma.usuarios.findFirst({ where: { email } });
    if (!user) {
      throw new HttpException('email incorrecto', HttpStatus.BAD_REQUEST);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException('contraseña incorrecta', HttpStatus.NOT_FOUND);
    }

    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    //   const jwtTimeInDays = Number(process.env.JWT_TIME || 1);
    //   const maxAge = jwtTimeInDays * 24 * 60 * 60 * 1000;

    //   res.cookie('token', token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //     sameSite: 'lax',
    //     maxAge,
    //   });
    //   this.logger.log('login correcto');
    //   return { message: 'Login correcto' };
    return res.status(201).json({ token });
  }
  async register({
    email,
    password,
    username,
  }: {
    email: string;
    password: String;
    username: string;
  }) {
    // Busca si ya existe un usuario con ese email
    console.log('Email: ', email);
    console.log('Contraseña: ', password);
    console.log('Nombre de Usuario:: ', username);

    const user = await this.prisma.usuarios.findFirst({
      where: { email },
    });
    if (user) {
      throw new HttpException('email en uso', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.usuarios.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });
    return { message: 'creado' };
  }
}
