import { Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
  @ApiProperty({ description: "The text of the comment", nullable: false })
  @IsString()
  @IsNotEmpty()
  commentText: string;
}
