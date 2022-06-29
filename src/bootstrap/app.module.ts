import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from "../modules/users/users.module";
import {ConfigModule} from "@nestjs/config";
import {RolesModule} from "../modules/roles/roles.module";
import {User} from "../modules/users/users.model";
import {Role} from "../modules/roles/roles.model";
import {UserRoles} from "../modules/roles/user-roles.model";
import {AuthModule} from "../modules/auth/auth.module";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        SequelizeModule.forRoot({
            dialect: "postgres",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_DATABASE,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            models: [User, Role, UserRoles],
            autoLoadModels: true,
        }),
        UsersModule,
        RolesModule,
        AuthModule,
    ],
    exports: [],
})
export class AppModule {
}
