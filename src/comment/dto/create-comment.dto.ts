import { User } from "src/user/schemas/user.schema";
import { Post } from "src/post/schemas/post.schema";
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsMongoId()
    author: User;

    @IsNotEmpty()
    @IsMongoId()
    post: Post;

    @IsNotEmpty()
    content: string;
    
}

