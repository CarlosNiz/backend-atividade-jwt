import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number;
        
    @Column({ 
        type: "character varying",
        name: "nome"
    })
    nome: string;

    @Column({
        type: "character varying",
        name: "senha"
    })
    senha: string;
}