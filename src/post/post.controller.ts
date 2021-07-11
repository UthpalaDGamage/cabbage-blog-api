import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { IsDeletePostParams, IsGetPostParams, IsPatchPostParams, IsAuthorParams } from './post.validator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postService.create(createPostDto);
  }

  @Patch(':id')
  async update(@Param() params: IsPatchPostParams, @Body() updatePostDto: UpdatePostDto) {
    return await this.postService.update(params.id, updatePostDto);
  }

  @Delete(':id/author/:userId')
  async remove(@Param() params: IsDeletePostParams) {
    return await this.postService.remove(params.id, params.userId);
  }

  @Get()
  async findAll() {
    return await this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: IsGetPostParams) {
    return await this.postService.findOne(params.id);
  }

  @Get('/author/:userId')
  async findAllforUser(@Param() params: IsAuthorParams) {
    return await this.postService.findAllForUser(params.userId);
  }
}
