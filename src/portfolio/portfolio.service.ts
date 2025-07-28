import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from './mail/mail.service';
import { CreateMailDto } from './dto/create-mail.dto';

@Injectable()
export class PortfolioService {

  private readonly logger = new Logger(PortfolioService.name)

  constructor(
    private PrismaService: PrismaService,
    private mailService: MailService,
  ) {}

  async sendMail(data: CreateMailDto) {
    this.logger.log('guardando en BD');
    try {
      await this.PrismaService.mail.create({ data });

      await this.mailService.sendWelcomeEmail(
        data.correo,
        data.nombre,
        data.comentario,
      );
      this.logger.log('Correo enviado y mensaje guardado con éxito.');
    } catch (error) {
      this.logger.error('Error al guardar/enviar el correo:', error);
      throw error; 
    }
  }
}
