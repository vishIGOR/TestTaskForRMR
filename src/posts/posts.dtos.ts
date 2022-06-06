import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty()
    message: string;
}
//yagni
// export class UpdatePostDto extends CreatePostDto{
//     @ApiProperty()
//     deletedFileNames: string;
// }

export class GetPostDto{
    @ApiProperty()
    message: string;
    @ApiProperty()
    fileNames: string[];
    @ApiProperty()
    likes: number;
    @ApiProperty()
    isLikedByCurrentUser: boolean = false;
}


export class GetPostDetailedDataDto extends  GetPostDto{
    @ApiProperty()
    authorId: string;
    @ApiProperty()
    createdAt: Date;
}