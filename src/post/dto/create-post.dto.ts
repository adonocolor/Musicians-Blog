import { Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../user/entities/user.entity";
import { Category } from "../../category/entities/category.entity";
import { ArrayMinSize, IsArray, IsNotEmpty, IsString, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateCategoryDto } from "../../category/dto/create-category.dto";

export class CreatePostDto {
  @ApiProperty({ description: "The title of the Post", nullable: false })
  @IsNotEmpty()
  @IsString()
  postTitle: string;

  @ApiProperty({ description: "The contents of the post", nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  postContent: string;

  @ApiProperty({ description: "Category", nullable: true })
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => CreateCategoryDto)
  categories: CreateCategoryDto[];
}
