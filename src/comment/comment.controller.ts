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
import { IsDeleteCommentParams, IsGetCommentParams, IsPatchCommentParams } from './comment.validator';
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
  async findOne(@Param() params: IsGetCommentParams) {
    return await this.commentService.findOne(params.id);
  }
// Since authentication not implemented userId is sent as author in updateCommentDto
  @Patch(':id')
  async update(
    @Param() params: IsPatchCommentParams,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentService.update(params.id, updateCommentDto);
  }
// Since authentication not implemented userId is sent as :authorId
  @Delete(':id/author/:authorId')
  async remove(@Param() params:IsDeleteCommentParams) {
    return await this.commentService.remove(params.id, params.authorId);
  }

  @Get('/post/:postId')
  async findAllCommentsByPost(@Param('postId') postId: string) {
    return await this.commentService.findAllCommentsByPost(postId);
  }
}
