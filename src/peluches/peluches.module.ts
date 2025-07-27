import { Module } from '@nestjs/common';
import { PeluchesService } from './peluches.service';
import { PeluchesController } from './peluches.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PeluchesController],
  providers: [PeluchesService],
})
export class PeluchesModule {}
