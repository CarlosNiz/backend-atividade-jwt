import { IsNumber, IsString } from "class-validator";

export class CreateItemDTO {
    @IsString()
    descricao: string

    @IsNumber()
    preco: number;
}