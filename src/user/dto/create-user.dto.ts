import { IsInt, Length, IsNotEmpty, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(5, 20)
  name: string;

  numberOfPosts: number;
}
