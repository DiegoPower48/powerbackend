import { Module } from '@nestjs/common';
import { VercelMultiService } from './vercel-multi.service';
import { CloudflaredService } from './cloudflared';

@Module({
  providers: [VercelMultiService, CloudflaredService],
  exports: [VercelMultiService],
})
export class ScriptsModule {}