import { Controller, Get, Post, Body } from '@nestjs/common';
import { BlockService } from './block.service';
import { UpdateBlockDto } from './dto/update-block.dto';

@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Get()
  findAll() {
    return this.blockService.findAll();
  }

 

  @Post()
  update(@Body() block:UpdateBlockDto) {
    return this.blockService.update(block);
  }

 
}
