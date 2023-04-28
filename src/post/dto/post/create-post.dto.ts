import { Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../../user/entities/user.entity";
import { Category } from "../../entities/category.entity";

export class CreatePostDto {
  @ApiProperty({ description: "The title of the Post", nullable: false })
  postTitle: string;

  @ApiProperty({ description: "The contents of the post", nullable: false })
  postContent: string;

  @ApiProperty({ description: "Category", nullable: true })
  categories: Category[];
}
