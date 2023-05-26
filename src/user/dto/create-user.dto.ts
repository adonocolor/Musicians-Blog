import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ description: "Username", nullable: false })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(5)
  email: string;

  @ApiProperty({ description: "Password", nullable: false })
  @IsString()
  @IsNotEmpty()
  password: string;
}
