import { Controller, Delete, Get, Param, Patch, Post as HttpPost } from "@nestjs/common";
import { Post } from "../schemas/posts.schema";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Записи")
@Controller("posts")
export class PostsController {
    @Get("/")
    async getPosts() {

    }

    @Get("/:id")
    async getDetailedPostInformation(@Param() param) {

    }

    @HttpPost("/")
    async createPost() {

    }

    @Patch("/:id")
    async updatePost(@Param() param) {

    }

    @HttpPost("/:id/like")
    async setLike(@Param() params) {

    }

    @Delete("/:id")
    async deletePost(@Param() param) {

    }

}
