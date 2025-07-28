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
      const data = this.prisma.peluche.findUnique({
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

  async findOne(nombre: string) {
    try {
      const data = this.prisma.peluche.findFirst({
        where: {
          nombre: nombre,
        },
      });

      if (!data) {
        throw new HttpException('No encontrado', HttpStatus.NOT_FOUND);
      }

      return data;
    } catch (error) {
      throw new HttpException(
        'Error del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findMany() {
    return;
  }

  async findFilter() {
    return;
  }
}
