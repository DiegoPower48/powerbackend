import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VercelMultiService } from './scripts/vercel-multi.service';
async function bootstrap() {  
  const app = await NestFactory.create(AppModule);



//VERCEL+CLOUDFLARE, URL DINAMICA LOCAL API, ENVIAR ENV A VERCEL
  // const vercelService = app.get(VercelMultiService);
  // console.log('🚀 Iniciando actualización y redeploy de Vercel...');
  // await vercelService.actualizarYRedeploy();








  await app.listen(3000);
}
bootstrap();
