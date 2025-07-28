import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';



export class CreateMailDto {

  @ApiProperty({title:"Nombre" ,example:"Diego Torres", description:"nombre del cliente"})
  @IsNotEmpty()
  @IsString()
  nombre;

  @ApiProperty({title:"correo" ,example:"diego_torres@gmail.com", description:"correo del cliente"})
  @IsEmail()
  @IsNotEmpty()
  correo;

  @ApiProperty({title:"comentario" ,example:"Hola buen dia", description:"comentario del cliente"})
  @IsNotEmpty()
  @IsString()
  comentario;
}
