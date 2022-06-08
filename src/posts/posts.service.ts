import { BadRequestException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { IPostsService } from "./posts.service.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Post } from "../schemas/posts.schema";
import { ClientSession, Model, Schema } from "mongoose";
import { CreatePostDto, GetPostDetailedDataDto, GetPostDto } from "./posts.dtos";
import { Express } from "express";
import { IFilesService } from "../files/files.service.interface";

@Injectable()
export class PostsService implements IPostsService {
    constructor(@InjectModel(Post.name) private readonly _postModel: Model<Post>,
                @Inject(IFilesService) private readonly _filesService: IFilesService) {
    }

    async createPost(authorId: string, createPostDto: CreatePostDto, files, session: ClientSession): Promise<GetPostDetailedDataDto> {
        let fileNames = await this._filesService.createFiles(files);

        let post = new this._postModel({
            message: createPostDto.message,
            fileNames: fileNames,
            authorId: authorId
        });

        try {
            post = await post.save({ session });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return this.getPostDetailedDataDtoFromModel(post);
    }

    async deletePost(postId: string): Promise<void> {
        try {
            let fileNames = (await this.getPostById(postId)).fileNames;
            await this._postModel.findByIdAndDelete(postId);
            for (let fileName in fileNames) {
                await this._filesService.deleteFile(fileName);
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

    }

    async getPosts(limit: number | null, from: number | null): Promise<GetPostDto[]> {
        return Promise.resolve([]);
    }

    private async getPostById(id: string) {
        let post;
        try {
            post = await this._postModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        return post;
    }

    private getPostDetailedDataDtoFromModel(post: Post): GetPostDetailedDataDto {
        let dto = new GetPostDetailedDataDto();
        dto.message = post.message;
        dto.authorId = post.authorId.toString();
        dto.fileNames = post.fileNames;
        dto.likes = post.likes;
        dto.createdAt = post.createdAt;
        return dto;
    }

    private getPostDtoFromModel(post: Post): GetPostDto {
        let dto = new GetPostDto();
        dto.message = post.message;
        dto.fileNames = post.fileNames;
        dto.likes = post.likes;
        return dto;
    }

    async isUserOwnerOfPost(userId: string, postId: string): Promise<boolean> {
        let post = await this.getPostById(postId);

        if (!post) {
            return false;
        }
        if (post.authorId != userId) {
            return false;
        }

        return true;
    }

    async getPostDetailedData(postId: string): Promise<GetPostDetailedDataDto> {
        return Promise.resolve(undefined);
    }

    likePost(userId: string, postId: string): Promise<void> {
        return Promise.resolve(undefined);
    }
}
