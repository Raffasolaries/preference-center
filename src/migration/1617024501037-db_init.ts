import {MigrationInterface, QueryRunner} from "typeorm";

export class dbInit1617024501037 implements MigrationInterface {
    name = 'dbInit1617024501037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "users"."createDateTime" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."lastChangedDateTime" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "users"."lastChangedDateTime" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."createDateTime" IS NULL`);
    }

}
