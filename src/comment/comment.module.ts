import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { Post, PostSchema } from 'src/post/schemas/post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PostService } from 'src/post/post.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
