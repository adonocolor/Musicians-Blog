import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from "@nestjs/swagger";
import { Category } from "../../entities/category.entity";

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({ description: "id", nullable: false })
  id: number;

  @ApiProperty({ description: "The title of the Post", nullable: false })
  postTitle: string;

  @ApiProperty({ description: "The contents of the post", nullable: false })
  postContent: string;

  @ApiProperty({ description: "The categories of the post", nullable: false })
  categories: Category[];
}
