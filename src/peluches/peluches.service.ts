import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PeluchesService {
  private readonly logger = new Logger(PeluchesService.name);
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    try {
      const datos = await this.prisma.peluche.findMany();
      return datos;
    } catch (error) {
      throw new HttpException(
        'no se pudo conectar a la base de datos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSlider() {
    try {
      const data = await this.prisma
        .$queryRaw`SELECT * FROM peluche ORDER BY RAND() LIMIT 5`;
      return data;
    } catch (error) {
      throw new HttpException(
        'Error en la conexión en el servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOne(id: number) {
    try {
      if (isNaN(id)) {
        throw new HttpException(
          'El id ingresado no es un numero',
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = await this.prisma.peluche.findFirstOrThrow({
        where: { id },
      });
      if (!data) {
        throw new HttpException(
          'no se pudo encontrar el peluche',
          HttpStatus.NOT_FOUND,
        );
      }
      return data;
    } catch (error) {
      throw new HttpException(
        'Error en la conexión con el servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async find(nombre: string) {
    const data = await this.prisma.peluche.findMany({
      where: {
        nombre: {
          contains: nombre,
        },
      },
    });
    return data;
  }

  async filter({
    tipo,
    color,
    precio,
  }: {
    tipo?: string;
    color?: string;
    precio?: string;
  }) {
    const where: any = {};
    if (tipo) {
      where.tipo = { contains: tipo };
    }
    if (color) {
      where.color = { contains: color };
    }
    if (precio) {
      const rangos = precio.split(',').map((r) => r.split('-').map(Number));
      where.OR = rangos.map(([min, max]) => ({
        precio: {
          gte: min,
          lte: max,
        },
      }));
    }
    const data = await this.prisma.peluche.findMany({ where });
    if (!data || data.length === 0) {
      throw new HttpException(
        'No se encontraron resultados',
        HttpStatus.NOT_FOUND,
      );
    }
    return data;
  }
}
