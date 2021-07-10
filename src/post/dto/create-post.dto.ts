import { IsNotEmpty, Length, ValidateNested } from 'class-validator';
import { User } from 'src/user/schemas/user.schema';

export class CreatePostDto {
  @IsNotEmpty()
  @Length(5, 20)
  title: string;

  @IsNotEmpty()
  @Length(5, 20)
  content: string;
  
  @IsNotEmpty()
  @ValidateNested()
  author: User;
}
