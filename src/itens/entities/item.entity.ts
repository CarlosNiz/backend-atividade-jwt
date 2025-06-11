import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "itens"})
export class ItemEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number
    
    @Column({ 
        type: "character varying",
        name: "descricao"
    })
    descricao: string

    @Column({
        type: "numeric",
        name: "preco"
    })
    preco: number

}