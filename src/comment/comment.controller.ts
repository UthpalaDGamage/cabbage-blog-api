import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentService.create(createCommentDto);
  }

  @Get()
  async findAll() {
    return await this.commentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.commentService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id/author/:authorId')
  async remove(@Param('id') id: string, @Param('authorId') authorId: string) {
    return await this.commentService.remove(id, authorId);
  }

  @Get('/post/:postId')
  async findAllCommentsByPost(@Param('postId') postId: string) {
    return await this.commentService.findAllCommentsByPost(postId);
  }
}
