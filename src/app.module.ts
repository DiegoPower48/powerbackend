import { Module } from '@nestjs/common';
import { VercelMultiService } from './vercel/vercel-multi.service';
import { CloudflaredService } from './vercel/cloudflared';
import { PortfolioModule } from './portfolio/portfolio.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockModule } from './block/block.module';
import { ChatModule } from './websockets/chat/chat.module';
import { ScrapperModule } from './scrapper/scrapper.module';

@Module({
  imports: [PortfolioModule,BlockModule,ChatModule, ScrapperModule],
  controllers: [AppController],
  providers: [VercelMultiService, CloudflaredService, AppService,ScrapperModule], 
})
export class AppModule {}
