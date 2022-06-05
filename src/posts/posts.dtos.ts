import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty()
    message: string;
}

export class UpdatePostDto {
    @ApiProperty()
    message: string;
}

export class GetPostDto{
    @ApiProperty()
    message: string;
    @ApiProperty()
    fileNames: string;
    @ApiProperty()
    authorId: string;
}