import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: "Username", nullable: false })
  username: string;

  @ApiProperty({ description: "First Name", nullable: false })
  firstName: string;

  @ApiProperty({ description: "Last Name", nullable: false })
  lastName: string;

  @ApiProperty({ description: "Password", nullable: false })
  password: string;

  @ApiProperty({ description: "Description", nullable: false })
  description: string;
}
