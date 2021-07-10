import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsNotEmpty, IsMongoId } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @IsNotEmpty()
  @IsDate()
  createdTime: Date;
  
  @IsNotEmpty()
  @IsDate()
  lastUpdatedTime: Date;
}
