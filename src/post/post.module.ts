import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { Comment } from "./entities/comment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment])],
  exports: [TypeOrmModule],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
