import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    PostModule,
    CommentModule,
    MongooseModule.forRoot(
      'mongodb://cabbageUser:Cabbage$123@cluster0-shard-00-00.vvlac.mongodb.net:27017,cluster0-shard-00-01.vvlac.mongodb.net:27017,cluster0-shard-00-02.vvlac.mongodb.net:27017/cabbage-blog?ssl=true&replicaSet=atlas-13ixon-shard-0&authSource=admin&retryWrites=true&w=majority',
      {
        connectionFactory: (connection) => {
          connection.plugin(require('mongoose-autopopulate'));
          return connection;
        }
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
