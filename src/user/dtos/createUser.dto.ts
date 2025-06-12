import { IsString } from "class-validator";

export class CreateUserDTO {
    @IsString()
    nome: string;
    
    @IsString()
    senha: string;
}