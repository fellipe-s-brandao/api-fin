import { MigrationInterface, QueryRunner } from 'typeorm'

export class alterDatabaseTimezone1685461787543 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      "alter database bora set timezone to 'America/Sao_Paulo';",
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
