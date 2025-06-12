import { IsNumber, IsString } from "class-validator";
import { UserEntity } from "../entities/user.entity";

export class ReturnUserDTO {
    @IsNumber()
    id: number

    @IsString()
    nome: string;

    constructor(user: UserEntity){
        this.id = user.id
        this.nome = user.nome
    }
}