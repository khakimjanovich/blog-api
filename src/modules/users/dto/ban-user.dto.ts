import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class BanUserDto {

    @ApiProperty({example: '1', description: 'User id'})
    @IsNumber()
    readonly userId: number;

    @ApiProperty({example: 'for hooliganism', description: 'Ban reason'})
    @IsString()
    readonly banReason: string;
}
