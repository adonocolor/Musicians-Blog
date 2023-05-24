import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { Comment } from "../comment/entities/comment.entity";
import { Category } from "../category/entities/category.entity";
import { User } from "../user/entities/user.entity";
import { UserModule } from "../user/user.module";
import { CommentModule } from "../comment/comment.module";
import { CategoryModule } from "../category/category.module";

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment, Category, User]), UserModule, CommentModule, CategoryModule],
  exports: [TypeOrmModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
