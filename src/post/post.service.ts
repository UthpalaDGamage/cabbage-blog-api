import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    return await this.model.findById(id).exec();
  }

  async findOneWithAuthor(id: string): Promise<Post> {
    return await this.model.findById(id).populate('author').exec();
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.model
      .updateOne(
        { _id: updatePostDto.id, author: updatePostDto.author },
        updatePostDto,
      )
      .exec();
  }

  async remove(id: string, userId: string) {
    const author = await this.userModel.findById(userId).exec();
    return await this.model
      .deleteOne({ _id: id, author: author })
      .exec()
      .then(async (res) => {
        if (res && author.numberOfPosts > 0) {
          await this.userModel
            .updateOne({ _id: author }, { $inc: { numberOfPosts: -1 } })
            .exec();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async findAllForUser(userId: string) {
    const author = await this.userModel.findById(userId).exec();
    return await this.model.find({ author: author }).exec();
  }
}
