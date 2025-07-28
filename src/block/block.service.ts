import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateBlockDto } from './dto/update-block.dto';

@Injectable()
export class BlockService {  
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.block.findMany();
  }

  update(block: UpdateBlockDto) {
  if (typeof block.id === 'number') {
    return this.prisma.block.upsert({
      where: { id: block.id },
      update: { texto: block.texto },
      create: { id: block.id, texto: block.texto },
    });
  } else {
    return this.prisma.block.create({
      data: { texto: block.texto },
    });
  }
}
}
