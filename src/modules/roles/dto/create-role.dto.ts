import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateRoleDto {
    @ApiProperty({example: 'ADMIN', description: 'Unique value of the role '})
    @IsString()
    readonly value: string;

    @ApiProperty({example: 'Administrator', description: 'Description of the role'})
    @IsString()
    readonly description: string;
}
