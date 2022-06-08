import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get, HttpException, HttpStatus,
    Inject,
    Param,
    Request,
    Patch,
    Post as HttpPost, Res,
    UploadedFiles, UseGuards,
    UseInterceptors
} from "@nestjs/common";
import { Post } from "../schemas/posts.schema";
import { ApiTags } from "@nestjs/swagger";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection, Schema as MongooseSchema } from "mongoose";
import { IPostsService } from "./posts.service.interface";
import { CreatePostDto } from "./posts.dtos";
import { Express, Response } from "express";
import { ApiPostFiles } from "../files/files.decorators";
import { FilesInterceptor } from "@nestjs/platform-express";
import { GetIdFromAuthGuard, JwtAuthGuard } from "../users/users.guards";

@ApiTags("Записи")
@Controller("posts")
export class PostsController {
    constructor(@InjectConnection() private readonly _mongoConnection: Connection, @Inject(IPostsService) private readonly _postsService: IPostsService) {
    }

    @Get("/")
    async getPosts() {

    }

    @Get("/:id")
    async getDetailedPostInformation(@Param("id") id: MongooseSchema.Types.ObjectId) {

    }

    @HttpPost("/")
    // @ApiPostFiles()
    @UseGuards(JwtAuthGuard, GetIdFromAuthGuard)
    @UseInterceptors(FilesInterceptor("files"))
    async createPost(@Request() req, @Body() createPostDto: CreatePostDto, @UploadedFiles() files, @Res() res: Response) {
        const session = await this._mongoConnection.startSession();
        // session.startTransaction();
        try {
            let createdPost = await this._postsService.createPost(req.userId, createPostDto, files, session);
            // await session.commitTransaction();
            return res.status(HttpStatus.CREATED).send(createdPost);
        } catch (error) {
            // await session.abortTransaction();
            console.log(error);
            if (error instanceof HttpException)
                throw error;
            throw new HttpException("Unexpected server error", HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            await session.endSession();
        }
    }

    @Patch("/:id")
    async updatePost(@Param("id") id: MongooseSchema.Types.ObjectId) {

    }

    @HttpPost("/:id/like")
    async setLike(@Param("id") id: MongooseSchema.Types.ObjectId) {

    }

    @Delete("/:id")
    async deletePost(@Param("id") id: MongooseSchema.Types.ObjectId) {

    }

}
