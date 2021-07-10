import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/schemas/user.schema';
import { Post } from '../../post/schemas/post.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  post: Post;

  @Prop({ required: true })
  createdTime: Date;

  @Prop()
  updatedTime: Date;

  @Prop({ required: true })
  content: string;

  @Prop()
  id: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
