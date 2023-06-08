import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class eventDescription1685404184935 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "event_descriptions",
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
                            name: "additional_description",
                            type: "text"
                        },
                        {
                            name: "max_occupation",
                            type: "integer",
                        },
                        {
                            name: "location",
                            type: "varchar",
                        },
                        {
                            name: "lat",
                            type: "varchar",
                        },
                        {
                            name: "long",
                            type: "varchar",
                        },
                        {
                            name: "address_number",
                            type: "integer",
                        },
                        {
                            name: "additional_description_address",
                            type: "text",
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()"
                        },
                    ],

                    foreignKeys: [
                        {
                            name: "FKEventInvitations",
                            referencedTableName: "events",
                            referencedColumnNames: ["id"],
                            columnNames: ["event_id"],
                            onDelete: "RESTRICT",
                            onUpdate: "RESTRICT",
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
