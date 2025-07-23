import { Module } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { ScrapperController } from './scrapper.controller';

@Module({
  controllers: [ScrapperController],
  providers: [ScrapperService],
  exports:[ScrapperModule]
})
export class ScrapperModule {}
