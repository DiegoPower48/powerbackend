import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VercelMultiService } from './vercel/vercel-multi.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {  
  const app = await NestFactory.create(AppModule);



//VERCEL+CLOUDFLARE, URL DINAMICA LOCAL API, ENVIAR ENV A VERCEL
  // const vercelService = app.get(VercelMultiService);
  // console.log('🚀 Iniciando actualización y redeploy de Vercel...');
  // await vercelService.actualizarYRedeploy();





  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }))
  app.enableCors();

  await app.listen(process.env.HOST_PORT);
}
bootstrap();
