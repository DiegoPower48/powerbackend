import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {  
  const app = await NestFactory.create(AppModule);


//SWAGGER PARA DOCUMENTACION
 const config = new DocumentBuilder()
    .setTitle('Backend de Diego')
    .setDescription('Api con implementación de Vercel y cloudflare tunnel')
    .setVersion('0.1')
    .addTag('Vercel')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory)


  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }))
  app.enableCors();

  await app.listen(process.env.HOST_PORT);
}
bootstrap();
