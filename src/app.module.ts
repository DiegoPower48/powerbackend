import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VercelMultiService } from './scripts/vercel-multi.service';
import { CloudflaredService } from './scripts/cloudflared';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,VercelMultiService, CloudflaredService],
  exports:[VercelMultiService]
})
export class AppModule {}
