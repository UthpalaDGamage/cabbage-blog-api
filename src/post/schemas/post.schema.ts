import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/schemas/user.schema';
import { Comment } from '../../comment/schemas/comment.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  createdTime: Date;

  @Prop()
  lastUpdatedTime: Date;

  @Prop()
  id: string;
}
export const PostSchema = SchemaFactory.createForClass(Post);
