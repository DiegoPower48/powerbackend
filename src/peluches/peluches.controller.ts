import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { PeluchesService } from './peluches.service';

@Controller('peluche')
export class PeluchesController {
  constructor(private readonly peluchesService: PeluchesService) {}

  @Get('/all')
  getAll() {
    return this.peluchesService.getAll();
  }

  @Get('/slider')
  getSlider() {
    return this.peluchesService.getSlider();
  }

  @Get('/peluche/:id')
  async getOne(@Param('id') id: String) {
    return this.peluchesService.getOne(+id);
  }

  @Get('/find')
  async find(@Query('nombre') nombre: string) {
    return this.peluchesService.find(nombre);
  }

  @Get('/filter')
  async filter(
    @Query('tipo') tipo?: string,
    @Query('color') color?: string,
    @Query('precio') precio?: string,
  ) {
    return this.peluchesService.filter({ tipo, color, precio });
  }
}
