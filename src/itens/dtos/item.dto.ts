import { IsNumber, IsString } from "class-validator";

export class ItemDTO {
    @IsString()
    descricao: string

    @IsNumber()
    preco: number;
}