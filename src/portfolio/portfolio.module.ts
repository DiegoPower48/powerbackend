import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from './mail/mail.module';

@Module({
  controllers: [PortfolioController],
  providers: [PortfolioService],
  imports:[PrismaModule,MailModule],
})
export class PortfolioModule {}
