import { IsMongoId, IsNotEmpty } from "class-validator";

export class IsGetPostParams{
    @IsMongoId()
    @IsNotEmpty()
    id: string;
}

export class IsPatchPostParams{
    @IsMongoId()
    @IsNotEmpty()
    id: string;
}

export class IsDeletePostParams{
    @IsMongoId()
    @IsNotEmpty()
    id: string;
    
    @IsMongoId()
    @IsNotEmpty()
    userId: string;
}

export class IsAuthorParams{
    @IsMongoId()
    @IsNotEmpty()
    userId: string;
}