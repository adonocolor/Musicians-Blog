import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from "./create-comment.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({ description: "The text of the comment", nullable: false })
  @IsString()
  @IsNotEmpty()
  commentText: string;
}
