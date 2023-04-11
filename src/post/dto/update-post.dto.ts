import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({ description: "The title of the Post", nullable: false })
  postTitle: string;

  @ApiProperty({ description: "The contents of the post", nullable: false })
  postContent: string;
}
