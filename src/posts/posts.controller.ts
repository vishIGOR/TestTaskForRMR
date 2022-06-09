import {
    Body,
    Controller,
    Delete,
    Get, HttpException, HttpStatus,
    Inject,
    Param,
    Request,
    Post as HttpPost, Res,
    UploadedFiles, UseGuards,
    UseInterceptors, Put
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection, Schema as MongooseSchema } from "mongoose";
import { IPostsService } from "./posts.service.interface";
import { CreatePostDto } from "./posts.dtos";
import { Response } from "express";
import { GetIdFromAuthGuard, JwtAuthGuard } from "../auth/auth.guards";
import { ApiPostFiles } from "../files/files.decorators";

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
    @UseGuards(JwtAuthGuard, GetIdFromAuthGuard)
    // @UseInterceptors(FilesInterceptor("files", 10))
    @ApiPostFiles()
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

    @Put("/:id")
    async updatePost(@Param("id") id: MongooseSchema.Types.ObjectId) {

    }

    @HttpPost("/:id/like")
    async setLike(@Param("id") id: MongooseSchema.Types.ObjectId) {

    }

    @Delete("/:id")
    async deletePost(@Param("id") id: MongooseSchema.Types.ObjectId) {

    }

}
