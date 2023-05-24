import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from "@nestjs/swagger";
import { Category } from "../../category/entities/category.entity";
import { IsArray, IsNotEmpty, IsString, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateCategoryDto } from "../../category/dto/create-category.dto";

export class UpdatePostDto {
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
