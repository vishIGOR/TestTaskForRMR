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
import { resolve } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AuthModule } from './auth/auth.module';

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env"
        }),
        DatabaseConfigModule,
        MongooseModule.forRootAsync({
            inject: [DatabaseConfigService],
            useFactory: async (configService: DatabaseConfigService) => configService.getMongoConfig()
        }),
        ServeStaticModule.forRoot({
            rootPath: resolve( __dirname, 'uploads'),
        }),
        UsersModule,
        AuthModule,
        PostsModule,
        FilesModule
    ]
})
export class AppModule {
}