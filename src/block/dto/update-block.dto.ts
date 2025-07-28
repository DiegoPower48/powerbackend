import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBlockDto {
  @ApiProperty({
    title: 'Identificador',
    description: 'id de la casilla',
    example: '1',
  })
  @IsNumber()
  id;

  @ApiProperty({
    title: 'Texto',
    description: 'texto de la casilla',
    example: 'hola probando',
  })
  @IsString()
  @IsNotEmpty()
  texto;
}
