import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({example: 'ADMIN', description: 'Unique value of the role '})
    readonly value: string;

    @ApiProperty({example: 'Administrator', description: 'Description of the role'})
    readonly description: string;
}
