import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1749661773136 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE usuario (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(50) NOT NULL,
                senha VARCHAR(200) NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE user;
        `);
    }

}
