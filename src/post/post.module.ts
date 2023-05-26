import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { Comment } from "../comment/entities/comment.entity";
import { Category } from "../category/entities/category.entity";
import { User } from "../user/entities/user.entity";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/services/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment, Category, User]), UserModule],
  exports: [TypeOrmModule],
  controllers: [PostController],
  providers: [PostService, UserService],
})
export class PostModule {}
