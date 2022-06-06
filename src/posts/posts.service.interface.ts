import { CreatePostDto, GetPostDetailedDataDto, GetPostDto } from "./posts.dtos";
import { ClientSession, Schema } from "mongoose";

export interface IPostsService {
    createPost(authorId: string, createPostDto: CreatePostDto, files, session: ClientSession): Promise<GetPostDetailedDataDto>;

    deletePost(postId: string, session: ClientSession): Promise<void>;

    getPosts(limit: number | null, from: number | null): Promise<GetPostDto[]>;
}

export const IPostsService = Symbol("IPostsService");