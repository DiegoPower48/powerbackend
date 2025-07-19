import { Module } from '@nestjs/common';
import { VercelMultiService } from './scripts/vercel-multi.service';
import { CloudflaredService } from './scripts/cloudflared';
import { PortfolioModule } from './portfolio/portfolio.module';
import { PrismaService } from './prisma/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PortfolioModule,],
  controllers: [AppController],
  providers: [VercelMultiService, CloudflaredService, AppService],
  exports: [VercelMultiService],
})
export class AppModule {}
