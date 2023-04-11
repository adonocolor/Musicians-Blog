import { Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
  @ApiProperty({ description: "The text of the comment", nullable: false })
  commentText: string;
}
