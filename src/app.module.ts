import { Module } from '@nestjs/common';
import { VercelMultiService } from './vercel/vercel-multi.service';
import { CloudflaredService } from './vercel/cloudflared';
import { PortfolioModule } from './portfolio/portfolio.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockModule } from './block/block.module';
import { ChatModule } from './websockets/chat/chat.module';
import { ScrapperModule } from './scrapper/scrapper.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { PeluchesModule } from './peluches/peluches.module';
import { VercelModule } from './vercel/scripts.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
     ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    PortfolioModule,
    BlockModule,
    ChatModule,
    VercelModule,
    ScrapperModule,
    PeluchesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
