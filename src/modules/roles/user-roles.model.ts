import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {Role} from "./roles.model";
import {ApiProperty} from "@nestjs/swagger";


@Table({tableName: 'user_roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {

    @ApiProperty({example: '1', description: 'Unique id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '1', description: 'Role id'})
    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number;

    @ApiProperty({example: '1', description: 'User id'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

}
