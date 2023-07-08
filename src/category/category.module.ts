import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "../post/entities/post.entity";
import { CategoryController } from "./category.controller";
import {Comment} from "../comment/entities/comment.entity";
import { CategoryService } from "./category.service";
import { Category } from "./entities/category.entity";


@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment, Category])],
  exports: [TypeOrmModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
