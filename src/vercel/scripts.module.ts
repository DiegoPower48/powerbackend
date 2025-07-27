import { Module } from '@nestjs/common';
import { VercelMultiService } from './vercel-multi.service';
import { CloudflaredService } from './cloudflared';

@Module({
  providers: [VercelMultiService, CloudflaredService],  
})
export class VercelModule {}