import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../schemas/users.schema";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { IUsersHelper } from "./users.helper.interface";
import { UsersHelper } from "./users.helper";

@Module({
    controllers: [],
    providers: [
        {
            provide: IUsersHelper,
            useClass: UsersHelper
        }
    ],
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ])
    ],
    exports: [
        {
            provide: IUsersHelper,
            useClass: UsersHelper
        }
    ]
})
export class UsersModule {
}
