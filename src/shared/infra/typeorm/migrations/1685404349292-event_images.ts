import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class eventImages1685404349292 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "event_images",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "event_id",
                            type: "uuid",
                        },
                        {
                            name: "filename",
                            type: "varchar"
                        },
                        {
                            name: "user_id",
                            type: "uuid",
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()"
                        },
                    ],

                    foreignKeys: [
                        {
                            name: "FKEventImages",
                            referencedTableName: "events",
                            referencedColumnNames: ["id"],
                            columnNames: ["event_id"],
                            onDelete: "CASCADE",
                            onUpdate: "CASCADE",
                        },
                        {
                            name: "FKEventImagesUser",
                            referencedTableName: "users",
                            referencedColumnNames: ["id"],
                            columnNames: ["user_id"],
                            onDelete: "SET NULL",
                            onUpdate: "SET NULL",
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("event_descriptions");
    }

}
