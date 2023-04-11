import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ description: "Username", nullable: false })
  username: string;

  @ApiProperty({ description: "First Name", nullable: false })
  firstName: string;

  @ApiProperty({ description: "Last Name", nullable: false })
  lastName: string;

  @ApiProperty({ description: "Password", nullable: false })
  password: string;
}
