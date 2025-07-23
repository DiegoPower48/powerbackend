import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateMailDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsNotEmpty()
  @IsString()
  comentario: string;
}
