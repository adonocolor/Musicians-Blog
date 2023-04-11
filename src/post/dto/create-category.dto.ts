import { Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({ description: "The title of the Category", nullable: false })
  categoryName: string;
}
