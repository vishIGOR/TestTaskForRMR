import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "../schemas/posts.schema";
import { Like, LikeSchema } from "../schemas/likes.schema";
import { IPostsService } from "./posts.service.interface";
import { IFilesService } from "../files/files.service.interface";
import { FilesService } from "../files/files.service";
import { JwtService } from "@nestjs/jwt";

@Module({
    controllers: [PostsController],
    providers: [
        {
            provide: IPostsService,
            useClass: PostsService
        },
        {
            provide: IFilesService,
            useClass: FilesService
        },
        JwtService
    ],
    imports: [
        MongooseModule.forFeature([
            { name: Post.name, schema: PostSchema },
            { name: Like.name, schema: LikeSchema }
        ])
    ]
})
export class PostsModule {
}
