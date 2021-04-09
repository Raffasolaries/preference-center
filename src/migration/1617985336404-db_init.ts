import {MigrationInterface, QueryRunner} from "typeorm";

export class dbInit1617985336404 implements MigrationInterface {
    name = 'dbInit1617985336404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "email" character varying(200) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "consents_name_enum" AS ENUM('email_notifications', 'sms_notifications')`);
        await queryRunner.query(`CREATE TABLE "consents" ("isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "name" "consents_name_enum" NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_541906edc79e1606689b9d32cb9" PRIMARY KEY ("name", "userId"))`);
        await queryRunner.query(`ALTER TABLE "consents" ADD CONSTRAINT "FK_7736e32000c01e8e189d1d4a0dd" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consents" DROP CONSTRAINT "FK_7736e32000c01e8e189d1d4a0dd"`);
        await queryRunner.query(`DROP TABLE "consents"`);
        await queryRunner.query(`DROP TYPE "consents_name_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
