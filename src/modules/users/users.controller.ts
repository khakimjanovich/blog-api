import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

import {UsersService} from "./users.service";
import {User} from "./users.model";

import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {CreateUserDto} from "./dto/create-user.dto";

import {Roles} from "../auth/decorators/roles-auth.decorator";
import {RolesGuard} from "../auth/guards/roles.guard";

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @ApiOperation({summary: 'Create a user'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Give user a role'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: 'Ban the user'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }
}
