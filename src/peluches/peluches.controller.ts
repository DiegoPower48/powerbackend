import { Controller } from '@nestjs/common';
import { PeluchesService } from './peluches.service';

@Controller('peluches')
export class PeluchesController {
  constructor(private readonly peluchesService: PeluchesService) {}
}
