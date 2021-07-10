import { User } from "src/user/schemas/user.schema";
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    author: User;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;
    
}
