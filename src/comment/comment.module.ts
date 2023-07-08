import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "../post/entities/post.entity";
import { User } from "../user/entities/user.entity";
import { PostService } from "../post/post.service";
import { UserService } from "../user/services/user.service";
import { CommentController } from "./comment.controller";
import { Category } from "../category/entities/category.entity";
import { CommentService } from "./comment.service";
import {Comment} from "./entities/comment.entity";


@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment, Category, User])],
  exports: [TypeOrmModule],
  controllers: [CommentController],
  providers: [CommentService, PostService, UserService]
})
export class CommentModule {}
