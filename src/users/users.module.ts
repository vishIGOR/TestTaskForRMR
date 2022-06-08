import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../schemas/users.schema";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { IUsersService } from "./users.service.interface";
import { GetIdFromAuthGuard, JwtAuthGuard } from "./users.guards";

@Module({
    controllers: [UsersController],
    providers: [
        {
            provide: IUsersService,
            useClass: UsersService
        },
        JwtAuthGuard,
        GetIdFromAuthGuard
    ],
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ]),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || "secret",
            signOptions: {
                expiresIn: process.env.ACCESS_TOKEN_LIFE_IN_MINUTES || "30m"
            }
        })
    ],
    exports: [
        JwtAuthGuard,
        GetIdFromAuthGuard,
        JwtModule
    ]
})
export class UsersModule {
}
