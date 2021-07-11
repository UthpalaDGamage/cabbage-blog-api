import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './schemas/post.schema';
import { User, UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly model: Model<PostDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const { author } = createPostDto;
    const post = new this.model({
      ...createPostDto,
      createdTime: new Date(),
    });
    await post.save().then(async (result) => {
      if (result) {
        await this.userModel
          .updateOne({ _id: author }, { $inc: { numberOfPosts: 1 } })
          .exec();
      }
    });
    return post;
  }

  async findAll(): Promise<Post[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Post> {
    return await this.model.findById(id).populate('author').populate('comments').exec().then(res => {
      if(!res){
        throw new NotFoundException(`Post not found for id:#${id}`);
      }
    }).catch(err =>{
      return err;
    });;
  }

  async findOneWithAuthor(id: string): Promise<Post> {
    return await this.model.findById(id).populate('author').exec().then(res => {
      if(!res){
        throw new NotFoundException(`Post not found for id:#${id}`);
      }
    }).catch(err =>{
      return err;
    });;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.model
      .updateOne(
        { _id: id, author: updatePostDto.author },
        updatePostDto,
      )
      .exec().then(res => {
        if(res.n === 1 && res.nModified === 0){
          return {message: 'nothing to change'};
        }else if(res.nModified > 0){
          return {message: 'successfully updated'};
        }else{
          throw new NotFoundException(`Post not found for id:#${id} and author :#${updatePostDto.author}`);
        }
      });
  }

  async remove(id: string, userId: string) {
    const author = await this.userModel.findById(userId).exec();
    return await this.model
      .deleteOne({ _id: id, author: author })
      .exec()
      .then(async (res) => {
        if(res.deletedCount === 0){
          throw new NotFoundException(`Post not found for id:#${id} and author :#${author}`);
        }else{
          if (res && author.numberOfPosts > 0) {
            await this.userModel
              .updateOne({ _id: author }, { $inc: { numberOfPosts: -1 } })
              .exec();
          }
          return {message: 'Post successfully deleted'};
        }
       
      })
      .catch((err) => {
        return err;
      });
  }

  async findAllForUser(userId: string) {
    const author = await this.userModel.findById(userId).exec();
    return await this.model.find({ author: author }).exec();
  }
}
