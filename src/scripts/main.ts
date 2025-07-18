import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { ScriptsModule } from './scripts.module';
import { VercelMultiService } from './vercel-multi.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(ScriptsModule);

  const vercelService = app.get(VercelMultiService);

  console.log('🚀 Iniciando actualización y redeploy de Vercel...');
  await vercelService.actualizarYRedeploy();

  await app.close();
}

bootstrap();
