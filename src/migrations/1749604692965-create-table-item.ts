import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableItem1749604692965 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE itens (
                id SERIAL PRIMARY KEY,
                descricao VARCHAR(100) NOT NULL,
                preco NUMERIC(10, 2) NOT NULL
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE itens;
        `)
    }
}
