import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';





@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail( correo:string ,nombre: string,comentario:string) {
    console.log("🚀enviando mail")
    try{
    await this.mailerService.sendMail({
     to: correo,
      subject: 'Gracias por contactarme',
      template: 'parael',
      context: {
        nombre,
        correo: process.env.MAIL_USER,
        asunto: "Trabajemos juntos"
      },
    });
     console.log("mensaje enviado a destinatario🚀")
     await this.mailerService.sendMail({
      to:process.env.MAIL_USER,
      subject: `${nombre} intentó contactarte`,
      template: 'parami', 
      context: {
        nombre,
        correo,
        comentario,      
      },
    });
    console.log("mensaje enviado a propietario🚀")
  }catch(error){
      console.log(error)
    }
  }
}
