import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from './mail/mail.service';
import { CreateMailDto } from './dto/create-mail.dto';

@Injectable()
export class PortfolioService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async sendMail(data: CreateMailDto) {
    console.log('guardando en BD');
    try {
      await this.prisma.mail.create({ data });

      await this.mailService.sendWelcomeEmail(
        data.correo,
        data.nombre,
        data.comentario,
      );
      console.log('Correo enviado y mensaje guardado con éxito.');
    } catch (error) {
      console.error('Error al guardar/enviar el correo:', error);
      throw error; 
    }
  }
}
