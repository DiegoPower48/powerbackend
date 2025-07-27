import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { MailModule } from './mail/mail.module';

@Module({
  controllers: [PortfolioController],
  providers: [PortfolioService],
  imports:[MailModule],
})
export class PortfolioModule {}
