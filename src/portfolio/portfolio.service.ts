import { Injectable } from '@nestjs/common';
import { Mail } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from './mail/mail.service';

@Injectable()
export class PortfolioService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async sendMail(data: Mail) {
    this.prisma.mail.create({ data });
    this.mailService.sendWelcomeEmail(data.correo, data.nombre,data.comentario);
  }
}
