import { PartialType } from "@nestjs/mapped-types";
import { CreatePostDto } from "./create-post.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Category } from "../../entities/category.entity";

export class UpdatePostDtoCategories {
  @ApiProperty({ description: "id", nullable: false })
  id: number;

  @ApiProperty({ description: "The categories of the post", nullable: false })
  categories: Category[];
}
