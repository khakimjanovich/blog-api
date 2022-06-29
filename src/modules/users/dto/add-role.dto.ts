// import {IsNumber, IsString} from "class-validator";

import {ApiProperty} from "@nestjs/swagger";

export class AddRoleDto {

    @ApiProperty({example: 'ADMIN', description: 'Unique value of the role '})
    // @IsString({message: "Должно быть строкой"})
    readonly value: string;

    @ApiProperty({example: '1', description: 'User id'})
    // @IsNumber({}, {message: "Должно быть числом"})
    readonly userId: number;
}
