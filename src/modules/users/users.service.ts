import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import * as  bcrypt from 'bcryptjs'

import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

import {RolesService} from "../roles/roles.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService
    ) {
    }

    async createUser(dto: CreateUserDto) {

        const candidate = await this.getUserByEmail(dto.email);
        if (candidate) {
            throw new HttpException('User with this email exists!', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.userRepository.create({...dto, password: hashPassword});

        const role = await this.roleService.getRoleByValue("USER");
        await user.$set("roles", [role.id]);
        user.roles = [role];
        return user;
    }

    async getAllUsers() {
        return await this.userRepository.findAll({include: {all: true}});
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({
            where: {email},
            include: {all: true},
        });
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add("role", role.id);
            return dto;
        }
        throw new HttpException(
            "Пользователь или роль не найдены",
            HttpStatus.NOT_FOUND
        );
    }


    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }
}
