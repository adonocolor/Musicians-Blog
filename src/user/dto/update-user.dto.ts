import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: "Username", nullable: false })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  username: string;

  @ApiProperty({ description: "First Name", nullable: false })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: "Last Name", nullable: false })
  @IsString()
  lastName: string;

  @ApiProperty({ description: "Password", nullable: false })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: "Description", nullable: true})
  @IsString()
  description: string;
}
