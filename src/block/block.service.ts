import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Block } from '@prisma/client';

@Injectable()
export class BlockService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.block.findMany();
  }

  update(block: Block) {
  if (typeof block.id === 'number') {
    return this.prisma.block.upsert({
      where: { id: block.id },
      update: { texto: block.texto },
      create: { id: block.id, texto: block.texto }, // puedes omitir `id` si es autoincremental
    });
  } else {
    // crear nuevo
    return this.prisma.block.create({
      data: { texto: block.texto },
    });
  }
}
}
