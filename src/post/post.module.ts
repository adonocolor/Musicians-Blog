import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { Comment } from "./entities/comment.entity";
import { Category } from "./entities/category.entity";
import { CommentController } from "./comment.controller";
import { CategoryController } from "./category.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment, Category])],
  exports: [TypeOrmModule],
  controllers: [PostController, CommentController, CategoryController],
  providers: [PostService]
})
export class PostModule {}
