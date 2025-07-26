import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VercelMultiService } from './vercel/vercel-multi.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {  
  const app = await NestFactory.create(AppModule);



  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }))
  app.enableCors();

  await app.listen(process.env.HOST_PORT);
}
bootstrap();
