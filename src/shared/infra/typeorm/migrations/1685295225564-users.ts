import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class users1685295225564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'birthDate',
            type: 'timestamp',
          },
          {
            name: 'gender',
            type: 'smallint',
          },
          {
            name: 'customGender',
            type: 'varchar',
            default: null,
            isNullable: true,
          },
          {
            name: 'avatar',
            type: 'varchar',
            default: null,
            isNullable: true,
          },
          {
            name: 'passwordResetToken',
            type: 'varchar',
            default: null,
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
