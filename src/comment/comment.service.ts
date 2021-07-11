import { Injectable, NotFoundException } from '@nestjs/common';
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
    const comment = await new this.model({
      ...createCommentDto,
      createdTime: new Date(),
    }).save();
    const post = await this.postModel.findById(comment.post);
    post.comments.push(comment);
    await post.save();
    return comment;
  }

  async findAll(): Promise<Comment[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string):Promise<Comment> {
    return await this.model.findById(id).exec().then(res => {
      if(!res){
        throw new NotFoundException(`Comment not found for id:#${id}`);
      }
    }).catch(err =>{
      return err;
    });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto){
    return await this.model
      .updateOne({ _id: id, author: updateCommentDto.author }, updateCommentDto)
      .exec().then(res => {
        if(res.n === 1 && res.nModified === 0){
          return {message: 'nothing to change'};
        }else if(res.nModified > 0){
          return {message: 'successfully updated'};
        }else{
          throw new NotFoundException(`Comment not found for id:#${id} and author :#${updateCommentDto.author}`);
        }
      });
     
  }

  async remove(id: string, authorId: string) {
    const removed = await this.model.remove({ _id: id, author: authorId }).exec().then(async (res) => {
      const post = await this.postModel.findById(res.post).exec();
      if(post && post.comments.length > 0){
        delete post.comments[res._id];
        await post.save();
      }
    });
    return removed;
  }

  async findAllCommentsByPost(postId: string) {
    const post = await this.postModel.findById(postId).exec();
    return await this.model.find({ post: post }).exec();
  }
}
