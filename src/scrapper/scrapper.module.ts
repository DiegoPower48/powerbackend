import { Module } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { ScrapperController } from './scrapper.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ScrapperController],
  providers: [ScrapperService, PrismaService],

})
export class ScrapperModule {}
