import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/post/schemas/post.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly model: Model<CommentDocument>,
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}
  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    return await new this.model({
      ...createCommentDto,
      createdTime: new Date(),
    }).save();
  }

  async findAll(): Promise<Comment[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string) {
    return await this.model.findById(id).exec();
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return await this.model
      .updateOne({ _id: id, author: updateCommentDto.author }, updateCommentDto)
      .exec();
  }

  async remove(id: string, authorId: string) {
    return await this.model.remove({ _id: id, author: authorId }).exec();
  }

  async findAllCommentsByPost(postId: string) {
    const post = await this.postModel.findById(postId).exec();
    console.log(post);
    return await this.model.find({ post: post }).exec();
  }
}
