import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostController } from './controllers/post.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { Comment } from "./entities/comment.entity";
import { Category } from "./entities/category.entity";
import { CommentController } from "./controllers/comment.controller";
import { CategoryController } from "./controllers/category.controller";
import { CommentService } from "./services/comment.service";
import { User } from "../user/entities/user.entity";
import { CategoryService } from "./services/category.service";
import { UserService } from "../user/services/user.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment, Category, User]), UserModule],
  exports: [TypeOrmModule],
  controllers: [PostController, CommentController, CategoryController],
  providers: [PostService, CommentService, CategoryService, UserService]
})
export class PostModule {}
