import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
    @IsString()
    @IsEmail()
    readonly email: string;
    @ApiProperty({example: '12345', description: 'пароль'})
    @IsString()
    @Length(4, 16,)
    readonly password: string;
}