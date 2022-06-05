import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { DatabaseConfigService } from "./database/database.config";
import { DatabaseConfigModule } from "./database/database.module";
import { PostsModule } from './posts/posts.module';
import { FilesModule } from './files/files.module';

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [
        DatabaseConfigModule,
        ConfigModule.forRoot({
            envFilePath: ".env"
        }),
        UsersModule,
        MongooseModule.forRootAsync({
            inject: [DatabaseConfigService],
            useFactory: async (configService: DatabaseConfigService) => configService.getMongoConfig()
        }),
        PostsModule,
        FilesModule
    ]
})
export class AppModule {
}