import { Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty({ description: "The title of the Post", nullable: false })
  postTitle: string;

  @ApiProperty({ description: "The contents of the post", nullable: false })
  postContent: string;
}
