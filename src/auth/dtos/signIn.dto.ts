import { IsString } from "class-validator";

export default class SignInDTO {
    @IsString()
    nome: string;

    @IsString()
    senha: string;
}