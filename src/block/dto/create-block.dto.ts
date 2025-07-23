import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateBlockDto {
    @IsNumber()
    id
    

    @IsString()
    @IsNotEmpty()
    text
}
