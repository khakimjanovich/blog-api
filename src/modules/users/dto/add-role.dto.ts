import {IsNumber, IsString} from "class-validator";

import {ApiProperty} from "@nestjs/swagger";

export class AddRoleDto {

    @ApiProperty({example: 'ADMIN', description: 'Unique value of the role '})
    @IsString()
    readonly value: string;

    @ApiProperty({example: '1', description: 'User id'})
    @IsNumber()
    readonly userId: number;
}
