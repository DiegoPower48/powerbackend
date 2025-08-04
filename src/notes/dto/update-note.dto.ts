import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateNotesDto {
  @IsNumber()
  @IsNotEmpty()
  id;

  @IsOptional()
  @IsString()
  text;

  @IsOptional()
  @IsString()
  category;
}
