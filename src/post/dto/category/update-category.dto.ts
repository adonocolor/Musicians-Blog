import { PartialType } from "@nestjs/mapped-types";
import { CreateCategoryDto } from "./create-category.dto";
import { Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({ description: "The title of the Category", nullable: false })
  categoryName: string;
}