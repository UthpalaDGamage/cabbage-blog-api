import { IsMongoId, IsNotEmpty } from "class-validator";

export class IsGetCommentParams{
    @IsMongoId()
    @IsNotEmpty()
    id: string;
}

export class IsPatchCommentParams{
    @IsMongoId()
    @IsNotEmpty()
    id: string;
}

export class IsDeleteCommentParams{
    @IsMongoId()
    @IsNotEmpty()
    id: string;
    
    @IsMongoId()
    @IsNotEmpty()
    authorId: string;
}