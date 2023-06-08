import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class eventInvitations1685403687663 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: "event_invitations",
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
                            name: "invited_user_id",
                            type: "uuid"
                        },
                        {
                            name: "user_id",
                            type: "uuid",
                        },
                        {
                            name: "status",
                            type: "smallint",
                        },
                        {
                            name: "comment",
                            type: "text",
                        },
                        {
                            name: "accepted_at",
                            type: "timestamp",
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
                        },
                        {
                            name: "FKEventInvitationsUser",
                            referencedTableName: "users",
                            referencedColumnNames: ["id"],
                            columnNames: ["user_id"],
                            onDelete: "RESTRICT",
                            onUpdate: "RESTRICT",
                        },
                        {
                            name: "FKEventInvitationInvitedUser",
                            referencedTableName: "users",
                            referencedColumnNames: ["id"],
                            columnNames: ["invited_user_id"],
                            onDelete: "RESTRICT",
                            onUpdate: "RESTRICT",
                        },
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("event_invitations");
    }

}
