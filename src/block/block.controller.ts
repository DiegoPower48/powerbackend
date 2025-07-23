import { Controller, Get, Post, Body } from '@nestjs/common';
import { BlockService } from './block.service';
import { Block } from '@prisma/client';

@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Get()
  findAll() {
    return this.blockService.findAll();
  }

 

  @Post()
  update(@Body() block:Block) {
    return this.blockService.update(block);
  }

 
}
