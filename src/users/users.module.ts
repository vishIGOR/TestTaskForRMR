import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../schemas/users.schema";
import { JwtModule } from "@nestjs/jwt";
import { IUsersService } from "./users.service.interface";

@Module({
    controllers: [UsersController],
    providers: [{
        provide: IUsersService,
        useClass: UsersService
    }],
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ]),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || "secret",
            signOptions: {
                expiresIn: "30m"
            }
        })
    ]
})
export class UsersModule {
}
