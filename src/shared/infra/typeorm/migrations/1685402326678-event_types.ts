import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class event_types1685402326678 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "event_types",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "type",
                            type: "varchar",
                        },
                        {
                            name: "description",
                            type: "text"
                        },
                        {
                            name: "status",
                            type: "smallint"
                        },
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("event_types");
    }

}
